import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/nowv2", { recursive: true, force: true });
await mkdir("./.shots/nowv2", { recursive: true });

const browser = await chromium.launch();

for (const vp of [
  { w: 1440, h: 900, name: "desktop" },
  { w: 390, h: 844, name: "mobile", mob: true },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    hasTouch: vp.mob,
    isMobile: vp.mob,
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "html, body { scroll-behavior: auto !important }" });
  await page.waitForTimeout(5500);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(700);

  // hero — confirm no ticker
  await page.screenshot({ path: `./.shots/nowv2/${vp.name}-hero.png`, fullPage: false });

  // scroll to NOW
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += window.innerHeight * 0.6) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await page.evaluate(() => document.getElementById("now")?.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `./.shots/nowv2/${vp.name}-now-top.png`, fullPage: false });

  // scroll within
  await page.evaluate(() => {
    const el = document.getElementById("now");
    if (el) window.scrollTo(0, el.offsetTop + 400);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `./.shots/nowv2/${vp.name}-now-mid.png`, fullPage: false });

  console.log(vp.name, "errs:", errs.length, errs);
  await ctx.close();
}

await browser.close();
