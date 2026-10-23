import { useEffect, useRef, useState } from "react";

export function CyberCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  // hidden until the first mousemove so it never sits at 0,0 on load
  const [seen, setSeen] = useState(false);
  // Only mouse-driven, motion-OK devices get the custom cursor. Elsewhere it
  // renders nothing (it used to leave a frozen ring in the top-left corner).
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!enabled) return;

    let rx = 0,
      ry = 0,
      tx = 0,
      ty = 0;
    let raf = 0;
    let lastTrail = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
      }

      setSeen(true);
      const tgt = e.target as HTMLElement | null;
      const interactive = tgt?.closest("a, button, [data-cursor='hover']");
      setHover(!!interactive);

      // phosphor trail — drop a fading dot every ~28ms
      const now = performance.now();
      if (now - lastTrail > 28) {
        lastTrail = now;
        const t = document.createElement("div");
        t.className = "phosphor-trail";
        t.style.left = `${tx - 2}px`;
        t.style.top = `${ty - 2}px`;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 720);
      }
    };

    const animate = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className={`pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-cyan mix-blend-screen ${seen ? "" : "opacity-0"}`}
        style={{
          boxShadow: "0 0 8px rgba(0,240,255,0.9), 0 0 18px rgba(0,240,255,0.6)",
        }}
      />
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[200] grid h-9 w-9 place-items-center transition-[opacity,width,height,background] duration-200 ${
          hover ? "h-12 w-12" : ""
        } ${seen ? "" : "opacity-0"}`}
        style={{
          mixBlendMode: "screen",
        }}
      >
        <div
          className={`h-full w-full rounded-full border ${
            hover
              ? "border-mag border-2"
              : down
              ? "border-acid"
              : "border-cyan/70"
          }`}
          style={{
            boxShadow: hover
              ? "0 0 18px rgba(255,31,142,0.55), 0 0 36px rgba(255,31,142,0.35)"
              : "0 0 12px rgba(0,240,255,0.45)",
          }}
        />
        <span
          className="absolute h-px w-2 bg-current"
          style={{ left: "-6px" }}
        />
        <span
          className="absolute h-px w-2 bg-current"
          style={{ right: "-6px" }}
        />
        <span
          className="absolute w-px h-2 bg-current"
          style={{ top: "-6px" }}
        />
        <span
          className="absolute w-px h-2 bg-current"
          style={{ bottom: "-6px" }}
        />
      </div>
    </>
  );
}
