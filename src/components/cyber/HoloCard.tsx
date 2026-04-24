import { useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /**
   * Tone as a plain CSS color — accepts `var(--tone-cyan-hex)`, a hex, or
   * an rgba. Alpha layers derived via `color-mix` so theme swaps cascade.
   */
  tone?: string;
  style?: CSSProperties;
};

export function HoloCard({
  children,
  className = "",
  tone = "var(--tone-cyan-hex)",
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`tilt relative ${className}`}
      style={{ ...style, ["--sheen" as any]: tone }}
    >
      {/* amplified radial sheen — outer soft + inner hot spot */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, ${tone} 22%, transparent), transparent 55%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-90 transition-opacity duration-500"
        style={{
          background: `radial-gradient(180px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, ${tone} 50%, transparent), transparent 60%)`,
          mixBlendMode: "screen",
        }}
      />
      {children}
    </div>
  );
}
