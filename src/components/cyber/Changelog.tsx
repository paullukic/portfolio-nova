import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { changelog as CHANGELOG, type ChangelogEntry as Entry } from "@/content/changelog";

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
      : entry.tone === "blood"
      ? "text-blood glow-blood"
      : "text-amber";
  const bg =
    entry.tone === "cyan"
      ? "bg-cyan"
      : entry.tone === "mag"
      ? "bg-mag"
      : entry.tone === "acid"
      ? "bg-acid"
      : entry.tone === "blood"
      ? "bg-blood"
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
