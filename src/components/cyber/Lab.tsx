import { ArrowUpRight, Terminal as TerminalIcon, MonitorSmartphone } from "lucide-react";
import { DecodeOnView } from "./GlitchText";
import { SectionDek } from "./SectionDek";
import { SectionWatermark } from "./SectionWatermark";
import { GitHubStats } from "./GitHubStats";
import { relics, type Relic } from "@/content/archive";

type Tone = Relic["tone"];

export function Lab() {
  return (
    <section
      id="lab"
      className="relative py-28 md:py-40 border-t border-rule-strong overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-floor opacity-25" />
      <SectionWatermark number="07" side="right" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-mag glow-mag">
              &gt;&gt; AFTER_HOURS · RELICS
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-mag glow-mag italic">/</span>
              <DecodeOnView text="THE_LAB" durationMs={700} />
            </h2>
            <SectionDek id="lab" />
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">MODE</div>
              <div className="mt-1 text-bone text-lg">SIDE · ONGOING</div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">SCOPE</div>
              <div className="mt-1 text-cyan glow-cyan">GITHUB · ARCHIVES</div>
            </div>
          </div>
        </div>

        {/* GitHub live */}
        <div className="mb-10" data-reveal>
          <GitHubStats />
        </div>

        {/* Relics strip: every earlier portfolio, kept online */}
        <div data-reveal>
          <div className="flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-fade">
            <span className="inline-block h-px w-6 bg-amber" />
            <span className="text-amber">//</span>
            RELICS · EARLIER_BUILDS · FROZEN_IN_TIME
            <span className="inline-block h-px w-6 bg-amber" />
          </div>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {relics.map((r) => (
              <Small key={r.id} relic={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Small({ relic }: { relic: Relic }) {
  const Icon = relic.icon === "terminal" ? TerminalIcon : MonitorSmartphone;
  return (
    <a
      href={relic.link}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex flex-col gap-3 border border-rule-strong bg-void/50 p-5 transition-colors ${toneHoverBorder(relic.tone)}`}
    >
      <span className="corner-bracket tl" />
      <span className="corner-bracket br" />
      <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] ${toneText(relic.tone)}`}>
        <Icon className="h-3.5 w-3.5" />
        {relic.label}
      </div>
      <h3 className="font-mono text-[13px] text-bone leading-snug tracking-tight [overflow-wrap:anywhere]">
        {relic.title}
      </h3>
      <p className="text-ash text-[12.5px] text-pretty flex-1">{relic.note}</p>
      <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fade group-hover:text-bone transition-colors">
        VISIT
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </a>
  );
}

function toneText(t: Tone) {
  return t === "cyan" ? "text-cyan glow-cyan"
    : t === "mag" ? "text-mag glow-mag"
    : t === "acid" ? "text-acid glow-acid"
    : "text-amber";
}
function toneHoverBorder(t: Tone) {
  return t === "cyan" ? "hover:border-cyan/70"
    : t === "mag" ? "hover:border-mag/70"
    : t === "acid" ? "hover:border-acid/70"
    : "hover:border-amber/70";
}
