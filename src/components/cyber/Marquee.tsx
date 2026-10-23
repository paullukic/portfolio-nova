import { marqueeStack } from "@/content/skills";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { certs } from "@/content/certs";
import { useEffect, useState } from "react";

const TOP = marqueeStack;

// Bottom row: every project plus the employers that have no plate of their own
// (a plate covers an employer when its id matches or its client strip names it).
const plated = new Set(projects.map((p) => p.id));
const clientOrgs = new Set(projects.map((p) => p.client.split(" ")[0].toUpperCase()));
const BOT = [
  ...projects.map((p) => p.short),
  ...experience
    .filter((e) => !plated.has(e.id) && !clientOrgs.has(e.org.split(/[ .(]/)[0]))
    .map((e) => e.org),
  "PAXHAX",
  ...certs.map((c) => c.title.toUpperCase().replace(/[ .]+/g, "_")),
].map((label) => `// ${label}`);

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
