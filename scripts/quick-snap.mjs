import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/quick", { recursive: true, force: true });
await mkdir("./.shots/quick", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });
// disable heavy motion + cursor for stability
await page.addStyleTag({
  content: `
    html, body { scroll-behavior: auto !important }
    .phosphor-trail { display: none !important }
    * { animation-duration: 0.001ms !important }
  `,
});
await page.waitForTimeout(5500);
await page.keyboard.press("Escape");
await page.waitForTimeout(700);

await page.evaluate(async () => {
  const total = document.documentElement.scrollHeight;
  for (let y = 0; y < total; y += window.innerHeight * 0.6) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
});

for (const id of ["selected", "contact"]) {
  await page.evaluate((i) => document.getElementById(i)?.scrollIntoView({ block: "start", behavior: "instant" }), id);
  await page.waitForTimeout(500);
  try {
    await page.screenshot({ path: `./.shots/quick/${id}.png`, fullPage: false, timeout: 15000 });
    console.log("✓", id);
  } catch (e) {
    console.log("FAIL", id, e.message);
  }
}
await browser.close();
