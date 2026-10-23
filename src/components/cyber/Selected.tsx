import { lazy, Suspense, useState } from "react";
import { ArrowUpRight, FileSearch } from "lucide-react";
import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { HoloCard } from "./HoloCard";
import { DiagramFor } from "./ProjectDiagrams";

import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

const CaseDrawer = lazy(() => import("./CaseDrawer").then((mod) => ({ default: mod.CaseDrawer })));

type Plated = Project & { no: string };

const PROJECTS: Plated[] = projects.map((p, i) => ({ ...p, no: String(i + 1).padStart(2, "0") }));

const toneText = {
  cyan: "text-cyan",
  mag: "text-mag",
  acid: "text-acid",
  amber: "text-amber",
  blood: "text-blood",
};
const toneGlow = {
  cyan: "glow-cyan",
  mag: "glow-mag",
  acid: "glow-acid",
  amber: "",
  blood: "glow-blood",
};
const toneBg = {
  cyan: "bg-cyan",
  mag: "bg-mag",
  acid: "bg-acid",
  amber: "bg-amber",
  blood: "bg-blood",
};
const toneBorder = {
  cyan: "border-cyan/60",
  mag: "border-mag/60",
  acid: "border-acid/60",
  amber: "border-amber/60",
  blood: "border-blood/60",
};

