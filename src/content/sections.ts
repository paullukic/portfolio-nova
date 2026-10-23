import type { Section } from "./types";

// Page sections in scroll order. Nav, HudBar, MissionRail and the command
// palette all read this list, so adding a section is a one-line change.
export const sections: Section[] = [
  { id: "top", label: "HERO" },
  { id: "brief", label: "BRIEF" },
  { id: "selected", label: "WORK" },
  { id: "ledger", label: "LEDGER" },
  { id: "now", label: "NOW" },
  { id: "toolkit", label: "TOOLKIT" },
  { id: "clearance", label: "CLEARANCE", navLabel: "SEC" },
  { id: "lab", label: "LAB" },
  { id: "contact", label: "PING" },
];

/** Sections shown in the top nav (hero and contact have their own controls). */
export const navSections = sections.filter((s) => s.id !== "top" && s.id !== "contact");
