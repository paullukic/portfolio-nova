import { useEffect, useRef } from "react";
import { X, ArrowUpRight, Target, Wrench, CheckCircle2, AlertTriangle } from "lucide-react";
import { m as motion, AnimatePresence } from "motion/react";
import { social } from "@/content/profile";

export type CaseStudy = {
  problem: string;
  approach: string[];
  outcome: string;
  challenges?: string[];
  stack?: string[];
};

export type DrawerProject = {
  no: string;
  title: string;
  client: string;
  tone: "cyan" | "mag" | "acid" | "amber" | "blood";
  blurb: string;
  status: string;
  tags: string[];
  link?: string;
  metrics?: { k: string; v: string }[];
  caseStudy?: CaseStudy;
};

export function CaseDrawer({
  project,
  onClose,
}: {
  project: DrawerProject | null;
  onClose: () => void;
}) {
  const open = !!project;
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // stash the element that triggered the open so we can restore focus on close
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // simple focus trap — keep tab inside drawer
        const drawer = document.querySelector('aside[role="dialog"]');
        if (!drawer) return;
        const focusables = drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    // move focus inside drawer for keyboard + screen-reader users
    const t = setTimeout(() => closeBtnRef.current?.focus(), 80);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      // restore focus to the element that opened the drawer
      // preventScroll: restoring focus must not undo the scroll a command just started
      returnFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  const hex = project ? `var(--tone-${project.tone}-hex)` : "var(--tone-cyan-hex)";
  const alpha = (pct: number) => `color-mix(in srgb, ${hex} ${pct}%, transparent)`;

  return (
    <>
      {/* scrim */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[150] bg-void/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* opening portal flash — rips across the drawer edge as it enters */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="flash"
            className="fixed right-0 top-0 bottom-0 z-[162] w-full sm:w-[min(720px,92vw)] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, times: [0, 0.35, 1] }}
            style={{
              background:
                "linear-gradient(90deg, rgba(0,240,255,0.9) 0%, rgba(0,240,255,0.35) 6%, transparent 22%)",
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* drawer */}
      <aside
        ref={(el) => {
          if (el && open) el.scrollTop = 0;
        }}
        key={project?.no ?? "closed"}
        data-lenis-prevent
        className={`fixed right-0 top-0 bottom-0 z-[160] w-full sm:w-[min(720px,92vw)] bg-deck border-l border-rule-strong shadow-2xl transition-transform duration-300 ease-out overflow-y-auto overscroll-contain ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={project?.title ?? "Case study"}
      >
        {project && (
          <>
            {/* header */}
            <div
              className="sticky top-0 z-10 bg-deck/95 backdrop-blur-md border-b"
              style={{ borderColor: alpha(25) }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${hex}, transparent)` }}
              />
              <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.28em] num-tab glow-cyan"
                    style={{ color: hex }}
                  >
                    §{project.no} · DEEP_DIVE
                  </span>
                  <span className="hidden sm:inline w-px h-4 bg-rule-strong" />
                  <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.24em] text-fade truncate">
                    {project.client}
                  </span>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="grid h-9 w-9 place-items-center border border-rule-strong text-ash hover:border-cyan hover:text-cyan"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* body */}
            <div className="px-5 md:px-8 py-8 space-y-10">
              {/* hero */}
              <div>
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.24em]"
                  style={{ color: hex }}
                >
                  {">>"} {project.status}
                </div>
                <h2 className="mt-3 font-display uppercase text-3xl md:text-5xl text-bone leading-[0.95] tracking-tight break-words">
                  {project.title.split("_").map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <span style={{ color: hex }}>_</span>}
                    </span>
                  ))}
                </h2>
                <p className="mt-5 text-ash text-[14px] leading-relaxed text-pretty">
                  {project.blurb}
                </p>
              </div>

              {/* metrics strip */}
              {project.metrics && project.metrics.length > 0 && (
                <ul
                  className={`grid gap-px bg-rule-strong border border-rule-strong ${
                    project.metrics.length === 1 ? "grid-cols-1" : project.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"
                  }`}
                >
                  {project.metrics.map((m) => (
                    <li key={m.k} className="bg-deck px-3 py-4 text-center">
                      <div
                        className="font-zen text-xl md:text-2xl num-tab leading-none"
                        style={{ color: hex, textShadow: `0 0 8px ${alpha(60)}` }}
                      >
                        {m.k}
                      </div>
                      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ash">
                        {m.v}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* case study */}
              {project.caseStudy ? (
                <div className="space-y-8">
                  <Block
                    hex={hex}
                    icon={<Target className="h-3.5 w-3.5" />}
                    label="// PROBLEM"
                  >
                    <p className="text-bone text-[14px] leading-relaxed text-pretty">
                      {project.caseStudy.problem}
                    </p>
                  </Block>

                  <Block
                    hex={hex}
                    icon={<Wrench className="h-3.5 w-3.5" />}
                    label="// APPROACH"
                  >
                    <ul className="space-y-2.5">
                      {project.caseStudy.approach.map((a, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-ash text-[13px] leading-relaxed text-pretty"
                        >
                          <span
                            className="mt-2 inline-block h-px w-3 shrink-0"
                            style={{ background: hex }}
                          />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </Block>

                  {project.caseStudy.challenges && project.caseStudy.challenges.length > 0 && (
                    <Block
                      hex={hex}
                      icon={<AlertTriangle className="h-3.5 w-3.5" />}
                      label="// CHALLENGES"
                    >
                      <ul className="space-y-2.5">
                        {project.caseStudy.challenges.map((c, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-ash text-[13px] leading-relaxed text-pretty"
                          >
                            <span className="mt-2 inline-block h-px w-3 shrink-0 bg-amber" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </Block>
                  )}

                  <Block
                    hex={hex}
                    icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                    label="// OUTCOME"
                  >
                    <p className="text-bone text-[14px] leading-relaxed text-pretty">
                      {project.caseStudy.outcome}
                    </p>
                  </Block>

                  {project.caseStudy.stack && project.caseStudy.stack.length > 0 && (
                    <Block hex={hex} label="// FULL_STACK">
                      <ul className="flex flex-wrap gap-1.5">
                        {project.caseStudy.stack.map((s) => (
                          <li
                            key={s}
                            className="clip-tag px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                            style={{ background: alpha(10), color: hex }}
                          >
                            {s}
                          </li>
                        ))}
                      </ul>
                    </Block>
                  )}
                </div>
              ) : (
                <div className="border border-rule-strong bg-void/60 p-6 font-mono text-[11px] uppercase tracking-[0.22em] text-fade">
                  {">"} CASE_STUDY <span className="text-amber">CLASSIFIED</span> · extended
                  write-up available on request via{" "}
                  <a href={social.email.href} className="text-cyan underline underline-offset-2">
                    direct line
                  </a>
                  .
                </div>
              )}

              {/* footer actions */}
              <div className="pt-6 border-t border-rule-strong flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="clip-cta inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] font-bold"
                    style={{ background: hex, color: "#050507" }}
                  >
                    OPEN_LIVE
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-rule-strong font-mono text-[11px] uppercase tracking-[0.24em] text-ash hover:border-cyan hover:text-cyan"
                >
                  CLOSE
                  <span className="font-mono text-[9px] text-fade">ESC</span>
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function Block({
  hex,
  icon,
  label,
  children,
}: {
  hex: string;
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] pb-3 border-b"
        style={{ color: hex, borderColor: `color-mix(in srgb, ${hex} 20%, transparent)` }}
      >
        {icon}
        {label}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
