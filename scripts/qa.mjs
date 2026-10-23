// Local QA pass against a running server (default: `npm run preview` on 4173).
// Drives every section and interactive piece, collects console errors,
// failed requests and layout problems, and writes screenshots to .shots/qa/.
//
//   npm run preview &   then   PW_CHANNEL=chrome node scripts/qa.mjs
//   URL=http://localhost:5173 node scripts/qa.mjs     (against `npm run dev`)

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const BASE = (process.env.URL || "http://localhost:4173").replace(/\/$/, "");
const OUT = ".shots/qa";
await mkdir(OUT, { recursive: true });

const SECTIONS = ["top", "brief", "selected", "ledger", "now", "toolkit", "clearance", "lab", "contact"];
const NEW_PLATES = ["METASPRY", "DBUDDY", "LIFTORRA", "COOGRAPH"];

const problems = [];
const note = (scope, msg) => problems.push(`[${scope}] ${msg}`);

function watch(page, scope) {
  // GitHubStats falls back to static numbers when the unauthenticated API is
  // rate-limited (60 req/h); the browser still logs the 403, which is expected
  let githubLimited = false;
  page.on("response", (r) => {
    if (r.url().startsWith("https://api.github.com/") && r.status() === 403) githubLimited = true;
  });
  page.on("pageerror", (e) => note(scope, `pageerror: ${e.message}`));
  page.on("console", (m) => {
    // Plausible refuses to count localhost visits; that notice is expected locally
    if (/^Ignoring Event: localhost/.test(m.text())) return;
    if (githubLimited && /status of 403/.test(m.text())) return;
    if (m.type() === "error" || m.type() === "warning") note(scope, `console.${m.type()}: ${m.text()}`);
  });
  page.on("requestfailed", (r) => {
    const url = r.url();
    if (/plausible\.io/.test(url)) return;
    note(scope, `request failed: ${url} (${r.failure()?.errorText})`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(BASE)) note(scope, `HTTP ${r.status()} ${r.url()}`);
  });
}

async function waitBoot(page) {
  // boot overlay runs ~2.5s on a first visit; wait until the hero is interactive
  await page
    .waitForFunction(() => !/TO\s+SKIP/i.test(document.body.innerText), null, { timeout: 15000 })
    .catch(() => note("boot", "boot overlay never went away"));
  await page.waitForTimeout(600);
}

async function layoutChecks(page, scope) {
  const r = await page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth - window.innerWidth;
    const brokenImgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
    const deadAnchors = [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && h.length > 1 && !document.getElementById(h.slice(1)));
    const emptyLinks = [...document.querySelectorAll("a")].filter((a) => !a.getAttribute("href")).length;
    return { overflow, brokenImgs, deadAnchors: [...new Set(deadAnchors)], emptyLinks };
  });
  if (r.overflow > 1) note(scope, `horizontal overflow ${r.overflow}px`);
  if (r.brokenImgs.length) note(scope, `broken images: ${r.brokenImgs.join(", ")}`);
  if (r.deadAnchors.length) note(scope, `anchors without target: ${r.deadAnchors.join(", ")}`);
  if (r.emptyLinks) note(scope, `${r.emptyLinks} <a> without href`);
}

// The bottom HUD strip packs status, section tracker and clock into one row;
// its direct children must not overlap at any desktop width.
async function hudOverlap(page, scope) {
  const hits = await page.evaluate(() => {
    const row = document.querySelector(".fixed.inset-x-0.bottom-0 .mx-auto.flex");
    if (!row) return ["HUD row not found"];
    const kids = [...row.children].filter((el) => getComputedStyle(el).display !== "none");
    const boxes = kids.map((el) => el.getBoundingClientRect());
    const out = [];
    for (let i = 0; i < boxes.length - 1; i++) {
      if (boxes[i].right > boxes[i + 1].left + 1) out.push(`child ${i} overlaps child ${i + 1} by ${Math.round(boxes[i].right - boxes[i + 1].left)}px`);
    }
    return out;
  });
  for (const h of hits) note(scope, `HUD bar: ${h}`);
}

