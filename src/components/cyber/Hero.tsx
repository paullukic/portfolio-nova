import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDownRight, Wifi, Cpu, Shield, Zap } from "lucide-react";
import { m as motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { GlitchText, DecodeText, DecodeOnView } from "./GlitchText";
import { MobileHeroBg } from "./MobileHeroBg";
import { EffectBoundary } from "./EffectBoundary";
import { HeroParallax } from "./HeroParallax";
import { Magnetic } from "./Magnetic";
import { profile } from "@/content/profile";

const HeroScene = lazy(() => import("./HeroScene"));

type Stat = {
  n: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
  label: string;
};

const STATS: readonly Stat[] = profile.stats;

const TONE_TEXT = {
  cyan: "text-cyan",
  mag: "text-mag",
  acid: "text-acid",
  amber: "text-amber",
  blood: "text-blood",
} as const;

export function Hero() {
  const heavy = useHeavy();
  const sceneRef = useRef<HTMLDivElement>(null);
  const sceneActive = useOnScreenAndVisible(sceneRef);

  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden grain"
    >
      {/* 3D scene OR mobile fallback */}
      <div ref={sceneRef} className="absolute inset-0 z-0">
        {heavy ? (
          <EffectBoundary fallback={<MobileHeroBg />}>
            <Suspense fallback={<MobileHeroBg />}>
              <HeroScene active={sceneActive} />
            </Suspense>
          </EffectBoundary>
        ) : (
          <MobileHeroBg />
        )}
        {/* fade scene at edges (radial only — bottom fade replaced by ticker) */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.85)_85%)]" />
      </div>

      {/* faint grid overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] grid-floor opacity-[0.45]" />

      {/* HUD chrome */}
      <Hud />

      {/* content */}
      <HeroParallax />
      <div className="relative z-10 mx-auto grid max-w-[1480px] grid-cols-12 gap-x-6 px-4 md:px-7 pt-24 pb-28 sm:pt-28 md:pt-36 lg:pt-44 md:pb-24 lg:pb-40">
        {/* left meta */}
        {/* below lg the name leads and the meta fields follow it */}
        <aside className="order-2 lg:order-none col-span-12 lg:col-span-3 mt-12 lg:mt-0 grid grid-cols-2 gap-x-6 gap-y-7 lg:block lg:space-y-7 reveal">
          <Field label="DESIGNATION">{profile.designation}</Field>
          <Field label="HOME_NODE">{profile.homeNode}</Field>
          <Field label="STACK">{profile.stackLine}</Field>
          <Field label="STATUS">
            <span className="text-acid glow-acid">
              / OPEN_TO_ROLES · REPLY ≤ 24H
            </span>
          </Field>
        </aside>

        {/* center: NAME */}
        <div className="order-1 lg:order-none col-span-12 lg:col-span-9 reveal" style={{ animationDelay: "120ms" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-cyan glow-cyan">
            <span className="text-fade">{">>"}</span> SUBJECT_PROFILE.LOAD —{" "}
            <DecodeText text={profile.fileId} /> <span className="blink" />
          </p>

          <ScrollReactiveH1 />
          <h1 className="sr-only">{profile.name}, {profile.title}</h1>

          {/* spec sheet */}
          <div className="mt-10 grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-7 relative border border-rule-strong bg-deck/70 backdrop-blur-sm p-6 scan-sweep">
              <span className="corner-bracket tl" />
              <span className="corner-bracket tr" />
              <span className="corner-bracket bl" />
              <span className="corner-bracket br" />
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-cyan">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-acid pulse-soft" />
                  WIRE_BIO.TXT
                </span>
                <span className="text-fade">042/042 BYTES</span>
              </div>
              <p className="mt-4 font-display text-lg md:text-xl leading-snug text-bone text-pretty">
                {profile.title}. I build{" "}
                <span className="text-cyan glow-cyan">Java/Spring</span> backends and{" "}
                <span className="text-mag glow-mag">React/Svelte</span> frontends, and
                have shipped both since {profile.since}. By day I work on grid-scale
                energy software at{" "}
                <span className="text-acid glow-acid">
                  {profile.currently.org}/{profile.currently.product}
                </span>
                . After hours I run my own products:{" "}
                {profile.afterHours.slice(0, -1).join(", ")} and {profile.afterHours.at(-1)}.
                I also built and sold a Chrome extension. Mentor by default, ship by deadline.
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ash">
                Open to:{" "}
                {profile.openTo.map((r, i) => (
                  <span key={r.label}>
                    {i > 0 && " · "}
                    <span className={TONE_TEXT[r.tone]}>{r.label.toLowerCase()}</span>
                  </span>
                ))}
              </p>
            </div>

            <ul className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-px bg-rule-strong border border-rule-strong">
              {STATS.map((s, i) => (
                <li
                  key={s.label}
                  className="bg-deck p-4 md:p-5 scan-sweep"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <StatNum stat={s} delay={i * 180} />
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
                    {s.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic strength={0.25} radius={90}>
              <a
                href="#selected"
                className="group inline-flex items-center gap-3 border border-cyan bg-cyan/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan transition-colors hover:bg-cyan hover:text-void hover:border-cyan"
              >
                <Zap className="h-3.5 w-3.5" />
                ACCESS_PROJECTS
                <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3} radius={80}>
              <a
                href="#ledger"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-mag hover:text-bone glow-mag"
              >
                {">"} OPEN_CAREER.LOG
              </a>
            </Magnetic>
            <span className="ml-auto hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
              <Wifi className="h-3 w-3 text-acid" />
              LISTENING / {profile.email}
            </span>
          </div>
        </div>
      </div>

      {/* bottom indicator */}
      <a
        href="#brief"
        className="hidden sm:flex absolute bottom-28 lg:bottom-24 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-ash hover:text-cyan transition-colors"
      >
        <span>SCROLL_DEEPER</span>
        <span className="block h-8 w-px bg-gradient-to-b from-cyan to-transparent" />
      </a>

    </section>
  );
}

function ScrollReactiveH1() {
  // Map scroll velocity to letter spacing + subtle skew so the title feels
  // physical — fast scrolling stretches it, stopping snaps it back.
  const { scrollY } = useScroll();
  const v = useVelocity(scrollY);
  const vSmooth = useSpring(v, { damping: 30, stiffness: 180, mass: 0.5 });
  const letterSpacing = useTransform(vSmooth, [-2500, 0, 2500], ["-0.08em", "-0.03em", "0.06em"]);
  const skewX = useTransform(vSmooth, [-2500, 0, 2500], ["-2deg", "0deg", "2deg"]);
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      style={reduce ? undefined : { letterSpacing, skewX }}
      className="font-display mt-4 leading-[0.86] tracking-tighter text-bone uppercase will-change-transform"
    >
      <span className="block text-[15vw] sm:text-[13vw] md:text-[10vw] lg:text-[8.5rem] font-light">
        <DecodeOnView text={profile.first} durationMs={900} threshold={0.01} />
      </span>
      <span className="block text-[15vw] sm:text-[13vw] md:text-[10vw] lg:text-[8.5rem] font-light italic">
        <DecodeOnView
          text={profile.last}
          durationMs={1100}
          threshold={0.01}
          className="text-bone glow-cyan"
        />
        <sup className="ml-1.5 sm:ml-3 align-top text-[0.2em] sm:text-[0.22em] not-italic font-mono font-medium tracking-[0.14em] sm:tracking-[0.18em] text-mag glow-mag whitespace-nowrap">
          {profile.pronounce}
        </sup>
      </span>
    </motion.div>
  );
}

function StatNum({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVal(stat.n);
      done.current = true;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || done.current) continue;
          done.current = true;
          const start = performance.now() + delay;
          const dur = 1200;
          const tick = (now: number) => {
            const t = Math.min(1, Math.max(0, (now - start) / dur));
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(stat.n * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setVal(stat.n);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stat.n, delay]);

  const rounded = Math.round(val);
  const body = stat.pad ? String(rounded).padStart(stat.pad, "0") : rounded;
  return (
    <div
      ref={ref}
      className="font-zen text-3xl md:text-4xl lg:text-[clamp(1.5rem,2.2vw,2.25rem)] text-cyan glow-cyan num-tab leading-none whitespace-nowrap"
    >
      {stat.prefix}
      {body}
      {stat.suffix}
    </div>
  );
}

/**
 * True while the element intersects the viewport and the tab is visible.
 * Same gate BlackwallField uses for its own loop; HeroScene stops its
 * frameloop when this goes false.
 */
function useOnScreenAndVisible(ref: React.RefObject<HTMLElement | null>) {
  const [onScreen, setOnScreen] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // a fast scroll can deliver enter + leave in one batch: the last entry wins
    const io = new IntersectionObserver((entries) => setOnScreen(entries[entries.length - 1].isIntersecting));
    io.observe(el);
    const onVisibility = () => setTabVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);
  return onScreen && tabVisible;
}

function useHeavy() {
  const [heavy, setHeavy] = useState(false);
  useEffect(() => {
    const check = () => {
      const isCoarse = matchMedia("(hover: none)").matches;
      const isNarrow = window.innerWidth < 900;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      setHeavy(!isCoarse && !isNarrow && !reduced);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return heavy;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-cyan/60 pl-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
        {label}
      </div>
      <div className="mt-1.5 font-mono text-[12px] text-bone uppercase tracking-[0.1em]">
        {children}
      </div>
    </div>
  );
}

function Hud() {
  return (
    <>
      {/* top-right HUD chip */}
      <div className="hidden lg:block absolute top-16 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan border border-rule-strong bg-void/70 backdrop-blur-sm px-3 py-2 space-y-1">
        <div className="flex items-center gap-2">
          <Cpu className="h-3 w-3" /> CORE_TEMP{" "}
          <span className="text-acid">37.0°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-3 w-3" /> ICE{" "}
          <span className="text-mag">PERM</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="h-3 w-3 text-acid" /> NET{" "}
          <span className="text-bone">04 NODES</span>
        </div>
      </div>

      {/* bottom-left coordinates */}
      <div className="hidden lg:block absolute bottom-20 left-6 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-fade space-y-0.5">
        <div>VOL.III · ED.2026</div>
        <div className="text-cyan">FILE: {profile.fileId}</div>
        <div className="text-mag">BUILD: NEON.7</div>
      </div>

      {/* bottom-right HUD reticle */}
      <div className="hidden lg:flex absolute bottom-20 right-6 z-10 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
        <span>TARGET_LOCK</span>
        <span className="grid h-6 w-6 place-items-center border border-cyan">
          <span className="block h-1.5 w-1.5 bg-cyan glow-cyan" />
        </span>
      </div>
    </>
  );
}
