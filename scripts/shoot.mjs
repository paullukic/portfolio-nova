import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const URL = process.env.URL || "http://localhost:4173/";
const OUT = "./.shots";

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  // wait past boot overlay (~4.1s) + fade
  await page.waitForTimeout(5200);
  // skip via ESC just in case
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);

  // viewport hero
  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png`, fullPage: false });
  // full page
  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });

  // section snapshots (desktop only)
  if (vp.name === "desktop") {
    // first pre-scroll through whole page to trigger all reveal observers
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight;
      const step = window.innerHeight * 0.6;
      for (let y = 0; y < total; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    const sections = ["brief", "selected", "ledger", "now", "toolkit", "clearance", "lab", "contact"];
    for (const id of sections) {
      try {
        const el = await page.$(`#${id}`);
        if (el) {
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(500);
          await el.screenshot({ path: `${OUT}/desktop-${id}.png` });
        }
      } catch (e) {
        console.log(`section ${id} fail: ${e.message}`);
      }
    }
  }

  await ctx.close();
  console.log(`✓ ${vp.name} ${errors.length ? `(${errors.length} errs)` : ""}`);
  if (errors.length) errors.forEach((e) => console.log("  •", e));
}

await browser.close();
console.log("done");
