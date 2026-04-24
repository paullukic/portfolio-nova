import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";

type Entry = {
  year: string;
  span: string;
  org: string;
  role: string;
  location?: string;
  link?: string;
  highlights: string[];
  stack: string[];
  tone: "cyan" | "mag" | "acid" | "amber";
};

const ENTRIES: Entry[] = [
  {
    year: "2025",
    span: "DEC_2025 — PRESENT",
    org: "INVT",
    role: "FULL_STACK_DEVELOPER · CYBERGRID",
    location: "NOVI_SAD, RS",
    link: "https://www.cyber-grid.com",
    tone: "cyan",
    highlights: [
      "Shipped a protocol fix in the MQTT gateway: control-message `to` timestamp now aligns with `from + device failure delay`, correcting downstream aggregation across the platform.",
      "Restored missing latitude/longitude on devices — eliminated a class of integration bugs around asset/location metadata for downstream consumers.",
      "Drove JVM-metrics observability rollout across multiple Spring Boot microservices, with matching K8s config — gave on-call consistent visibility cross-service.",
      "Leading a multi-repo migration from Spring WebClient → RestClient — standardising HTTP usage and cutting long-term maintenance risk.",
      "Hardened the test suite: improved @ApplicationModuleTest strategy and removed brittle sleep-based timing — fewer flakes in CI.",
      "Implemented backend feature work in Cybernoc (per-user Favourite Portfolio) and expanded scheduled-job DTOs (added EnergyProducts to CFO).",
    ],
    stack: [
      "JAVA",
      "SPRING_BOOT",
      "MODULITH",
      "POSTGRES",
      "TIMESCALEDB",
      "RABBITMQ",
      "REDIS",
      "KEYCLOAK",
      "ARGOCD",
      "TERRAFORM",
      "DOCKER",
    ],
  },
  {
    year: "2023",
    span: "MAR_2023 — MAY_2025",
    org: "CLUING (EX-COLABWRITING)",
    role: "FULL_STACK_DEVELOPER",
    location: "BELGRADE, RS",
    link: "https://www.cluing.io/",
    tone: "mag",
    highlights: [
      "Rebuilt the core text-highlighting engine four times chasing peak performance — kept the product viable as the corpus and DOM grew.",
      "Built a custom PDF viewer with CORS bypass and smart content extraction — enabled a content category competitors couldn't ship.",
      "Shipped a fallback Chrome extension so power users could keep highlighting across the open web — extending product surface beyond the SaaS.",
      "Integrated Kindle notes sync, Tiptap editor, fuzzy AI search and a theming system. Wired Sentry + Glitchtip for production observability.",
      "Mentored junior engineers and set long-term code-quality direction across the team.",
    ],
    stack: ["SVELTE", "SVELTEKIT", "TAILWIND", "JAVA", "SPRING", "MYSQL"],
  },
  {
    year: "2024",
    span: "2024 — PRESENT",
    org: "IGELPHONE.DE",
    role: "SOLO BUILD · STOREFRONT + ADMIN",
    location: "SOLO · DE",
    link: "https://www.igelphone.de/de",
    tone: "cyan",
    highlights: [
      "Built the public storefront and a dedicated admin panel end-to-end — SvelteKit + Firebase + Stripe, bilingual DE/EN.",
      "Shipped full cart → checkout → payment flow with EU-compliant VAT + cookie consent, wired Stripe + invoice generation.",
      "Admin app handles products, inventory, orders, customers and content — owner runs the business without dev involvement day-to-day.",
      "Owned design, infra, deploy pipelines and ongoing feature work solo.",
    ],
    stack: ["SVELTEKIT_2", "SVELTE_5", "TYPESCRIPT", "FIREBASE", "STRIPE", "TAILWIND"],
  },
  {
    year: "2024",
    span: "FEB_2024 — PRESENT",
    org: "GASTARBAJTER24.DE",
    role: "FOUNDER · FULL_STACK · ONGOING",
    location: "SOLO · DE/RS",
    link: "https://www.gastarbajter24.de/",
    tone: "acid",
    highlights: [
      "Shipped a classifieds marketplace solo for the Balkan diaspora in Germany — SvelteKit 2 + Svelte 5 (runes) + Firebase, deployed on Vercel.",
      "Reached 150 MAUs in 6 months at zero paid acquisition; lifted organic visibility by ~200% via svelte-i18n, hreflang, OG/Twitter cards and JSON-LD.",
      "Built the full ad lifecycle: client-side image compression, 5 listing verticals, featured ads, locale-aware European price parsing, role-based ownership, GDPR cookie consent.",
      "Owned product, design, infra and roadmap end-to-end while holding a full-time role.",
      "Refactored to Svelte 5 runes + strict TypeScript and consolidated 5 duplicated Firestore services into one generic `ListingService<T>` — eliminated a class of type-unsafe bugs.",
    ],
    stack: ["SVELTE_5", "SVELTEKIT_2", "FIREBASE", "TAILWIND", "TS"],
  },
  {
    year: "2023",
    span: "MAR_2023 — MAY_2023",
    org: "4BEES",
    role: "HTML_GAME_DEVELOPER · FREELANCE",
    tone: "amber",
    highlights: [
      "Built branded browser games for Marlboro and Cocta on agency cycles — playable on phone, embedded in client campaigns.",
      "Owned smooth canvas animation and resilient UI under deadline pressure.",
    ],
    stack: ["REACT", "CANVAS3D"],
  },
  {
    year: "2020",
    span: "MAR_2020 — AUG_2023",
    org: "TEODESK",
    role: "FULL_STACK_DEVELOPER",
    location: "BELGRADE, RS",
    link: "https://teodesk.com",
    tone: "cyan",
    highlights: [
      "Designed and built the interactive project-timeline view with advanced multi-select task logic — flagship feature for a B2B SaaS.",
      "Maintained backend logic and UI consistency across the platform; coupled Java/Spring services to a Knockout frontend.",
    ],
    stack: ["KNOCKOUT.JS", "TAILWIND", "BOOTSTRAP", "JAVA", "SPRING", "MYSQL"],
  },
  {
    year: "2020",
    span: "MAR_2020 — JUN_2020",
    org: "COR_TECH_GROUP_US_LLC",
    role: "UI/UX_DEVELOPER · FREELANCE",
    location: "REMOTE · US",
    tone: "mag",
    highlights: [
      "Designed and built the UI for a US-client B2B storage tracking system, remote.",
      "Authored layout systems in BEM with Figma-led handoff and PHP integration.",
    ],
    stack: ["FIGMA", "BEM", "HTML", "CSS", "PHP"],
  },
  {
    year: "2019",
    span: "OCT_2019 — MAR_2020",
    org: "TEODESK",
    role: "FULL_STACK_DEVELOPER",
    location: "BELGRADE, RS",
    tone: "amber",
    highlights: [
      "Shipped React + Redux features for an internal-tools storage management system on a hybrid B2B team.",
      "Learned production frontend rigour — design systems, code review, paired delivery — on the job.",
    ],
    stack: ["REACT", "REDUX", "TAILWIND", "BOOTSTRAP", "JAVA", "SPRING", "MYSQL"],
  },
];