async function scrollSections(page, prefix) {
  for (const id of SECTIONS) {
    const el = page.locator(`#${id}`).first();
    if (!(await el.count())) {
      note(prefix, `section #${id} missing`);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/${prefix}-${id}.png` });
  }
}

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL });

// ── desktop, full motion ─────────────────────────────────────────────
{
  const scope = "desktop";
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  watch(page, scope);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${OUT}/desktop-00-boot.png` });
  await waitBoot(page);
  await page.screenshot({ path: `${OUT}/desktop-01-hero.png` });

  // custom cursor follows the mouse
  await page.mouse.move(700, 400);
  await page.mouse.move(720, 420, { steps: 5 });
  await page.waitForTimeout(300);

  await scrollSections(page, "desktop");
  await layoutChecks(page, scope);
  for (const width of [1440, 1280, 1100]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(300);
    await hudOverlap(page, `${scope}@${width}`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });

  // full page (reveals already triggered by the scroll pass)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true });

  // nav link: SEC -> #clearance
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.locator('header nav a[href="#clearance"]').first().click();
  await page.waitForTimeout(1500);
  const inView = await page.evaluate(() => {
    const r = document.getElementById("clearance").getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  });
  if (!inView) note(scope, "nav link SEC did not scroll to #clearance");

  // command palette: "/" opens, type + Enter jumps, Esc closes
  await page.keyboard.press("/");
  await page.waitForTimeout(400);
  const palette = page.locator('[role="dialog"][aria-label="Command palette"]');
  if (!(await palette.isVisible())) note(scope, "command palette did not open on /");
  else {
    await page.screenshot({ path: `${OUT}/desktop-palette.png` });
    await page.keyboard.type("lab");
    await page.waitForTimeout(200);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1500);
    const labTop = await page.evaluate(() => document.getElementById("lab").getBoundingClientRect().top);
    if (Math.abs(labTop) > 200) note(scope, `palette "lab" landed at top=${labTop}`);
  }
  if (await palette.isVisible()) note(scope, "command palette still open after running a command");

  // number shortcut 3 -> #selected
  await page.keyboard.press("3");
  await page.waitForTimeout(1500);
  const selTop = await page.evaluate(() => document.getElementById("selected").getBoundingClientRect().top);
  if (Math.abs(selTop) > 200) note(scope, `shortcut 3 landed #selected at top=${selTop}`);

  // case drawers for the new plates
  for (const title of NEW_PLATES) {
    const btn = page.locator(`button[aria-label="Open deep dive for ${title}"]`);
    if (!(await btn.count())) {
      note(scope, `plate ${title} missing`);
      continue;
    }
    await btn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const plate = btn.locator("xpath=..");
    const svg = await plate.locator("svg").count();
    if (!svg) note(scope, `plate ${title} has no diagram svg`);
    await plate.screenshot({ path: `${OUT}/plate-${title.toLowerCase()}.png` });
    await btn.click();
    const drawer = page.locator(`aside[role="dialog"][aria-label="${title}"]`);
    try {
      await drawer.waitFor({ state: "visible", timeout: 4000 });
      await page.waitForTimeout(600);
      const text = await drawer.innerText();
      if (!/PROBLEM|problem/i.test(text)) note(scope, `drawer ${title} shows no case study`);
      await page.screenshot({ path: `${OUT}/drawer-${title.toLowerCase()}.png` });
    } catch {
      note(scope, `drawer for ${title} did not open`);
    }
    await page.keyboard.press("Escape");
    await page.waitForTimeout(700);
    if (await drawer.isVisible()) note(scope, `drawer ${title} did not close on Escape`);
  }

  // BRIEF terminal
  const term = page.locator('input[aria-label="Terminal input"]');
  await page.locator("#brief").scrollIntoViewIfNeeded();
  await term.waitFor({ timeout: 6000 }).catch(() => note(scope, "terminal input never appeared"));
  if (await term.count()) {
    for (const cmd of ["help", "whoami", "ls projects", "ls stack", "cat wire_bio.txt", "contact", "sudo hire"]) {
      await term.fill(cmd);
      await term.press("Enter");
      await page.waitForTimeout(120);
    }
    const out = await page.locator("#brief").innerText();
    for (const expect of ["METASPRY", "LIFTORRA", "Full Stack Developer".toLowerCase(), "paul.lukic94@gmail.com"]) {
      if (!out.toLowerCase().includes(expect.toLowerCase())) note(scope, `terminal output missing "${expect}"`);
    }
    if (/command not found/.test(out)) note(scope, "terminal reported command not found");
    await page.locator("#brief").screenshot({ path: `${OUT}/desktop-terminal.png` });
  }

  // theme switcher cycles data-theme
  const themeBtn = page.locator('button[aria-label^="Switch theme"]');
  if (!(await themeBtn.count())) note(scope, "theme switcher missing");
  else {
    const before = await page.evaluate(() => document.documentElement.dataset.theme);
    await themeBtn.click();
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => document.documentElement.dataset.theme);
    if (before === after) note(scope, `theme switcher did not change theme (${before})`);
    await page.locator("#selected").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/desktop-theme-${after}.png` });
    // cycle back to default
    for (let i = 0; i < 5; i++) {
      if ((await page.evaluate(() => document.documentElement.dataset.theme)) === before) break;
      await themeBtn.click();
      await page.waitForTimeout(150);
    }
  }

  // ambient audio toggles (opt-in)
  const audio = page.locator('button[aria-label="Play ambient"]');
  if (await audio.count()) {
    await audio.click();
    await page.waitForTimeout(400);
    if (!(await page.locator('button[aria-label="Mute ambient"]').count())) note(scope, "audio toggle did not switch to mute");
    else await page.locator('button[aria-label="Mute ambient"]').click();
  } else note(scope, "ambient audio button missing");

  // konami -> matrix rain
  for (const k of ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]) {
    await page.keyboard.press(k);
  }
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/desktop-matrix.png` });

  // second load in the same session: boot overlay must not show again
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  if (await page.getByText("handshake complete").count()) note(scope, "boot overlay showed twice in one session");

  await ctx.close();
}

