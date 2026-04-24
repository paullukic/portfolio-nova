import type { ReactNode } from "react";
import { DecodeOnView } from "./GlitchText";

export function SectionHeader({
  index,
  eyebrow,
  title,
  trailing,
}: {
  index: string;
  eyebrow: string;
  title: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex items-end justify-between gap-6 border-b border-rule-strong pb-4">
        <div className="flex items-end gap-5 md:gap-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-mag glow-mag num-tab pt-1">
            §{index}
          </span>
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-cyan glow-cyan">
              {">"} {eyebrow}.SYS
            </div>
            <h2 className="mt-1 font-display uppercase text-4xl md:text-6xl text-bone leading-none tracking-tight">
              <DecodeOnView text={title} durationMs={650} />
            </h2>
          </div>
        </div>
        {trailing && (
          <div className="hidden md:block font-mono text-[10.5px] uppercase tracking-[0.22em] text-ash text-right">
            {trailing}
          </div>
        )}
      </div>
      <div className="mt-1 flex gap-1">
        <span className="h-px flex-1 bg-cyan/40" />
        <span className="h-px w-12 bg-mag/60" />
        <span className="h-px w-4 bg-acid/60" />
      </div>
    </div>
  );
}