export function Ledger() {
  const first = ENTRIES[ENTRIES.length - 1]?.year ?? "2019";
  const latest = ENTRIES[0]?.year ?? "2026";

  return (
    <section
      id="ledger"
      className="relative py-28 md:py-40 border-t border-rule-strong bg-deck/40 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-floor opacity-30" />
      <SectionWatermark number="03" side="left" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* NOW-style kinetic header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-mag glow-mag">
              &gt;&gt; CAREER_LEDGER · WHERE I'VE BEEN
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-mag glow-mag italic">/</span>
              <DecodeOnView text="LEDGER" durationMs={700} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">ENTRIES</div>
              <div className="mt-1 text-bone num-tab text-lg">
                {String(ENTRIES.length).padStart(2, "0")}
              </div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">SPAN</div>
              <div className="mt-1 text-cyan glow-cyan num-tab">
                {first} → {latest}
              </div>
            </div>
          </div>
        </div>

        <div className="" role="list">
          {ENTRIES.map((e, i) => (
            <div
              key={i}
              role="listitem"
              data-reveal
              style={{ ["--reveal-delay" as any]: `${i * 80}ms` }}
            >
              <Row entry={e} index={i + 1} last={i === ENTRIES.length - 1} />
            </div>
          ))}
        </div>
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
  const tone =
    entry.tone === "cyan"
      ? { txt: "text-cyan", glow: "glow-cyan", bar: "bg-cyan", border: "border-cyan/50" }
      : entry.tone === "mag"
      ? { txt: "text-mag", glow: "glow-mag", bar: "bg-mag", border: "border-mag/50" }
      : entry.tone === "acid"
      ? { txt: "text-acid", glow: "glow-acid", bar: "bg-acid", border: "border-acid/50" }
      : { txt: "text-amber", glow: "", bar: "bg-amber", border: "border-amber/50" };

  return (
    <div
      className={`group relative grid grid-cols-12 gap-x-6 gap-y-4 py-10 md:py-12 ${
        last ? "" : "border-b border-rule"
      }`}
    >
      <span
        className={`absolute left-0 top-12 h-12 w-px ${tone.bar} opacity-0 group-hover:opacity-100 transition-opacity`}
      />

      <div className="col-span-12 md:col-span-3 lg:col-span-3 flex items-start gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade num-tab pt-3">
          {String(index).padStart(2, "0")}
        </span>
        <div>
          <div
            className={`font-zen text-4xl md:text-5xl ${tone.txt} ${tone.glow} leading-none num-tab`}
          >
            {entry.year}
          </div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fade whitespace-nowrap">
            {entry.span}
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-5 lg:col-span-4">
        <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone.txt}`}>
          ⌖ {entry.location ?? "REMOTE"}
        </div>
        <h3 className="mt-2 font-display uppercase text-3xl md:text-4xl lg:text-[2.6rem] text-bone leading-[0.96] tracking-tight break-words">
          {entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noreferrer"
              className={`underline decoration-rule-strong underline-offset-[8px] decoration-1 hover:decoration-current hover:${tone.txt} transition-colors`}
            >
              {entry.org}
            </a>
          ) : (
            entry.org
          )}
        </h3>
        <p className={`mt-3 font-mono text-[11px] ${tone.txt} uppercase tracking-[0.2em]`}>
          // {entry.role}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {entry.stack.map((t) => (
            <li
              key={t}
              className={`border ${tone.border} bg-deck px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ash`}
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
            className="flex gap-3 text-[14.5px] leading-relaxed text-ash text-pretty"
          >
            <span className={`mt-2 inline-block h-px w-3 shrink-0 ${tone.bar}`} />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
