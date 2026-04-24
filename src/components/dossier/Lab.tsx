import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Manifesto";

export function Lab() {
  return (
    <section
      id="lab"
      className="relative py-24 md:py-32 border-t border-rule bg-ink-2"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHeader
          index="04"
          eyebrow="After Hours"
          title="The Lab"
          trailing="Side dossiers · ongoing"
        />

        <div className="mt-14 grid grid-cols-12 gap-6">
          <Card
            no="A"
            tag="Acquired"
            title="Google Result Counter"
            blurb="A Chrome extension that surfaces real Google result counts. Built for friction reduction, scaled to 2,000+ users, then quietly sold."
            stat="2k+"
            statLabel="active users"
            link="https://chromewebstore.google.com/detail/google-result-counter/oijjnonbajbomjimdmfchfjadndnhfgp"
          />
          <Card
            no="B"
            tag="Public"
            title="Paxhax — Ethical Hacking Notes"
            blurb="A working notebook of penetration-testing exercises, tooling notes and responsible-disclosure write-ups."
            stat="PenTest+"
            statLabel="certified author"
            link="https://paxhax.notion.site/Ethical-Hacking-14421d1a2d3a45dfbd9fd4dce407f9ee"
          />
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          <SmallCard
            label="Old terminal"
            title="paullukic.com"
            note="Original site — kept on the wire as a relic."
            link="https://paullukic.com/"
          />
          <SmallCard
            label="GUI · Win98"
            title="paullukic.com/gui"
            note="A Windows 98 desktop reimagining."
            link="https://paullukic.com/gui/win98.html"
          />
          <SmallCard
            label="React build · 2022"
            title="react.paullukic.com"
            note="Earlier React iteration, frozen in time."
            link="https://react.paullukic.com/"
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  no,
  tag,
  title,
  blurb,
  stat,
  statLabel,
  link,
}: {
  no: string;
  tag: string;
  title: string;
  blurb: string;
  stat: string;
  statLabel: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group relative col-span-12 md:col-span-6 flex flex-col justify-between gap-12 border border-rule-strong bg-ink p-7 md:p-10 transition-colors hover:border-acid"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-[5rem] leading-[0.78] text-paper-dim group-hover:text-acid transition-colors">
          {no}
        </span>
        <span className="border border-rule-strong px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-paper-dim">
          {tag}
        </span>
      </div>

      <div>
        <h3 className="font-display text-3xl md:text-4xl text-paper leading-tight">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-paper-dim text-[15px] text-pretty">
          {blurb}
        </p>

        <div className="mt-8 flex items-end justify-between gap-4 border-t border-rule pt-5">
          <div>
            <div className="font-display text-3xl text-acid leading-none num-tab">
              {stat}
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
              {statLabel}
            </div>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper transition-colors group-hover:text-acid">
            Open
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

function SmallCard({
  label,
  title,
  note,
  link,
}: {
  label: string;
  title: string;
  note: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group col-span-12 md:col-span-4 flex flex-col gap-5 border border-rule-strong bg-ink p-6 transition-colors hover:border-acid"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
        {label}
      </div>
      <h4 className="font-display text-2xl text-paper leading-tight">
        {title}
      </h4>
      <p className="text-paper-dim text-[14px] text-pretty flex-1">{note}</p>
      <div className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper-dim transition-colors group-hover:text-acid">
        Visit
        <ArrowUpRight className="h-3.5 w-3.5" />
      </div>
    </a>
  );
}