// ── 404 ───────────────────────────────────────────────────────────────
{
  const scope = "404";
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  watch(page, scope);
  for (const path of ["/does-not-exist", "/gui/nothing"]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    if (!(await page.getByText("SIGNAL_LOST").count())) note(scope, `${path} did not render the 404 page`);
  }
  await page.screenshot({ path: `${OUT}/404.png` });
  await page.locator('a[href="/"]').first().click();
  await page.waitForTimeout(1200);
  if (!(await page.locator("#selected").count())) note(scope, "RETURN_HOME did not load the home page");
  await ctx.close();
}

// ── mobile (touch, 390x844) ──────────────────────────────────────────
{
  const scope = "mobile";
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  watch(page, scope);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await waitBoot(page);
  await page.screenshot({ path: `${OUT}/mobile-01-hero.png` });
  await scrollSections(page, "mobile");
  await layoutChecks(page, scope);

  // hamburger menu
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const burger = page.locator('button[aria-label="Open menu"]');
  if (!(await burger.isVisible())) note(scope, "hamburger not visible");
  else {
    await burger.tap();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUT}/mobile-menu.png` });
    await page.locator('header a[href="#ledger"]').last().tap();
    await page.waitForTimeout(1500);
    const top = await page.evaluate(() => document.getElementById("ledger").getBoundingClientRect().top);
    if (Math.abs(top) > 250) note(scope, `menu link LEDGER landed at top=${top}`);
  }

  // drawer on mobile
  const btn = page.locator('button[aria-label="Open deep dive for LIFTORRA"]');
  await btn.scrollIntoViewIfNeeded();
  await btn.tap();
  const drawer = page.locator('aside[role="dialog"][aria-label="LIFTORRA"]');
  try {
    await drawer.waitFor({ state: "visible", timeout: 4000 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/mobile-drawer-liftorra.png` });
  } catch {
    note(scope, "drawer did not open on mobile");
  }
  await page.locator('button[aria-label="Close case study"]').tap().catch(() => note(scope, "close button not tappable"));
  await page.waitForTimeout(600);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/mobile-full.png`, fullPage: true });
  await ctx.close();
}

// ── reduced motion ───────────────────────────────────────────────────
{
  const scope = "reduced";
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  watch(page, scope);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  if (await page.getByText("handshake complete").count()) note(scope, "boot overlay shown under reduced motion");
  const cursor = await page.evaluate(() => !!document.querySelector(".z-\\[200\\].rounded-full"));
  await page.mouse.move(500, 500);
  await page.waitForTimeout(300);
  const cursorVisible = await page.evaluate(() => {
    const el = document.querySelector(".z-\\[200\\].rounded-full");
    return !!el && getComputedStyle(el).opacity !== "0" && el.getBoundingClientRect().width > 0 && el.style.transform !== "";
  });
  if (cursor && cursorVisible) note(scope, "custom cursor active under reduced motion");
  // velocity skew must stay off: scroll fast and read the hero name transform
  await page.mouse.wheel(0, 3000);
  await page.waitForTimeout(50);
  const skew = await page.evaluate(() => {
    const el = document.querySelector("#top [aria-hidden].font-display");
    return el ? getComputedStyle(el).transform : "none";
  });
  if (skew !== "none" && skew !== "matrix(1, 0, 0, 1, 0, 0)") note(scope, `hero name transformed under reduced motion: ${skew}`);
  await page.locator("#clearance").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/reduced-clearance.png` });
  const hidden = await page.evaluate(
    () => [...document.querySelectorAll("[data-reveal]")].filter((el) => getComputedStyle(el).opacity === "0").length,
  );
  if (hidden) note(scope, `${hidden} [data-reveal] blocks invisible under reduced motion`);
  await ctx.close();
}

// ── no JavaScript ────────────────────────────────────────────────────
{
  const scope = "nojs";
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`);
  const text = await page.locator("body").innerText();
  for (const expect of ["METASPRY", "WISEHOSTING", "CLEARANCE", "terminal.paullukic.com"]) {
    if (!text.includes(expect)) note(scope, `static HTML missing "${expect}"`);
  }
  await page.screenshot({ path: `${OUT}/nojs-hero.png` });
  await ctx.close();
}

await browser.close();

console.log(problems.length ? problems.map((p) => `• ${p}`).join("\n") : "no problems found");
console.log(`\nscreenshots: ${OUT}/`);
process.exit(problems.length ? 1 : 0);
