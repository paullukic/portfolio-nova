import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/tkv2", { recursive: true, force: true });
await mkdir("./.shots/tkv2", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => m.type() === "error" && errs.push(`console: ${m.text()}`));

await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
await page.waitForTimeout(5500);
await page.keyboard.press("Escape");
await page.waitForTimeout(700);

// check horizontal scroll at top
const hScrollCheck = await page.evaluate(() => ({
  sw: document.documentElement.scrollWidth,
  cw: document.documentElement.clientWidth,
  bodyScrollWidth: document.body.scrollWidth,
  bodyClientWidth: document.body.clientWidth,
}));

// warm reveals
await page.evaluate(async () => {
  const total = document.documentElement.scrollHeight;
  for (let y = 0; y < total; y += window.innerHeight * 0.6) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});

// horizontal scroll after full scroll
const hScrollCheck2 = await page.evaluate(() => ({
  sw: document.documentElement.scrollWidth,
  cw: document.documentElement.clientWidth,
}));

// toolkit top
await page.evaluate(() => document.getElementById("toolkit")?.scrollIntoView({ block: "start", behavior: "instant" }));
await page.waitForTimeout(800);
await page.screenshot({ path: "./.shots/tkv2/1-tk-top.png" });

// toolkit mid
await page.evaluate(() => {
  const el = document.getElementById("toolkit");
  if (el) window.scrollTo(0, el.offsetTop + 500);
});
await page.waitForTimeout(600);
await page.screenshot({ path: "./.shots/tkv2/2-tk-mid.png" });

// toolkit bottom
await page.evaluate(() => {
  const el = document.getElementById("toolkit");
  if (el) window.scrollTo(0, el.offsetTop + 1100);
});
await page.waitForTimeout(600);
await page.screenshot({ path: "./.shots/tkv2/3-tk-bottom.png" });

// selected mid — igelphone
await page.evaluate(() => {
  const el = document.getElementById("selected");
  if (el) window.scrollTo(0, el.offsetTop + 800);
});
await page.waitForTimeout(600);
await page.screenshot({ path: "./.shots/tkv2/4-sel-igel.png" });

console.log("hscroll at top:", hScrollCheck);
console.log("hscroll after full scroll:", hScrollCheck2);
console.log("errors:", errs.length, errs);

await browser.close();
