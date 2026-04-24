import { SectionHeader } from "./Manifesto";

type Entry = {
  year: string;
  span: string;
  org: string;
  role: string;
  location?: string;
  link?: string;
  highlights: string[];
  stack: string[];
};

const ENTRIES: Entry[] = [
  {
    year: "2025",
    span: "Dec 2025 — Present",
    org: "INVT",
    role: "Full-Stack Developer · Cybergrid",
    location: "Novi Sad, RS",
    link: "https://www.cyber-grid.com",
    highlights: [
      "Fixed an MQTT-gateway protocol bug so the control-message `to` timestamp aligns with `from + device failure delay`, correcting downstream aggregation.",
      "Restored missing latitude/longitude on devices and tightened API/data correctness across gateway and platform services.",
      "Rolled JVM metrics across multiple Spring Boot microservices and updated Kubernetes config for consistent observability.",
      "Drove a multi-repo migration from Spring WebClient to RestClient; standardising HTTP usage and reducing maintenance risk.",
      "Hardened tests: improved @ApplicationModuleTest strategy, removed sleep-based timing flakes.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Modulith",
      "PostgreSQL",
      "TimescaleDB",
      "RabbitMQ",
      "Redis",
      "Keycloak",
      "ArgoCD",
      "Terraform",
      "Docker",
    ],
  },
  {
    year: "2023",
    span: "Mar 2023 — May 2025",
    org: "Colabwriting",
    role: "Full-Stack Developer",
    location: "Belgrade, RS",
    link: "https://collabwriting.com",
    highlights: [
      "Rebuilt the core text-highlighting UI/UX engine four times chasing peak performance and DOM stability.",
      "Built a custom PDF viewer with CORS bypass and smart content extraction.",
      "Shipped a fallback Chrome extension to keep highlight activity flowing across the open web.",
      "Integrated Kindle sync, Tiptap editor, fuzzy AI search and a theming system; wired Sentry + Glitchtip observability.",
      "Mentored juniors and set long-term code-quality direction.",
    ],
    stack: ["Svelte", "SvelteKit", "Tailwind", "Java", "Spring", "MySQL"],
  },
  {
    year: "2024",
    span: "Feb 2024 — Apr 2024",
    org: "Gastarbajter24.de",
    role: "Founder · Full-Stack",
    location: "Solo · DE/RS",
    link: "https://www.gastarbajter24.de/",
    highlights: [
      "Shipped a classifieds marketplace for the Balkan diaspora in Germany on SvelteKit 2 + Svelte 5 (runes) + Firebase.",
      "Reached 150 MAUs in six months with zero paid acquisition; ~200% lift in organic visibility via i18n + structured data.",
      "Owned product, design, infrastructure and roadmap end-to-end while holding a full-time role.",
      "Refactored to strict TypeScript and consolidated five duplicated Firestore services into a single generic ListingService<T>.",
    ],
    stack: ["Svelte 5", "SvelteKit 2", "Firebase", "Tailwind", "TypeScript"],
  },
  {
    year: "2023",
    span: "Mar 2023 — May 2023",
    org: "4bees",
    role: "HTML Game Developer · Freelance",
    highlights: [
      "Built branded browser games for Marlboro and Cocta on tight cycles.",
      "Focused on smooth animation work and resilient UI under deadline pressure.",
    ],
    stack: ["React", "Canvas3D"],
  },
  {
    year: "2020",
    span: "Mar 2020 — Aug 2023",
    org: "Teodesk",
    role: "Full-Stack Developer",
    location: "Belgrade, RS",
    link: "https://teodesk.com",
    highlights: [
      "Built an interactive project timeline with advanced multi-select task logic.",
      "Maintained backend logic and UI consistency across the platform.",
    ],
    stack: ["Knockout.js", "Tailwind", "Bootstrap", "Java", "Spring", "MySQL"],
  },
  {
    year: "2020",
    span: "Mar 2020 — Jun 2020",
    org: "Cor Tech Group US LLC",
    role: "UI/UX Developer · Freelance",
    location: "Remote · US",
    highlights: [
      "Designed and built UI for a B2B storage tracking system.",
      "Authored layout systems in BEM with Figma-led handoff.",
    ],
    stack: ["Figma", "BEM", "HTML", "CSS", "PHP"],
  },
  {
    year: "2019",
    span: "Oct 2019 — Mar 2020",
    org: "Teodesk",
    role: "Full-Stack Developer",
    location: "Belgrade, RS",
    highlights: [
      "Shipped React + Redux features inside an internal-tools team.",
    ],
    stack: ["React", "Redux", "Tailwind", "Bootstrap", "Java", "Spring", "MySQL"],
  },
];

export function Ledger() {
  return (
    <section id="ledger" className="relative py-24 md:py-32 border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHeader
          index="01"
          eyebrow="Career Ledger"
          title="Where I have been"
          trailing={`07 entries · 2019 → 2026`}
        />

        <ol className="mt-14">
          {ENTRIES.map((e, i) => (
            <Row key={i} entry={e} index={i + 1} last={i === ENTRIES.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Row({
  entry,
  index,
  last,
}: {
  entry: Entry;
  index: number;
  last: boolean;
}) {
  return (
    <li
      className={`group grid grid-cols-12 gap-x-6 gap-y-4 py-10 md:py-12 ${
        last ? "" : "border-b border-rule"
      }`}
    >
      <div className="col-span-12 md:col-span-3 lg:col-span-2 flex items-start gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute num-tab pt-3">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <div className="font-display text-5xl md:text-6xl text-paper leading-none num-tab transition-colors group-hover:text-acid">
            {entry.year}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            {entry.span}
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-5 lg:col-span-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
          {entry.location ?? "Remote"}
        </div>
        <h3 className="mt-2 font-display text-2xl md:text-3xl text-paper leading-tight">
          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-rule-strong underline-offset-[6px] hover:decoration-acid hover:text-acid"
            >
              {entry.org}
            </a>
          ) : (
            entry.org
          )}
        </h3>
        <p className="mt-1 text-paper-dim text-[15px]">{entry.role}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {entry.stack.map((t) => (
            <li
              key={t}
              className="border border-rule-strong px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <ul className="col-span-12 md:col-span-4 lg:col-span-5 space-y-3">
        {entry.highlights.map((h, j) => (
          <li
            key={j}
            className="flex gap-3 text-[15px] leading-relaxed text-paper-dim text-pretty"
          >
            <span className="mt-2 inline-block h-px w-3 shrink-0 bg-acid" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}
