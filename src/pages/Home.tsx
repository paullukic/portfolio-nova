import { useEffect } from "react";
import { BootOverlay } from "@/components/cyber/BootOverlay";
import { RevealObserver } from "@/components/cyber/RevealObserver";
import { HudBar } from "@/components/cyber/HudBar";
import { MissionRail } from "@/components/cyber/MissionRail";
import { Nav } from "@/components/cyber/Nav";
import { Hero } from "@/components/cyber/Hero";
import { Marquee } from "@/components/cyber/Marquee";
import { Manifesto } from "@/components/cyber/Manifesto";
import { PressStrip } from "@/components/cyber/PressStrip";
import { Selected } from "@/components/cyber/Selected";
import { Ledger } from "@/components/cyber/Ledger";
import { Now } from "@/components/cyber/Now";
import { Toolkit } from "@/components/cyber/Toolkit";
import { Lab } from "@/components/cyber/Lab";
import { Changelog } from "@/components/cyber/Changelog";
import { Footer } from "@/components/cyber/Footer";
import { Divider } from "@/components/cyber/Divider";
import { MatrixRain } from "@/components/cyber/MatrixRain";
import { AmbientAudio } from "@/components/cyber/AmbientAudio";
import { CommandPalette } from "@/components/cyber/CommandPalette";
import { CyberCursor } from "@/components/cyber/CyberCursor";
import { SmoothScroll } from "@/components/cyber/SmoothScroll";
import { ThemeSwitcher } from "@/components/cyber/ThemeSwitcher";
import { AccentMorph } from "@/components/cyber/AccentMorph";

export default function Home() {
  // Neutralise the "page scrolled a few px on load" drift that happens when
  // fonts swap or the hero lazy chunk arrives and nudges layout. We pin to
  // scroll=0 for the first second of life unless the user deliberately moves.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return; // honor in-URL anchor
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    let userMoved = false;
    const onWheel = () => { userMoved = true; };
    const onTouch = () => { userMoved = true; };
    const onKey = (e: KeyboardEvent) => {
      if (["PageDown", "PageUp", "ArrowDown", "ArrowUp", " "].includes(e.key)) {
        userMoved = true;
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);
    window.scrollTo(0, 0);
    const t1 = setTimeout(() => !userMoved && window.scrollTo(0, 0), 200);
    const t2 = setTimeout(() => !userMoved && window.scrollTo(0, 0), 700);
    const t3 = setTimeout(() => !userMoved && window.scrollTo(0, 0), 1400);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("keydown", onKey);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-void text-bone scanlines antialiased">
      {/* skip-to-content — hidden until keyboard focused */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:bg-cyan focus:text-void focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.24em] focus:font-bold"
      >
        SKIP_TO_CONTENT
      </a>
      <SmoothScroll />
      <AccentMorph />
      <CyberCursor />
      <BootOverlay />
      <RevealObserver />
      <MatrixRain />
      <AmbientAudio />
      <Nav />
      <Hero />
      <Marquee />
      <Manifesto />
      <PressStrip />
      <Divider label="◢◤◢◤◢◤  SELECTED_WORK  ◢◤◢◤◢◤" tone="cyan" />
      <Selected />
      <Divider label="▓▒░▒▓  CAREER_LEDGER  ▓▒░▒▓" tone="mag" />
      <Ledger />
      <Divider label="●●●  LIVE_FEED · NOW  ●●●" tone="amber" />
      <Now />
      <Divider label="◇◆◇◆  INVENTORY  ◇◆◇◆" tone="acid" />
      <Toolkit />
      <Divider label="//  AFTER_HOURS  //" tone="amber" />
      <Lab />
      <Changelog />
      <Footer />
      <MissionRail />
      <HudBar />
      <CommandPalette />
      <ThemeSwitcher />
    </main>
  );
}
