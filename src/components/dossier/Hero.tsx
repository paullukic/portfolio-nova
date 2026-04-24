import { ArrowDownRight, MapPin, Wifi } from "lucide-react";

const STATS = [
  { k: "06+", v: "Years\nshipping" },
  { k: "07", v: "Roles\non file" },
  { k: "02k+", v: "Users on\nacquired ext." },
  { k: "01", v: "PenTest+\ncertified" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative grain pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36"
    >
      {/* dossier classification strip */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex items-center justify-between border-y border-rule py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          <span className="flex items-center gap-2 text-paper">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-acid acid-glow" />
            File · PL-94-001
          </span>
          <span className="hidden md:inline">Cls. Public · Vol. III · Ed. 2026</span>
          <span className="text-paper">Status / Available</span>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1440px] grid-cols-12 gap-x-6 gap-y-10 px-5 md:mt-20 md:px-8">
        {/* left meta column */}
        <aside className="col-span-12 md:col-span-3 space-y-8 reveal">
          <Field label="Designation">Full-Stack Developer</Field>
          <Field label="Theatre">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Novi Sad · RS
            </span>
          </Field>
          <Field label="Discipline">
            Java · Spring · React · Svelte · Firebase
          </Field>
          <Field label="Tenure">2019 — present</Field>
        </aside>

        {/* central name block */}
        <div className="col-span-12 md:col-span-9 reveal" style={{ animationDelay: "120ms" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-mute">
            Subject of the dossier
          </p>
          <h1 className="font-display mt-4 leading-[0.86] tracking-tight text-paper">
            <span className="block text-[18vw] md:text-[14vw] lg:text-[12rem] font-light">
              Paul
            </span>
            <span className="block text-[18vw] md:text-[14vw] lg:text-[12rem] font-light italic" style={{ fontVariationSettings: "'SOFT' 50" }}>
              Luki<span className="text-acid acid-glow">ć</span>
              <sup className="ml-3 align-top text-[0.2em] font-mono not-italic font-medium tracking-[0.18em] text-mute">
                /lu·kitch/
              </sup>
            </span>
          </h1>

          <div className="mt-10 grid grid-cols-12 gap-6">
            <p className="col-span-12 lg:col-span-7 font-display text-xl md:text-2xl leading-snug text-paper-dim text-pretty">
              Six years building scalable systems and quietly delightful interfaces.
              <span className="text-paper"> Backend rigour, frontend taste, mentorship in the margins.</span>
              {" "}Currently engineering grid-control infrastructure at INVT.
            </p>

            <ul className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-px bg-rule-strong border border-rule-strong">
              {STATS.map((s) => (
                <li
                  key={s.k}
                  className="bg-ink p-4 md:p-5"
                >
                  <div className="font-display text-3xl md:text-4xl text-paper num-tab leading-none">
                    {s.k}
                  </div>
                  <div className="mt-2 whitespace-pre-line font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                    {s.v}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#selected"
              className="group inline-flex items-center gap-3 border border-paper px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition-colors hover:bg-acid hover:border-acid hover:text-ink"
            >
              View selected work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#ledger"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper-dim hover:text-acid"
            >
              Read the ledger →
            </a>
            <span className="ml-auto hidden md:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              <Wifi className="h-3 w-3 text-acid" />
              Listening on paul.lukic94@gmail.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l border-rule-strong pl-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
        {label}
      </div>
      <div className="mt-2 text-sm text-paper text-balance">{children}</div>
    </div>
  );
}
