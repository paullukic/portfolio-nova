import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const fails = [];
page.on("response", async (r) => {
  if (r.status() >= 400) fails.push(`${r.status()} ${r.request().method()} ${r.url()}`);
});
await page.goto("http://localhost:4173/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(6000);
console.log(fails.join("\n") || "(no failed requests)");
await browser.close();
