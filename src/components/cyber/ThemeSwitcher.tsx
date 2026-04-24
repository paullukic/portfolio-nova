import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

type Theme = "neon" | "blood" | "matrix";

const ORDER: Theme[] = ["neon", "blood", "matrix"];

const META: Record<Theme, { label: string; dotClass: string }> = {
  neon: { label: "NEON", dotClass: "bg-cyan" },
  blood: { label: "BLOOD", dotClass: "bg-mag" },
  matrix: { label: "MATRIX", dotClass: "bg-acid" },
};

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "neon";
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved && ORDER.includes(saved) ? saved : "neon";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const cycle = () => {
    const i = ORDER.indexOf(theme);
    setTheme(ORDER[(i + 1) % ORDER.length]);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Switch theme (current: ${META[theme].label})`}
      className="fixed right-4 bottom-28 md:bottom-32 z-[80] grid h-10 w-10 place-items-center border border-rule-strong bg-void/80 backdrop-blur-sm text-ash hover:border-cyan hover:text-cyan transition-colors group"
    >
      <Palette className="h-4 w-4" />
      <span
        className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${META[theme].dotClass} shadow-[0_0_6px_currentColor]`}
      />
      <span className="absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.24em] bg-void/90 border border-rule-strong px-2 py-1 text-bone whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {META[theme].label}
      </span>
    </button>
  );
}
