import { ArrowUpRight, Github, Linkedin, Mail, FileText, Check, Clock, MapPin } from "lucide-react";
import { GlitchText, DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { profile, social } from "@/content/profile";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative grain border-t border-rule-strong pt-24 pb-10 md:pt-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 grid-floor opacity-30" />
      <SectionWatermark number="08" side="right" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* NOW-style kinetic hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-mag glow-mag">
              &gt;&gt; CLOSING_DISPATCH · END_OF_FILE
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-mag glow-mag italic">/</span>
              <DecodeOnView text="PING_ME" durationMs={800} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">STATUS</div>
              <div className="mt-1 text-acid glow-acid">LISTENING</div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">RESPONSE</div>
              <div className="mt-1 text-cyan glow-cyan">≤ 24H · CET</div>
            </div>
          </div>
        </div>

        {/* AVAILABILITY BLOCK */}
        <div
          data-reveal
          className="grid grid-cols-12 gap-px border border-rule-strong bg-rule-strong"
        >
          <div className="col-span-12 lg:col-span-5 bg-deck p-7 md:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-acid glow-acid">
              {">>"} CURRENT_STATUS
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-acid pulse-soft" />
              <p className="font-display uppercase text-2xl md:text-3xl text-bone leading-tight tracking-tight">
                Open to new roles + select contracts
              </p>
            </div>
            <p className="mt-4 text-ash text-[14px] leading-relaxed text-pretty">
              Currently engineering the {profile.currently.product} backend at{" "}
              {profile.currently.org}, and building my own products after hours.
              Quietly listening for the next strong fit: a full-stack or backend
              seat, a founding-engineer role at an early-stage company, or a deep
              contract on something interesting.
            </p>
          </div>

          <ul className="col-span-12 lg:col-span-4 bg-deck p-7 md:p-8 space-y-3">
            <li className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
              // ACCEPTING
            </li>
            {profile.openTo.map(({ label: r }) => (
              <li
                key={r}
                className="flex items-center gap-3 font-display uppercase text-base text-bone tracking-tight"
              >
                <Check className="h-3.5 w-3.5 text-acid shrink-0" />
                {r}
              </li>
            ))}
          </ul>

          <ul className="col-span-12 lg:col-span-3 bg-deck p-7 md:p-8 space-y-4">
            <li>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mag">
                // TIME ZONE
              </div>
              <p className="mt-1 flex items-center gap-2 font-display uppercase text-base text-bone tracking-tight">
                <MapPin className="h-3.5 w-3.5 text-mag" />
                Novi Sad · {profile.timezone}
              </p>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mag">
                // WORK MODE
              </div>
              <p className="mt-1 font-display uppercase text-base text-bone tracking-tight">
                {profile.workMode}
              </p>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mag">
                // RESPONSE
              </div>
              <p className="mt-1 flex items-center gap-2 font-display uppercase text-base text-bone tracking-tight">
                <Clock className="h-3.5 w-3.5 text-mag" />
                {profile.response}
              </p>
            </li>
          </ul>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan glow-cyan">
              {">>"} DIRECT_LINE
            </div>
            <a
              href={social.email.href}
              className="mt-6 block font-display uppercase text-[7vw] md:text-[5vw] lg:text-[4.4rem] leading-[0.92] tracking-tight text-bone hover:text-cyan transition-colors text-balance break-all"
            >
              <GlitchText text={profile.email.split("@")[0]} intensity={0.4} />
              <span className="italic text-mag glow-mag">@</span>
              {profile.email.split("@")[1]}
            </a>

            <p className="mt-8 max-w-xl font-display text-xl md:text-2xl text-ash leading-snug text-pretty">
              Best way to reach me. Tell me the role, the team and one thing
              that makes the problem interesting — I'll reply with a real answer
              within a day. Especially keen on Spring backends, Svelte/React
              frontends, energy systems or quietly gorgeous interfaces.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <Link
              icon={<Mail className="h-3.5 w-3.5" />}
              label="EMAIL"
              href={social.email.href}
              value={social.email.value}
            />
            <Link
              icon={<Linkedin className="h-3.5 w-3.5" />}
              label="LINKEDIN"
              href={social.linkedin.href}
              value={social.linkedin.value}
            />
            <Link
              icon={<Github className="h-3.5 w-3.5" />}
              label="GITHUB"
              href={social.github.href}
              value={social.github.value}
            />
            {profile.cv && (
              <Link
                icon={<FileText className="h-3.5 w-3.5" />}
                label="CV"
                href={profile.cv}
                value={profile.cv.replace(/^\//, "")}
                download
              />
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 border-t border-rule-strong pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
          <div className="col-span-12 md:col-span-4">
            © {new Date().getFullYear()} · PAUL_LUKIC · ALL_NODES_RESERVED
          </div>
          <div className="col-span-6 md:col-span-4 md:text-center text-cyan">
            FILE_CLOSES · TRANSMITTED FROM NOVI_SAD
          </div>
          <div className="col-span-6 md:col-span-4 md:text-right text-mag">
            SET IN CHAKRA_PETCH · JETBRAINS_MONO · ZEN_DOTS
          </div>
        </div>
      </div>
    </footer>
  );
}

function Link({
  icon,
  label,
  href,
  value,
  download,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  value: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={download ? undefined : "_blank"}
      rel="noreferrer"
      download={download}
      className="group flex items-center justify-between gap-4 border-b border-rule pb-3 transition-colors hover:border-cyan"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center border border-rule-strong text-ash transition-colors group-hover:border-cyan group-hover:text-cyan">
          {icon}
        </span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
            {label}
          </div>
          <div className="font-display uppercase text-base text-bone tracking-tight transition-colors group-hover:text-cyan">
            {value}
          </div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-ash transition-all group-hover:text-cyan group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
