import { Hammer, BookOpen, Headphones, Mail, ArrowRight, Code2 } from "lucide-react";
import { motion } from "motion/react";
import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { now } from "@/content/now";
import { profile, social } from "@/content/profile";

type Tone = "cyan" | "mag" | "acid" | "amber";

const SHIPPING = now.shipping;
const LEARNING = now.learning;
const READING = now.reading;
const ROLES = profile.openTo.map((r) => r.label);

export function Now() {
  const date = new Date();
  const stamp = now.asOf;
  const weekNum = Math.ceil(((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / 86400000 + new Date(date.getFullYear(), 0, 1).getDay() + 1) / 7);

  return (
    <section
      id="now"
      className="relative py-28 md:py-40 border-t border-rule overflow-hidden"
    >
      <SectionWatermark number="04" side="right" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-cyan glow-cyan">
              &gt;&gt; LIVE_FEED · THIS WEEK
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-mag glow-mag italic">/</span>
              <DecodeOnView text="NOW" durationMs={700} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">WEEK</div>
              <div className="mt-1 text-bone num-tab text-lg">{String(weekNum).padStart(2, "0")} / 52</div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">SNAPSHOT</div>
              <div className="mt-1 text-acid glow-acid num-tab">{stamp}</div>
            </div>
          </div>
        </div>

        {/* broken grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* SHIPPING — wide hero card */}
          <article
            data-reveal
            className="col-span-12 lg:col-span-8 relative border border-cyan/30 bg-deck/70 p-6 md:p-10 group hover:border-cyan/70 transition-colors"
          >
            <span className="corner-bracket tl" />
            <span className="corner-bracket tr" />
            <span className="corner-bracket bl" />
            <span className="corner-bracket br" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan glow-cyan">
                <Hammer className="h-3.5 w-3.5" />
                // SHIPPING
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
                <span className="h-2 w-2 rounded-full bg-acid pulse-soft" />
                {SHIPPING.filter(s => s.active).length} ACTIVE
              </div>
            </div>

            <h3 className="mt-6 font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.9] tracking-tight text-bone">
              Building things
              <br />
              <span className="text-cyan glow-cyan italic">that ship.</span>
            </h3>

            <ul className="mt-8 space-y-2">
              {SHIPPING.map((s, i) => (
                <motion.li
                  key={s.k}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="flex items-center justify-between gap-4 border-b border-rule py-3 group/item"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`inline-block h-1.5 w-1.5 shrink-0 ${s.active ? "bg-acid" : "bg-fade"}`} />
                    <span className="font-display uppercase text-lg md:text-xl tracking-tight text-bone truncate">
                      {s.k}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fade group-hover/item:text-cyan transition-colors">
                    {s.v}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-fade">
              <span className="text-cyan">$</span> daily_commits · CET · GIT_ONLY
            </div>
          </article>

          {/* LEARNING — tall sidebar with bars */}
          <article
            data-reveal
            className="col-span-12 md:col-span-6 lg:col-span-4 relative border border-mag/30 bg-deck/70 p-6 md:p-7 group hover:border-mag/70 transition-colors"
          >
            <span className="corner-bracket tl" />
            <span className="corner-bracket br" />

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-mag glow-mag">
              <BookOpen className="h-3.5 w-3.5" />
              // LEARNING
            </div>

            <h3 className="mt-4 font-display uppercase text-3xl md:text-4xl leading-[0.95] tracking-tight text-bone">
              <span className="text-mag glow-mag italic">Sharpening</span>
              <br />edges.
            </h3>

            <ul className="mt-6 space-y-4">
              {LEARNING.map((l, i) => (
                <motion.li
                  key={l.k}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  className="flex items-center gap-3 border-b border-rule py-2.5"
                >
                  <span className={`inline-block h-1.5 w-1.5 shrink-0 ${toneBg(l.tone)}`} />
                  <span className="font-display uppercase text-base md:text-lg tracking-tight text-bone">
                    {l.k}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-fade">
              ~1h/day · evenings
            </div>
          </article>

          {/* READING — stack of book cards */}
          <article
            data-reveal
            className="col-span-12 md:col-span-6 lg:col-span-5 relative border border-acid/30 bg-deck/70 p-6 md:p-7 group hover:border-acid/70 transition-colors"
          >
            <span className="corner-bracket tr" />
            <span className="corner-bracket bl" />

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-acid glow-acid">
              <Headphones className="h-3.5 w-3.5" />
              // ON THE STACK
            </div>

            <ul className="mt-5 space-y-3">
              {READING.map((r, i) => (
                <motion.li
                  key={r.k}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  className="flex items-start justify-between gap-4 border-l-2 border-acid/50 pl-4 py-1"
                >
                  <div className="min-w-0">
                    <div className="font-display uppercase text-base md:text-lg leading-tight tracking-tight text-bone">
                      {r.k}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
                      {r.author}
                    </div>
                  </div>
                  <div
                    className={`shrink-0 font-mono text-[9px] uppercase tracking-[0.22em] ${
                      r.status === "Finished" ? "text-fade" : r.status === "Re-read" ? "text-cyan" : "text-acid glow-acid"
                    }`}
                  >
                    {r.status}
                  </div>
                </motion.li>
              ))}
            </ul>
          </article>

          {/* AVAILABILITY — CTA card (amber) */}
          <a
            href={social.email.href}
            data-reveal
            className="col-span-12 lg:col-span-7 relative border border-amber/30 bg-deck/70 p-6 md:p-8 group hover:border-amber/70 transition-all flex flex-col justify-between min-h-[240px] overflow-hidden"
          >
            <span className="corner-bracket tl" />
            <span className="corner-bracket br" />

            {/* diagonal scan on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(135deg, transparent 40%, rgba(255,180,0,0.12) 50%, transparent 60%)",
              }}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-amber">
                <Mail className="h-3.5 w-3.5" />
                // AVAILABILITY
              </div>
              <span className="h-2 w-2 rounded-full bg-amber pulse-soft" />
            </div>

            <div className="my-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade mb-3">
                OPEN TO:
              </div>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <span
                    key={r}
                    className="clip-tag px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-amber bg-amber/10 border border-amber/30"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="font-display uppercase text-2xl md:text-3xl leading-tight tracking-tight text-bone">
                  Reply in <span className="text-amber">24h</span>.
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-fade">
                  {profile.email}
                </div>
              </div>
              <span className="clip-cta shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-amber text-void font-mono text-[11px] uppercase tracking-[0.24em] font-bold group-hover:translate-x-1 transition-transform">
                GET_IN
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>

          {/* TODAY inline strip — short text marker */}
          <aside
            data-reveal
            className="col-span-12 relative border border-rule-strong bg-void/60 px-5 py-4 flex items-center gap-4 overflow-hidden"
          >
            <div className="shrink-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan glow-cyan">
              <Code2 className="h-3.5 w-3.5" />
              TODAY
            </div>
            <span className="shrink-0 h-4 w-px bg-rule-strong" />
            <p className="font-display text-base md:text-lg text-bone leading-snug italic">
              <span className="text-mag glow-mag">✶</span> {now.today}
            </p>
          </aside>
        </div>

        <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fade">
          <span className="text-acid glow-acid">●</span> LIVE · hand-kept · outdated entries
          are a bug — <a className="underline underline-offset-2 hover:text-cyan" href={social.email.href}>ping me if you spot one</a>.
        </p>
      </div>
    </section>
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
