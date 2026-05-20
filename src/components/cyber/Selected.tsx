import { useState } from "react";
import { ArrowUpRight, Cpu, Eye, Shield, Zap, Layers, Globe, Code2, Activity, FileSearch, Smartphone, Network } from "lucide-react";
import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { HoloCard } from "./HoloCard";
import { DiagramFor } from "./ProjectDiagrams";
import { CaseDrawer, type CaseStudy } from "./CaseDrawer";
import type { ReactNode } from "react";

type Project = {
  no: string;
  title: string;
  client: string;
  blurb: string;
  tags: string[];
  status: string;
  tone: "cyan" | "mag" | "acid" | "amber" | "blood";
  icon: ReactNode;
  link?: string;
  span: "wide" | "tall" | "default" | "feature";
  metrics?: { k: string; v: string }[];
  caseStudy?: CaseStudy;
};

const PROJECTS: Project[] = [
  {
    no: "01",
    title: "COOGRAPH",
    client: "OSS · 2026 → ongoing · Solo author",
    blurb:
      "Open-source graph-first context layer for AI coding. One workflow, eight tools (Claude Code, Copilot, Codex, OpenCode, Cursor, Windsurf, Aider, Cline). SQLite + tree-sitter code graph served over MCP — replaces grep-then-read with targeted dependency queries. Ships specialized agents, Claude Code lifecycle hooks, and the OpenSpec proposal flow.",
    tags: ["MCP", "SQLITE", "TREE_SITTER", "PYTHON", "CLAUDE_CODE", "OPENSPEC", "MIT"],
    status: "LIVE",
    tone: "blood",
    icon: <Network className="h-7 w-7" />,
    link: "https://coograph.com",
    span: "feature",
    metrics: [
      { k: "8", v: "AI tools wired" },
      { k: "MCP", v: "code-graph server" },
      { k: "MIT", v: "open source" },
    ],
    caseStudy: {
      problem:
        "AI coding assistants brute-force the codebase: grep a symbol, get 80+ hits, read 30 files, burn 50K tokens before doing useful work. Different tools (Claude Code, Copilot, Codex, Cursor, etc.) need separately authored configs, so a 'workflow' fragments into eight half-finished setups. Outputs hallucinate symbols and APIs the codebase never actually exports.",
      approach: [
        "Built a unified config layout that ships native invocation for all eight major AI coding tools — same workflow, same agent definitions, same skills — installed in ~2 minutes via /coograph-init",
        "Wrote a standalone Python MCP server that parses the workspace into a SQLite dependency graph via tree-sitter (Java/TS/Python/Go/Rust/C#/Ruby/more), updated incrementally on every commit via git hooks",
        "Designed five specialized agents — Planner, Reviewer, Debugger, Verifier, Explore — with hard anti-hallucination constraints: every finding cites a verbatim quote from a fresh read, agents must call code-graph before any file read, three-retry circuit breakers on fixes",
        "Shipped Claude Code lifecycle hooks that block edits to generated files, log every bash command to a two-tier audit trail, warn on out-of-scope edits, and report graph state at session start",
        "Added the OpenSpec workflow — Plan → Propose → Apply → QA → Review → Archive — with a project-sync layer so template updates propagate to every registered project on `git pull`",
        "Built an interactive D3 force-directed visualizer so users can see what the agent sees before they trust it",
      ],
      challenges: [
        "No single command works across all eight tools — each registers custom workflows differently (slash commands, $-prefixed skills, rules files, plugin events). Had to author eight invocation paths that all converge on the same agent procedures",
        "Three of eight tools expose no pre-tool-use hook API, so the audit-log feature is honest about partial coverage rather than faking it across the board",
        "Cross-platform append safety for the audit log: lines from concurrent agents had to interleave at line boundaries on both POSIX (O_APPEND) and NTFS (FILE_APPEND_DATA)",
      ],
      outcome:
        "Live at coograph.com, MIT-licensed, public roadmap. Real measured behavior: get_minimal_context() returns 4-6 relevant files in ~2K tokens vs. 50K+ tokens grepping 200+. Documented compare-and-contrast against cookiecutter, plain CLAUDE.md, and raw Cursor rules — Coograph scaffolds a workflow, not files.",
      stack: [
        "Python", "SQLite", "tree-sitter", "MCP (Model Context Protocol)",
        "D3", "Claude Code hooks", "OpenSpec", "Git hooks",
        "TypeScript (OpenCode plugin)", "TOML (Codex config)", "Markdown",
      ],
    },
  },
  {
    no: "02",
    title: "CYBERGRID_PLATFORM",
    client: "INVT · 2025 → present · Backend",
    blurb:
      "Grid-scale energy platform. Routing control messages between TSOs and distributed assets across a Spring/Modulith microservice fleet. Shipped a protocol fix that corrected downstream aggregation, restored device geo-metadata, rolled JVM metrics across the platform, and is leading a multi-repo WebClient → RestClient migration.",
    tags: ["SPRING_BOOT", "MODULITH", "TIMESCALEDB", "RABBITMQ", "ARGOCD", "TERRAFORM", "KEYCLOAK"],
    status: "SHIPPING",
    tone: "cyan",
    icon: <Activity className="h-7 w-7" />,
    link: "https://www.cyber-grid.com",
    span: "tall",
    metrics: [
      { k: "MQTT", v: "protocol fix" },
      { k: "multi-repo", v: "HTTP migration" },
      { k: "JVM", v: "metrics rollout" },
    ],
    caseStudy: {
      problem:
        "Grid-scale energy platform routing control messages between TSOs and distributed energy assets. Legacy WebClient-based HTTP calls, patchy observability, and an MQTT payload aggregation bug that silently corrupted downstream readings for a subset of devices.",
      approach: [
        "Diagnosed MQTT protocol handling: found that edge-case encoding stripped geo-metadata, then pushed a targeted fix with regression coverage",
        "Led a multi-repo WebClient → RestClient migration across the backend fleet; aligned timeouts, error-handling and contract-first API usage",
        "Rolled JVM + HTTP metrics across services, wired Grafana dashboards, set alerting thresholds on critical aggregation flows",
        "Reviewed PRs from 6+ engineers daily, kept Spring Modulith boundaries honest and pushed back on cross-boundary leaks",
      ],
      challenges: [
        "No public test harness for TSO message shapes — reverse-engineered from captured prod traffic + vendor specs",
        "Multi-repo migration coordination: each service had its own release cadence and test stack",
      ],
      outcome:
        "Aggregation bug eliminated in production, device geo-metadata restored, observability now standard across platform. Migration ongoing across remaining services with a documented pattern.",
      stack: [
        "Java 21", "Spring Boot 3", "Spring Modulith", "TimescaleDB", "PostgreSQL",
        "RabbitMQ", "MQTT", "Keycloak", "Micrometer", "Grafana", "ArgoCD",
        "Terraform", "Kubernetes", "Docker",
      ],
    },
  },
  {
    no: "03",
    title: "CLUING",
    client: "Cluing (ex-Colabwriting) · 2023 → 2025 · Full-Stack + Mentor",
    blurb:
      "Research SaaS for serious readers (rebranded from Colabwriting to Cluing). Rebuilt the core highlight engine four times chasing peak performance, shipped a custom PDF viewer with CORS bypass, social scrapers (Reddit/X/Quora/YT/LinkedIn), Kindle notes sync, Tiptap editor, fuzzy AI search and a theming system. Mentored juniors and set long-term code quality direction.",
    tags: ["SVELTEKIT", "SPRING", "MYSQL", "SENTRY"],
    status: "LIVE",
    tone: "mag",
    icon: <Layers className="h-6 w-6" />,
    link: "https://www.cluing.io/",
    span: "tall",
    metrics: [
      { k: "4×", v: "engine rebuilds" },
      { k: "PDF", v: "custom viewer" },
      { k: "team", v: "mentored" },
    ],
    caseStudy: {
      problem:
        "Research SaaS for serious readers. Core highlight engine had hit performance walls at scale, PDF support relied on third-party viewers that broke under CORS constraints, and the product had to integrate data from a wide and messy surface (Reddit, X, Quora, YT, LinkedIn, Kindle).",
      approach: [
        "Rebuilt the text-highlight engine four times — each rewrite targeted a specific bottleneck (DOM traversal, range persistence, virtualized rendering, async re-anchoring)",
        "Shipped a custom PDF viewer with a CORS bypass strategy so in-app highlighting worked on arbitrary external PDFs",
        "Built social scrapers (Reddit / X / Quora / YT / LinkedIn) with rate-limit handling and consistent normalization",
        "Integrated Kindle notes sync, Tiptap editor, fuzzy AI search across the user's corpus and a full theming system",
        "Mentored two juniors to mid-level, owned long-term code-quality direction and migration patterns",
      ],
      challenges: [
        "Highlight anchoring across reflowing DOMs — solved via resilient range fingerprinting",
        "PDFs served without CORS — bypass pipeline had to be secure, cacheable and fast",
      ],
      outcome:
        "Product rebranded from Colabwriting to Cluing and shipped its most performant highlight engine yet. Internal tooling + mentorship patterns are still in use by the team post-departure.",
      stack: [
        "SvelteKit 2", "Svelte 5", "TypeScript", "Spring Boot", "Java",
        "MySQL", "Tiptap", "PDF.js", "Sentry", "Tailwind",
      ],
    },
  },
  {
    no: "04",
    title: "GASTARBAJTER24",
    client: "Solo founder · 2024 → ongoing · Product + Eng",
    blurb:
      "Classifieds marketplace for the Balkan diaspora in Germany. Five listing verticals, trilingual UX (DE/EN/SR), Google OAuth, GDPR cookie consent, SSR meta. Still actively iterating: new verticals, deliverability, growth loops.",
    tags: ["SVELTE_5", "SVELTEKIT_2", "FIREBASE", "TYPESCRIPT", "TAILWIND"],
    status: "ONGOING",
    tone: "acid",
    icon: <Globe className="h-6 w-6" />,
    link: "https://www.gastarbajter24.de/",
    span: "default",
    metrics: [
      { k: "150", v: "MAU · zero CAC" },
      { k: "+200%", v: "organic lift" },
      { k: "3", v: "languages" },
    ],
    caseStudy: {
      problem:
        "Balkan diaspora in Germany had no dedicated classifieds platform — ads were scattered across Facebook groups with zero search, trust or structure. Built solo in evenings while holding a full-time senior role.",
      approach: [
        "Designed five listing verticals (jobs, housing, transport, services, items) with shared core + vertical-specific fields",
        "Shipped trilingual UX (DE / EN / SR-latn) with SSR meta per locale and proper hreflang",
        "Google OAuth + GDPR cookie consent + Firebase Firestore rules for per-owner write access",
        "SEO from day one: structured data (JobPosting, Offer), sitemap, OG per ad, dynamic meta",
        "Zero paid acquisition — built an i18n-first organic funnel",
      ],
      outcome:
        "150 MAU at six months with zero CAC and +200% organic lift via i18n + structured data. Still live and actively growing — iterating on new verticals and growth loops alongside the full-time role.",
      stack: [
        "Svelte 5 (runes)", "SvelteKit 2", "TypeScript strict", "Firebase",
        "Firestore", "Firebase Auth", "Cloud Functions", "Tailwind 4",
        "Google OAuth",
      ],
    },
  },
  {
    no: "05",
    title: "IGELPHONE",
    client: "Solo build · 2024 → ongoing · Full-Stack + Admin",
    blurb:
      "German phone & accessories e-commerce. Built end-to-end solo: storefront, product catalog, cart, checkout flow, plus a full admin panel for inventory, orders, customers and content. Deployed and live at igelphone.de.",
    tags: ["SVELTEKIT", "TYPESCRIPT", "FIREBASE", "STRIPE", "TAILWIND"],
    status: "ONGOING",
    tone: "cyan",
    icon: <Smartphone className="h-6 w-6" />,
    link: "https://www.igelphone.de/de",
    span: "default",
    metrics: [
      { k: "2", v: "apps shipped" },
      { k: "DE", v: "live store" },
      { k: "solo", v: "full-stack" },
    ],
    caseStudy: {
      problem:
        "Small German phone reseller needed a full digital storefront plus an admin tool to manage inventory, orders and content — on a solo-developer budget, shipped fast, bilingual UX, payments ready for EU compliance.",
      approach: [
        "Shipped the public storefront: product catalog, filtering, cart, checkout with Stripe, order confirmation + email flow",
        "Built a separate admin panel app for CRUD on products, pricing, inventory, orders and customers — scoped auth, audit-friendly",
        "Designed bilingual (DE/EN) URL routing with proper hreflang + structured product data for SEO",
        "Firebase Firestore rules + Cloud Functions for secure server-side operations (payment verification, invoice generation)",
        "Owned the entire lifecycle solo: design, infra, deploy pipelines, ongoing feature work",
      ],
      challenges: [
        "EU payments + VAT handling + consent cookies shipped correctly on first launch — no legal rework",
        "Admin panel permissions + role separation without adding a second auth provider",
      ],
      outcome:
        "Live at igelphone.de since 2024 and actively iterated. Store + admin ship from one codebase, one dev. Owner manages the full business day-to-day through the admin panel without dev intervention.",
      stack: [
        "SvelteKit 2", "Svelte 5", "TypeScript", "Firebase",
        "Firestore", "Cloud Functions", "Stripe", "Tailwind",
        "hreflang i18n",
      ],
    },
  },
  {
    no: "06",
    title: "TEODESK_TIMELINE",
    client: "Teodesk · 2020 → 2023 · Full-Stack",
    blurb:
      "Interactive project timeline for a B2B SaaS — advanced multi-select task logic across nested rows. Maintained backend logic and UI consistency across the platform.",
    tags: ["KNOCKOUT.JS", "TAILWIND", "JAVA", "SPRING", "MYSQL"],
    status: "ARCHIVED",
    tone: "amber",
    icon: <Eye className="h-6 w-6" />,
    link: "https://teodesk.com",
    span: "default",
    metrics: [
      { k: "B2B", v: "enterprise SaaS" },
      { k: "multi", v: "select engine" },
    ],
  },
  {
    no: "07",
    title: "ARCADE_SUITE",
    client: "4bees · 2023 · Game / Frontend",
    blurb:
      "Branded browser micro-games for Marlboro and Cocta. Smooth canvas animation work and resilient UI under deadline pressure.",
    tags: ["REACT", "CANVAS3D"],
    status: "DELIVERED",
    tone: "mag",
    icon: <Cpu className="h-6 w-6" />,
    link: "https://4bees.io",
    span: "default",
    metrics: [
      { k: "2", v: "global brands" },
      { k: "60fps", v: "canvas anim" },
    ],
  },
  {
    no: "08",
    title: "RESULT_COUNTER",
    client: "Solo · 2021 → exited",
    blurb:
      "Chrome extension surfacing real Google result counts. Built for friction reduction, scaled to 2,000+ users with no marketing, then sold.",
    tags: ["CHROME_API", "JS"],
    status: "ACQUIRED",
    tone: "acid",
    icon: <Zap className="h-6 w-6" />,
    link: "https://chromewebstore.google.com/detail/google-result-counter/oijjnonbajbomjimdmfchfjadndnhfgp",
    span: "default",
    metrics: [
      { k: "2K+", v: "active users" },
      { k: "exit", v: "acquired" },
    ],
    caseStudy: {
      problem:
        "Google's default 'About X results' is often rounded, throttled or hidden. Power users (SEO, research, OSINT) wanted the real count on every query without extra clicks.",
      approach: [
        "Lightweight MV3 Chrome extension injecting a count chip directly in results",
        "Chrome API only — no external server, no tracking, zero data collection",
        "Shipped to Chrome Web Store, iterated on UX feedback from the first 200 users",
      ],
      outcome:
        "Grew to 2,000+ active users with zero marketing — pure word-of-mouth in SEO communities. Exited via acquisition.",
      stack: ["Vanilla JS", "Chrome Extension APIs (MV3)", "HTML", "CSS"],
    },
  },
  {
    no: "09",
    title: "COR_TECH_UI_MATRIX",
    client: "Cor Tech US LLC · 2020 · UI/UX",
    blurb:
      "B2B storage tracking app for a US client. Custom layouts, BEM design system, Figma-led handoff, full UI build in PHP/HTML/CSS.",
    tags: ["FIGMA", "BEM", "HTML", "CSS", "PHP"],
    status: "ARCHIVED",
    tone: "cyan",
    icon: <Code2 className="h-6 w-6" />,
    span: "default",
    metrics: [
      { k: "B2B", v: "storage app" },
      { k: "BEM", v: "design system" },
    ],
  },
  {
    no: "10",
    title: "PAXHAX",
    client: "Personal · 2022 → ongoing",
    blurb:
      "Working notebook of penetration-testing exercises, tooling notes and responsible-disclosure write-ups. Backed by CompTIA PenTest+ and TryHackMe Jr. Pentester.",
    tags: ["NOTION", "RED_TEAM", "PENTEST+"],
    status: "PUBLIC",
    tone: "mag",
    icon: <Shield className="h-6 w-6" />,
    link: "https://paxhax.notion.site/Ethical-Hacking-14421d1a2d3a45dfbd9fd4dce407f9ee",
    span: "default",
    metrics: [
      { k: "PenTest+", v: "certified" },
      { k: "red team", v: "notes" },
    ],
  },
];

