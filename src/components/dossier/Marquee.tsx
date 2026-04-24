const TOKENS = [
  "Java",
  "Spring Boot",
  "Modulith",
  "PostgreSQL",
  "TimescaleDB",
  "RabbitMQ",
  "Redis",
  "Keycloak",
  "Docker",
  "Terraform",
  "ArgoCD",
  "React 19",
  "Svelte 5 / SvelteKit 2",
  "TypeScript",
  "Tailwind",
  "Firebase",
  "MySQL",
  "Knockout.js",
  "Canvas",
  "Sentry",
  "Glitchtip",
  "Vite",
  "Maven",
  "Figma",
  "CompTIA PenTest+",
  "TryHackMe Jr. Pentester",
];

export function Marquee() {
  const row = TOKENS.concat(TOKENS); // duplicate for seamless loop
  return (
    <section
      aria-hidden
      className="relative border-y border-rule-strong bg-ink-2 py-4 overflow-hidden"
    >
      <div className="marquee flex w-max items-center gap-10 font-mono text-[11px] uppercase tracking-[0.28em] text-paper-dim whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="hover:text-acid transition-colors">{t}</span>
            <Diamond />
          </span>
        ))}
      </div>
    </section>
  );
}

function Diamond() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" className="text-acid shrink-0">
      <rect x="3" y="0" width="4.24" height="4.24" transform="rotate(45 3 3)" fill="currentColor" />
    </svg>
  );
}
