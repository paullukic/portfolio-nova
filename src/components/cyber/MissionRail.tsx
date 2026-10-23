import { useEffect, useState } from "react";
import { sections } from "@/content/sections";

const SECTIONS = sections;

export function MissionRail() {
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);

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
    <aside
      className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 flex-col items-start gap-0 select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* label strip */}
      <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.32em] text-fade">
        <span className="text-cyan">▣</span> MISSION · {String(Math.round(progress * 100)).padStart(2, "0")}%
      </div>

      <ol className="relative pointer-events-auto">
        {/* vertical line + fill */}
        <span className="absolute left-[5px] top-1 bottom-1 w-px bg-rule-strong" />
        <span
          className="absolute left-[5px] top-1 w-px transition-[height,background] duration-300"
          style={{
            height: `calc(${progress * 100}% - 2px)`,
            background:
              "linear-gradient(to bottom, var(--color-cyan), var(--color-mag), var(--section-accent, var(--color-acid)))",
          }}
        />

        {SECTIONS.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative pl-5 py-1.5 group">
              <a
                href={`#${s.id}`}
                className="flex items-center gap-2"
              >
                {/* dot */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[11px] w-[11px] border transition-all ${
                    isActive
                      ? "border-acid bg-acid glow-acid"
                      : "border-rule-strong bg-void group-hover:border-cyan"
                  }`}
                  style={{
                    clipPath:
                      "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                  }}
                />
                {/* label */}
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.24em] transition-all ${
                    isActive
                      ? "text-acid glow-acid opacity-100 translate-x-0"
                      : "text-fade opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-bone"
                  }`}
                >
                  {String(i).padStart(2, "0")} {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.32em] text-fade">
        <span className="text-mag">◆</span> NODE {String(
          Math.max(0, SECTIONS.findIndex((s) => s.id === active))
        ).padStart(2, "0")}/{String(SECTIONS.length - 1).padStart(2, "0")}
      </div>
    </aside>
  );
}
