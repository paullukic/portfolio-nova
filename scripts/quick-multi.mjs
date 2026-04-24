import { chromium } from "playwright";
import { mkdir, rm } from "node:fs/promises";

await rm("./.shots/wow3", { recursive: true, force: true });
await mkdir("./.shots/wow3", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.log("ERR", e.message));

await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });
await page.addStyleTag({
  content: `
    html, body { scroll-behavior: auto !important }
    .phosphor-trail { display: none !important }
    canvas { visibility: hidden !important }
    .animate-ticker, .marquee, .marquee-rev { animation: none !important }
    * { transition: none !important; animation-duration: 0.001ms !important }
  `,
});
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

// theme default
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
try {
  await page.screenshot({ path: "./.shots/wow3/01-neon.png", timeout: 15000 });
} catch (e) { console.log("fail 01", e.message); }

// click theme switcher twice → matrix
const tBtn = await page.$("button[aria-label^='Switch theme']");
if (tBtn) {
  await tBtn.click(); await page.waitForTimeout(300); // blood
  try { await page.screenshot({ path: "./.shots/wow3/02-blood.png", timeout: 15000 }); } catch (e) { console.log("fail 02", e.message); }
  await tBtn.click(); await page.waitForTimeout(300); // matrix
  try { await page.screenshot({ path: "./.shots/wow3/03-matrix.png", timeout: 15000 }); } catch (e) { console.log("fail 03", e.message); }
  await tBtn.click(); await page.waitForTimeout(300); // back to neon
}

// scroll to Selected — should be horizontal pinned
await page.evaluate(() => document.getElementById("selected")?.scrollIntoView({ block: "start", behavior: "instant" }));
await page.waitForTimeout(500);
try { await page.screenshot({ path: "./.shots/wow3/04-sel-start.png", timeout: 15000 }); } catch (e) { console.log("fail 04", e.message); }

// scroll further to drive horizontal movement
await page.evaluate(() => window.scrollBy(0, 900));
await page.waitForTimeout(500);
try { await page.screenshot({ path: "./.shots/wow3/05-sel-mid.png", timeout: 15000 }); } catch (e) { console.log("fail 05", e.message); }
await page.evaluate(() => window.scrollBy(0, 1200));
await page.waitForTimeout(500);
try { await page.screenshot({ path: "./.shots/wow3/06-sel-end.png", timeout: 15000 }); } catch (e) { console.log("fail 06", e.message); }

console.log("done");
await browser.close();
