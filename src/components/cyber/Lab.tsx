import { motion } from "motion/react";
import { ArrowUpRight, Github, Shield, Terminal as TerminalIcon, MonitorSmartphone } from "lucide-react";
import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { GitHubStats } from "./GitHubStats";

type Tone = "cyan" | "mag" | "acid" | "amber";

export function Lab() {
  return (
    <section
      id="lab"
      className="relative py-28 md:py-40 border-t border-rule-strong overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-floor opacity-25" />
      <SectionWatermark number="06" side="right" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-mag glow-mag">
              &gt;&gt; AFTER_HOURS · SIDE_DOSSIERS
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-mag glow-mag italic">/</span>
              <DecodeOnView text="THE_LAB" durationMs={700} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">MODE</div>
              <div className="mt-1 text-bone text-lg">SIDE · ONGOING</div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">SCOPE</div>
              <div className="mt-1 text-cyan glow-cyan">TOOLING · RELICS · NOTES</div>
            </div>
          </div>
        </div>

        {/* GitHub live */}
        <div className="mb-6" data-reveal>
          <GitHubStats />
        </div>

        {/* broken grid — hero feature + tall side */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* COPILOT_TEMPLATE — hero card */}
          <Big
            tone="cyan"
            tag="ACTIVE"
            label="// OPEN_SOURCE · TOOLING"
            title="COPILOT_TEMPLATE"
            headline={<><span className="text-cyan italic">Reusable</span> AI-coding<br />config for any repo.</>}
            blurb="Drop-in workflow for Claude Code / VS Code Copilot / Cursor / Windsurf. Ships Plan→Propose→Apply→Review pipeline, 5 specialized agents with anti-hallucination guardrails, Claude Code lifecycle hooks (block generated edits, audit bash, scope warnings) and an optional SQLite code-graph MCP that replaces brute-force file searching with targeted queries."
            bullets={[
              "OpenSpec-driven change management — proposal / tasks / specs per change",
              "5 agents (Planner / Reviewer / Debugger / Verifier / Explore)",
              "Claude Code hooks: block-generated, log-bash, warn-scope, report-graph",
              "Code-graph MCP — SQLite dependency index, targeted queries over grep",
              "Template sync — updates propagate to every registered project on pull",
            ]}
            link="https://github.com/paullukic/copilot-template"
            linkLabel="OPEN_ON_GITHUB"
            icon={<Github className="h-3.5 w-3.5" />}
            span="col-span-12 lg:col-span-8"
          />

          {/* PAXHAX — tall side */}
          <Big
            tone="mag"
            tag="PUBLIC"
            label="// RED_TEAM · NOTES"
            title="PAXHAX"
            headline={<><span className="text-mag italic">Working</span> notebook<br />for attacks.</>}
            blurb="Penetration-testing exercises, tooling notes and responsible-disclosure write-ups. Backed by CompTIA PenTest+ and TryHackMe Jr. Penetration Tester."
            bullets={[
              "Lab write-ups — web, network, AD, binary",
              "Tooling snippets — Burp, nmap, ffuf, hashcat",
              "Responsible disclosure log",
            ]}
            link="https://paxhax.notion.site/Ethical-Hacking-14421d1a2d3a45dfbd9fd4dce407f9ee"
            linkLabel="OPEN_NOTEBOOK"
            icon={<Shield className="h-3.5 w-3.5" />}
            span="col-span-12 lg:col-span-4"
          />

          {/* Relics strip — frozen predecessors */}
          <div data-reveal className="col-span-12 mt-2">
            <div className="flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-fade">
              <span className="inline-block h-px w-6 bg-amber" />
              <span className="text-amber">//</span>
              RELICS · FROZEN_IN_TIME
              <span className="inline-block h-px w-6 bg-amber" />
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <Small
                tone="cyan"
                icon={<TerminalIcon className="h-3.5 w-3.5" />}
                label="OLD_TERMINAL"
                title="paullukic.com"
                note="Original site — kept on the wire as a relic."
                link="https://paullukic.com/"
              />
              <Small
                tone="amber"
                icon={<MonitorSmartphone className="h-3.5 w-3.5" />}
                label="GUI · WIN98"
                title="paullukic.com/gui"
                note="Windows 98 desktop reimagining."
                link="https://paullukic.com/gui/win98.html"
              />
              <Small
                tone="mag"
                icon={<TerminalIcon className="h-3.5 w-3.5" />}
                label="REACT · 2022"
                title="react.paullukic.com"
                note="Earlier React iteration, frozen in time."
                link="https://react.paullukic.com/"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Big({
  tone,
  tag,
  label,
  title,
  headline,
  blurb,
  bullets,
  link,
  linkLabel,
  icon,
  span,
}: {
  tone: Tone;
  tag: string;
  label: string;
  title: string;
  headline: React.ReactNode;
  blurb: string;
  bullets: string[];
  link: string;
  linkLabel: string;
  icon: React.ReactNode;
  span: string;
}) {
  const textCls = toneText(tone);
  const bgCls = toneBg(tone);

  return (
    <article
      data-reveal
      className={`${span} relative border border-rule-strong bg-deck/70 p-6 md:p-8 group transition-colors hover:border-${tone}/70 flex flex-col`}
    >
      <span className="corner-bracket tl" />
      <span className="corner-bracket tr" />
      <span className="corner-bracket bl" />
      <span className="corner-bracket br" />

      <div className="flex items-center justify-between gap-3">
        <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] ${textCls}`}>
          {icon}
          {label}
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-[0.22em] ${textCls} px-2 py-0.5 border ${toneBorder(tone)}`}>
          {tag}
        </span>
      </div>

      <h3 className="mt-5 font-display uppercase text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-bone">
        {headline}
      </h3>

      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
        {title}
      </div>

      <p className="mt-4 text-ash text-[13.5px] leading-relaxed text-pretty">
        {blurb}
      </p>

      <ul className="mt-5 space-y-2">
        {bullets.map((b, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: 0.06 * i, duration: 0.3 }}
            className="flex gap-3 text-[12.5px] leading-relaxed text-bone"
          >
            <span className={`mt-2 inline-block h-px w-3 shrink-0 ${bgCls}`} />
            <span>{b}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-auto pt-6 flex items-center justify-between gap-3 border-t border-rule">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={`clip-cta inline-flex items-center gap-2 px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.24em] font-bold ${bgCls} text-void hover:opacity-90 transition-opacity`}
        >
          {linkLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-fade">
          after_hours · solo
        </span>
      </div>
    </article>
  );
}

function Small({
  tone,
  label,
  title,
  note,
  link,
  icon,
}: {
  tone: Tone;
  label: string;
  title: string;
  note: string;
  link: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={`group col-span-12 md:col-span-4 relative flex flex-col gap-3 border border-rule-strong bg-void/50 p-5 transition-colors hover:border-${tone}/70`}
    >
      <span className="corner-bracket tl" />
      <span className="corner-bracket br" />
      <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] ${toneText(tone)}`}>
        {icon}
        {label}
      </div>
      <h4 className="font-display uppercase text-lg md:text-xl text-bone leading-tight tracking-tight">
        {title}
      </h4>
      <p className="text-ash text-[12.5px] text-pretty flex-1">{note}</p>
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
function toneBg(t: Tone) {
  return t === "cyan" ? "bg-cyan"
    : t === "mag" ? "bg-mag"
    : t === "acid" ? "bg-acid"
    : "bg-amber";
}
function toneBorder(t: Tone) {
  return t === "cyan" ? "border-cyan"
    : t === "mag" ? "border-mag"
    : t === "acid" ? "border-acid"
    : "border-amber";
}
