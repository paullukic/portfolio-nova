import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mount-once smooth scroll provider. Hijacks wheel/touch/keyboard scroll for
 * a buttery momentum feel. Honors prefers-reduced-motion (falls back to
 * native scroll) and keeps hash-link behavior via Lenis's own API.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      // Modest settings — users still scroll at their speed, just smoother
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hook in-page anchors (#brief, #selected, etc) through Lenis so CTAs scroll smoothly.
    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72 });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
