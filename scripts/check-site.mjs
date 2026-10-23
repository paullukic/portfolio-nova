// Guardrails for content and the built site.
//
//   node scripts/check-site.mjs            content + dist checks (TODO markers only warn)
//   node scripts/check-site.mjs --release  TODO(paul) markers fail: run before the apex cutover
//   node scripts/check-site.mjs --links    also fetch every outbound link in src/content
//
// Checks: TODO(paul) markers in src/content; no phone numbers in src/, public/
// or dist/; canonical, og:url, sitemap and robots point at https://paullukic.com/
// and nothing references paullukic.dev; outbound links answer 2xx/3xx.

import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const SITE = "https://paullukic.com/";
const args = new Set(process.argv.slice(2));
const release = args.has("--release");

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);
const warn = (msg) => warnings.push(msg);

async function walk(dir, exts) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const p = join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) out.push(...(await walk(p, exts)));
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const rel = (p) => p.slice(ROOT.length + 1).replaceAll("\\", "/");

// 1. TODO(paul) markers in content
for (const file of await walk(join(ROOT, "src/content"), [".ts"])) {
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, i) => {
    if (line.includes("TODO(paul)")) {
      (release ? fail : warn)(`${rel(file)}:${i + 1} ${line.trim()}`);
    }
  });
}

// 2. phone numbers anywhere we publish from
const PHONE = /(\+381|\b00381)[\s\d/-]{6,}|\+\d{2,3}[\s-]?\d{2,3}[\s-]?\d{3,4}[\s-]?\d{3,4}/;
for (const file of [
  ...(await walk(join(ROOT, "src"), [".ts", ".tsx", ".css"])),
  ...(await walk(join(ROOT, "public"), [".html", ".txt", ".xml", ".json"])),
  ...(await walk(join(ROOT, "dist"), [".html", ".js", ".txt", ".xml"])),
]) {
  const text = await readFile(file, "utf8");
  const m = text.match(PHONE);
  if (m) fail(`${rel(file)}: looks like a phone number: "${m[0]}"`);
}
for (const pdf of [...(await walk(join(ROOT, "public"), [".pdf"])), ...(await walk(join(ROOT, "dist"), [".pdf"]))]) {
  warn(`${rel(pdf)}: PDF ships with the site, check it by hand for personal data`);
}

// 3. SEO on the built output
const distIndex = join(ROOT, "dist/index.html");
let html = "";
try {
  html = await readFile(distIndex, "utf8");
} catch {
  warn("dist/index.html missing: run the build first to check SEO tags");
}
if (html) {
  const attr = (re) => html.match(re)?.[1];
  const canonical = attr(/<link rel="canonical" href="([^"]+)"/);
  const ogUrl = attr(/<meta property="og:url" content="([^"]+)"/);
  if (canonical !== SITE) fail(`canonical is ${canonical}, want ${SITE}`);
  if (ogUrl !== SITE) fail(`og:url is ${ogUrl}, want ${SITE}`);
  for (const file of await walk(join(ROOT, "dist"), [".html", ".xml", ".txt"])) {
    if ((await readFile(file, "utf8")).includes("paullukic.dev")) fail(`${rel(file)} references paullukic.dev`);
  }
  const sitemap = await readFile(join(ROOT, "dist/sitemap.xml"), "utf8").catch(() => "");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length || locs.some((l) => !l.startsWith(SITE))) fail(`sitemap locs must all start with ${SITE}: ${locs.join(", ")}`);
  const robots = await readFile(join(ROOT, "dist/robots.txt"), "utf8").catch(() => "");
  if (!robots.includes(`Sitemap: ${SITE}sitemap.xml`)) fail("robots.txt must point at the paullukic.com sitemap");
  if (!html.includes("WISEHOSTING") || !html.includes("METASPRY")) fail("dist/index.html is not prerendered (section text missing)");
}

// 4. outbound links (opt-in, needs network)
if (args.has("--links")) {
  // Hosts that block non-browser clients; a 403/999 from them is not a dead link.
  const BOT_WALLED = ["wisehosting.com", "linkedin.com"];
  const urls = new Set();
  for (const file of await walk(join(ROOT, "src/content"), [".ts"])) {
    for (const m of (await readFile(file, "utf8")).matchAll(/https:\/\/[^\s"'`)]+/g)) urls.add(m[0]);
  }
  const terminal = [...urls].filter((u) => u.includes("terminal.paullukic.com"));
  await Promise.all(
    [...urls].map(async (url) => {
      try {
        const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
        if (res.ok) return;
        const msg = `${url} -> HTTP ${res.status}`;
        if (BOT_WALLED.some((h) => url.includes(h))) warn(`${msg} (bot-walled host, check in a browser)`);
        else fail(msg);
      } catch (e) {
        const msg = `${url} -> ${e.cause?.code ?? e.name}`;
        // the terminal archive is expected to be offline until it is re-hosted
        if (terminal.includes(url)) warn(`${msg} (terminal archive not hosted yet)`);
        else fail(msg);
      }
    }),
  );
}

for (const w of warnings) console.log(`warn  ${w}`);
for (const f of failures) console.log(`FAIL  ${f}`);
console.log(failures.length ? `\n${failures.length} check(s) failed` : `\nsite checks passed (${warnings.length} warning(s))`);
process.exit(failures.length ? 1 : 0);
