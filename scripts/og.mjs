// Generate public/og.png from scripts/og-template.html using Playwright.
//   usage: node scripts/og.mjs

import { chromium } from "playwright";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const TEMPLATE = new URL("./og-template.html", import.meta.url).href;
const OUT = resolve(fileURLToPath(new URL("../public/og.png", import.meta.url)));

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL });
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(TEMPLATE, { waitUntil: "networkidle" });
// wait a beat for fonts
await page.waitForTimeout(800);
await page.screenshot({
  path: OUT,
  type: "png",
  clip: { x: 0, y: 0, width: 1200, height: 630 },
});
await ctx.close();
await browser.close();
console.log(`✓ wrote ${OUT}`);
