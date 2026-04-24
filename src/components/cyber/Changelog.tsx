import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type Entry = {
  version: string;
  date: string;
  tone: "cyan" | "mag" | "acid" | "amber";
  summary: string;
  bullets: string[];
};

const CHANGELOG: Entry[] = [
  {
    version: "v2026.04",
    date: "2026-04-23",
    tone: "acid",
    summary: "Case-study drawer, command palette, live feed, 404, full SEO pass.",
    bullets: [
      "Case-study drawer per project plate — click any card for deep dive",
      "Command palette (⌘K / /) with 1–8 section shortcuts and ? help",
      "NOW section: shipping / learning / reading / availability snapshot",
      "MissionRail sticky side rail with scroll-tracked node gradient",
      "Interactive terminal in BRIEF — type `help` for commands",
      "Themed 404 node-not-found page",
      "SEO: JSON-LD Person, OG/Twitter meta, sitemap, robots.txt",
      "Live GitHub stats in THE_LAB",
      "Count-up hero metrics · prefers-reduced-motion audit · focus-visible rings",
      "Plausible analytics script (swap domain or remove)",
    ],
  },
  {
    version: "v2026.03",
    date: "2026-04-22",
    tone: "cyan",
    summary: "HUD rebuild: decluttered nav + seamless terrain + tone-aware hover.",
    bullets: [
      "Nav: 2077 clip-path backplate, chevron CONTACT, stacked logotype",
      "HudBar: always-on bottom status bar with scroll progress + section tracker",
      "HeroScene terrain: periodic sin/cos wrap — no visible scroll reset",
      "HoloCard: tone-aware sheen (cyan/mag/acid/amber match card colour)",
    ],
  },
  {
    version: "v2026.02",
    date: "2026-04",
    tone: "mag",
    summary: "Anti-epileptic motion rework + holographic marketplace plates.",
    bullets: [
      "Reduced flash/flicker intensity across BootOverlay + glitch effects",
      "HolographicMarketplace: full rebuild of SELECTED_WORK plates",
      "ProjectDiagrams: per-project canvas watermarks",
    ],
  },
];

export function Changelog() {
  return (
    <section
      aria-label="Changelog"
      className="relative border-t border-rule py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1480px] px-4 md:px-7">
        <div className="flex items-end justify-between gap-4 mb-8" data-reveal>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan glow-cyan">
              {">>"} DOSSIER_LOG · CHANGELOG
            </div>
            <h2 className="mt-2 font-display uppercase text-2xl md:text-4xl text-bone leading-none tracking-tight">
              VERSION_HISTORY
            </h2>
          </div>
          <span className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
            {CHANGELOG.length} RELEASES · MOST_RECENT FIRST
          </span>
        </div>

        <ol className="space-y-2" data-reveal style={{ ["--reveal-delay" as any]: "120ms" }}>
          {CHANGELOG.map((e, i) => (
            <Release key={e.version} entry={e} defaultOpen={i === 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Release({ entry, defaultOpen }: { entry: Entry; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const tone =
    entry.tone === "cyan"
      ? "text-cyan glow-cyan"
      : entry.tone === "mag"
      ? "text-mag glow-mag"
      : entry.tone === "acid"
      ? "text-acid glow-acid"
      : "text-amber";
  const bg =
    entry.tone === "cyan"
      ? "bg-cyan"
      : entry.tone === "mag"
      ? "bg-mag"
      : entry.tone === "acid"
      ? "bg-acid"
      : "bg-amber";
  return (
    <li className="border border-rule-strong bg-deck/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex items-center gap-3 md:gap-5 w-full px-4 md:px-6 py-3 text-left hover:bg-deck/90 transition-colors"
      >
        {open ? (
          <ChevronDown className={`h-4 w-4 shrink-0 ${tone}`} />
        ) : (
          <ChevronRight className={`h-4 w-4 shrink-0 ${tone}`} />
        )}
        <span className={`font-mono text-[11px] uppercase tracking-[0.28em] num-tab shrink-0 ${tone}`}>
          {entry.version}
        </span>
        <span className={`h-1 w-1 ${bg} shrink-0`} />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade shrink-0 num-tab">
          {entry.date}
        </span>
        <span className="hidden md:inline text-ash text-[13px] truncate">
          {entry.summary}
        </span>
      </button>

      {open && (
        <ul className="px-4 md:px-6 pb-5 pl-12 md:pl-16 space-y-1.5">
          {entry.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-3 text-ash text-[13px] leading-relaxed text-pretty"
            >
              <span className={`mt-2 inline-block h-px w-2.5 shrink-0 ${bg}`} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
