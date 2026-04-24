import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search, ArrowRight, FileText, Mail, Github, Linkedin,
  Compass, Cpu, Zap, Activity, FolderOpen, Terminal, HelpCircle,
} from "lucide-react";

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
      { id: "go-top", group: "nav", label: "Go to Hero", kbd: "1", icon: <Compass className="h-3.5 w-3.5" />, run: go("top") },
      { id: "go-brief", group: "nav", label: "Go to Brief", kbd: "2", icon: <Cpu className="h-3.5 w-3.5" />, run: go("brief") },
      { id: "go-selected", group: "nav", label: "Go to Selected Work", kbd: "3", icon: <FolderOpen className="h-3.5 w-3.5" />, run: go("selected") },
      { id: "go-ledger", group: "nav", label: "Go to Ledger", kbd: "4", icon: <FileText className="h-3.5 w-3.5" />, run: go("ledger") },
      { id: "go-now", group: "nav", label: "Go to NOW (live feed)", kbd: "5", icon: <Activity className="h-3.5 w-3.5" />, run: go("now") },
      { id: "go-toolkit", group: "nav", label: "Go to Toolkit", kbd: "6", icon: <Zap className="h-3.5 w-3.5" />, run: go("toolkit") },
      { id: "go-lab", group: "nav", label: "Go to The Lab", kbd: "7", icon: <Terminal className="h-3.5 w-3.5" />, run: go("lab") },
      { id: "go-contact", group: "nav", label: "Go to Contact", kbd: "8", icon: <Mail className="h-3.5 w-3.5" />, run: go("contact") },

      {
        id: "mail",
        group: "action",
        label: "Email Paul",
        hint: "paul.lukic94@gmail.com",
        icon: <Mail className="h-3.5 w-3.5" />,
        run: () => {
          window.location.href = "mailto:paul.lukic94@gmail.com";
          setOpen(false);
        },
      },
      {
        id: "cv",
        group: "action",
        label: "Download CV",
        hint: "Paul_Lukic_CV.pdf",
        icon: <FileText className="h-3.5 w-3.5" />,
        run: () => {
          window.open("/Paul_Lukic_CV.pdf", "_blank");
          setOpen(false);
        },
      },
      {
        id: "github",
        group: "action",
        label: "Open GitHub",
        hint: "github.com/paullukic",
        icon: <Github className="h-3.5 w-3.5" />,
        run: () => {
          window.open("https://github.com/paullukic", "_blank");
          setOpen(false);
        },
      },
      {
        id: "linkedin",
        group: "action",
        label: "Open LinkedIn",
        hint: "linkedin.com/in/paul-lukic",
        icon: <Linkedin className="h-3.5 w-3.5" />,
        run: () => {
          window.open("https://www.linkedin.com/in/paul-lukic/", "_blank");
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
      // number shortcuts 1-8
      if (/^[1-8]$/.test(e.key)) {
        const targetId = [
          "top", "brief", "selected", "ledger", "now", "toolkit", "lab", "contact",
        ][parseInt(e.key, 10) - 1];
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
      returnFocusRef.current?.focus?.();
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
    <div className="fixed inset-0 z-[90] flex items-start justify-center pt-[10vh] px-4">
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
            <Shortcut keys={["1", "-", "8"]} label="Jump to section 1–8" />
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
