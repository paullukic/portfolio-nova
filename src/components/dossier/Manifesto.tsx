export function Manifesto() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHeader index="00" eyebrow="Field Notes" title="Brief" />

        <div className="mt-14 grid grid-cols-12 gap-8">
          <p className="col-span-12 md:col-span-7 lg:col-span-8 font-display text-2xl md:text-[2.4rem] leading-[1.18] text-paper text-pretty">
            <span className="float-left mr-3 mt-[0.08em] font-display text-[5.5rem] leading-[0.78] text-acid acid-glow">
              S
            </span>
            ix years on the wire as a full-stack developer, equally at home
            architecting Spring services as wiring a Svelte 5 rune to a Firestore
            collection. I write systems that scale and interfaces that don't waste
            anyone's afternoon. I lead by mentoring, ship by deadline, and keep a
            soft spot for clean type and CRT amber.
          </p>

          <aside className="col-span-12 md:col-span-5 lg:col-span-4 md:pl-8 md:border-l md:border-rule-strong space-y-7">
            <Note label="Working on">
              Cybergrid platform at INVT — gateways, MQTT protocol fixes,
              observability rollouts and a multi-repo WebClient → RestClient
              migration.
            </Note>
            <Note label="Off-hours">
              Penetration testing, Chrome extensions, biohacking experiments,
              ARPGs and tinkering with retro UI.
            </Note>
            <Note label="Languages">
              Serbian (native) · English (proficient)
            </Note>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  trailing,
}: {
  index: string;
  eyebrow: string;
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-rule-strong pb-5">
      <div className="flex items-end gap-5 md:gap-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute num-tab">
          §{index}
        </span>
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-acid">
            {eyebrow}
          </div>
          <h2 className="mt-1 font-display text-4xl md:text-6xl text-paper leading-none tracking-tight">
            {title}
          </h2>
        </div>
      </div>
      {trailing && (
        <div className="hidden md:block font-mono text-[10.5px] uppercase tracking-[0.22em] text-mute text-right">
          {trailing}
        </div>
      )}
    </div>
  );
}

function Note({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute">
        {label}
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-paper-dim text-pretty">
        {children}
      </p>
    </div>
  );
}
