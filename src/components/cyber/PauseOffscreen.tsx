import { useEffect, useRef, type ReactNode, type RefObject } from "react";

/**
 * Pauses the SMIL (<animate>) timelines of every <svg> inside `ref` while it
 * is off-screen. Running SMIL invalidates style on every tick even when
 * nothing is visible, which held the footer at ~40 fps under a 4x CPU
 * throttle (openspec change 2026-10-26-hero-scene-fps). Animations resume
 * where they paused, so nothing visibly changes.
 */
export function usePauseSmilOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // a fast scroll can deliver enter + leave in one batch: the last entry wins
    const io = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      for (const svg of el.querySelectorAll("svg")) {
        if (entry.isIntersecting) svg.unpauseAnimations();
        else svg.pauseAnimations();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

/** Wrapper form of `usePauseSmilOffscreen`, for SVGs rendered by other components. */
export function PauseOffscreen({ children, className = "h-full w-full" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  usePauseSmilOffscreen(ref);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
