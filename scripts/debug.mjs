import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("PAGEERROR:", e.message, "\n", e.stack));
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") {
    console.log(`${m.type().toUpperCase()}:`, m.text());
  }
});
await page.goto("http://localhost:4173/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(2000);
const html = await page.evaluate(() => document.getElementById("root")?.innerHTML?.slice(0, 500) || "ROOT EMPTY");
console.log("ROOT:", html);
await browser.close();
