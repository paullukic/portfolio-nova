// Prerender the built SPA so crawlers, link previews and no-JS visitors get
// real HTML. Serves dist/ with `vite preview`, renders each route in headless
// Chromium with reduced motion (no boot overlay, no half-decoded headings),
// and writes the resulting markup back into dist/.
//
//   node scripts/prerender.mjs            (after `vite build`)
//   PW_CHANNEL=chrome node scripts/prerender.mjs   (use the system Chrome)

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const PORT = 4179;
const ROUTES = [
  { path: "/", out: "dist/index.html", expect: "#selected" },
  { path: "/404", out: "dist/404.html", expect: "main" },
];

const server = await preview({ root: ROOT, preview: { port: PORT, strictPort: true }, logLevel: "warn" });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL });

try {
  const ctx = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 900 },
  });
  // never count the build machine as a visitor
  await ctx.route(/plausible\.io/, (route) => route.abort());

  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: "networkidle" });
    await page.waitForSelector(route.expect);
    await page.waitForTimeout(500);
    if (errors.length) throw new Error(`${route.path}: ${errors.join("; ")}`);

    const html = await page.evaluate(() => {
      const root = document.documentElement.cloneNode(true);
      // runtime-only state: the JS marker, scroll accent, reveal progress
      root.classList.remove("js");
      if (!root.classList.length) root.removeAttribute("class");
      root.removeAttribute("style");
      root.removeAttribute("data-section");
      root.removeAttribute("data-theme");
      root.querySelectorAll(".is-revealed").forEach((el) => el.classList.remove("is-revealed"));
      return `<!doctype html>\n${root.outerHTML}\n`;
    });
    await writeFile(resolve(ROOT, route.out), html, "utf8");
    console.log(`✓ prerendered ${route.path} -> ${route.out} (${(html.length / 1024).toFixed(0)} KB)`);
    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}
