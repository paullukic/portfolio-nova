import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:4173/", { waitUntil: "networkidle", timeout: 30000 });
await page.waitForTimeout(6000);
await page.keyboard.press("Escape");
await page.waitForTimeout(800);
// scroll to selected
await page.evaluate(() => document.getElementById("selected")?.scrollIntoView({ block: "start" }));
await page.waitForTimeout(1000);

const info = await page.evaluate(() => {
  const nav = document.querySelector("header");
  const navRect = nav?.getBoundingClientRect();
  const sel = document.getElementById("selected");
  const selRect = sel?.getBoundingClientRect();
  const navStyle = nav ? getComputedStyle(nav) : null;
  const mainStyle = getComputedStyle(document.querySelector("main"));
  return {
    scrollY: window.scrollY,
    navRect,
    selRect,
    navPosition: navStyle?.position,
    navTop: navStyle?.top,
    navZ: navStyle?.zIndex,
    mainTransform: mainStyle.transform,
    // Find all ancestors of nav with transform
    navParentTransform: (() => {
      let e = nav?.parentElement;
      const t = [];
      while (e) {
        const s = getComputedStyle(e);
        if (s.transform !== "none" || s.filter !== "none" || s.perspective !== "none" || s.willChange?.includes("transform")) {
          t.push({ tag: e.tagName, transform: s.transform, filter: s.filter, willChange: s.willChange });
        }
        e = e.parentElement;
      }
      return t;
    })(),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
