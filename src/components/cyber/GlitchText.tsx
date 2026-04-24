import { useEffect, useRef, useState } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01";

type Props = {
  text: string;
  className?: string;
  intensity?: number; // 0..1
};

/**
 * Layered RGB-split glitch via CSS pseudo-elements + occasional char scramble.
 */
export function GlitchText({ text, className = "", intensity = 0.5 }: Props) {
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      if (Math.random() < intensity * 0.35) {
        const scrambled = text
          .split("")
          .map((c) =>
            c === " " || Math.random() > 0.18
              ? c
              : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          )
          .join("");
        setOut(scrambled);
        setTimeout(() => alive && setOut(text), 90 + Math.random() * 110);
      }
    };
    const id = setInterval(tick, 1400);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [text, intensity]);

  return (
    <span data-text={out} className={`glitch ${className}`}>
      {out}
    </span>
  );
}

/** Decode-on-mount scramble — resolves into text. */
export function DecodeText({
  text,
  className = "",
  durationMs = 1100,
}: {
  text: string;
  className?: string;
  durationMs?: number;
}) {
  const reduce = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [out, setOut] = useState(() =>
    reduce
      ? text
      : text
          .split("")
          .map((c) => (c === " " ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]))
          .join("")
  );

  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const reveal = Math.floor(p * text.length);
      const next = text
        .split("")
        .map((c, i) => {
          if (i < reveal || c === " ") return c;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
      setOut(next);
      if (p < 1) raf = requestAnimationFrame(step);
      else setOut(text);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, durationMs]);

  return <span className={className}>{out}</span>;
}

/** Decode-on-view. Scrambles from mount and resolves into the real text the
 * first time it enters the viewport. Subsequent scrolls do nothing. */
export function DecodeOnView({
  text,
  className = "",
  durationMs = 700,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.2,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  durationMs?: number;
  rootMargin?: string;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const reduce =
    typeof window !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [out, setOut] = useState(() =>
    reduce
      ? text
      : text
          .split("")
          .map((c) =>
            /\s/.test(c) ? c : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          )
          .join("")
  );
  const ref = useRef<HTMLElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || done.current) continue;
          done.current = true;
          io.disconnect();
          const start = performance.now();
          let raf = 0;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / durationMs);
            const reveal = Math.floor(p * text.length);
            const next = text
              .split("")
              .map((c, i) => {
                if (i < reveal || /\s/.test(c)) return c;
                return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              })
              .join("");
            setOut(next);
            if (p < 1) raf = requestAnimationFrame(step);
            else setOut(text);
          };
          raf = requestAnimationFrame(step);
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, durationMs, rootMargin, threshold, reduce]);

  const Cmp = Tag as any;
  return (
    <Cmp ref={ref} className={className}>
      {out}
    </Cmp>
  );
}

/** Scramble-on-hover. Text stays normal until user hovers/focuses the parent,
 * then runs a short decode animation and lands back on the original text. */
export function HoverDecode({
  text,
  className = "",
  durationMs = 380,
  preserveWhitespace = true,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  durationMs?: number;
  preserveWhitespace?: boolean;
  as?: keyof JSX.IntrinsicElements;
}) {
  const [out, setOut] = useState(text);
  const rafRef = useRef(0);
  const reduce = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const trigger = () => {
    if (reduce) return;
    cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const reveal = Math.floor(p * text.length);
      const next = text
        .split("")
        .map((c, i) => {
          if (i < reveal) return c;
          if (preserveWhitespace && /\s/.test(c)) return c;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
      setOut(next);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else setOut(text);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Tag-as-any so TS lets us spread arbitrary event handlers.
  const Cmp = Tag as any;
  return (
    <Cmp
      className={className}
      onMouseEnter={trigger}
      onFocus={trigger}
      // keep a11y tree clean — real text always in DOM once animation settles
    >
      {out}
    </Cmp>
  );
}
