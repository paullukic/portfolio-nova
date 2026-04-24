import { useEffect, useState } from "react";
import { Github, Linkedin, FileText, Mail } from "lucide-react";

const NAV_LINKS = [
  { id: "ledger", label: "Ledger" },
  { id: "selected", label: "Selected Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "lab", label: "Lab" },
];

export function Nav() {
  const [stamp, setStamp] = useState(() => fmt(new Date()));

  useEffect(() => {
    const id = setInterval(() => setStamp(fmt(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-rule bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-5 md:px-8 font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper-dim">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-5 w-5 place-items-center border border-paper text-[9px] font-semibold text-paper transition-colors group-hover:bg-acid group-hover:text-ink group-hover:border-acid">
            PL
          </span>
          <span className="hidden sm:inline text-paper">Dossier</span>
          <span className="hidden md:inline text-mute">/ 2026 Edition</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="relative text-paper-dim transition-colors hover:text-acid"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <span className="hidden lg:inline text-mute num-tab">{stamp}</span>
          <span className="hidden lg:inline h-3 w-px bg-rule-strong" />
          <IconLink href="https://github.com/paullukic" label="GitHub">
            <Github className="h-3.5 w-3.5" />
          </IconLink>
          <IconLink href="https://www.linkedin.com/in/paul-lukic/" label="LinkedIn">
            <Linkedin className="h-3.5 w-3.5" />
          </IconLink>
          <IconLink href="/Paul_Lukic_CV.pdf" label="CV PDF" download>
            <FileText className="h-3.5 w-3.5" />
          </IconLink>
          <a
            href="mailto:paul.lukic94@gmail.com"
            className="ml-1 hidden sm:inline-flex items-center gap-1.5 border border-paper bg-paper px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-acid hover:border-acid"
          >
            <Mail className="h-3 w-3" />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function IconLink({
  href,
  label,
  children,
  download,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={download ? undefined : "_blank"}
      rel="noreferrer"
      download={download}
      className="grid h-7 w-7 place-items-center border border-rule-strong text-paper-dim transition-all hover:border-acid hover:text-acid"
    >
      {children}
    </a>
  );
}

function fmt(d: Date) {
  const date = `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getFullYear()).slice(-2)}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return `${date} · ${time} · NOVI SAD`;
}