const toneText = {
  cyan: "text-cyan",
  mag: "text-mag",
  acid: "text-acid",
  amber: "text-amber",
  blood: "text-blood",
};
const toneGlow = {
  cyan: "glow-cyan",
  mag: "glow-mag",
  acid: "glow-acid",
  amber: "",
  blood: "glow-blood",
};
const toneBg = {
  cyan: "bg-cyan",
  mag: "bg-mag",
  acid: "bg-acid",
  amber: "bg-amber",
  blood: "bg-blood",
};
const toneBorder = {
  cyan: "border-cyan/60",
  mag: "border-mag/60",
  acid: "border-acid/60",
  amber: "border-amber/60",
  blood: "border-blood/60",
};

export function Selected() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const shippingCount = PROJECTS.filter((p) => ["SHIPPING", "LIVE", "ONGOING"].includes(p.status)).length;

  return (
    <section
      id="selected"
      className="relative py-28 md:py-40 border-t border-rule overflow-hidden"
    >
      <SectionWatermark number="02" side="left" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* NOW-style kinetic hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-cyan glow-cyan">
              &gt;&gt; HOLO_MARKET · CLICK ANY PLATE FOR DEEP_DIVE
            </div>
            <h2 className="mt-2 font-display uppercase text-[11vw] sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.88] tracking-[-0.04em] text-bone">
              <span className="text-cyan glow-cyan italic">/</span>
              <DecodeOnView text="SELECTED_WORK" durationMs={800} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">PLATES</div>
              <div className="mt-1 text-bone num-tab text-lg">
                {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">ACTIVE</div>
              <div className="mt-1 text-acid glow-acid num-tab">
                {String(shippingCount).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-12 gap-4 md:gap-5"
          data-reveal
          style={{ ["--reveal-delay" as any]: "120ms" }}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.no}
              className={
                p.span === "feature"
                  ? "col-span-12 lg:col-span-8 lg:row-span-2"
                  : p.span === "tall"
                  ? "col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2"
                  : p.span === "wide"
                  ? "col-span-12 lg:col-span-8"
                  : "col-span-12 md:col-span-6 lg:col-span-4"
              }
            >
              <Plate project={p} onOpen={() => setOpenProject(p)} />
            </div>
          ))}
        </div>
      </div>

      <CaseDrawer project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}

