import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/selhero", { recursive: true, force: true });
await mkdir("./.shots/selhero", { recursive: true });

const browser = await chromium.launch();

for (const vp of [
  { w: 1440, h: 900, label: "desktop" },
  { w: 768, h: 1024, label: "tablet" },
  { w: 390, h: 844, label: "mobile", mob: true },
]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    hasTouch: vp.mob,
    isMobile: vp.mob,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
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
  await page.waitForTimeout(500);
  try {
    await page.screenshot({ path: `./.shots/selhero/${vp.label}.png`, timeout: 15000 });
    console.log(`✓ ${vp.label}`);
  } catch (e) {
    console.log(`fail ${vp.label}`, e.message);
  }
  await ctx.close();
}
await browser.close();
