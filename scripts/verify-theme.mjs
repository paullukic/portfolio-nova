import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/themev2", { recursive: true, force: true });
await mkdir("./.shots/themev2", { recursive: true });

const browser = await chromium.launch();

for (const vp of [
  { w: 1440, h: 900, label: "desktop" },
  { w: 390, h: 844, label: "mobile", mob: true },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    hasTouch: vp.mob,
    isMobile: vp.mob,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.log(vp.label, "ERR", e.message));
  await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });
  await page.addStyleTag({
    content: `
      html, body { scroll-behavior: auto !important }
      .phosphor-trail { display: none !important }
      canvas { visibility: hidden !important }
      * { animation-duration: 0.001ms !important }
    `,
  });
  await page.waitForTimeout(5500);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(700);

  // warm + scroll to selected
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += window.innerHeight * 0.6) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
  });
  await page.evaluate(() =>
    document.getElementById("selected")?.scrollIntoView({ block: "start", behavior: "instant" })
  );
  // On mobile plates stack below meta — push further so plates are visible
  if (vp.mob) await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);

  for (const theme of ["neon", "blood", "matrix"]) {
    await page.evaluate((t) => {
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.waitForTimeout(300);
    try {
      await page.screenshot({
        path: `./.shots/themev2/${vp.label}-selected-${theme}.png`,
        timeout: 15000,
      });
      console.log(`✓ ${vp.label} selected ${theme}`);
    } catch (e) {
      console.log(`fail ${vp.label} selected ${theme}`, e.message);
    }
  }

  // Also snap hero in each theme
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  for (const theme of ["neon", "blood", "matrix"]) {
    await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, theme);
    await page.waitForTimeout(300);
    try {
      await page.screenshot({ path: `./.shots/themev2/${vp.label}-hero-${theme}.png`, timeout: 15000 });
      console.log(`✓ ${vp.label} hero ${theme}`);
    } catch (e) {
      console.log(`fail ${vp.label} hero ${theme}`, e.message);
    }
  }

  await ctx.close();
}
await browser.close();
