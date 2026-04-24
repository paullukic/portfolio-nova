import { Quote } from "lucide-react";

type Ref = {
  quote: string;
  name: string;
  role: string;
  org: string;
  tone: "cyan" | "mag" | "acid";
};

// NOTE: placeholders. Swap with real quotes from references before shipping,
// or delete the section until collected. Keeping skeleton wired so the layout
// stays and drop-in is one commit.
const REFS: Ref[] = [
  {
    quote:
      "// PLACEHOLDER — paste real quote from INVT/Cybergrid lead here. Keep it short: one specific thing I shipped, one behavioural observation.",
    name: "REF_01",
    role: "Senior Engineer",
    org: "INVT · Cybergrid",
    tone: "cyan",
  },
  {
    quote:
      "// PLACEHOLDER — Cluing/Colabwriting reference. Ask for a line about engine rebuilds or mentorship. One sentence, no marketing.",
    name: "REF_02",
    role: "Head of Product",
    org: "Cluing (ex-Colabwriting)",
    tone: "mag",
  },
  {
    quote:
      "// PLACEHOLDER — peer review. Short, concrete, no 'rockstar'. Ideally ties to a shipped outcome (Gastarbajter24, Result Counter).",
    name: "REF_03",
    role: "Senior Eng · Peer",
    org: "independent",
    tone: "acid",
  },
];

export function Testimonials() {
  return (
    <section
      aria-label="References"
      className="relative border-t border-rule py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1480px] px-4 md:px-7">
        <div
          data-reveal
          className="flex items-end justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-acid glow-acid">
              {">>"} INTERCEPTED_TRANSMISSIONS
            </span>
          </div>
          <span className="hidden md:inline font-mono text-[9.5px] uppercase tracking-[0.22em] text-fade">
            REF_CHECK · PARAPHRASED
          </span>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule-strong border border-rule-strong"
          data-reveal
          style={{ ["--reveal-delay" as any]: "100ms" }}
        >
          {REFS.map((r, i) => (
            <Card key={r.name} ref_={r} idx={i} />
          ))}
        </div>

        <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.22em] text-fade">
          <span className="text-amber">⚠</span> slots wired · references
          collected on request · written quotes on file
        </p>
      </div>
    </section>
  );
}

function Card({ ref_, idx }: { ref_: Ref; idx: number }) {
  const text =
    ref_.tone === "cyan"
      ? "text-cyan glow-cyan"
      : ref_.tone === "mag"
      ? "text-mag glow-mag"
      : "text-acid glow-acid";
  const border =
    ref_.tone === "cyan"
      ? "border-cyan/50"
      : ref_.tone === "mag"
      ? "border-mag/50"
      : "border-acid/50";

  return (
    <figure
      className="relative bg-deck p-6 md:p-7 group transition-colors hover:bg-deck/70"
      style={{ animationDelay: `${idx * 80}ms` }}
    >
      <span className="corner-bracket tl" />
      <span className="corner-bracket tr" />
      <span className="corner-bracket bl" />
      <span className="corner-bracket br" />

      <Quote className={`h-5 w-5 ${text}`} />

      <blockquote className="mt-4 font-display text-[17px] md:text-[18px] leading-snug text-bone text-pretty">
        {ref_.quote}
      </blockquote>

      <figcaption className={`mt-5 pt-4 border-t ${border}`}>
        <div className={`font-mono text-[10px] uppercase tracking-[0.28em] ${text}`}>
          {ref_.name}
        </div>
        <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone">
          {ref_.role}
        </div>
        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
          {ref_.org}
        </div>
      </figcaption>
    </figure>
  );
}
