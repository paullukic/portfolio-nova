import type { Project } from "./types";

// SELECTED_WORK plates, in display order. Grid spans are tuned so the 12-col
// grid fills without holes: feature(8x2) + tall(4x2), tall(4x2) + 4 defaults,
// default + wide(8).
//
// Facts come from the product repos (README / AGENTS / store listing) and
// Paul's CV; see openspec/changes/2026-10-23-portfolio-nova-merge/research.md.
export const projects: Project[] = [
  {
    id: "coograph",
    press: { label: "COOGRAPH", sub: "OSS · 2026—NOW" },
    title: "COOGRAPH",
    short: "COOGRAPH",
    kind: "oss",
    client: "OSS · 2026 → ongoing · Solo author",
    blurb:
      "Open-source toolkit that helps AI coding assistants find the right code without reading the whole repo. One workflow, eight tools (Claude Code, Copilot, Codex CLI, OpenCode, Cursor, Devin Desktop, Aider, Cline). A SQLite + tree-sitter code graph served over MCP replaces grep-then-read with targeted dependency queries. Ships specialized agents, Claude Code lifecycle hooks and the OpenSpec proposal flow.",
    tags: ["MCP", "SQLITE", "TREE_SITTER", "PYTHON", "CLAUDE_CODE", "OPENSPEC", "MIT"],
    status: "LIVE",
    tone: "blood",
    diagram: "graph",
    link: "https://coograph.com",
    span: "feature",
    // Star count is a GitHub snapshot (2026-10-26); bump it by hand.
    metrics: [
      { k: "8", v: "AI tools wired" },
      { k: "17★", v: "github stars" },
      { k: "MIT", v: "open source" },
    ],
    caseStudy: {
      problem:
        "AI coding assistants brute-force the codebase: grep a symbol, get dozens of hits, read file after file before doing useful work. Every tool (Claude Code, Copilot, Codex, Cursor and the rest) needs its own config, so one workflow fragments into eight half-finished setups, and outputs cite symbols the codebase never exports.",
      approach: [
        "Built one config layout that ships native invocation for all eight major AI coding tools: same workflow, same agent definitions, same skills, installed via /coograph-init",
        "Wrote a standalone Python MCP server that parses the workspace into a SQLite dependency graph via tree-sitter, updated incrementally on every commit via git hooks",
        "Designed five specialized agents (Planner, Reviewer, Debugger, Verifier, Explore) with hard anti-hallucination rules: every finding cites a verbatim quote from a fresh read, the graph is queried before any file read, three-retry circuit breakers on fixes",
        "Shipped Claude Code lifecycle hooks that block edits to generated files, log every bash command to an audit trail, warn on out-of-scope edits and report graph state at session start",
        "Added the OpenSpec workflow (Plan → Propose → Apply → Review → Archive) with a project-sync layer so template updates reach every registered project",
        "Built an interactive D3 force-directed visualizer so users can see what the agent sees before they trust it",
        "Built coograph-testbed, a separate end-to-end suite that installs the code graph into real Python, TypeScript/React, Go and Java projects and checks what it finds, run after every graph change",
      ],
      challenges: [
        "No single command works across all eight tools: each registers custom workflows differently (slash commands, $-prefixed skills, rules files, plugin events), so eight invocation paths converge on the same agent procedures",
        "Some tools expose no pre-tool-use hook API, so the audit-log feature is honest about partial coverage rather than faking it",
        "Cross-platform append safety for the audit log: lines from concurrent agents interleave at line boundaries on both POSIX and NTFS",
      ],
      outcome:
        "Live at coograph.com, MIT-licensed, with docs, a public roadmap and a Pro tier. The README's worked example shows the point: a graph query surfaces the four relevant files in about 2K tokens, where grep-and-read burns about 50K.",
      stack: [
        "Python", "SQLite", "tree-sitter", "MCP (Model Context Protocol)",
        "D3", "Claude Code hooks", "OpenSpec", "Git hooks",
        "TypeScript (OpenCode plugin)", "TOML (Codex config)", "Markdown",
      ],
    },
  },
  {
    id: "grid-platform",
    title: "GRID_CONTROL_PLATFORM",
    short: "GRID_CTRL",
    kind: "employment",
    client: "INVT · Dec 2025 → present · Software Engineer",
    blurb:
      "This platform lets grid operators (TSOs) control distributed energy assets. At INVT I work on the Spring/Modulith services that route those control messages. Shipped a protocol fix that corrected downstream aggregation, restored device geo-metadata and rolled JVM metrics across the platform. Now leading a multi-repo WebClient → RestClient migration.",
    tags: ["SPRING_BOOT", "MODULITH", "TIMESCALEDB", "RABBITMQ", "ARGOCD", "TERRAFORM", "KEYCLOAK"],
    status: "SHIPPING",
    tone: "cyan",
    diagram: "grid",
    link: "https://invt.tech",
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
        "No public test harness for TSO message shapes: reverse-engineered from captured prod traffic + vendor specs",
        "Multi-repo migration coordination: each service had its own release cadence and test stack",
      ],
      outcome:
        "Aggregation bug eliminated in production, device geo-metadata restored, observability now standard across the platform. Migration ongoing across remaining services with a documented pattern.",
      stack: [
        "Java 21", "Spring Boot 3", "Spring Modulith", "TimescaleDB", "PostgreSQL",
        "RabbitMQ", "MQTT", "Keycloak", "Micrometer", "Grafana", "ArgoCD",
        "Terraform", "Kubernetes", "Docker",
      ],
    },
  },
  {
    id: "metaspry",
    press: { label: "METASPRY", sub: "SOLO · SAAS · LIVE" },
    title: "METASPRY",
    short: "METASPRY",
    kind: "product",
    client: "Solo founder · 2023 → ongoing · Product + Eng",
    blurb:
      "SEO and social meta-tag auditor. A free Chrome extension scans any page in one click: every meta tag, share-card previews, a weighted 0-100 score across 19 rules, robots.txt / sitemap / llms.txt, JSON-LD and an AI-readiness checklist. A paid web app adds cloud history, bulk audits, drift monitoring with email and Slack alerts, and team workspaces.",
    tags: ["SVELTEKIT_2", "SVELTE_5", "FIREBASE", "CHROME_MV3", "ASTRO", "LEMON_SQUEEZY", "TAILWIND"],
    status: "LIVE",
    tone: "acid",
    diagram: "audit",
    link: "https://metaspry.com",
    span: "tall",
    metrics: [
      { k: "19", v: "weighted audit rules" },
      { k: "3", v: "apps · ext + saas + site" },
      { k: "solo", v: "built + run" },
    ],
    caseStudy: {
      problem:
        "Checking how a page will look when shared, and whether its meta, robots, sitemap and structured data are right, means juggling a different debugger per platform. Teams also have no way to notice when a deploy silently breaks those tags.",
      approach: [
        "Free Chrome extension (side panel or popup): Tags, Previews, Audit, Site, AI and Compare tabs, keyboard-driven, local-first with no telemetry",
        "Weighted 0-100 audit across 19 rules, including a live og:image dimension check and the X-Robots-Tag header",
        "Fetches and parses robots.txt, sitemap.xml (with sitemap-index expansion and fallback paths) and llms.txt from the page's own host",
        "Paid SvelteKit + Firebase web app: cloud scan history, single and bulk server-side audits, daily drift monitoring with email and Slack alerts, folders, tasks, custom scoring rules and team workspaces billed through Lemon Squeezy",
        "Astro marketing site with docs, blog, comparison pages and a public roadmap built from GitHub issues",
      ],
      outcome:
        "Live: extension on the Chrome Web Store, app at app.metaspry.com, free extension plus Pro from $19/mo. Designed, built and operated solo across all three codebases.",
      stack: [
        "SvelteKit 2", "Svelte 5", "TypeScript", "Tailwind 4", "Chrome MV3",
        "Firebase Auth", "Firestore", "Cloud Functions", "Lemon Squeezy", "Astro 5", "MDX",
      ],
    },
  },
  {
    id: "dbuddy",
    press: { label: "DBUDDY", sub: "CHROME_EXT · LIVE" },
    title: "DBUDDY",
    short: "DBUDDY",
    kind: "product",
    client: "Solo · 2025 → ongoing · Chrome extension",
    blurb:
      "Chrome extension that makes duelingbook.com look and play the way you want: 82 animated themes with per-theme attack effects, duel hotkeys, a middle-click pile wheel, turn alerts, replays, chat tools, test hands with opening odds and optional foil card finishes. Never changes game rules, collects no data.",
    tags: ["REACT", "CHROME_MV3", "SHADOW_DOM", "WEBPACK", "CLOUDFLARE_WORKERS"],
    status: "LIVE",
    tone: "mag",
    diagram: "cards",
    link: "https://chromewebstore.google.com/detail/fpehmkbiafgdeaheeehcbpgahmlkolac",
    span: "default",
    metrics: [
      { k: "82", v: "animated themes" },
      { k: "327", v: "users · oct 2026" },
    ],
    caseStudy: {
      problem:
        "DuelingBook is a browser card-game client with a fixed look and no quality-of-life tooling: no themes, no hotkeys, no turn alerts while you wait in another tab.",
      approach: [
        "Mounted the whole UI in a shadow root so the extension's styles and the site's never collide",
        "A page-world bridge reads public duel state (players, whose turn, phase) without touching game logic",
        "Full theme engine: tokens, presets and per-area stylesheets for every screen, shareable theme codes, custom CSS, reduced-motion aware",
        "Duel tools: hotkeys, a middle-click pile wheel, turn and duel-found alerts, auto-reconnect, replays, an action log and FPS / lag readout",
        "Every page effect undoes itself when switched off; pure logic covered by a node:test suite and Playwright smoke / bench tooling",
      ],
      outcome:
        "Live on the Chrome Web Store at v2.1.0 with 327 users (store count, October 2026). Optional Discord connect runs through a small Cloudflare Worker.",
      stack: ["React 18", "Chrome Extensions (MV3)", "Shadow DOM", "webpack", "Cloudflare Workers", "Playwright", "node:test"],
    },
  },
  {
    id: "liftorra",
    press: { label: "LIFTORRA", sub: "BUILDING · 2026" },
    title: "LIFTORRA",
    short: "LIFTORRA",
    kind: "product",
    client: "Founder · 2026 → building now · Web + mobile",
    blurb:
      "In progress: a social workout app. Log your lifts, see yourself get stronger, and train with the people who keep you honest. Fast set logging, automatic PRs, a weekly plan that writes itself, and friends and groups with per-item privacy. One codebase family for an installable web app and a native phone app.",
    tags: ["SVELTEKIT_5", "EXPO", "REACT_NATIVE", "FIREBASE", "TYPESCRIPT", "TAILWIND"],
    status: "BUILDING",
    tone: "amber",
    diagram: "lifts",
    link: "https://liftorra.com",
    span: "default",
    metrics: [
      { k: "WIP", v: "building now" },
      { k: "2", v: "apps · pwa + native" },
    ],
    caseStudy: {
      problem:
        "People who train with weights log in Notion, notes or spreadsheets: too many taps mid-set, no sense of progress without manual formulas, and sharing a session means a screenshot in a group chat.",
      approach: [
        "npm-workspaces monorepo: a SvelteKit 5 PWA, an Expo (React Native) app and Firebase Cloud Functions sharing one TypeScript core (zod schemas, Firestore paths, workout logic, design tokens)",
        "Designed around two-tap set logging with previous values prefilled and shorthand like 10x40",
        "Automatic PR detection (heaviest weight, best estimated 1RM, best session volume) and per-exercise history",
        "Social by default, private by choice: friends, groups and challenges, with a visibility level on every workout and profile",
        "Firestore security rules tested on the emulator",
      ],
      outcome:
        "Not launched yet. liftorra.com and the web app are up while the MVP is built out; app-store releases come later.",
      stack: ["SvelteKit 5", "Svelte runes", "Tailwind 4", "Expo", "expo-router", "Firebase", "Cloud Functions (2nd gen)", "zod", "TypeScript"],
    },
  },
  {
    id: "cluing",
    title: "CLUING",
    short: "CLUING",
    kind: "employment",
    client: "Cluing (ex-Collabwriting) · 2022 → 2025 · Full-Stack + Mentor",
    blurb:
      "Research app that lets readers highlight and search what they read across the web, PDFs and Kindle (rebranded from Collabwriting to Cluing). Rebuilt the core highlight engine four times chasing peak performance, shipped a custom PDF viewer with CORS bypass, social scrapers (Reddit/X/Quora/YT/LinkedIn), Kindle notes sync, Tiptap editor, fuzzy AI search and a theming system. Mentored juniors and set long-term code quality direction.",
    tags: ["SVELTEKIT", "SPRING", "MYSQL", "SENTRY"],
    status: "LIVE",
    tone: "mag",
    diagram: "highlight",
    link: "https://www.cluing.io/",
    span: "default",
    metrics: [
      { k: "4×", v: "engine rebuilds" },
      { k: "PDF", v: "custom viewer" },
    ],
    caseStudy: {
      problem:
        "Research SaaS for serious readers. The core highlight engine had hit performance walls at scale, PDF support relied on third-party viewers that broke under CORS constraints, and the product had to pull data from a wide and messy surface (Reddit, X, Quora, YT, LinkedIn, Kindle).",
      approach: [
        "Rebuilt the text-highlight engine four times; each rewrite targeted a specific bottleneck (DOM traversal, range persistence, virtualized rendering, async re-anchoring)",
        "Shipped a custom PDF viewer with a CORS bypass strategy so in-app highlighting worked on arbitrary external PDFs",
        "Built social scrapers (Reddit / X / Quora / YT / LinkedIn) with rate-limit handling and consistent normalization",
        "Integrated Kindle notes sync, Tiptap editor, fuzzy AI search across the user's corpus and a full theming system",
        "Mentored two juniors to mid-level, owned long-term code-quality direction and migration patterns",
      ],
      challenges: [
        "Highlight anchoring across reflowing DOMs, solved via resilient range fingerprinting",
        "PDFs served without CORS: the bypass pipeline had to be secure, cacheable and fast",
      ],
      outcome:
        "Product rebranded from Collabwriting to Cluing and shipped its most performant highlight engine yet. Left the team with internal tooling and mentorship patterns it adopted.",
      stack: [
        "SvelteKit 2", "Svelte 5", "TypeScript", "Spring Boot", "Java",
        "MySQL", "Tiptap", "PDF.js", "Sentry", "Tailwind",
      ],
    },
  },
  {
    id: "gastarbajter24",
    press: { label: "GASTARBAJTER24", sub: "SOLO · 2023—NOW" },
    title: "GASTARBAJTER24",
    short: "GASTARBAJTER24",
    kind: "product",
    client: "Technical consultant · 2023 → ongoing · Sole engineer",
    blurb:
      "Classifieds marketplace for the Balkan diaspora in Germany. Five listing verticals, trilingual UX (DE/EN/SR), Google OAuth, GDPR cookie consent, SSR meta. Still actively iterating: new verticals, deliverability, growth loops.",
    tags: ["SVELTE_5", "SVELTEKIT_2", "FIREBASE", "TYPESCRIPT", "TAILWIND"],
    status: "ONGOING",
    tone: "acid",
    diagram: "map",
    link: "https://www.gastarbajter24.de/",
    span: "default",
    metrics: [
      { k: "150", v: "MAU · zero CAC" },
      { k: "+200%", v: "organic lift" },
    ],
    caseStudy: {
      problem:
        "The Balkan diaspora in Germany had no dedicated classifieds platform: ads were scattered across Facebook groups with zero search, trust or structure. Built solo in evenings alongside a full-time role.",
      approach: [
        "Designed five listing verticals (jobs, housing, transport, services, items) with a shared core + vertical-specific fields",
        "Shipped trilingual UX (DE / EN / SR-latn) with SSR meta per locale and proper hreflang",
        "Google OAuth + GDPR cookie consent + Firestore rules for per-owner write access",
        "SEO from day one: structured data (JobPosting, Offer), sitemap, OG per ad, dynamic meta",
        "Zero paid acquisition: an i18n-first organic funnel",
      ],
      outcome:
        "150 MAU at six months with zero CAC and +200% organic lift via i18n + structured data. Still live and actively growing.",
      stack: [
        "Svelte 5 (runes)", "SvelteKit 2", "TypeScript strict", "Firebase",
        "Firestore", "Firebase Auth", "Cloud Functions", "Tailwind 4",
        "Google OAuth",
      ],
    },
  },
  {
    id: "igelphone",
    title: "IGELPHONE",
    short: "IGELPHONE",
    kind: "client",
    client: "IGEL Phone Germany · Aug 2025 → ongoing · Senior Technical Consultant",
    blurb:
      "Web product for IGEL Phone, a German phone and accessories reseller. Architected and shipped it end to end as a freelance consultant: a Next.js frontend, a Sanity content studio and Firebase serverless functions, with multilingual, accessible UI. Live at igelphone.de.",
    tags: ["NEXT.JS", "SANITY", "FIREBASE", "TYPESCRIPT"],
    status: "ONGOING",
    tone: "cyan",
    diagram: "shop",
    link: "https://www.igelphone.de/de",
    span: "default",
    metrics: [
      { k: "CMS", v: "sanity studio" },
      { k: "DE", v: "live site" },
    ],
    caseStudy: {
      problem:
        "A German phone reseller needed a fast, multilingual web presence whose content the team could run without a developer for every change.",
      approach: [
        "Architected the stack: a Next.js frontend, a Sanity content studio and Firebase serverless functions",
        "Designed the CMS content models and the typed data flows from studio to page",
        "Led the design and build of multilingual, accessible UIs",
        "Built the serverless workflows behind the site's content-driven operations",
        "Tuned for performance and long-term maintainability",
      ],
      outcome:
        "Live at igelphone.de and still iterated as an ongoing freelance engagement since August 2025.",
      stack: ["Next.js", "React", "Sanity", "Firebase", "Cloud Functions", "TypeScript"],
    },
  },
  {
    id: "result-counter",
    title: "RESULT_COUNTER",
    short: "GOOGLE_RESULT_COUNTER",
    kind: "product",
    client: "Solo · 2021 → exited",
    blurb:
      "Chrome extension surfacing real Google result counts. Built for friction reduction, scaled to 2,000+ users with no marketing, then sold.",
    tags: ["CHROME_API", "JS"],
    status: "ACQUIRED",
    tone: "acid",
    diagram: "spike",
    link: "https://chromewebstore.google.com/detail/google-result-counter/oijjnonbajbomjimdmfchfjadndnhfgp",
    span: "wide",
    metrics: [
      { k: "2K+", v: "active users" },
      { k: "exit", v: "acquired" },
    ],
    caseStudy: {
      problem:
        "Google's 'About X results' is often rounded, throttled or hidden. Power users (SEO, research, OSINT) wanted the real count on every query without extra clicks.",
      approach: [
        "Lightweight Chrome extension injecting a count chip directly into results",
        "Chrome APIs only: no external server, no tracking, zero data collection",
        "Shipped to the Chrome Web Store and iterated on UX feedback from the first 200 users",
      ],
      outcome:
        "Grew to 2,000+ active users with zero marketing, pure word of mouth in SEO communities. Exited via acquisition.",
      stack: ["Vanilla JS", "Chrome Extension APIs", "HTML", "CSS"],
    },
  },
];

/** Products Paul builds and runs himself (not client or employment work). */
export const products = projects.filter((p) => p.kind === "product" || p.kind === "oss");
