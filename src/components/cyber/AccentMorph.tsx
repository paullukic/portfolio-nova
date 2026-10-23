import { useEffect } from "react";

const SECTIONS: { id: string; accent: string }[] = [
  { id: "top", accent: "var(--color-cyan)" },
  { id: "brief", accent: "var(--color-cyan)" },
  { id: "selected", accent: "var(--color-cyan)" },
  { id: "ledger", accent: "var(--color-mag)" },
  { id: "now", accent: "var(--color-acid)" },
  { id: "toolkit", accent: "var(--color-acid)" },
  { id: "clearance", accent: "var(--color-blood)" },
  { id: "lab", accent: "var(--color-mag)" },
  { id: "contact", accent: "var(--color-mag)" },
];

/**
 * Sets `--section-accent` CSS var on :root based on which section is
 * currently in view. Consumers (HudBar progress bar, MissionRail fill, body
 * gradient) pick it up via CSS var lookup. Morph is smooth via CSS
 * transitions on the consuming elements — no JS tween here.
 */
export function AccentMorph() {
  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0];
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.45) current = s;
      }
      document.documentElement.style.setProperty("--section-accent", current.accent);
      document.documentElement.dataset.section = current.id;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
