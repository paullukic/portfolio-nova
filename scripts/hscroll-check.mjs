import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
await page.waitForTimeout(5500);
await page.keyboard.press("Escape");
await page.waitForTimeout(500);

const at = async (label) => {
  const m = await page.evaluate(() => ({
    htmlSW: document.documentElement.scrollWidth,
    htmlCW: document.documentElement.clientWidth,
    bodySW: document.body.scrollWidth,
    bodyCW: document.body.clientWidth,
    maxScrollX: Math.max(document.documentElement.scrollWidth - document.documentElement.clientWidth, 0),
  }));
  console.log(label, JSON.stringify(m));
};
await at("top");

await page.evaluate(async () => {
  const total = document.documentElement.scrollHeight;
  for (let y = 0; y < total; y += window.innerHeight * 0.6) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
});
await at("after-full-scroll");

await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(200);
await at("back-to-top");

await browser.close();
