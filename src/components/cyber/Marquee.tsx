import { useEffect, useState } from "react";

const TOP = [
  "JAVA",
  "SPRING_BOOT",
  "MODULITH",
  "POSTGRES",
  "TIMESCALEDB",
  "RABBITMQ",
  "REDIS",
  "KEYCLOAK",
  "DOCKER",
  "TERRAFORM",
  "ARGOCD",
  "REACT_19",
  "SVELTE_5",
  "SVELTEKIT_2",
  "TYPESCRIPT",
  "TAILWIND",
  "FIREBASE",
  "MYSQL",
  "KNOCKOUT.JS",
  "CANVAS",
  "MCP",
  "SQLITE",
  "TREE_SITTER",
  "PYTHON",
];

const BOT = [
  "// COOGRAPH",
  "// CYBERGRID",
  "// COLLABWRITING",
  "// GASTARBAJTER24",
  "// IGELPHONE",
  "// 4BEES",
  "// TEODESK",
  "// COR_TECH_GROUP",
  "// PAXHAX",
  "// GOOGLE_RESULT_COUNTER",
  "// COMPTIA_PENTEST+",
  "// TRYHACKME_JR_PENTESTER",
];

const GLITCH_CHARS = "█▓▒░◼◻◇◆◢◤◣◥¥§¤";

function corrupt(t: string) {
  // randomly replace a slice with block chars
  const len = t.length;
  if (len < 4) return t;
  const start = Math.floor(Math.random() * (len - 3));
  const span = 2 + Math.floor(Math.random() * 3);
  const block = Array.from({ length: span })
    .map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
    .join("");
  return t.slice(0, start) + block + t.slice(start + span);
}

export function Marquee() {
  return (
    <section
      aria-hidden
      className="relative border-y border-rule-strong bg-deck/80 overflow-hidden"
    >
      <div className="border-b border-rule">
        <Row tokens={TOP} dir="forward" tone="bone" />
      </div>
      <div>
        <Row tokens={BOT} dir="reverse" tone="mag" />
      </div>
    </section>
  );
}

function Row({
  tokens,
  dir,
  tone,
}: {
  tokens: string[];
  dir: "forward" | "reverse";
  tone: "bone" | "mag";
}) {
  // periodic glitched index
  const [glitched, setGlitched] = useState<{ i: number; text: string } | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const i = Math.floor(Math.random() * tokens.length);
      const text = corrupt(tokens[i]);
      setGlitched({ i, text });
      setTimeout(() => setGlitched(null), 240);
    }, 2200 + Math.random() * 1800);
    return () => clearInterval(id);
  }, [tokens]);

  const display = (i: number) =>
    glitched && (i % tokens.length) === glitched.i ? glitched.text : tokens[i % tokens.length];

  const cls = tone === "bone" ? "text-bone" : "text-mag";

  return (
    <div
      className={`${dir === "forward" ? "marquee" : "marquee-rev"} flex w-max items-center gap-8 py-3 font-mono text-[11px] uppercase tracking-[0.28em] ${cls} whitespace-nowrap`}
    >
      {[...tokens, ...tokens].map((t, i) => (
        <span key={i} className="flex items-center gap-8">
          <span
            className={
              glitched && (i % tokens.length) === glitched.i
                ? "text-acid glow-acid"
                : "hover:text-cyan transition-colors"
            }
          >
            {display(i)}
          </span>
          <Diamond color={tone === "bone" ? "cyan" : "mag"} />
        </span>
      ))}
    </div>
  );
}

function Diamond({ color = "cyan" }: { color?: "cyan" | "mag" }) {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      className="shrink-0"
      style={{ color: `var(--tone-${color}-hex)` }}
    >
      <rect x="3" y="0" width="4.24" height="4.24" transform="rotate(45 3 3)" fill="currentColor" />
    </svg>
  );
}
