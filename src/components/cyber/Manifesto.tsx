import { useEffect, useRef, useState } from "react";
import { DecodeOnView } from "./GlitchText";
import { SectionWatermark } from "./SectionWatermark";
import { profile, social } from "@/content/profile";
import { projects } from "@/content/projects";
import { stackSummary } from "@/content/skills";

const BOOT_LINES = [
  `[ BOOT ] ${profile.handle} v2026.10 — kernel ok`,
  `[ AUTH ] subject = ${profile.first}_LUKIC · clearance = PUBLIC`,
  "[ NET  ] handshake @ NOVI_SAD ↔ /dev/grid",
  "[ MEM  ] loading wire_bio.txt … OK",
  "[ RDY  ] dossier streaming — type `help` for commands",
];

type TermLine = { kind: "sys" | "in" | "out" | "err"; text: string };

const COMMANDS: Record<
  string,
  {
    help: string;
    run: (args: string[]) => string[] | { scroll: string };
  }
> = {
  help: {
    help: "list available commands",
    run: () => [
      "AVAILABLE COMMANDS:",
      "  help                 show this list",
      "  whoami               who is PL-94-001",
      "  ls [projects|stack]  list artifacts",
      "  cat <file>           read a file (try: wire_bio.txt)",
      "  goto <section>       jump to section (brief / work / ledger / now / toolkit / clearance / lab / contact)",
      "  contact              show direct line",
      "  sudo hire            see availability",
      "  clear                clear terminal",
    ],
  },
  whoami: {
    help: "identify subject",
    run: () => [
      `${profile.fileId} · ${profile.first}_${profile.last} · ${profile.pronounce}`,
      `${profile.title.toLowerCase()} · shipping since ${profile.since}`,
      "Java/Spring backends · React/Svelte frontends",
      `currently @ ${profile.currently.org} (${profile.currently.product}) · based Novi Sad · CET`,
    ],
  },
  ls: {
    help: "list artifacts",
    run: (args) => {
      const sub = args[0];
      if (sub === "projects" || !sub) {
        return [
          "PROJECTS:",
          ...projects.map(
            (p, i) =>
              `  ${String(i + 1).padStart(2, "0")}  ${p.title.padEnd(20)}  ${p.client.split(" · ")[0]} · ${p.status}`,
          ),
        ];
      }
      if (sub === "stack") {
        return ["STACK:", ...stackSummary];
      }
      return [`ls: unknown arg '${sub}'`];
    },
  },
  cat: {
    help: "read a file",
    run: (args) => {
      const file = args[0]?.toLowerCase();
      if (!file) return ["cat: missing file"];
      if (file === "wire_bio.txt") {
        return [...profile.bio];
      }
      if (file === "readme" || file === "readme.md") {
        return [
          "# PL-94-001",
          "",
          "press `/` for command palette · numbers `1-9` to jump sections · `?` for help",
        ];
      }
      return [`cat: no such file '${args[0]}'`];
    },
  },
  goto: {
    help: "jump to section",
    run: (args) => {
      const map: Record<string, string> = {
        brief: "brief",
        work: "selected",
        selected: "selected",
        ledger: "ledger",
        now: "now",
        toolkit: "toolkit",
        clearance: "clearance",
        sec: "clearance",
        lab: "lab",
        contact: "contact",
        ping: "contact",
        top: "top",
        hero: "top",
      };
      const id = map[(args[0] ?? "").toLowerCase()];
      if (!id) return [`goto: unknown section '${args[0] ?? ""}'`];
      return { scroll: id };
    },
  },
  contact: {
    help: "show direct line",
    run: () => [
      "DIRECT_LINE:",
      `  email       ${profile.email}`,
      `  linkedin    ${social.linkedin.value}`,
      `  github      ${social.github.value}`,
      `  response    ${profile.response} · CET`,
    ],
  },
  sudo: {
    help: "elevated action",
    run: (args) => {
      if (args[0] === "hire") {
        return [
          "[SUDO] permission granted — you're hired (conditionally).",
          "OPEN TO:",
          ...profile.openTo.map((r) => `  · ${r.label.toLowerCase()}`),
          `NEXT STEP: email ${profile.email}`,
        ];
      }
      return [`sudo: unknown op '${args[0] ?? ""}'`];
    },
  },
  clear: {
    help: "clear terminal",
    run: () => [],
  },
};

