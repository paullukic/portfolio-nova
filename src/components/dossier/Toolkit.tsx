import { SectionHeader } from "./Manifesto";

const COLUMNS: { label: string; items: { name: string; weight?: 1 | 2 | 3 }[] }[] = [
  {
    label: "Backend",
    items: [
      { name: "Java", weight: 3 },
      { name: "Spring Boot", weight: 3 },
      { name: "Modulith", weight: 2 },
      { name: "PostgreSQL", weight: 2 },
      { name: "TimescaleDB", weight: 1 },
      { name: "MySQL", weight: 2 },
      { name: "Firebase", weight: 2 },
      { name: "RabbitMQ", weight: 1 },
      { name: "Redis", weight: 1 },
      { name: "Keycloak", weight: 1 },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React 19", weight: 3 },
      { name: "Svelte 5", weight: 3 },
      { name: "SvelteKit 2", weight: 2 },
      { name: "Knockout.js", weight: 1 },
      { name: "Redux", weight: 1 },
      { name: "Tailwind", weight: 3 },
      { name: "Bootstrap", weight: 1 },
      { name: "Less / BEM", weight: 1 },
      { name: "Canvas", weight: 1 },
      { name: "HTML / CSS", weight: 3 },
    ],
  },
  {
    label: "Languages",
    items: [
      { name: "TypeScript", weight: 3 },
      { name: "JavaScript", weight: 3 },
      { name: "Java", weight: 3 },
      { name: "Python", weight: 1 },
      { name: "PHP", weight: 1 },
      { name: "Bash", weight: 1 },
      { name: "SQL", weight: 2 },
    ],
  },
  {
    label: "Infra & Ops",
    items: [
      { name: "Docker", weight: 2 },
      { name: "ArgoCD", weight: 2 },
      { name: "Terraform", weight: 1 },
      { name: "Maven", weight: 2 },
      { name: "Git", weight: 3 },
      { name: "Vercel", weight: 1 },
      { name: "Sentry", weight: 1 },
      { name: "Glitchtip", weight: 1 },
    ],
  },
  {
    label: "Practices",
    items: [
      { name: "Mentorship", weight: 2 },
      { name: "Code review", weight: 3 },
      { name: "OpenAPI / contracts", weight: 2 },
      { name: "Testing strategy", weight: 2 },
      { name: "Observability", weight: 2 },
      { name: "SEO / a11y", weight: 1 },
      { name: "AI tooling — Claude / Copilot / Gemini", weight: 2 },
      { name: "Pen-testing (PenTest+)", weight: 1 },
    ],
  },
];

const weightClass = (w?: number) =>
  w === 3 ? "text-paper" : w === 2 ? "text-paper-dim" : "text-mute";
const weightSize = (w?: number) =>
  w === 3 ? "text-2xl md:text-3xl" : w === 2 ? "text-xl md:text-2xl" : "text-lg md:text-xl";

export function Toolkit() {
  return (
    <section
      id="toolkit"
      className="relative py-24 md:py-32 border-t border-rule"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHeader
          index="03"
          eyebrow="Inventory"
          title="Toolkit"
          trailing="Weighted by current use · 2026"
        />

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.label}>
              <div className="border-t border-paper pt-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.32em] text-acid">
                    {col.label}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute num-tab">
                    {String(col.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="mt-5 space-y-1.5">
                  {col.items.map((it) => (
                    <li
                      key={it.name}
                      className={`font-display ${weightSize(it.weight)} ${weightClass(it.weight)} leading-[1.1] tracking-tight transition-colors hover:text-acid`}
                    >
                      {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 border-t border-rule pt-10">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
              Schooling
            </div>
            <p className="mt-3 font-display text-2xl text-paper leading-snug">
              Information Technology Technician
            </p>
            <p className="mt-1 text-paper-dim text-[14px]">
              Secondary School Krupanj · Graduated 2013
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
              Certifications
            </div>
            <p className="mt-3 font-display text-2xl text-paper leading-snug">
              CompTIA PenTest+
            </p>
            <p className="mt-1 text-paper-dim text-[14px]">
              + TryHackMe Jr. Penetration Tester
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
              Languages
            </div>
            <p className="mt-3 font-display text-2xl text-paper leading-snug">
              Serbian <span className="text-mute">— native</span>
            </p>
            <p className="mt-1 font-display text-2xl text-paper leading-snug">
              English <span className="text-mute">— proficient</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
