import { useEffect, useRef, useState } from "react";
import { Activity, Wifi, Cpu, Lock } from "lucide-react";
import { sections } from "@/content/sections";

const SECTIONS = sections;

export function HudBar() {
  const [time, setTime] = useState(() => fmt(new Date()));
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("top");
  const [signal, setSignal] = useState(94);

  // clock
  useEffect(() => {
    const id = setInterval(() => setTime(fmt(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  // jittery signal value (just for life)
  useEffect(() => {
    const id = setInterval(() => {
      setSignal((s) => {
        const next = s + (Math.random() - 0.5) * 4;
        return Math.max(70, Math.min(99, Math.round(next)));
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // scroll progress + active section tracking
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, top / max) : 0);

      let current = "top";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.45) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none select-none">
      {/* slim top bar — scroll progress, accent morphs with section */}
      <div className="relative h-[3px] bg-rule-strong/40">
        <div
          className="absolute inset-y-0 left-0 transition-[width,background] duration-300"
          style={{
            width: `${progress * 100}%`,
            background:
              "linear-gradient(90deg, var(--color-cyan), var(--color-mag), var(--section-accent, var(--color-acid)))",
          }}
        />
        <span
          className="absolute -top-[3px] h-[9px] w-[9px] -translate-x-1/2 transition-colors duration-300"
          style={{
            left: `${progress * 100}%`,
            background: "var(--section-accent, var(--color-acid))",
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
            boxShadow: "0 0 8px var(--section-accent, var(--color-acid))",
          }}
        />
      </div>

      {/* HUD strip */}
      <div
        className="pointer-events-auto bg-void/85 backdrop-blur-md border-t border-cyan/20"
        style={{
          clipPath:
            "polygon(0 0, 28px 6px, 100% 6px, 100% 100%, 0 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 md:px-7 h-9 font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
          <div className="flex items-center gap-3 md:gap-5 min-w-0">
            <span className="flex items-center gap-1.5 text-acid shrink-0">
              <Activity className="h-3 w-3 animate-pulse" />
              ONLINE
            </span>
            <span className="hidden sm:inline w-px h-3 bg-rule-strong shrink-0" />
            <span className="hidden sm:flex items-center gap-1.5 text-bone num-tab shrink-0">
              <Cpu className="h-3 w-3 text-cyan" />
              CORE 37.0°C
            </span>
            {/* SIGNAL + ICE are decoration; they give way to the full tracker at xl */}
            <span className="hidden md:inline xl:hidden w-px h-3 bg-rule-strong shrink-0" />
            <span className="hidden md:flex xl:hidden items-center gap-2 text-bone shrink-0">
              <Wifi className="h-3 w-3 text-cyan" />
              SIGNAL <SignalBars value={signal} />
              <span className="text-cyan num-tab">{signal}%</span>
            </span>
            <span className="hidden lg:inline xl:hidden w-px h-3 bg-rule-strong shrink-0" />
            <span className="hidden lg:flex xl:hidden items-center gap-1.5 text-mag shrink-0">
              <Lock className="h-3 w-3" />
              ICE PERM
            </span>
          </div>

          {/* center — compact tracker (sm-lg) */}
          {(() => {
            const activeIdx = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
            const activeSec = SECTIONS[activeIdx];
            return (
              <div className="flex xl:hidden items-center gap-2 shrink-0 text-[10px]">
                <span className="text-fade num-tab">
                  {String(activeIdx).padStart(2, "0")}/{String(SECTIONS.length - 1).padStart(2, "0")}
                </span>
                <span className="w-px h-3 bg-rule-strong" />
                <span className="text-acid glow-acid">{activeSec.label}</span>
              </div>
            );
          })()}

          {/* center — full tracker (xl+) */}
          <nav className="hidden xl:flex items-center gap-0.5 shrink-0">
            {SECTIONS.map((s, i) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`flex items-center gap-1.5 px-1.5 py-1 transition-colors ${
                    isActive
                      ? "text-acid glow-acid"
                      : "text-fade hover:text-bone"
                  }`}
                >
                  <span
                    className={`inline-block h-1 w-1 ${
                      isActive ? "bg-acid" : "bg-fade"
                    }`}
                  />
                  <span className="text-[9.5px]">
                    {String(i).padStart(2, "0")} {s.navLabel ?? s.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* right cluster */}
          <div className="flex items-center gap-3 md:gap-4 text-bone num-tab shrink-0">
            <span className="hidden md:inline text-mag">
              44.81N · 19.83E
            </span>
            <span className="hidden md:inline w-px h-3 bg-rule-strong" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalBars({ value }: { value: number }) {
  const bars = 5;
  const filled = Math.round((value / 100) * bars);
  return (
    <span className="inline-flex items-end gap-[1.5px]" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-[2px] ${i < filled ? "bg-cyan" : "bg-rule-strong"}`}
          style={{ height: `${4 + i * 1.5}px` }}
        />
      ))}
    </span>
  );
}

function fmt(d: Date) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
