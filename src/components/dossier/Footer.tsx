import { ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative grain border-t border-rule pt-24 pb-10 md:pt-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex items-center justify-between border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
          <span className="text-acid">§05 · Closing dispatch</span>
          <span className="hidden md:inline">End of file</span>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
              Direct line
            </div>
            <a
              href="mailto:paul.lukic94@gmail.com"
              className="mt-6 block font-display text-[12vw] md:text-[8vw] lg:text-[7rem] leading-[0.92] tracking-tight text-paper hover:text-acid transition-colors text-balance"
            >
              paul.lukic94<span className="italic text-acid">@</span>gmail.com
            </a>

            <p className="mt-8 max-w-xl font-display text-xl md:text-2xl text-paper-dim leading-snug text-pretty">
              Open to senior full-stack roles, deep contracts and the occasional
              weird side-quest. Especially if it involves Spring, Svelte, energy
              systems, or quietly gorgeous interfaces.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
            <Link
              icon={<Mail className="h-3.5 w-3.5" />}
              label="Email"
              href="mailto:paul.lukic94@gmail.com"
              value="paul.lukic94@gmail.com"
            />
            <Link
              icon={<Linkedin className="h-3.5 w-3.5" />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/paul-lukic/"
              value="/in/paul-lukic"
            />
            <Link
              icon={<Github className="h-3.5 w-3.5" />}
              label="GitHub"
              href="https://github.com/paullukic"
              value="@paullukic"
            />
            <Link
              icon={<FileText className="h-3.5 w-3.5" />}
              label="CV"
              href="/Paul_Lukic_CV.pdf"
              value="Paul_Lukic_CV.pdf"
              download
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 border-t border-rule pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
          <div className="col-span-12 md:col-span-4">
            © {new Date().getFullYear()} · Paul Lukić · all rights reserved
          </div>
          <div className="col-span-6 md:col-span-4 md:text-center">
            File closes · printed in Novi Sad
          </div>
          <div className="col-span-6 md:col-span-4 md:text-right">
            Set in Fraunces · Switzer · JetBrains Mono
          </div>
        </div>
      </div>
    </footer>
  );
}

function Link({
  icon,
  label,
  href,
  value,
  download,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  value: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={download ? undefined : "_blank"}
      rel="noreferrer"
      download={download}
      className="group flex items-center justify-between gap-4 border-b border-rule pb-3 transition-colors hover:border-acid"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-7 w-7 place-items-center border border-rule-strong text-paper-dim transition-colors group-hover:border-acid group-hover:text-acid">
          {icon}
        </span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
            {label}
          </div>
          <div className="font-display text-lg text-paper transition-colors group-hover:text-acid">
            {value}
          </div>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-paper-dim transition-all group-hover:text-acid group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
