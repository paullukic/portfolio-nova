import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { experience } from "@/content/experience";
import type { Experience } from "@/content/types";

type Entry = Experience;
const ENTRIES = experience;

export function Ledger() {
  const first = ENTRIES[ENTRIES.length - 1]?.year ?? "2019";
  const latest = ENTRIES[0]?.year ?? "2026";

  return (
    <section
      id="ledger"
      className="relative py-28 md:py-40 border-t border-rule-strong bg-deck/40 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-floor opacity-30" />
      <SectionWatermark number="03" side="left" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* NOW-style kinetic header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-mag glow-mag">
              &gt;&gt; CAREER_LEDGER · WHERE I'VE BEEN
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-mag glow-mag italic">/</span>
              <DecodeOnView text="LEDGER" durationMs={700} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">ENTRIES</div>
              <div className="mt-1 text-bone num-tab text-lg">
                {String(ENTRIES.length).padStart(2, "0")}
              </div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">SPAN</div>
              <div className="mt-1 text-cyan glow-cyan num-tab">
                {first} → {latest}
              </div>
            </div>
          </div>
        </div>

        <div className="" role="list">
          {ENTRIES.map((e, i) => (
            <div
              key={i}
              role="listitem"
              data-reveal
              style={{ ["--reveal-delay" as any]: `${i * 80}ms` }}
            >
              <Row entry={e} index={i + 1} last={i === ENTRIES.length - 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  entry,
  index,
  last,
}: {
  entry: Entry;
  index: number;
  last: boolean;
}) {
  const tone =
    entry.tone === "cyan"
      ? { txt: "text-cyan", glow: "glow-cyan", bar: "bg-cyan", border: "border-cyan/50" }
      : entry.tone === "mag"
      ? { txt: "text-mag", glow: "glow-mag", bar: "bg-mag", border: "border-mag/50" }
      : entry.tone === "acid"
      ? { txt: "text-acid", glow: "glow-acid", bar: "bg-acid", border: "border-acid/50" }
      : entry.tone === "blood"
      ? { txt: "text-blood", glow: "glow-blood", bar: "bg-blood", border: "border-blood/50" }
      : { txt: "text-amber", glow: "", bar: "bg-amber", border: "border-amber/50" };

  return (
    <div
      className={`group relative grid grid-cols-12 gap-x-6 gap-y-4 py-10 md:py-12 ${
        last ? "" : "border-b border-rule"
      }`}
    >
      <span
        className={`absolute left-0 top-12 h-12 w-px ${tone.bar} opacity-0 group-hover:opacity-100 transition-opacity`}
      />

      <div className="col-span-12 md:col-span-3 lg:col-span-3 flex items-start gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade num-tab pt-3">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <div
            className={`font-zen text-4xl md:text-5xl ${tone.txt} ${tone.glow} leading-none num-tab`}
          >
            {entry.year}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fade whitespace-nowrap">
            {entry.span}
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-5 lg:col-span-4">
        <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone.txt}`}>
          ⌖ {entry.location ?? "REMOTE"}
        </div>
        <h3 className="mt-2 font-display uppercase text-3xl md:text-4xl lg:text-[2.6rem] text-bone leading-[0.96] tracking-tight break-words">
          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              className={`underline decoration-rule-strong underline-offset-[8px] decoration-1 hover:decoration-current hover:${tone.txt} transition-colors`}
            >
              {entry.org}
            </a>
          ) : (
            entry.org
          )}
        </h3>
        <p className={`mt-3 font-mono text-[11px] ${tone.txt} uppercase tracking-[0.2em]`}>
          // {entry.role}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {entry.stack.map((t) => (
            <li
              key={t}
              className={`border ${tone.border} bg-deck px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ash`}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <ul className="col-span-12 md:col-span-4 lg:col-span-5 space-y-3">
        {entry.highlights.map((h, j) => (
          <li
            key={j}
            className="flex gap-3 text-[14.5px] leading-relaxed text-ash text-pretty"
          >
            <span className={`mt-2 inline-block h-px w-3 shrink-0 ${tone.bar}`} />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
