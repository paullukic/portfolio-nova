import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/sections", { recursive: true, force: true });
await mkdir("./.shots/sections", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => m.type() === "error" && errs.push(`c: ${m.text()}`));

await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
await page.waitForTimeout(5500);
await page.keyboard.press("Escape");
await page.waitForTimeout(700);

// warm reveals
await page.evaluate(async () => {
  const total = document.documentElement.scrollHeight;
  for (let y = 0; y < total; y += window.innerHeight * 0.6) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});

const shoot = async (id, name) => {
  await page.evaluate((i) => document.getElementById(i)?.scrollIntoView({ block: "start", behavior: "instant" }), id);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `./.shots/sections/${name}.png`, fullPage: false });
};

await shoot("brief", "00-brief");
await shoot("selected", "01-selected");
await shoot("ledger", "02-ledger");
await shoot("now", "03-now");
await shoot("toolkit", "04-toolkit");
await shoot("lab", "05-lab");

console.log("errors:", errs.length, errs);
await browser.close();
