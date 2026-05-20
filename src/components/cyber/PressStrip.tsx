import { HoverDecode } from "./GlitchText";

const NODES = [
  { label: "COOGRAPH", sub: "OSS · 2026—NOW", tone: "blood" },
  { label: "INVT", sub: "CYBERGRID · 2025—NOW", tone: "cyan" },
  { label: "CLUING", sub: "EX-COLABWRITING · 23—25", tone: "mag" },
  { label: "GASTARBAJTER24", sub: "SOLO · 2024—NOW", tone: "acid" },
  { label: "IGELPHONE", sub: "SOLO · 2024—NOW", tone: "cyan" },
  { label: "TEODESK", sub: "ENTERPRISE · 20—23", tone: "amber" },
  { label: "4BEES", sub: "GAME · 2023", tone: "mag" },
  { label: "COR_TECH", sub: "US · 2020", tone: "cyan" },
  { label: "CHROME_STORE", sub: "ACQUIRED · 2021", tone: "acid" },
] as const;

export function PressStrip() {
  return (
    <section
      aria-label="Organisations worked with"
      className="relative border-t border-rule py-10 md:py-14 bg-void/50"
    >
      <div className="mx-auto max-w-[1480px] px-4 md:px-7">
        <div className="flex items-center gap-3 mb-6 font-mono text-[10px] uppercase tracking-[0.32em] text-fade">
          <span className="inline-block h-px w-6 bg-cyan" />
          <span className="text-cyan glow-cyan">//</span>
          <span className="text-ash">TRANSMITTED_FROM</span>
          <span className="inline-block h-px w-6 bg-cyan" />
          <span className="ml-auto hidden md:inline text-fade">
            ▦ 9 NODES · OSS + CLIENT + SOLO
          </span>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-px bg-rule-strong border border-rule-strong">
          {NODES.map((n, i) => (
            <li
              key={n.label}
              className="bg-deck/80 px-3 py-4 flex flex-col items-start gap-1.5 group transition-colors hover:bg-deck"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center gap-1.5 w-full">
                <span
                  className={`inline-block h-1.5 w-1.5 shrink-0 ${
                    n.tone === "cyan"
                      ? "bg-cyan"
                      : n.tone === "mag"
                      ? "bg-mag"
                      : n.tone === "acid"
                      ? "bg-acid"
                      : n.tone === "blood"
                      ? "bg-blood"
                      : "bg-amber"
                  }`}
                />
                <span
                  className={`font-display uppercase text-[15px] md:text-[16px] tracking-tight text-bone truncate transition-colors ${
                    n.tone === "cyan"
                      ? "group-hover:text-cyan"
                      : n.tone === "mag"
                      ? "group-hover:text-mag"
                      : n.tone === "acid"
                      ? "group-hover:text-acid"
                      : n.tone === "blood"
                      ? "group-hover:text-blood"
                      : "group-hover:text-amber"
                  }`}
                >
                  <HoverDecode text={n.label} durationMs={420} />
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-fade">
                {n.sub}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
