import type { Tone } from "./types";

export type SkillCategory = {
  id: "backend" | "frontend" | "languages" | "infra" | "practices";
  label: string;
  tone: Exclude<Tone, "blood">;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    id: "backend",
    label: "BACKEND",
    tone: "cyan",
    items: [
      "JAVA", "SPRING_BOOT", "MODULITH", "POSTGRESQL", "TIMESCALEDB",
      "MYSQL", "FIREBASE", "RABBITMQ", "REDIS", "KEYCLOAK", "LARAVEL",
    ],
  },
  {
    id: "frontend",
    label: "FRONTEND",
    tone: "mag",
    items: [
      "REACT_19", "SVELTE_5", "SVELTEKIT_2", "TAILWIND", "ASTRO",
      "EXPO / REACT_NATIVE", "CHROME_EXTENSIONS", "KNOCKOUT.JS", "CANVAS",
    ],
  },
  {
    id: "languages",
    label: "LANGUAGES",
    tone: "acid",
    items: ["TYPESCRIPT", "JAVASCRIPT", "JAVA", "SQL", "PYTHON", "GO", "PHP", "BASH"],
  },
  {
    id: "infra",
    label: "INFRA & OPS",
    tone: "amber",
    items: [
      "GIT", "DOCKER", "ARGOCD", "TERRAFORM", "FIREBASE_HOSTING", "VERCEL",
      "CLOUDFLARE_WORKERS", "SENTRY", "GLITCHTIP",
    ],
  },
  {
    id: "practices",
    label: "PRACTICES",
    tone: "cyan",
    items: [
      "CODE_REVIEW", "MENTORSHIP", "OBSERVABILITY", "TESTING",
      "OPENAPI", "AI_TOOLING / MCP", "SEO / A11Y", "PEN-TESTING",
    ],
  },
];

/** Top row of the marquee: the stack, loudest first. */
export const marqueeStack = [
  "JAVA", "SPRING_BOOT", "MODULITH", "POSTGRES", "TIMESCALEDB", "RABBITMQ",
  "REDIS", "KEYCLOAK", "DOCKER", "TERRAFORM", "ARGOCD", "REACT_19", "SVELTE_5",
  "SVELTEKIT_2", "TYPESCRIPT", "TAILWIND", "FIREBASE", "EXPO", "ASTRO", "MYSQL",
  "CHROME_MV3", "MCP", "SQLITE", "TREE_SITTER", "PYTHON", "GO",
];

/** One-line stack summary for the terminal `ls stack`. */
export const stackSummary = [
  "  lang    Java · TypeScript · JavaScript · SQL · Python · Go",
  "  back    Spring Boot · Modulith · Postgres · TimescaleDB · RabbitMQ · MQTT · Keycloak",
  "  front   React 19 · Svelte 5 · SvelteKit 2 · Astro · Expo · Tailwind 4",
  "  infra   Firebase · Docker · Kubernetes · ArgoCD · Terraform · Cloudflare",
  "  sec     THM PenTest+ & JPT paths · red-team review",
];
