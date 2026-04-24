// Generate public/og.png from public/og-template.html using Playwright.
// Run after `npm run build` (so /og-template.html is served) or against dev.
//   usage: URL=http://localhost:5174 node scripts/og.mjs
//   default: URL=http://localhost:4173 (vite preview)

import { chromium } from "playwright";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.URL || "http://localhost:4173";
const OUT = resolve(fileURLToPath(new URL("../public/og.png", import.meta.url)));

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(`${BASE}/og-template.html`, { waitUntil: "networkidle" });
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
