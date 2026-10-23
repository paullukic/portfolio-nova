import { useEffect, useState } from "react";
import { Github, Linkedin, FileText, Mail, Menu, X } from "lucide-react";
import { GlitchText, HoverDecode } from "./GlitchText";
import { Magnetic } from "./Magnetic";
import { navSections } from "@/content/sections";
import { profile, social } from "@/content/profile";

const NAV = navSections.map((s) => ({ id: s.id, label: s.navLabel ?? s.label }));

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    // On lg+ the MissionRail (left) + HudBar (bottom) handle navigation, so
    // the top bar goes static — it scrolls away with content. Below lg it
    // stays fixed since neither rail nor expanded HudBar is visible.
    <header className="fixed lg:absolute top-0 left-0 right-0 z-50">
      {/* angular clipped backplate */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-void/85 backdrop-blur-md border-b border-cyan/25"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% 100%, calc(100% - 28px) 100%, calc(100% - 40px) calc(100% - 6px), 0 calc(100% - 6px))",
          }}
        />
        {/* accent strip */}
        <div className="absolute bottom-0 right-0 h-[2px] w-44 bg-gradient-to-l from-cyan via-mag to-transparent" />

        <div className="relative mx-auto flex max-w-[1480px] items-center gap-2 sm:gap-4 px-3 sm:px-4 md:px-7 h-14">
          {/* logotype */}
          <a href="#top" className="flex items-center gap-2 sm:gap-2.5 mr-auto group min-w-0">
            <span className="grid h-7 w-7 shrink-0 place-items-center border border-cyan text-[10px] font-bold text-cyan glow-cyan flicker">
              PL
            </span>
            <span className="hidden sm:flex flex-col leading-none min-w-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone truncate">
                <GlitchText text={`${profile.first}_${profile.last}`} intensity={0.25} />
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.32em] text-fade truncate">
                {profile.handle} / dossier
              </span>
            </span>
          </a>

          {/* center nav — lg+ */}
          <nav className="hidden lg:flex items-center">
            {NAV.map((n, i) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`group relative font-mono text-[11px] uppercase tracking-[0.24em] text-ash hover:text-cyan transition-colors px-3 xl:px-4 py-2 ${
                  i > 0 ? "border-l border-rule" : ""
                }`}
              >
                <span className="text-fade mr-1.5">0{i + 1}</span>
                <HoverDecode text={n.label} />
              </a>
            ))}
          </nav>

          {/* right cluster — md+ icons */}
          <div className="hidden md:flex items-center gap-2 ml-auto lg:ml-4">
            <Icon href={social.github.href} label="GitHub">
              <Github className="h-4 w-4" />
            </Icon>
            <Icon href={social.linkedin.href} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Icon>
            {profile.cv && (
              <Icon href={profile.cv} download label="CV">
                <FileText className="h-4 w-4" />
              </Icon>
            )}

            <Magnetic strength={0.35} radius={110}>
              <a
                href={social.email.href}
                className="relative ml-1 inline-flex items-center gap-2 px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.24em] text-void bg-cyan transition-all hover:bg-acid"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)",
                }}
              >
                <Mail className="h-3.5 w-3.5" />
                CONTACT
              </a>
            </Magnetic>
          </div>

          {/* mobile: hamburger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative ml-auto grid h-9 w-9 place-items-center border border-cyan/50 text-cyan hover:border-cyan hover:bg-cyan/10"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`md:hidden overflow-hidden bg-void/95 backdrop-blur-md border-b border-cyan/25 transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-[1480px] px-4 py-4 grid grid-cols-2 gap-px bg-rule-strong border-y border-rule-strong">
          {NAV.map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 bg-deck px-4 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ash active:text-cyan"
            >
              <span className="text-fade">0{i + 1}</span>
              <span className="text-bone">{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="mx-auto max-w-[1480px] px-4 py-4 flex items-center gap-2">
          <Icon href={social.github.href} label="GitHub">
            <Github className="h-4 w-4" />
          </Icon>
          <Icon href={social.linkedin.href} label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </Icon>
          {profile.cv && (
            <Icon href={profile.cv} download label="CV">
              <FileText className="h-4 w-4" />
            </Icon>
          )}

          <a
            href={social.email.href}
            onClick={() => setOpen(false)}
            className="relative ml-auto inline-flex items-center gap-2 px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.24em] text-void bg-cyan"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%, 10px 50%)",
            }}
          >
            <Mail className="h-3.5 w-3.5" />
            CONTACT
          </a>
        </div>
      </div>
    </header>
  );
}

function Icon({
  href,
  download,
  label,
  children,
}: {
  href: string;
  download?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={download ? undefined : "_blank"}
      rel="noreferrer"
      download={download}
      aria-label={label}
      className="grid h-9 w-9 p-2 place-items-center border border-rule-strong text-ash transition-all hover:border-cyan hover:text-cyan hover:bg-cyan/10"
    >
      {children}
    </a>
  );
}
