// DOSSIER_LOG entries, newest first.
export type ChangelogEntry = {
  version: string;
  date: string;
  tone: "cyan" | "mag" | "acid" | "amber" | "blood";
  summary: string;
  bullets: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    version: "v2026.10",
    date: "2026-10-23",
    tone: "blood",
    summary: "paullukic.com: v1 + v2 + v3 merged into one site on the apex domain.",
    bullets: [
      "New in SELECTED_WORK: METASPRY, DBUDDY and LIFTORRA (building now)",
      "CAREER_LEDGER: WISEHOSTING contract; Teodesk phases merged; employment split from products",
      "New /CLEARANCE section with the Blackwall shader from cyberpunk v2",
      "All career facts moved to typed src/content files; nav, marquee, press strip and terminal derive from them",
      "THE_LAB relics now link every earlier portfolio: terminal, React v1, cyberpunk v2 and v3",
      "Static hosting, home page prerendered for crawlers, dead code and unused deps removed",
    ],
  },
  {
    version: "v2026.05",
    date: "2026-05-20",
    tone: "blood",
    summary: "Coograph added as flagship · blood tone · ledger entry · drawer scroll fix.",
    bullets: [
      "SELECTED_WORK: COOGRAPH promoted to slot 01 — feature card, blood tone (red), force-directed graph diagram",
      "CAREER_LEDGER: COOGRAPH entry at top — OSS · graph-first AI coding workflow",
      "Press strip + Marquee + Now feed updated to surface COOGRAPH",
      "New `blood` tone wired across theme (CSS var, glow class, tone unions in Selected/CaseDrawer/PressStrip/Ledger)",
      "CaseDrawer: fixed scroll inside drawer (Lenis was hijacking wheel) via data-lenis-prevent + overscroll-contain",
      "Selected card DETAIL + VISIT buttons: bumped left padding for breathing room",
      "Cybergrid downgraded feature → wide so Coograph dominates the grid alone",
    ],
  },
  {
    version: "v2026.04",
    date: "2026-04-23",
    tone: "acid",
    summary: "Case-study drawer, command palette, live feed, 404, full SEO pass.",
    bullets: [
      "Case-study drawer per project plate — click any card for deep dive",
      "Command palette (⌘K / /) with 1–8 section shortcuts and ? help",
      "NOW section: shipping / learning / reading / availability snapshot",
      "MissionRail sticky side rail with scroll-tracked node gradient",
      "Interactive terminal in BRIEF — type `help` for commands",
      "Themed 404 node-not-found page",
      "SEO: JSON-LD Person, OG/Twitter meta, sitemap, robots.txt",
      "Live GitHub stats in THE_LAB",
      "Count-up hero metrics · prefers-reduced-motion audit · focus-visible rings",
      "Plausible analytics script (swap domain or remove)",
    ],
  },
  {
    version: "v2026.03",
    date: "2026-04-22",
    tone: "cyan",
    summary: "HUD rebuild: decluttered nav + seamless terrain + tone-aware hover.",
    bullets: [
      "Nav: 2077 clip-path backplate, chevron CONTACT, stacked logotype",
      "HudBar: always-on bottom status bar with scroll progress + section tracker",
      "HeroScene terrain: periodic sin/cos wrap — no visible scroll reset",
      "HoloCard: tone-aware sheen (cyan/mag/acid/amber match card colour)",
    ],
  },
  {
    version: "v2026.02",
    date: "2026-04",
    tone: "mag",
    summary: "Anti-epileptic motion rework + holographic marketplace plates.",
    bullets: [
      "Reduced flash/flicker intensity across BootOverlay + glitch effects",
      "HolographicMarketplace: full rebuild of SELECTED_WORK plates",
      "ProjectDiagrams: per-project canvas watermarks",
    ],
  },
];
