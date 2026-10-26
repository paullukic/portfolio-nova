import type { Section } from "./types";

// Page sections in scroll order. Nav, HudBar, MissionRail and the command
// palette all read this list, so adding a section is a one-line change.
// Kickers and titles carry the cyberpunk flavor; `dek` says plainly what the
// section is, so a skimmer gets the point without decoding the theme.
export const sections: Section[] = [
  { id: "top", label: "HERO" },
  { id: "brief", label: "BRIEF", dek: "About me: what I build, how I work and what I'm looking for next." },
  { id: "selected", label: "WORK", dek: "Products I build and run, plus work for employers and clients. Open any card for the full case study." },
  { id: "ledger", label: "LEDGER", dek: "Every role so far, newest first, with what I shipped in each." },
  { id: "now", label: "NOW", dek: "What I'm building, learning and reading this month." },
  { id: "toolkit", label: "TOOLKIT", dek: "The languages, frameworks and infrastructure I use in production, grouped by layer." },
  { id: "clearance", label: "CLEARANCE", navLabel: "SEC", dek: "Security work: my penetration-testing training, my TryHackMe profile and Paxhax, my notebook on tools and exploits." },
  { id: "lab", label: "LAB", dek: "Side projects, live GitHub activity and every earlier version of this site, still online." },
  { id: "contact", label: "PING", dek: "Hiring, a contract or a question? Email reaches me fastest." },
];

/** Plain-language intro for a section, if it has one. */
export const sectionDek = (id: string) => sections.find((s) => s.id === id)?.dek;

/** Sections shown in the top nav (hero and contact have their own controls). */
export const navSections = sections.filter((s) => s.id !== "top" && s.id !== "contact");
