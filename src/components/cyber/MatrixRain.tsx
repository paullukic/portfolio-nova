import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01PAULLUKIC";

export function MatrixRain() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buffer = useRef<string[]>([]);

  // konami listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      buffer.current.push(e.key);
      buffer.current = buffer.current.slice(-KONAMI.length);
      if (KONAMI.every((k, i) => buffer.current[i] === k)) {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setActive(true);
        buffer.current = [];
        setTimeout(() => setActive(false), 8000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // canvas animation
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 16;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = new Array(cols).fill(1).map(() => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 7, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = "#00f0ff";
        ctx.fillText(ch, x, y);
        // bright leading
        if (Math.random() > 0.96) {
          ctx.fillStyle = "#defb00";
          ctx.fillText(ch, x, y);
        }
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.6;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;
  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[170] mix-blend-screen"
      />
      <div className="pointer-events-none fixed left-1/2 top-1/2 z-[171] -translate-x-1/2 -translate-y-1/2 border border-cyan bg-void/90 px-6 py-4 font-mono text-[12px] uppercase tracking-[0.32em] text-cyan glow-cyan">
        WAKE_UP_NEO ::: MATRIX_HAS_YOU
      </div>
    </>
  );
}
