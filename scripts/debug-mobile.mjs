import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("ERR", e.message));
await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });
await page.addStyleTag({ content: `html, body { scroll-behavior: auto !important }` });
await page.waitForTimeout(5500);
await page.keyboard.press("Escape");
await page.waitForTimeout(700);

// warm
await page.evaluate(async () => {
  const total = document.documentElement.scrollHeight;
  for (let y = 0; y < total; y += window.innerHeight * 0.6) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
});

const info = await page.evaluate(() => {
  const sec = document.getElementById("selected");
  const plates = sec ? Array.from(sec.querySelectorAll("button[aria-label^='Open deep dive']")) : [];
  const rects = plates.map((p) => {
    const r = p.getBoundingClientRect();
    return {
      visible: r.width > 0 && r.height > 0,
      x: Math.round(r.left),
      y: Math.round(r.top),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  });
  return {
    sectionH: sec?.getBoundingClientRect().height,
    plateCount: plates.length,
    rects,
  };
});
console.log(JSON.stringify(info, null, 2));

// scroll to selected + 100
await page.evaluate(() => {
  const el = document.getElementById("selected");
  if (el) window.scrollTo(0, el.offsetTop + 300);
});
await page.waitForTimeout(400);
await page.screenshot({ path: "./.shots/mobile-debug-scroll300.png" });

await browser.close();
