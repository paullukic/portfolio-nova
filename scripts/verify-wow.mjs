import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/wow", { recursive: true, force: true });
await mkdir("./.shots/wow", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(`err: ${e.message}`));

await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
await page.waitForTimeout(5500);
await page.keyboard.press("Escape");
await page.waitForTimeout(700);

// hero with parallax + scan line (parallax needs mouse input — move it)
await page.mouse.move(1100, 200);
await page.waitForTimeout(300);
await page.screenshot({ path: "./.shots/wow/01-hero-mouse-tr.png", fullPage: false });

await page.mouse.move(200, 700);
await page.waitForTimeout(300);
await page.screenshot({ path: "./.shots/wow/02-hero-mouse-bl.png", fullPage: false });

// scroll to selected section to capture entry sweep animation (not timed, may or may not catch)
await page.mouse.move(720, 450);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.evaluate(() => {
  const el = document.getElementById("selected");
  if (el) el.scrollIntoView({ block: "start" });
});
await page.waitForTimeout(300);
await page.screenshot({ path: "./.shots/wow/03-selected-entering.png", fullPage: false });

// open drawer — should show flash
await page.waitForTimeout(600);
const plate = await page.$("#selected button[aria-label^='Open deep dive']");
if (plate) {
  await plate.click();
  // catch mid-animation
  await page.waitForTimeout(120);
  await page.screenshot({ path: "./.shots/wow/04-drawer-mid-flash.png", fullPage: false });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "./.shots/wow/05-drawer-open.png", fullPage: false });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
}

console.log("errors:", errs.length, errs);
await browser.close();
