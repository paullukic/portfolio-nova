import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  hasTouch: true,
  isMobile: true,
});
const page = await ctx.newPage();
await page.goto("http://localhost:4173/", { waitUntil: "networkidle", timeout: 30000 });
await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
await page.waitForTimeout(5000);
await page.keyboard.press("Escape");
await page.waitForTimeout(800);
await page.evaluate(async () => {
  const total = document.documentElement.scrollHeight;
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < total; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
});
await page.evaluate(() => document.getElementById("lab")?.scrollIntoView({ block: "start", behavior: "instant" }));
await page.waitForTimeout(1500);
await page.screenshot({ path: ".shots/verify-lab.png", fullPage: false });
console.log("saved .shots/verify-lab.png");
await browser.close();
