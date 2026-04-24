import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Manifesto";

type Project = {
  no: string;
  title: string;
  client: string;
  blurb: string;
  tags: string[];
  status: string;
  link?: string;
  span: "wide" | "tall" | "default" | "feature";
};

const PROJECTS: Project[] = [
  {
    no: "01",
    title: "Cybergrid Platform",
    client: "INVT — 2025 →",
    blurb:
      "Backend work across the gateway, MQTT and platform services that route control messages for grid-scale energy operators.",
    tags: ["Spring Boot", "Modulith", "TimescaleDB", "ArgoCD"],
    status: "On wire",
    link: "https://www.cyber-grid.com",
    span: "feature",
  },
  {
    no: "02",
    title: "Collabwriting Nexus",
    client: "Colabwriting — 2023→25",
    blurb:
      "Research SaaS: highlight engine rebuilt four times, custom PDF viewer, social scrapers, Kindle sync, fuzzy AI search.",
    tags: ["SvelteKit", "Spring", "MySQL"],
    status: "Live",
    link: "https://collabwriting.com",
    span: "tall",
  },
  {
    no: "03",
    title: "Gastarbajter24",
    client: "Solo founder — 2024",
    blurb:
      "Classifieds marketplace for the Balkan diaspora in Germany. Five verticals, multilingual, 150 MAU at zero CAC.",
    tags: ["Svelte 5", "Firebase", "TypeScript"],
    status: "Shipped",
    link: "https://www.gastarbajter24.de/",
    span: "default",
  },
  {
    no: "04",
    title: "Teodesk Timeline",
    client: "Teodesk — 2020→23",
    blurb:
      "Interactive project timeline with advanced multi-select task logic.",
    tags: ["Knockout.js", "Spring", "MySQL"],
    status: "Archived",
    link: "https://teodesk.com",
    span: "default",
  },
  {
    no: "05",
    title: "Branded Arcade Suite",
    client: "4bees — 2023",
    blurb:
      "Browser micro-games for Marlboro and Cocta. Animation-heavy, deadline-tight.",
    tags: ["React", "Canvas3D"],
    status: "Delivered",
    link: "https://4bees.io",
    span: "default",
  },
  {
    no: "06",
    title: "Google Result Counter",
    client: "Solo · acquired",
    blurb:
      "Chrome extension showing Google's true result counts. Built, scaled to 2k+ users, and sold.",
    tags: ["Chrome API", "JS"],
    status: "Acquired",
    link: "https://chromewebstore.google.com/detail/google-result-counter/oijjnonbajbomjimdmfchfjadndnhfgp",
    span: "default",
  },
  {
    no: "07",
    title: "Cor Tech UI Matrix",
    client: "Cor Tech Group US LLC — 2020",
    blurb:
      "B2B storage tracking app: BEM layout system, Figma-led handoff.",
    tags: ["Figma", "BEM", "PHP"],
    status: "Archived",
    span: "default",
  },
  {
    no: "08",
    title: "Paxhax",
    client: "Personal · 2022 →",
    blurb:
      "Hands-on guides on penetration testing, tooling and responsible disclosure.",
    tags: ["Notion", "Red Team"],
    status: "Public",
    link: "https://paxhax.notion.site/Ethical-Hacking-14421d1a2d3a45dfbd9fd4dce407f9ee",
    span: "wide",
  },
];

export function Selected() {
  return (
    <section
      id="selected"
      className="relative py-24 md:py-32 border-t border-rule bg-ink-2"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHeader
          index="02"
          eyebrow="Plates"
          title="Selected work"
          trailing={`08 plates · client + solo`}
        />

        <div className="mt-14 grid grid-cols-12 gap-px bg-rule-strong border border-rule-strong">
          {PROJECTS.map((p) => (
            <Plate key={p.no} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Plate({ project }: { project: Project }) {
  const span =
    project.span === "feature"
      ? "col-span-12 lg:col-span-8 lg:row-span-2 min-h-[420px] lg:min-h-[520px]"
      : project.span === "tall"
      ? "col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2 min-h-[420px] lg:min-h-[520px]"
      : project.span === "wide"
      ? "col-span-12 md:col-span-12 lg:col-span-8 min-h-[260px]"
      : "col-span-12 md:col-span-6 lg:col-span-4 min-h-[260px]";

  const Wrapper: any = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? { href: project.link, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group relative flex flex-col justify-between bg-ink p-6 md:p-8 transition-colors hover:bg-ink-2 ${span}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute num-tab">
          № {project.no}
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-acid acid-glow" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper-dim">
            {project.status}
          </span>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
          {project.client}
        </div>
        <h3
          className={`mt-3 font-display text-paper leading-[0.96] tracking-tight ${
            project.span === "feature"
              ? "text-5xl md:text-7xl lg:text-[5.5rem]"
              : project.span === "tall"
              ? "text-4xl md:text-5xl"
              : "text-3xl md:text-4xl"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-5 text-paper-dim text-pretty ${
            project.span === "feature" ? "text-lg max-w-xl" : "text-[15px] max-w-md"
          }`}
        >
          {project.blurb}
        </p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li
              key={t}
              className="border border-rule-strong px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-dim"
            >
              {t}
            </li>
          ))}
        </ul>

        {project.link && (
          <div className="mt-8 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper transition-colors group-hover:text-acid">
            Open the file
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        )}
      </div>

      <span className="corner-mark tl" />
      <span className="corner-mark tr" />
      <span className="corner-mark bl" />
      <span className="corner-mark br" />
    </Wrapper>
  );
}