function Plate({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const minH =
    project.span === "feature"
      ? "min-h-[500px] lg:min-h-[600px]"
      : project.span === "tall"
      ? "min-h-[500px] lg:min-h-[600px]"
      : project.span === "wide"
      ? "min-h-[320px]"
      : "min-h-[400px]";

  const isFeature = project.span === "feature" || project.span === "tall";

  // Tone color — use CSS var so theme swaps cascade. color-mix gives alpha
  // variants with a single source. Supported in all modern browsers.
  const hex = `var(--tone-${project.tone}-hex)`;
  const alpha = (pct: number) => `color-mix(in srgb, ${hex} ${pct}%, transparent)`;

  // generate fake binary ID per project
  const id = `0x${project.no.padStart(2, "0")}${(project.title.length).toString(16).toUpperCase().padStart(2, "0")}A${project.tone[0].toUpperCase()}`;

  return (
    <HoloCard tone={hex} className={`group h-full ${minH}`}>
      <div className="relative block h-full">
        {/* card-wide click target — opens drawer */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open deep dive for ${project.title}`}
          className="absolute inset-0 z-30 cursor-pointer"
        />
        {/* OUTER NOTCHED FRAME — neon edge */}
        <div
          className={`absolute inset-0 clip-2077 transition-all duration-300 group-hover:opacity-100 opacity-70`}
          style={{
            background: `linear-gradient(135deg, ${hex} 0%, transparent 30%, transparent 70%, ${hex} 100%)`,
          }}
        />
        {/* INNER SURFACE — sits 1px inside neon edge */}
        <div
          className="absolute inset-[1px] clip-2077 bg-deck/95 backdrop-blur-sm overflow-hidden flex flex-col"
        >
          {/* tone gradient wash */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${alpha(9)} 0%, transparent 45%), radial-gradient(circle at 0% 100%, ${alpha(6)} 0%, transparent 50%)`,
            }}
          />

          {/* HUD STRIP TOP */}
          <div
            className="relative z-20 flex items-center justify-between gap-3 px-5 md:px-6 py-2.5 border-b"
            style={{ borderColor: alpha(20) }}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* hex chevron + ID */}
              <div className="flex items-center gap-2 shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0" style={{ color: hex }}>
                  <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" />
                </svg>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em] num-tab"
                  style={{ color: hex }}
                >
                  ID/{id}
                </span>
              </div>
              <span className="hidden sm:inline-block w-px h-3 bg-rule-strong shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade truncate">
                {project.client}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* hatched status block */}
              <span
                className="hidden md:inline-block h-3 w-6 hatch"
                style={{ color: hex }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.24em] glow-cyan"
                style={{ color: hex, textShadow: `0 0 6px ${alpha(60)}` }}
              >
                ▸ {project.status}
              </span>
            </div>
          </div>

          {/* DIAGRAM CANVAS */}
          <div className="relative flex-1 overflow-hidden">
            {/* technical grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(${alpha(19)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(19)} 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            {/* watermark diagram */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-35 group-hover:opacity-65"
              style={{ color: hex }}
            >
              <div className="absolute inset-0 p-6 md:p-8">
                {DiagramFor(project.title)}
              </div>
            </div>

            {/* corner readouts */}
            <div className="absolute top-3 right-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-fade">
              <span>CH.{(project.no.charCodeAt(0) % 9) + 1}</span>
              <span style={{ color: hex }}>•</span>
              <span>{(parseInt(project.no, 10) * 23) % 99}.{(parseInt(project.no, 10) * 7) % 9}MHZ</span>
            </div>
            <div className="absolute bottom-3 left-5 font-mono text-[9px] uppercase tracking-[0.22em] text-fade">
              SCAN_OK <span className="text-acid">●</span>
            </div>

            {/* metrics float (always visible on feature, hover on others) */}
            {project.metrics && (
              <ul
                className={`absolute right-4 md:right-5 ${
                  isFeature ? "top-12" : "top-10"
                } flex flex-col items-end gap-2`}
              >
                {project.metrics.map((m) => (
                  <li
                    key={m.k}
                    className="text-right border-r-2 pr-2.5"
                    style={{ borderColor: hex }}
                  >
                    <div
                      className={`font-zen ${
                        isFeature ? "text-xl md:text-2xl" : "text-base md:text-lg"
                      } leading-none num-tab`}
                      style={{ color: hex, textShadow: `0 0 8px ${alpha(60)}` }}
                    >
                      {m.k}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ash whitespace-nowrap">
                      {m.v}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TITLE + BLURB STRIP */}
          <div
            className="relative z-10 px-5 md:px-6 pt-3 pb-4 border-t"
            style={{ borderColor: alpha(20) }}
          >
            <h3
              className={`font-display uppercase leading-[0.94] tracking-tight transition-colors text-bone break-words ${
                project.span === "feature"
                  ? "text-3xl md:text-4xl lg:text-[2.6rem]"
                  : project.span === "tall"
                  ? "text-2xl md:text-[1.6rem]"
                  : "text-xl md:text-2xl"
              }`}
            >
              {project.title.split("_").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span style={{ color: hex }}>_</span>
                  )}
                </span>
              ))}
            </h3>
            <p
              className={`mt-2 text-ash text-pretty ${
                isFeature ? "text-[13.5px]" : "text-[12.5px]"
              } line-clamp-3`}
            >
              {project.blurb}
            </p>
          </div>

          {/* FOOTER STRIP */}
          <div
            className="relative z-10 px-5 md:px-6 py-3 border-t flex items-center justify-between gap-3"
            style={{ borderColor: alpha(20) }}
          >
            <ul className="flex flex-wrap gap-1.5 min-w-0">
              {project.tags.slice(0, isFeature ? 5 : 3).map((t) => (
                <li
                  key={t}
                  className="clip-tag px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone"
                  style={{
                    background: alpha(10),
                    color: hex,
                  }}
                >
                  {t}
                </li>
              ))}
              {project.tags.length > (isFeature ? 5 : 3) && (
                <li className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-fade py-0.5">
                  +{project.tags.length - (isFeature ? 5 : 3)}
                </li>
              )}
            </ul>

            <div className="relative z-40 flex items-center gap-1.5 shrink-0">
              <span
                className="clip-cta inline-flex items-center gap-1.5 pl-5 pr-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] font-bold border"
                style={{ borderColor: alpha(40), color: hex, background: alpha(8) }}
              >
                <FileSearch className="h-3 w-3" />
                DETAIL
              </span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="clip-cta inline-flex items-center gap-1.5 pl-5 pr-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] font-bold transition-all hover:translate-x-0.5"
                  style={{ background: hex, color: "#050507" }}
                >
                  VISIT
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* OUTER NEON EDGES — top-right + bottom-left highlight */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-px w-12"
          style={{
            background: `linear-gradient(90deg, transparent, ${hex})`,
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-px w-12"
          style={{
            background: `linear-gradient(90deg, ${hex}, transparent)`,
          }}
        />
      </div>
    </HoloCard>
  );
}
