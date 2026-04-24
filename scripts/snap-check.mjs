import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

const URL = process.env.URL || "http://localhost:4173/";
const OUT = "./.shots/verify";
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

// DESKTOP
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
  await page.waitForTimeout(5000);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);

  // hero with new ticker
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/d-01-hero.png`, fullPage: false });

  // warm reveals
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight;
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);

  // scroll to selected, no-tilt verify
  await page.evaluate(() => document.getElementById("selected")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(400);
  // hover over a plate to confirm no tilt/translate
  const plate = await page.$("#selected button[aria-label^='Open deep dive']");
  if (plate) {
    const box = await plate.boundingBox();
    if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(300);
  }
  await page.screenshot({ path: `${OUT}/d-02-selected-hover.png`, fullPage: false });

  // scroll down to show Gastarbajter24 ONGOING
  await page.evaluate(() => {
    const el = document.getElementById("selected");
    if (el) window.scrollTo(0, el.offsetTop + 900);
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/d-03-gastarbajter.png`, fullPage: false });

  // scrolled nav behavior (on lg+ nav should be scrolled away; mission rail visible)
  await page.evaluate(() => document.getElementById("ledger")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/d-04-scrolled-no-nav.png`, fullPage: false });

  // nav hover decode — hover on work
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const navLink = await page.$("header nav a[href='#selected']");
  if (navLink) {
    const box = await navLink.boundingBox();
    if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(120); // mid-decode
    await page.screenshot({ path: `${OUT}/d-05-nav-hover-decode.png`, fullPage: false });
  }

  await ctx.close();
  console.log("✓ desktop");
}

// MOBILE
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    hasTouch: true,
    isMobile: true,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
  await page.waitForTimeout(5000);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/m-01-hero.png`, fullPage: false });

  await ctx.close();
  console.log("✓ mobile");
}

await browser.close();
console.log("done");
