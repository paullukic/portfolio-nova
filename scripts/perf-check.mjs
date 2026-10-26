// Runtime frame-rate check. Page-load tools (Lighthouse) can't see this: it
// scrolls the whole home page, then idles at the footer, timing every rAF
// frame with the CPU throttled 4x (roughly a mid-range laptop). It exists
// because the R3F hero once rendered every frame while off-screen and the
// project diagrams' SMIL animations kept invalidating style below the fold,
// which held the footer at 13-17 fps under this throttle (see openspec change
// 2026-10-26-hero-scene-fps).
//
//   node scripts/perf-check.mjs                       (serves dist/ via vite preview)
//   node scripts/perf-check.mjs --url https://paullukic.com/
//   node scripts/perf-check.mjs --runs 5 --throttle 4   (gate: median of runs)
//
// Runs headed system Chrome by default: the hero is WebGL, and headless
// software rendering would not measure the real GPU path.

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const PORT = 4180;

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : fallback;
};
const URL_ARG = arg("url");
const RUNS = Number(arg("runs", 5));
const THROTTLE = Number(arg("throttle", 4));
const MIN_IDLE_FPS = Number(arg("min-idle", 55));
const MIN_SCROLL_FPS = Number(arg("min-scroll", 45));
const HEADLESS = argv.includes("--headless");

const server = URL_ARG
  ? null
  : await preview({ root: ROOT, preview: { port: PORT, strictPort: true }, logLevel: "warn" });
const url = URL_ARG ?? `http://localhost:${PORT}/`;
// A fresh browser per run: WebGL contexts from earlier runs in the same
// browser process degrade later runs and make the numbers drift.
const launch = () =>
  chromium.launch({
    channel: process.env.PW_CHANNEL ?? "chrome",
    headless: HEADLESS,
    args: ["--window-size=1600,1000"],
  });

const results = [];
let browser;
try {
  for (let run = 0; run < RUNS; run++) {
    browser = await launch();
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
    // skip the once-per-session boot overlay; never count this as a visit
    await ctx.addInitScript(() => sessionStorage.setItem("pl-boot-seen", "1"));
    await ctx.route(/plausible\.io/, (route) => route.abort());
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: THROTTLE });

    const r = await page.evaluate(async () => {
      const fps = (a) => 1000 / (a.reduce((x, y) => x + y, 0) / a.length);
      const sample = (ms, onFrame) =>
        new Promise((done) => {
          const frames = [];
          const t0 = performance.now();
          let last = t0;
          const tick = (now) => {
            frames.push(now - last);
            last = now;
            const p = (now - t0) / ms;
            onFrame?.(p);
            if (p < 1) requestAnimationFrame(tick);
            else done(frames);
          };
          requestAnimationFrame(tick);
        });
      const heroCanvas = !!document.querySelector("#top canvas");
      const max = document.documentElement.scrollHeight - innerHeight;
      const scroll = await sample(10000, (p) => window.scrollTo(0, Math.min(1, p) * max));
      // let the footer's one-shot work (reveal sweeps, near-view GitHub fetch) finish
      await new Promise((r) => setTimeout(r, 1500));
      const idle = await sample(3000);
      return {
        heroCanvas,
        scrollFps: fps(scroll),
        longFrames: scroll.filter((d) => d > 33).length,
        idleFps: fps(idle),
      };
    });
    results.push(r);
    console.log(
      `run ${run + 1}: scroll ${r.scrollFps.toFixed(1)} fps (${r.longFrames} frames > 33 ms), ` +
        `footer idle ${r.idleFps.toFixed(1)} fps, hero canvas ${r.heroCanvas ? "mounted" : "absent"}`,
    );
    await browser.close();
    browser = undefined;
  }
} finally {
  await browser?.close();
  await server?.close();
}

// Median, not worst: other load on the machine skews single runs, while the
// regression this guards against drags every run down.
const median = (k) => {
  const v = results.map((r) => r[k]).sort((a, b) => a - b);
  return v.length % 2 ? v[(v.length - 1) / 2] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2;
};
const failures = [];
if (!results.every((r) => r.heroCanvas)) failures.push("hero canvas did not mount (is the window narrower than 900px?)");
if (median("idleFps") < MIN_IDLE_FPS) failures.push(`footer idle ${median("idleFps").toFixed(1)} fps < ${MIN_IDLE_FPS}`);
if (median("scrollFps") < MIN_SCROLL_FPS) failures.push(`scroll ${median("scrollFps").toFixed(1)} fps < ${MIN_SCROLL_FPS}`);

const summary = `median of ${RUNS} runs: scroll ${median("scrollFps").toFixed(1)} fps, footer idle ${median("idleFps").toFixed(1)} fps`;
if (failures.length) {
  console.error(`\nperf check FAILED (${THROTTLE}x CPU throttle, ${summary}):\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`\nperf check passed (${THROTTLE}x CPU throttle, ${summary})`);
