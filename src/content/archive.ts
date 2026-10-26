import type { Tone } from "./types";

// RELICS: earlier portfolios, kept online as archives and linked from THE_LAB.
// v1 = react-projects (react.paullukic.com), v2 = cyberpunk-v2, v3 = the
// cyberpunk site this one was forked from. The terminal site leaves the apex
// domain when this site takes it over and moves to terminal.paullukic.com
// (confirmed by Paul, 2026-10-23; it stays in Firebase project portfolio-fa807).

export type Relic = {
  id: string;
  label: string;
  title: string;
  note: string;
  link: string;
  tone: Exclude<Tone, "blood">;
  icon: "terminal" | "monitor" | "code";
};

/** Home of the 2022 terminal site (and its /gui/win98 page) once paullukic.com points here. */
export const TERMINAL_ARCHIVE = "https://terminal.paullukic.com";

export const relics: Relic[] = [
  {
    id: "terminal",
    label: "TERMINAL · 2022",
    title: "terminal.paullukic.com",
    note: "The original terminal site that lived on paullukic.com.",
    link: TERMINAL_ARCHIVE,
    tone: "cyan",
    icon: "terminal",
  },
  {
    id: "win98",
    label: "GUI · WIN98",
    title: "terminal.paullukic.com/gui",
    note: "Windows 98 desktop reimagining, part of the terminal site.",
    link: `${TERMINAL_ARCHIVE}/gui/win98.html`,
    tone: "amber",
    icon: "monitor",
  },
  {
    id: "react",
    label: "V1 · REACT · 2022",
    title: "react.paullukic.com",
    note: "First React iteration, frozen in time.",
    link: "https://react.paullukic.com/",
    tone: "mag",
    icon: "terminal",
  },
  {
    id: "cyberpunk-v2",
    label: "V2 · NETRUNNER",
    title: "cyberpunk-v2.paullukic.com",
    note: "Blackwall HUD prototype. Its shader lives on in /CLEARANCE.",
    link: "https://cyberpunk-v2.paullukic.com/",
    tone: "acid",
    icon: "monitor",
  },
  {
    id: "cyberpunk-v3",
    label: "V3 · DOSSIER",
    title: "cyberpunk.paullukic.com",
    note: "The dossier this site grew out of, as it was in May 2026.",
    link: "https://cyberpunk.paullukic.com/",
    tone: "cyan",
    icon: "monitor",
  },
];
