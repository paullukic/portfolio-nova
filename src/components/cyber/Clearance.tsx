import { lazy, Suspense } from "react";
import { ArrowUpRight, Lock, Shield, ShieldAlert } from "lucide-react";
import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { certs, offensiveToolkit, paxhax } from "@/content/certs";

const BlackwallField = lazy(() => import("./BlackwallField"));

// SECURITY_CLEARANCE: certs, PaxHax and the offensive toolkit from cyberpunk
// v2, sitting on v2's Blackwall shader.
export function Clearance() {
  return (
    <section
      id="clearance"
      className="relative py-28 md:py-40 border-t border-blood/40 overflow-hidden bg-void"
    >
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <BlackwallField className="absolute inset-0" />
        </Suspense>
      </div>
      {/* keep text readable over the wall */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,7,0.88)_0%,rgba(5,5,7,0.55)_50%,rgba(5,5,7,0.15)_100%)]" />
      <SectionWatermark number="06" side="left" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-blood glow-blood">
              &gt;&gt; SECURITY_CLEARANCE · BLACKWALL_PROXY DETECTED
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-blood glow-blood italic">/</span>
              <DecodeOnView text="CLEARANCE" durationMs={700} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">ICE_BREAKER</div>
              <div className="mt-1 text-blood glow-blood">ACTIVE</div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">CERTS</div>
              <div className="mt-1 text-bone num-tab text-lg">{String(certs.length).padStart(2, "0")}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* certs */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 md:gap-6">
            {certs.map((c, i) => (
              <a
                key={c.id}
                href={c.link}
                target="_blank"
                rel="noreferrer"
                data-reveal
                className="group relative flex items-start gap-4 border border-blood/40 bg-void/80 backdrop-blur-sm p-5 md:p-6 transition-colors hover:border-blood"
              >
                <span className="corner-bracket tl" />
                <span className="corner-bracket br" />
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-blood/60 text-blood">
                  {i === 0 ? <ShieldAlert className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display uppercase text-xl md:text-2xl text-bone leading-tight tracking-tight">
                    {c.title}
                  </h3>
                  <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-blood">
                    {c.issuer} · {c.scope}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ash transition-all group-hover:text-blood group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}

            <div data-reveal className="relative border border-rule-strong bg-void/80 backdrop-blur-sm p-5 md:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-blood">
                // OFFENSIVE_TOOLKIT
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {offensiveToolkit.map((t) => (
                  <li
                    key={t}
                    className="clip-tag px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-blood bg-blood/10 border border-blood/30"
                  >
                    #{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* paxhax */}
          <article
            data-reveal
            className="col-span-12 lg:col-span-7 relative border border-blood/40 bg-void/80 backdrop-blur-sm p-6 md:p-8 flex flex-col"
          >
            <span className="corner-bracket tl" />
            <span className="corner-bracket tr" />
            <span className="corner-bracket bl" />
            <span className="corner-bracket br" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-blood glow-blood">
                <Shield className="h-3.5 w-3.5" />
                // RED_TEAM · NOTES
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-blood px-2 py-0.5 border border-blood">
                PUBLIC
              </span>
            </div>
            <h3 className="mt-5 font-display uppercase text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-bone">
              <span className="text-blood italic">Working</span> notebook
              <br />
              for attacks.
            </h3>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fade">{paxhax.title}</div>
            <p className="mt-4 text-ash text-[13.5px] leading-relaxed text-pretty">{paxhax.blurb}</p>
            <ul className="mt-5 space-y-2">
              {paxhax.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[12.5px] leading-relaxed text-bone">
                  <span className="mt-2 inline-block h-px w-3 shrink-0 bg-blood" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6 flex items-center justify-between gap-3 border-t border-rule">
              <a
                href={paxhax.link}
                target="_blank"
                rel="noreferrer"
                className="clip-cta inline-flex items-center gap-2 px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.24em] font-bold bg-blood text-void hover:opacity-90 transition-opacity"
              >
                OPEN_NOTEBOOK
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-fade">
                pen-test · red team · disclosure
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
