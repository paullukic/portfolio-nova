import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

const OUT = "./.shots/selected-coograph";
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const URL = process.env.URL || "http://localhost:5174/";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "domcontentloaded" });

await page.addStyleTag({
  content: `
    html, body { scroll-behavior: auto !important }
    .phosphor-trail, [class*="cursor"] { display: none !important }
    * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important }
  `,
});
await page.waitForTimeout(4500);
await page.keyboard.press("Escape");
await page.waitForTimeout(500);

// warm up reveals by scrolling whole page
await page.evaluate(async () => {
  const total = document.documentElement.scrollHeight;
  for (let y = 0; y < total; y += window.innerHeight * 0.6) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(500);

// scroll to selected section
const has = await page.evaluate(() => !!document.getElementById("selected"));
if (!has) {
  // fallback — scroll to first project card
  await page.evaluate(() => document.querySelector('[data-section="selected"], section h2')?.scrollIntoView({ block: "start", behavior: "instant" }));
} else {
  await page.evaluate(() => document.getElementById("selected").scrollIntoView({ block: "start", behavior: "instant" }));
}
await page.waitForTimeout(700);

// 1. viewport-top
await page.screenshot({ path: `${OUT}/01-top.png`, fullPage: false });
console.log("✓ 01-top.png");

// 2. scroll a bit
await page.evaluate(() => window.scrollBy(0, 600));
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/02-mid.png`, fullPage: false });
console.log("✓ 02-mid.png");

// 3. continue
await page.evaluate(() => window.scrollBy(0, 600));
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/03-lower.png`, fullPage: false });
console.log("✓ 03-lower.png");

// 4. full-section capture — clip to selected section bounds
try {
  const bounds = await page.evaluate(() => {
    const el = document.getElementById("selected");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const top = window.scrollY + r.top;
    return { top, height: el.scrollHeight };
  });
  if (bounds) {
    await page.evaluate((y) => window.scrollTo(0, y), bounds.top);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `${OUT}/04-section-full.png`,
      fullPage: true,
      clip: { x: 0, y: bounds.top, width: 1440, height: Math.min(bounds.height, 4000) },
    });
    console.log("✓ 04-section-full.png");
  }
} catch (e) {
  console.log("FAIL full", e.message);
}

await browser.close();
console.log("Done →", OUT);
