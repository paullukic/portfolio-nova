import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/drawer", { recursive: true, force: true });
await mkdir("./.shots/drawer", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
await page.waitForTimeout(5500);
await page.keyboard.press("Escape");
await page.waitForTimeout(700);

await page.evaluate(async () => {
  const total = document.documentElement.scrollHeight;
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < total; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});

await page.evaluate(() =>
  document.getElementById("selected")?.scrollIntoView({ block: "start", behavior: "instant" })
);
await page.waitForTimeout(400);

// click first plate (CYBERGRID)
const plates = await page.$$("#selected button[aria-label^='Open deep dive']");
for (let i = 0; i < Math.min(3, plates.length); i++) {
  await plates[i].click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `./.shots/drawer/drawer-${i + 1}.png`, fullPage: false });
  // scroll inside drawer
  await page.evaluate(() => {
    const aside = document.querySelector("aside[role='dialog']");
    if (aside) aside.scrollTop = 400;
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `./.shots/drawer/drawer-${i + 1}-scrolled.png`, fullPage: false });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
}

console.log("done");
await browser.close();
