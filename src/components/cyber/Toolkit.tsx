import { m as motion } from "motion/react";
import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { skills, type SkillCategory } from "@/content/skills";
import { certs, schooling, spokenLanguages } from "@/content/certs";
import { Server, Monitor, Code, Hammer, Target, GraduationCap, Shield, Languages } from "lucide-react";

type Tone = "cyan" | "mag" | "acid" | "amber";

type Category = SkillCategory & { icon: typeof Server };

const ICONS: Record<SkillCategory["id"], typeof Server> = {
  backend: Server,
  frontend: Monitor,
  languages: Code,
  infra: Hammer,
  practices: Target,
};

const byId = Object.fromEntries(
  skills.map((c) => [c.id, { ...c, icon: ICONS[c.id] }]),
) as Record<SkillCategory["id"], Category>;

const BACKEND = byId.backend;
const FRONTEND = byId.frontend;
const LANGUAGES = byId.languages;
const INFRA = byId.infra;
const PRACTICES = byId.practices;

export function Toolkit() {
  return (
    <section
      id="toolkit"
      className="relative py-28 md:py-40 border-t border-rule overflow-hidden"
    >
      <SectionWatermark number="05" side="left" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-acid glow-acid">
              &gt;&gt; INVENTORY · WEIGHTED · 2026
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-acid glow-acid italic">/</span>
              <DecodeOnView text="TOOLKIT" durationMs={700} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">STACK</div>
              <div className="mt-1 text-bone num-tab text-lg">
                {skills.reduce((n, c) => n + c.items.length, 0)}
                <span className="text-fade text-xs"> TOOLS</span>
              </div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">SCOPE</div>
              <div className="mt-1 text-cyan glow-cyan">DAILY · SHIPPED · PROD</div>
            </div>
          </div>
        </div>

        {/* broken grid — backend hero + frontend/langs sidebar */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* BACKEND — hero card */}
          <CategoryCard cat={BACKEND} span="col-span-12 lg:col-span-7" headline={<><span className="text-cyan italic">Services</span> that<br/>don't page at night.</>} size="big" />

          {/* FRONTEND — tall */}
          <CategoryCard cat={FRONTEND} span="col-span-12 md:col-span-6 lg:col-span-5" headline={<><span className="text-mag italic">Interfaces</span><br/>that earn the click.</>} size="med" />

          {/* LANGUAGES — short */}
          <CategoryCard cat={LANGUAGES} span="col-span-12 md:col-span-6 lg:col-span-4" headline={<><span className="text-acid italic">Dialects</span> spoken<br/>daily.</>} size="med" />

          {/* INFRA — medium */}
          <CategoryCard cat={INFRA} span="col-span-12 md:col-span-6 lg:col-span-4" headline={<><span className="text-amber italic">Rails</span> under<br/>the ship.</>} size="med" />

          {/* PRACTICES — medium */}
          <CategoryCard cat={PRACTICES} span="col-span-12 md:col-span-12 lg:col-span-4" headline={<><span className="text-cyan italic">Discipline</span><br/>over ceremony.</>} size="med" />
        </div>

        {/* bottom strip — schooling / certs / languages */}
        <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6">
          <BottomCard
            tone="cyan"
            icon={<GraduationCap className="h-3.5 w-3.5" />}
            label="// SCHOOLING"
            title={schooling.title}
            sub={schooling.sub}
          />
          <BottomCard
            tone="mag"
            icon={<Shield className="h-3.5 w-3.5" />}
            label="// CERTIFICATIONS"
            title={certs[0].title.toUpperCase()}
            sub={`+ ${certs.slice(1).map((c) => `${c.issuer} ${c.title}`).join(" · ")}`}
          />
          <BottomCard
            tone="acid"
            icon={<Languages className="h-3.5 w-3.5" />}
            label="// LANGUAGES"
            title={spokenLanguages.title}
            sub={spokenLanguages.sub}
          />
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  cat,
  span,
  headline,
  size,
}: {
  cat: Category;
  span: string;
  headline: React.ReactNode;
  size: "big" | "med";
}) {
  const Icon = cat.icon;
  const borderCls = toneBorder(cat.tone);
  const textCls = toneText(cat.tone);
  const bgCls = toneBg(cat.tone);

  return (
    <article
      data-reveal
      className={`${span} relative border ${borderCls}/30 bg-deck/70 p-6 md:p-7 lg:p-8 group hover:${borderCls.replace("/30", "/70")} transition-colors`}
    >
      <span className="corner-bracket tl" />
      <span className="corner-bracket tr" />
      <span className="corner-bracket bl" />
      <span className="corner-bracket br" />

      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] ${textCls}`}>
          <Icon className="h-3.5 w-3.5" />
          // {cat.label}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade num-tab">
          {String(cat.items.length).padStart(2, "0")}
        </span>
      </div>

      <h3 className={`mt-4 font-display uppercase leading-[0.95] tracking-tight text-bone ${size === "big" ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl md:text-3xl"}`}>
        {headline}
      </h3>

      <ul className="mt-6 space-y-1.5">
        {cat.items.map((it, i) => (
          <motion.li
            key={it}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: 0.035 * i, duration: 0.35 }}
            className="group/item flex items-center gap-3 border-b border-rule py-1.5 last:border-0"
          >
            <span className={`inline-block h-1 w-1 shrink-0 ${bgCls} opacity-70 group-hover/item:opacity-100`} />
            <span className="font-display uppercase text-base md:text-lg tracking-tight leading-tight text-bone group-hover/item:text-cyan transition-colors">
              {it}
            </span>
          </motion.li>
        ))}
      </ul>
    </article>
  );
}

function BottomCard({
  tone,
  icon,
  label,
  title,
  sub,
}: {
  tone: Tone;
  icon: React.ReactNode;
  label: string;
  title: string;
  sub: string;
}) {
  return (
    <div
      data-reveal
      className="col-span-12 md:col-span-4 relative border border-rule-strong bg-void/60 p-5 md:p-6"
    >
      <span className="corner-bracket tl" />
      <span className="corner-bracket br" />
      <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] ${toneText(tone)}`}>
        {icon}
        {label}
      </div>
      <div className="mt-3 font-display uppercase text-lg md:text-xl leading-tight tracking-tight text-bone">
        {title}
      </div>
      <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fade">
        {sub}
      </div>
    </div>
  );
}

function toneText(t: Tone) {
  return t === "cyan" ? "text-cyan glow-cyan"
    : t === "mag" ? "text-mag glow-mag"
    : t === "acid" ? "text-acid glow-acid"
    : "text-amber";
}
function toneBg(t: Tone) {
  return t === "cyan" ? "bg-cyan"
    : t === "mag" ? "bg-mag"
    : t === "acid" ? "bg-acid"
    : "bg-amber";
}
function toneBorder(t: Tone) {
  return t === "cyan" ? "border-cyan"
    : t === "mag" ? "border-mag"
    : t === "acid" ? "border-acid"
    : "border-amber";
}
