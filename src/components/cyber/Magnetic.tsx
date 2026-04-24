import { useRef, type ReactNode } from "react";

/**
 * Magnetic hover wrapper — child follows the cursor when it's close.
 * Returns to origin with a spring-feel CSS transition on mouse-leave.
 * Desktop-only (hover: hover), no-op on touch + reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  radius = 120,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && matchMedia("(hover: none)").matches) return;
    if (typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > radius) {
      el.style.transform = "translate3d(0,0,0)";
      return;
    }
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className}`}
      style={{ perspective: "800px" }}
    >
      <span
        ref={ref}
        className="inline-block"
        style={{ transition: "transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}
      >
        {children}
      </span>
    </span>
  );
}
