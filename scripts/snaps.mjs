// Component-level screenshots bounded to viewport size (< 2000px per dim)
// so they fit within image-inspection limits.
//
//   URL=http://localhost:4173 node scripts/snaps.mjs

import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

const URL = process.env.URL || "http://localhost:4173/";
const OUT = "./.shots";

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

// ---------- DESKTOP ----------
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(`pageerror: ${e.message}`));
  page.on("console", (m) => m.type() === "error" && errs.push(`console: ${m.text()}`));

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  // kill smooth scroll so snaps land at expected scroll positions immediately
  await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
  // wait past boot sequence (~4.5s total) then ESC defensively
  await page.waitForTimeout(5000);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(800);

  // pre-scroll to warm reveals + IntersectionObservers
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight;
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });

  const shot = async (name) => {
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/desktop-${name}.png`, fullPage: false });
    console.log(`  · desktop-${name}`);
  };

  // hero (top)
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot("01-hero");

  // Press strip + brief
  await page.evaluate(() => document.getElementById("brief")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("02-brief");

  // scroll brief bottom half (capability grid)
  await page.evaluate(() => {
    const el = document.getElementById("brief");
    if (el) window.scrollTo(0, el.offsetTop + 700);
  });
  await shot("03-brief-lower");

  // Selected (work)
  await page.evaluate(() => document.getElementById("selected")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("04-selected-top");
  await page.evaluate(() => {
    const el = document.getElementById("selected");
    if (el) window.scrollTo(0, el.offsetTop + 700);
  });
  await shot("05-selected-mid");

  // open drawer on first plate
  try {
    const firstPlate = await page.$("#selected button[aria-label^='Open deep dive']");
    if (firstPlate) {
      await firstPlate.click();
      await page.waitForTimeout(700);
      await shot("06-drawer-open");
      await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
    }
  } catch (e) {
    console.log("drawer snap failed:", e.message);
  }

  // Ledger
  await page.evaluate(() => document.getElementById("ledger")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("07-ledger");

  // NOW
  await page.evaluate(() => document.getElementById("now")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("08-now");

  // Toolkit
  await page.evaluate(() => document.getElementById("toolkit")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("09-toolkit");

  // Lab (GitHub stats at top)
  await page.evaluate(() => document.getElementById("lab")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(1400); // wait for GH fetch
  await shot("10-lab");

  // Changelog
  await page.evaluate(() => {
    const logHeading = [...document.querySelectorAll("section")].find((s) =>
      s.getAttribute("aria-label") === "Changelog"
    );
    logHeading?.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await shot("11-changelog");

  // Footer
  await page.evaluate(() => document.getElementById("contact")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("12-footer");

  // Command palette — dispatch key events directly to avoid focus issues
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "/", bubbles: true }));
  });
  await page.waitForTimeout(600);
  await shot("13-palette");
  await page.evaluate(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  });
  await page.waitForTimeout(300);

  // palette in ? mode
  await page.evaluate(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "?", bubbles: true }));
  });
  await page.waitForTimeout(600);
  await shot("14-palette-help");
  await page.evaluate(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  });
  await page.waitForTimeout(300);

  // 404
  await page.goto(`${URL}no-such-path`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await shot("15-404");

  await ctx.close();
  console.log(`✓ desktop ${errs.length ? `(${errs.length} errs)` : ""}`);
  errs.forEach((e) => console.log("   •", e));
}

// ---------- MOBILE ----------
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    hasTouch: true,
    isMobile: true,
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(`pageerror: ${e.message}`));

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
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
    await new Promise((r) => setTimeout(r, 500));
  });

  const shot = async (name) => {
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/mobile-${name}.png`, fullPage: false });
    console.log(`  · mobile-${name}`);
  };

  await shot("01-hero");

  // mobile nav drawer
  const hamb = await page.$("header button[aria-label*='Open menu']");
  if (hamb) {
    await hamb.click();
    await page.waitForTimeout(500);
    await shot("02-nav-drawer");
    await hamb.click();
    await page.waitForTimeout(400);
  }

  await page.evaluate(() => document.getElementById("brief")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("03-brief");

  await page.evaluate(() => document.getElementById("selected")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("04-selected");

  await page.evaluate(() => document.getElementById("now")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("05-now");

  await page.evaluate(() => document.getElementById("toolkit")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("06-toolkit");

  await page.evaluate(() => document.getElementById("lab")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(1200);
  await shot("07-lab");

  await page.evaluate(() => document.getElementById("contact")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await shot("08-footer");

  await ctx.close();
  console.log(`✓ mobile ${errs.length ? `(${errs.length} errs)` : ""}`);
  errs.forEach((e) => console.log("   •", e));
}

await browser.close();
console.log("done");