export function Selected() {
  const [openProject, setOpenProject] = useState<Plated | null>(null);
  // the drawer chunk loads on first open and stays mounted for exit animations
  const [drawerWanted, setDrawerWanted] = useState(false);

  const shippingCount = PROJECTS.filter((p) => ["SHIPPING", "LIVE", "ONGOING", "BUILDING"].includes(p.status)).length;

  return (
    <section
      id="selected"
      className="relative py-28 md:py-40 border-t border-rule overflow-hidden"
    >
      <SectionWatermark number="02" side="left" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* NOW-style kinetic hero */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-cyan glow-cyan">
              &gt;&gt; HOLO_MARKET · CLICK ANY PLATE FOR DEEP_DIVE
            </div>
            <h2 className="mt-2 font-display uppercase text-[11vw] sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.88] tracking-[-0.04em] text-bone">
              <span className="text-cyan glow-cyan italic">/</span>
              <DecodeOnView text="SELECTED_WORK" durationMs={800} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">PLATES</div>
              <div className="mt-1 text-bone num-tab text-lg">
                {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">ACTIVE</div>
              <div className="mt-1 text-acid glow-acid num-tab">
                {String(shippingCount).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-12 gap-4 md:gap-5"
          data-reveal
          style={{ ["--reveal-delay" as any]: "120ms" }}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className={
                p.span === "feature"
                  ? "col-span-12 lg:col-span-8 lg:row-span-2"
                  : p.span === "tall"
                  ? "col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2"
                  : p.span === "wide"
                  ? "col-span-12 lg:col-span-8"
                  : "col-span-12 md:col-span-6 lg:col-span-4"
              }
            >
              <Plate
                project={p}
                onOpen={() => {
                  setDrawerWanted(true);
                  setOpenProject(p);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {drawerWanted && (
        <Suspense fallback={null}>
          <CaseDrawer project={openProject} onClose={() => setOpenProject(null)} />
        </Suspense>
      )}
    </section>
  );
}

function Plate({ project, onOpen }: { project: Plated; onOpen: () => void }) {
  const minH =
    project.span === "feature"
      ? "min-h-[500px] lg:min-h-[600px]"
      : project.span === "tall"
      ? "min-h-[500px] lg:min-h-[600px]"
      : project.span === "wide"
      ? "min-h-[320px]"
      : "min-h-[400px]";

  const isFeature = project.span === "feature" || project.span === "tall";

  // Tone color — use CSS var so theme swaps cascade. color-mix gives alpha
  // variants with a single source. Supported in all modern browsers.
  const hex = `var(--tone-${project.tone}-hex)`;
  const alpha = (pct: number) => `color-mix(in srgb, ${hex} ${pct}%, transparent)`;

  // generate fake binary ID per project
  const id = `0x${project.no.padStart(2, "0")}${(project.title.length).toString(16).toUpperCase().padStart(2, "0")}A${project.tone[0].toUpperCase()}`;

  return (
    <HoloCard tone={hex} className={`group h-full ${minH}`}>
      <div className="relative block h-full">
        {/* card-wide click target — opens drawer */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open deep dive for ${project.title}`}
          className="absolute inset-0 z-30 cursor-pointer"
        />
        {/* OUTER NOTCHED FRAME — neon edge */}
        <div
          className={`absolute inset-0 clip-2077 transition-all duration-300 group-hover:opacity-100 opacity-70`}
          style={{
            background: `linear-gradient(135deg, ${hex} 0%, transparent 30%, transparent 70%, ${hex} 100%)`,
          }}
        />
        {/* INNER SURFACE — sits 1px inside neon edge */}
        <div
          className="absolute inset-[1px] clip-2077 bg-deck/95 backdrop-blur-sm overflow-hidden flex flex-col"
        >
          {/* tone gradient wash */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${alpha(9)} 0%, transparent 45%), radial-gradient(circle at 0% 100%, ${alpha(6)} 0%, transparent 50%)`,
            }}
          />

          {/* HUD STRIP TOP */}
          <div
            className="relative z-20 flex items-center justify-between gap-3 px-5 md:px-6 py-2.5 border-b"
            style={{ borderColor: alpha(20) }}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* hex chevron + ID */}
              <div className="flex items-center gap-2 shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0" style={{ color: hex }}>
                  <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" />
                </svg>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.22em] num-tab"
                  style={{ color: hex }}
                >
                  ID/{id}
                </span>
              </div>
              <span className="hidden sm:inline-block w-px h-3 bg-rule-strong shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fade truncate">
                {project.client}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* hatched status block */}
              <span
                className="hidden md:inline-block h-3 w-6 hatch"
                style={{ color: hex }}
              />
              <span
                className="font-mono text-[10px] uppercase tracking-[0.24em] glow-cyan"
                style={{ color: hex, textShadow: `0 0 6px ${alpha(60)}` }}
              >
                ▸ {project.status}
              </span>
            </div>
          </div>

          {/* DIAGRAM CANVAS */}
          <div className="relative flex-1 overflow-hidden">
            {/* technical grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(${alpha(19)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(19)} 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            {/* watermark diagram */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-35 group-hover:opacity-65"
              style={{ color: hex }}
            >
              <div className="absolute inset-0 p-6 md:p-8">
                {DiagramFor(project.diagram)}
              </div>
            </div>

            {/* corner readouts */}
            <div className="absolute top-3 right-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-fade">
              <span>CH.{(project.no.charCodeAt(0) % 9) + 1}</span>
              <span style={{ color: hex }}>•</span>
              <span>{(parseInt(project.no, 10) * 23) % 99}.{(parseInt(project.no, 10) * 7) % 9}MHZ</span>
            </div>
            <div className="absolute bottom-3 left-5 font-mono text-[9px] uppercase tracking-[0.22em] text-fade">
              SCAN_OK <span className="text-acid">●</span>
            </div>

            {/* metrics float (always visible on feature, hover on others) */}
            {project.metrics && (
              <ul
                className={`absolute right-4 md:right-5 ${
                  isFeature ? "top-12" : "top-10"
                } flex flex-col items-end gap-2`}
              >
                {project.metrics.map((m) => (
                  <li
                    key={m.k}
                    className="text-right border-r-2 pr-2.5"
                    style={{ borderColor: hex }}
                  >
                    <div
                      className={`font-zen ${
                        isFeature ? "text-xl md:text-2xl" : "text-base md:text-lg"
                      } leading-none num-tab`}
                      style={{ color: hex, textShadow: `0 0 8px ${alpha(60)}` }}
                    >
                      {m.k}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ash whitespace-nowrap">
                      {m.v}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TITLE + BLURB STRIP */}
          <div
            className="relative z-10 px-5 md:px-6 pt-3 pb-4 border-t"
            style={{ borderColor: alpha(20) }}
          >
            <h3
              className={`font-display uppercase leading-[0.94] tracking-tight transition-colors text-bone break-words ${
                project.span === "feature"
                  ? "text-3xl md:text-4xl lg:text-[2.6rem]"
                  : project.span === "tall"
                  ? "text-2xl md:text-[1.6rem]"
                  : "text-xl md:text-2xl"
              }`}
            >
              {project.title.split("_").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span style={{ color: hex }}>_</span>
                  )}
                </span>
              ))}
            </h3>
            <p
              className={`mt-2 text-ash text-pretty ${
                isFeature ? "text-[13.5px]" : "text-[12.5px]"
              } line-clamp-3`}
            >
              {project.blurb}
            </p>
          </div>

          {/* FOOTER STRIP */}
          <div
            className="relative z-10 px-5 md:px-6 py-3 border-t flex items-center justify-between gap-3"
            style={{ borderColor: alpha(20) }}
          >
            <ul className="flex flex-wrap gap-1.5 min-w-0">
              {project.tags.slice(0, isFeature ? 5 : 3).map((t) => (
                <li
                  key={t}
                  className="clip-tag px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-bone"
                  style={{
                    background: alpha(10),
                    color: hex,
                  }}
                >
                  {t}
                </li>
              ))}
              {project.tags.length > (isFeature ? 5 : 3) && (
                <li className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-fade py-0.5">
                  +{project.tags.length - (isFeature ? 5 : 3)}
                </li>
              )}
            </ul>

            <div className="relative z-40 flex items-center gap-1.5 shrink-0">
              <span
                className="clip-cta inline-flex items-center gap-1.5 pl-5 pr-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] font-bold border"
                style={{ borderColor: alpha(40), color: hex, background: alpha(8) }}
              >
                <FileSearch className="h-3 w-3" />
                DETAIL
              </span>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="clip-cta inline-flex items-center gap-1.5 pl-5 pr-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] font-bold transition-all hover:translate-x-0.5"
                  style={{ background: hex, color: "#050507" }}
                >
                  VISIT
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* OUTER NEON EDGES — top-right + bottom-left highlight */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-px w-12"
          style={{
            background: `linear-gradient(90deg, transparent, ${hex})`,
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-px w-12"
          style={{
            background: `linear-gradient(90deg, ${hex}, transparent)`,
          }}
        />
      </div>
    </HoloCard>
  );
}
