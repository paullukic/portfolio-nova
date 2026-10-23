import type { Tone } from "./types";

const SINCE = 2019;

export const profile = {
  name: "Paul Lukić",
  first: "PAUL",
  last: "LUKIĆ",
  pronounce: "/lu·kitch/",
  handle: "netrunner_94",
  fileId: "PL-94-001",
  title: "Full Stack Developer",
  designation: "FULL STACK DEV",
  since: SINCE,
  /** Whole years shipping, derived so it never goes stale. */
  years: new Date().getFullYear() - SINCE,
  location: "Novi Sad · RS",
  homeNode: "NOVI_SAD · RS · CET",
  timezone: "CET / CEST",
  workMode: "Remote-first · EU-hybrid OK",
  response: "≤ 24 hours",
  stackLine: "JAVA · SPRING · REACT · SVELTE · FIREBASE",
  email: "paul.lukic94@gmail.com",
  currently: { org: "INVT", product: "Cybergrid", link: "https://www.cyber-grid.com" },
  /** Own products named in the hero bio. */
  afterHours: ["Coograph", "Metaspry", "DBuddy", "Liftorra"],
  /** No CV PDF ships until an up-to-date one exists (the old one predates INVT). */
  cv: null as string | null,
  openTo: [
    { label: "Full-stack (Java + TS)", tone: "cyan" },
    { label: "Backend (Spring · Modulith)", tone: "mag" },
    { label: "Founding engineer", tone: "acid" },
    { label: "Deep contracts", tone: "amber" },
    { label: "Pen-test / red team", tone: "blood" },
  ] as { label: string; tone: Tone }[],
  stats: [
    { n: new Date().getFullYear() - SINCE, suffix: "+", pad: 2, label: "YEARS\nSHIPPING" },
    { n: 200, prefix: "+", suffix: "%", label: "ORGANIC\nLIFT (SOLO)" },
    { n: 2, suffix: "K+", label: "USERS\n(ACQUIRED)" },
    { n: 150, label: "MAU\nZERO CAC" },
  ],
  /** Plain-text bio used by the terminal `cat wire_bio.txt` and the closing status. */
  bio: [
    `Shipping Java/Spring backends + React/Svelte frontends since ${SINCE}.`,
    "Currently on Cybergrid at INVT. Author of Coograph (OSS).",
    "Builds and runs his own products: Metaspry, DBuddy, Liftorra (in progress).",
    "Founded Gastarbajter24 (150 MAU, zero CAC). Sold a Chrome extension (2K+ users).",
    "Mentors by default. Ships by deadline. Red-team minded.",
  ],
  capabilities: [
    {
      label: "// BACKEND",
      tone: "cyan",
      title: "Distributed Spring services",
      bullets: [
        "Spring Boot · Modulith · Postgres · TimescaleDB · RabbitMQ · Redis · Keycloak",
        "Currently on Cybergrid at INVT: MQTT protocol fixes, observability rollouts, multi-repo WebClient → RestClient migration",
        "Comfortable with contract-first dev (OpenAPI), modulith decomposition and fixing time-windowing bugs nobody else wants",
      ],
    },
    {
      label: "// FRONTEND",
      tone: "mag",
      title: "Production React + Svelte",
      bullets: [
        "React 19 · Svelte 5 (runes) · SvelteKit 2 · TypeScript strict · Tailwind 4",
        "Rebuilt a text-highlight engine four times chasing peak performance; built a custom PDF viewer with CORS bypass",
        "Ships Chrome extensions end to end: Metaspry, DBuddy, and a sold result counter",
      ],
    },
    {
      label: "// PRODUCT",
      tone: "acid",
      title: "End-to-end ownership",
      bullets: [
        "Runs Metaspry solo: free Chrome extension, paid SvelteKit + Firebase app, Astro marketing site",
        "Founded Gastarbajter24 solo: 150 MAU in 6 months at zero CAC, +200% organic via i18n + structured data",
        "Building Liftorra, a social workout app: SvelteKit PWA + Expo native app on Firebase",
      ],
    },
    {
      label: "// SECURITY · OPEN_FOR_HIRE",
      tone: "amber",
      title: "Pen-tester / red team",
      bullets: [
        "CompTIA PenTest+ certified · TryHackMe Jr. Penetration Tester",
        "Maintains Paxhax: a working notebook on tooling, exploits and responsible disclosure",
        "Brings a red-team mindset to code review and threat modelling on every project",
        "Available for paid pen-test engagements, security reviews and red-team contracts",
      ],
    },
  ] as { label: string; tone: "cyan" | "mag" | "acid" | "amber"; title: string; bullets: string[] }[],
} as const;

export const social = {
  github: {
    href: "https://github.com/paullukic",
    value: "@paullukic",
    user: "paullukic",
    /** Shown when the GitHub API is rate-limited (snapshot 2026-10-23). */
    fallback: { repos: 28, followers: 9 },
  },
  linkedin: { href: "https://www.linkedin.com/in/paul-lukic/", value: "/in/paul-lukic" },
  email: { href: `mailto:${profile.email}`, value: profile.email },
};
