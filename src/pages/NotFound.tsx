import { useEffect, useState } from "react";
import { ArrowLeft, Home, Terminal } from "lucide-react";
import { GlitchText } from "@/components/cyber/GlitchText";
import { social } from "@/content/profile";

export default function NotFound() {
  const loc = window.location;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen bg-void text-bone scanlines antialiased grain flex items-center justify-center overflow-hidden">
      {/* background grid */}
      <div className="pointer-events-none absolute inset-0 grid-floor opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,7,0.9)_85%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 md:py-24">
        {/* top strip */}
        <div className="flex items-center justify-between border-b border-rule-strong pb-3 font-mono text-[10px] uppercase tracking-[0.28em]">
          <span className="flex items-center gap-2 text-mag glow-mag">
            <span className="h-2 w-2 rounded-full bg-mag pulse-soft" />
            SIGNAL_LOST
          </span>
          <span className="text-fade">
            NODE_NOT_FOUND · T+{String(elapsed).padStart(3, "0")}s
          </span>
        </div>

        {/* 404 */}
        <h1 className="mt-10 font-display uppercase leading-[0.86] tracking-tighter">
          <span className="block text-[22vw] md:text-[18rem] text-bone glow-mag">
            <GlitchText text="404" intensity={1} />
          </span>
        </h1>

        <div className="mt-6 border-l-2 border-mag pl-4 space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-mag">
            {">"} ERR_PAGE_CLASSIFIED
          </p>
          <p className="font-display uppercase text-2xl md:text-3xl text-bone leading-tight tracking-tight">
            The node you requested isn't in the dossier.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fade break-all">
            path: <span className="text-bone">{loc.pathname}</span>
          </p>
        </div>

        {/* log */}
        <pre className="mt-8 border border-rule-strong bg-deck/70 backdrop-blur-sm px-5 py-4 font-mono text-[11.5px] leading-relaxed text-fade">
          <div><span className="text-mag">[ERR ]</span> requested {loc.pathname} · 404</div>
          <div><span className="text-cyan">[NET ]</span> rerouting to /dev/grid …</div>
          <div><span className="text-acid">[RDY ]</span> dossier root available · nothing permanent lost</div>
        </pre>

        {/* actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="/"
            className="clip-cta inline-flex items-center gap-2 px-5 py-2.5 bg-cyan text-void font-mono text-[11px] uppercase tracking-[0.24em] font-bold hover:bg-acid transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            RETURN_HOME
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
          </a>
          <button
            type="button"
            onClick={() => history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-rule-strong font-mono text-[11px] uppercase tracking-[0.24em] text-ash hover:border-cyan hover:text-cyan"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            PREV_NODE
          </button>
          <a
            href={social.email.href}
            className="ml-auto inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-mag hover:text-bone"
          >
            <Terminal className="h-3.5 w-3.5" />
            REPORT_DEAD_LINK
          </a>
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.32em] text-fade">
          © {new Date().getFullYear()} · PAUL_LUKIC · ALL_NODES_RESERVED
        </p>
      </div>
    </main>
  );
}
