import { useEffect, useState } from "react";

/**
 * Mouse-parallax ambient layer for the hero — emits 3 diamond-clipped
 * panels of varying depth that slide against cursor movement. Desktop-only
 * (pointer:fine), skipped for reduced-motion.
 */
export function HeroParallax() {
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive(true);

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const animate = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      setMx(cx);
      setMy(cy);
      raf = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!active) return null;

  const layers = [
    { depth: 8, size: 380, color: "rgba(0,240,255,0.10)", pos: { top: "12%", left: "8%" } },
    { depth: 14, size: 260, color: "rgba(255,31,142,0.09)", pos: { top: "60%", right: "12%" } },
    { depth: 20, size: 180, color: "rgba(222,251,0,0.08)", pos: { top: "28%", right: "28%" } },
    { depth: 26, size: 120, color: "rgba(255,180,0,0.08)", pos: { top: "72%", left: "18%" } },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {layers.map((l, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            ...l.pos,
            width: l.size,
            height: l.size,
            transform: `translate3d(${-mx * l.depth}px, ${-my * l.depth}px, 0)`,
            willChange: "transform",
            transition: "transform 40ms linear",
          }}
        >
          <div
            className="h-full w-full border"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${l.color}, transparent 70%)`,
              borderColor: l.color.replace(/[\d.]+\)/, "0.25)"),
              clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
            }}
          />
        </div>
      ))}

    </div>
  );
}
