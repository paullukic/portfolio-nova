// Full audit: snaps + console errors + layout checks.
import { chromium } from "playwright";
import { mkdir, rm, writeFile } from "node:fs/promises";

const URL = process.env.URL || "http://localhost:4173/";
const OUT = "./.shots/audit";
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const report = { errors: [], warnings: [], checks: {} };

// DESKTOP
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => report.errors.push(`desktop pageerror: ${e.message}`));
  page.on("console", (m) => {
    const t = m.type();
    if (t === "error") report.errors.push(`desktop console.error: ${m.text()}`);
    else if (t === "warning") report.warnings.push(`desktop console.warn: ${m.text()}`);
  });
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
  await page.waitForTimeout(5500);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(700);

  // Check boot drift — scrollY should still be 0 after boot
  report.checks.afterBootScrollY = await page.evaluate(() => window.scrollY);

  // pre-scroll to warm reveals
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

  const shot = async (name, scrollToId, offsetY = 0) => {
    if (scrollToId) {
      await page.evaluate(
        ({ id, off }) => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ block: "start", behavior: "instant" });
            if (off) window.scrollBy(0, off);
          }
        },
        { id: scrollToId, off: offsetY }
      );
      await page.waitForTimeout(600);
    }
    await page.screenshot({ path: `${OUT}/d-${name}.png`, fullPage: false });
  };

  await shot("01-hero", null);
  await shot("02-brief", "brief", 300);
  await shot("03-selected", "selected", 300);
  await shot("04-ledger", "ledger", 200);
  await shot("05-now", "now", 100);
  await shot("06-toolkit", "toolkit", 100);
  await shot("07-lab", "lab", 100);
  await shot("08-footer", "contact", 300);

  // Layout checks — overflow/overlap detection
  report.checks.bodyOverflowX = await page.evaluate(() => {
    const bodyRect = document.body.getBoundingClientRect();
    return { bodyWidth: bodyRect.width, innerWidth: window.innerWidth };
  });

  // Check that no element wider than viewport
  report.checks.overflowingElements = await page.evaluate(() => {
    const vw = window.innerWidth;
    const offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width < vw * 2) {
        const tag = el.tagName.toLowerCase();
        const cls = (el.className || "").toString().slice(0, 60);
        offenders.push(`${tag}.${cls} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
      }
    });
    return offenders.slice(0, 8);
  });

  await ctx.close();
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
  page.on("pageerror", (e) => report.errors.push(`mobile pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") report.errors.push(`mobile console.error: ${m.text()}`);
  });
  await page.goto(URL, { waitUntil: "networkidle" });
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
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);

  const mShot = async (name, scrollToId) => {
    if (scrollToId) {
      await page.evaluate((id) => {
        document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
      }, scrollToId);
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: `${OUT}/m-${name}.png`, fullPage: false });
  };

  await mShot("01-hero", null);
  await mShot("02-brief", "brief");
  await mShot("03-selected", "selected");
  await mShot("04-ledger", "ledger");
  await mShot("05-now", "now");
  await mShot("06-toolkit", "toolkit");
  await mShot("07-lab", "lab");
  await mShot("08-footer", "contact");

  // Mobile overflow check
  report.checks.mobileOverflowingElements = await page.evaluate(() => {
    const vw = window.innerWidth;
    const offenders = [];
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width < vw * 2) {
        const tag = el.tagName.toLowerCase();
        const cls = (el.className || "").toString().slice(0, 60);
        offenders.push(`${tag}.${cls} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
      }
    });
    return offenders.slice(0, 8);
  });

  await ctx.close();
}

await browser.close();
await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
