import { useEffect, useState } from "react";

type Readout = {
  k: string;
  tone: "cyan" | "mag" | "acid" | "amber" | "fade";
  get: (t: number) => string;
};

const READOUTS: Readout[] = [
  { k: "GPS", tone: "cyan", get: () => "44.81N · 19.83E · LOCK" },
  {
    k: "UPLINK",
    tone: "acid",
    get: (t) => `${(1.18 + Math.sin(t / 1700) * 0.12).toFixed(2)} GB/S`,
  },
  { k: "CPU", tone: "amber", get: (t) => `${(36.9 + Math.sin(t / 2100) * 0.5).toFixed(1)}°C` },
  { k: "NODES", tone: "cyan", get: () => "04 / 04 ACTIVE" },
  { k: "ENCRYPT", tone: "mag", get: () => "AES-256 · OK" },
  {
    k: "BUFFER",
    tone: "acid",
    get: (t) => `${Math.round(90 + Math.sin(t / 900) * 6)}%`,
  },
  { k: "ICE", tone: "mag", get: () => "PERM · AUTH_OK" },
  {
    k: "LATENCY",
    tone: "fade",
    get: (t) => `${Math.round(18 + Math.abs(Math.sin(t / 800) * 7))}ms`,
  },
  { k: "ROUTE", tone: "cyan", get: () => "/dev/grid ↔ NOVI_SAD" },
];

export function HeroTicker() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 180);
    return () => clearInterval(id);
  }, []);

  const t = tick * 180;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 md:bottom-11 z-[2]">
      {/* accent rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      {/* strip */}
      <div className="bg-deck/75 backdrop-blur-sm border-t border-cyan/20">
        <div className="relative mx-auto flex max-w-[1480px] items-stretch h-7 md:h-8 font-mono text-[10px] uppercase tracking-[0.22em]">
          {/* LIVE pill — pinned left */}
          <div className="shrink-0 flex items-center gap-1.5 bg-void px-3 md:px-4 border-r border-cyan/25 text-acid glow-acid">
            <span className="inline-block h-1.5 w-1.5 bg-acid pulse-soft rounded-full" />
            LIVE
          </div>

          {/* scrolling readouts track */}
          <div className="relative flex-1 overflow-hidden">
            {/* edge fades */}
            <span className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10 bg-gradient-to-r from-deck to-transparent" />
            <span className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10 bg-gradient-to-l from-deck to-transparent" />

            <div className="flex h-full items-center whitespace-nowrap will-change-transform animate-ticker">
              {/* duplicate list twice so seamless loop */}
              {[0, 1].map((pass) => (
                <ul
                  key={pass}
                  className="flex items-center gap-0 shrink-0 pr-6"
                  aria-hidden={pass === 1}
                >
                  {READOUTS.map((r, i) => (
                    <li key={`${pass}-${r.k}`} className="flex items-center shrink-0">
                      {i > 0 && (
                        <span className="mx-3 md:mx-4 text-rule-strong">|</span>
                      )}
                      <span className={toneText(r.tone)}>{">>"} {r.k}</span>
                      <span className="ml-1.5 text-bone num-tab">{r.get(t)}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* clock pill — pinned right */}
          <div className="hidden md:flex shrink-0 items-center gap-1.5 bg-void px-4 border-l border-cyan/25 text-cyan num-tab">
            T+{String(Math.floor(t / 1000) % 3600).padStart(4, "0")}s
          </div>
        </div>
      </div>
    </div>
  );
}

function toneText(tone: Readout["tone"]) {
  switch (tone) {
    case "cyan":
      return "text-cyan glow-cyan";
    case "mag":
      return "text-mag glow-mag";
    case "acid":
      return "text-acid glow-acid";
    case "amber":
      return "text-amber";
    default:
      return "text-fade";
  }
}
