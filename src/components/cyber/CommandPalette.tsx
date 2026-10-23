import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search, ArrowRight, FileText, Mail, Github, Linkedin,
  Compass, Cpu, Zap, Activity, FolderOpen, Terminal, HelpCircle, Shield,
} from "lucide-react";
import { sections } from "@/content/sections";
import { profile, social } from "@/content/profile";

const SECTION_TITLES: Record<string, string> = {
  top: "Hero",
  brief: "Brief",
  selected: "Selected Work",
  ledger: "Ledger",
  now: "NOW (live feed)",
  toolkit: "Toolkit",
  clearance: "Clearance (security)",
  lab: "The Lab",
  contact: "Contact",
};

const SECTION_ICONS: Record<string, React.ReactNode> = {
  top: <Compass className="h-3.5 w-3.5" />,
  brief: <Cpu className="h-3.5 w-3.5" />,
  selected: <FolderOpen className="h-3.5 w-3.5" />,
  ledger: <FileText className="h-3.5 w-3.5" />,
  now: <Activity className="h-3.5 w-3.5" />,
  toolkit: <Zap className="h-3.5 w-3.5" />,
  clearance: <Shield className="h-3.5 w-3.5" />,
  lab: <Terminal className="h-3.5 w-3.5" />,
  contact: <Mail className="h-3.5 w-3.5" />,
};

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  kbd?: string;
  icon: React.ReactNode;
  run: () => void;
  group: "nav" | "action" | "help";
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const cmds = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    };
    return [
      ...sections.map((sec, i): Cmd => ({
        id: `go-${sec.id}`,
        group: "nav",
        label: `Go to ${SECTION_TITLES[sec.id] ?? sec.label}`,
        kbd: String(i + 1),
        icon: SECTION_ICONS[sec.id] ?? <Compass className="h-3.5 w-3.5" />,
        run: go(sec.id),
      })),

      {
        id: "mail",
        group: "action",
        label: "Email Paul",
        hint: profile.email,
        icon: <Mail className="h-3.5 w-3.5" />,
        run: () => {
          window.location.href = social.email.href;
          setOpen(false);
        },
      },
      ...(profile.cv
        ? [
            {
              id: "cv",
              group: "action",
              label: "Download CV",
              hint: profile.cv.replace(/^\//, ""),
              icon: <FileText className="h-3.5 w-3.5" />,
              run: () => {
                window.open(profile.cv!, "_blank");
                setOpen(false);
              },
            } satisfies Cmd,
          ]
        : []),
      {
        id: "github",
        group: "action",
        label: "Open GitHub",
        hint: social.github.href.replace("https://", ""),
        icon: <Github className="h-3.5 w-3.5" />,
        run: () => {
          window.open(social.github.href, "_blank");
          setOpen(false);
        },
      },
      {
        id: "linkedin",
        group: "action",
        label: "Open LinkedIn",
        hint: social.linkedin.href.replace("https://www.", "").replace(/\/$/, ""),
        icon: <Linkedin className="h-3.5 w-3.5" />,
        run: () => {
          window.open(social.linkedin.href, "_blank");
          setOpen(false);
        },
      },
      {
        id: "help",
        group: "help",
        label: "Show keyboard shortcuts",
        kbd: "?",
        icon: <HelpCircle className="h-3.5 w-3.5" />,
        run: () => {
          setQ("?");
        },
      },
    ];
  }, []);

  // filter
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle || needle === "?") return cmds;
    return cmds.filter(
      (c) =>
        c.label.toLowerCase().includes(needle) ||
        (c.hint ?? "").toLowerCase().includes(needle) ||
        c.id.includes(needle)
    );
  }, [cmds, q]);

  // global shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (open) return;
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "/") {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (e.key === "?") {
        e.preventDefault();
        setOpen(true);
        setQ("?");
        return;
      }
      // number shortcuts 1..N, one per section
      if (/^[1-9]$/.test(e.key) && parseInt(e.key, 10) <= sections.length) {
        const targetId = sections[parseInt(e.key, 10) - 1].id;
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // internal navigation + focus lifecycle
  useEffect(() => {
    if (!open) {
      // palette just closed — restore focus to whatever triggered it
      // preventScroll: restoring focus must not undo the scroll a command just started
      returnFocusRef.current?.focus?.({ preventScroll: true });
      return;
    }
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setQ("");
    setIdx(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[idx]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, idx]);

  if (!open) return null;

  const helpMode = q.trim() === "?";

  return (
    <div className="fixed inset-0 z-[140] flex items-start justify-center pt-[10vh] px-4">
      <div
        className="absolute inset-0 bg-void/75 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-xl bg-deck border border-cyan/40 shadow-2xl"
        style={{
          boxShadow:
            "0 0 0 1px rgba(0,240,255,0.1), 0 20px 80px rgba(0,0,0,0.6)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <span className="corner-bracket tl" />
        <span className="corner-bracket tr" />
        <span className="corner-bracket bl" />
        <span className="corner-bracket br" />

        {/* header strip */}
        <div className="flex items-center justify-between border-b border-rule px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-acid pulse-soft" />
            CMD_PALETTE · v1
          </span>
          <span className="text-fade">ESC to close</span>
        </div>

        {/* input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-rule">
          <Search className="h-4 w-4 text-cyan" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            placeholder="Type a command or section… / , ? for help"
            className="flex-1 bg-transparent outline-none font-mono text-[13px] text-bone placeholder:text-fade"
          />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-fade">
            ↑↓ · ⏎
          </span>
        </div>

        {/* list or help */}
        {helpMode ? (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3 font-mono text-[11px] uppercase tracking-[0.22em]">
            <Shortcut keys={["/"]} label="Open command palette" />
            <Shortcut keys={["⌘", "K"]} altKeys={["Ctrl", "K"]} label="Open command palette" />
            <Shortcut keys={["?"]} label="Show this help" />
            <Shortcut keys={["1", "-", String(sections.length)]} label={`Jump to section 1–${sections.length}`} />
            <Shortcut keys={["Esc"]} label="Close overlays" />
            <p className="pt-2 text-fade normal-case tracking-normal font-sans">
              Pro tip: most overlays (case-study drawer, this palette, mobile menu) close with <span className="text-cyan">ESC</span>.
            </p>
          </div>
        ) : (
          <ul className="max-h-[60vh] overflow-y-auto py-2">
            {filtered.length === 0 && (
              <li className="px-4 py-6 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-fade">
                NO_MATCH · try another term
              </li>
            )}
            {filtered.map((c, i) => {
              const active = i === idx;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => c.run()}
                    className={`group w-full flex items-center gap-3 px-4 py-2.5 text-left font-mono text-[12px] transition-colors ${
                      active ? "bg-cyan/10 text-bone" : "text-ash hover:bg-cyan/5"
                    }`}
                  >
                    <span className={active ? "text-cyan glow-cyan" : "text-fade"}>
                      {c.icon}
                    </span>
                    <span className="flex-1 truncate">
                      <span className={active ? "text-bone" : "text-bone"}>
                        {c.label}
                      </span>
                      {c.hint && (
                        <span className="ml-2 text-fade normal-case">
                          {c.hint}
                        </span>
                      )}
                    </span>
                    {c.kbd && (
                      <span className="shrink-0 border border-rule-strong px-1.5 py-0.5 text-[9.5px] text-fade">
                        {c.kbd}
                      </span>
                    )}
                    <ArrowRight
                      className={`h-3.5 w-3.5 transition-all ${
                        active ? "text-cyan translate-x-0.5" : "text-fade opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex items-center justify-between border-t border-rule px-4 py-2 font-mono text-[9.5px] uppercase tracking-[0.22em] text-fade">
          <span>
            <span className="text-cyan">/</span> or{" "}
            <span className="text-cyan">⌘K</span> anywhere · <span className="text-cyan">?</span> for help
          </span>
          <span className="text-fade">{filtered.length} / {cmds.length}</span>
        </div>
      </div>
    </div>
  );
}

function Shortcut({
  keys,
  altKeys,
  label,
}: {
  keys: string[];
  altKeys?: string[];
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-rule pb-2">
      <span className="flex items-center gap-1">
        {keys.map((k, i) => (
          <kbd
            key={i}
            className="border border-rule-strong bg-void/60 px-1.5 py-0.5 text-[10px] text-bone"
          >
            {k}
          </kbd>
        ))}
        {altKeys && (
          <>
            <span className="text-fade mx-1">/</span>
            {altKeys.map((k, i) => (
              <kbd
                key={i}
                className="border border-rule-strong bg-void/60 px-1.5 py-0.5 text-[10px] text-bone"
              >
                {k}
              </kbd>
            ))}
          </>
        )}
      </span>
      <span className="text-bone normal-case tracking-normal font-sans">
        {label}
      </span>
    </div>
  );
}
