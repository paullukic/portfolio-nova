import { useEffect, useState } from "react";

const LINES = [
  { t: "> init /dev/netrunner …", c: "text-fade", d: 120 },
  { t: "> decrypting dossier key 0x94A ………  OK", c: "text-cyan", d: 380 },
  { t: "> attaching to host NOVI_SAD :: 44.81N 19.83E", c: "text-mag", d: 240 },
  { t: "> loading wire_bio.txt  ▓▓▓▓▓▓▓▓▓▓ 100%", c: "text-amber", d: 320 },
  { t: "> spinning up orbit rings … 03 online", c: "text-cyan", d: 260 },
  { t: "> bypassing ICE …  PERM", c: "text-mag", d: 260 },
  { t: "> handshake complete. welcome, operator.", c: "text-acid", d: 340 },
];

const SEEN_KEY = "pl-boot-seen";

export function BootOverlay() {
  const [shown, setShown] = useState<typeof LINES>([]);
  const [fading, setFading] = useState(false);
  // Shown at most once per browser session, never under reduced motion.
  const [gone, setGone] = useState(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return true;
    } catch {
      /* storage blocked: show it */
    }
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Lock body scroll while the boot screen is up so the page can't drift
  // even if fonts swap or lazy chunks arrive. Also pins scrollY to 0 on
  // release so we enter the hero cleanly.
  useEffect(() => {
    if (gone) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    // Kill any drift that may have happened between page load and mount.
    window.scrollTo(0, 0);
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      window.scrollTo(0, 0);
    };
  }, [gone]);

  useEffect(() => {
    if (gone) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    let acc = 300;
    const timers: number[] = [];
    LINES.forEach((line, i) => {
      acc += line.d;
      timers.push(
        window.setTimeout(() => setShown((s) => [...s, line]), acc)
      );
    });
    timers.push(window.setTimeout(() => setFading(true), acc + 600));
    timers.push(window.setTimeout(() => setGone(true), acc + 1600));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[150] grid place-items-center bg-void transition-opacity duration-1000 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 grid-floor opacity-40" />
      <div className="absolute inset-0 scanlines-stack" />

      <div className="relative w-[min(90vw,680px)] border border-cyan/40 bg-deck/80 backdrop-blur-sm">
        <span className="corner-bracket tl" />
        <span className="corner-bracket tr" />
        <span className="corner-bracket bl" />
        <span className="corner-bracket br" />
        <div className="flex items-center justify-between border-b border-rule px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-mag" />
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="h-2 w-2 rounded-full bg-acid" />
          </div>
          <span className="text-fade">netrunner_94 :: /boot</span>
          <span className="text-acid flicker">AUTH_OK</span>
        </div>
        <pre className="m-0 px-5 py-5 font-mono text-[12.5px] leading-relaxed text-bone min-h-[240px]">
          {shown.map((l, i) => (
            <div key={i} className="reveal" style={{ animationDuration: "200ms" }}>
              <span className={l.c}>{l.t}</span>
            </div>
          ))}
          {shown.length > 0 && <div className="text-cyan glow-cyan blink">&nbsp;</div>}
        </pre>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-fade">
        PRESS <span className="text-cyan">ESC</span> TO SKIP
      </div>
      <BootSkip setGone={setGone} />
    </div>
  );
}

function BootSkip({ setGone }: { setGone: (v: boolean) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGone(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setGone]);
  return null;
}