export function Manifesto() {
  return (
    <section
      id="brief"
      className="relative py-28 md:py-40 overflow-hidden"
    >
      <SectionWatermark number="01" side="right" />

      <div className="relative mx-auto max-w-[1480px] px-4 md:px-7 z-10">
        {/* NOW-style header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div data-reveal>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-cyan glow-cyan">
              &gt;&gt; WIRE_BIO · SUBJECT_PROFILE
            </div>
            <h2 className="mt-2 font-display uppercase text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.85] tracking-tighter text-bone">
              <span className="text-cyan glow-cyan italic">/</span>
              <DecodeOnView text="BRIEF" durationMs={700} />
            </h2>
          </div>
          <div data-reveal className="flex items-center gap-6 font-mono text-[10.5px] uppercase tracking-[0.28em]">
            <div className="text-right">
              <div className="text-fade">STATUS</div>
              <div className="mt-1 text-acid glow-acid">OPEN_TO_ROLES</div>
            </div>
            <div className="h-10 w-px bg-rule-strong" />
            <div className="text-right">
              <div className="text-fade">CLEARANCE</div>
              <div className="mt-1 text-cyan glow-cyan">PUBLIC · SHARE_OK</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8" data-reveal style={{ ["--reveal-delay" as any]: "120ms" }}>
          {/* terminal */}
          <div className="col-span-12 lg:col-span-5 relative border border-rule-strong bg-deck/80 backdrop-blur-sm">
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
              <span className="text-fade">/usr/local/bin/netrunner</span>
              <span className="text-acid">PID 94</span>
            </div>
            <Terminal />
          </div>

          {/* brief */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <p className="font-display text-2xl md:text-[2.1rem] leading-[1.18] text-bone text-pretty">
              <span className="float-left mr-3 mt-1 font-display text-[5rem] leading-[0.78] text-cyan glow-cyan">
                F
              </span>
              ull stack developer, shipping since {profile.since} across{" "}
              <span className="text-cyan">Java/Spring</span> backends and{" "}
              <span className="text-mag">React/Svelte</span> frontends. I make
              systems that scale and interfaces that don't waste anyone's
              afternoon. Backend rigor, frontend taste, my own products after
              hours, security-aware by training. Open to full-stack, backend,
              founding-engineer or deep contract roles.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {profile.capabilities.map((c) => (
                <Capability key={c.label} label={c.label} color={c.tone} title={c.title} bullets={c.bullets} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Terminal() {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // boot sequence once
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setLines(BOOT_LINES.slice(0, i).map((text) => ({ kind: "sys", text })));
      if (i >= BOOT_LINES.length) {
        clearInterval(id);
        setBooted(true);
      }
    }, 360);
    return () => clearInterval(id);
  }, []);

  // autoscroll the terminal box only; scrollIntoView would also drag the
  // whole page down to the terminal while the boot lines print
  useEffect(() => {
    const box = boxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setHistory((h) => [trimmed, ...h].slice(0, 30));
    setHIdx(-1);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const spec = COMMANDS[cmd.toLowerCase()];

    setLines((prev) => [...prev, { kind: "in", text: `$ ${trimmed}` }]);

    if (!spec) {
      setLines((prev) => [
        ...prev,
        { kind: "err", text: `command not found: ${cmd} — try \`help\`` },
      ]);
      return;
    }
    if (cmd.toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const out = spec.run(args);
    if (Array.isArray(out)) {
      setLines((prev) => [
        ...prev,
        ...out.map<TermLine>((text) => ({ kind: "out", text })),
      ]);
    } else if (out && "scroll" in out) {
      const el = document.getElementById(out.scroll);
      if (el) {
        setLines((prev) => [
          ...prev,
          { kind: "out", text: `> scrolling to #${out.scroll} …` },
        ]);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setLines((prev) => [
          ...prev,
          { kind: "err", text: `goto: #${out.scroll} not found in DOM` },
        ]);
      }
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(history.length - 1, hIdx + 1);
      setHIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(-1, hIdx - 1);
      setHIdx(next);
      setInput(next === -1 ? "" : history[next] ?? "");
    }
  };

  return (
    <div
      ref={boxRef}
      className="m-0 px-4 py-5 font-mono text-[12px] leading-relaxed text-bone min-h-[320px] max-h-[460px] overflow-y-auto"
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      {lines.map((l, i) => (
        <div key={i}>
          <span
            className={
              l.kind === "sys"
                ? l.text.includes("[ AUTH ]")
                  ? "text-mag"
                  : l.text.includes("[ NET  ]")
                  ? "text-cyan"
                  : l.text.includes("[ MEM  ]")
                  ? "text-amber"
                  : l.text.includes("[ RDY  ]")
                  ? "text-acid"
                  : "text-fade"
                : l.kind === "in"
                ? "text-cyan"
                : l.kind === "err"
                ? "text-mag"
                : "text-bone"
            }
          >
            {l.text}
          </span>
        </div>
      ))}

      {booted && (
        <div className="flex items-center gap-1">
          <span className="text-cyan glow-cyan shrink-0">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="flex-1 bg-transparent outline-none border-0 font-mono text-[12px] text-bone caret-cyan"
          />
          <span className="blink text-cyan" aria-hidden="true">▌</span>
        </div>
      )}
    </div>
  );
}

function Capability({
  label,
  color,
  title,
  bullets,
}: {
  label: string;
  color: "cyan" | "mag" | "acid" | "amber";
  title: string;
  bullets: string[];
}) {
  const text =
    color === "cyan"
      ? "text-cyan glow-cyan"
      : color === "mag"
      ? "text-mag glow-mag"
      : color === "acid"
      ? "text-acid glow-acid"
      : "text-amber";
  const border =
    color === "cyan"
      ? "border-cyan/40"
      : color === "mag"
      ? "border-mag/40"
      : color === "acid"
      ? "border-acid/40"
      : "border-amber/40";
  const bg =
    color === "cyan"
      ? "bg-cyan"
      : color === "mag"
      ? "bg-mag"
      : color === "acid"
      ? "bg-acid"
      : "bg-amber";
  return (
    <div className={`border-l-2 ${border} pl-4`}>
      <div className={`font-mono text-[10px] uppercase tracking-[0.22em] ${text}`}>
        {label}
      </div>
      <h4 className="mt-2 font-display uppercase text-lg md:text-xl text-bone leading-tight tracking-tight">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-ash text-pretty">
            <span className={`mt-2 inline-block h-px w-2.5 shrink-0 ${bg}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
