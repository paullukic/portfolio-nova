import type { Relic } from "./archive";

// SIDE_BUILDS: small public tools that don't earn a Selected Work plate but are
// real, shipped code. Facts come from each repo's README.
export const sideBuilds: Relic[] = [
  {
    id: "offline-net",
    label: "GO · 2025",
    title: "offline-net",
    note: "Go server that hosts offline Wikipedia-style archives (ZIM files) and static sites behind one dashboard. Builds for Windows, Linux, macOS and Raspberry Pi.",
    link: "https://github.com/paullukic/offline-net",
    tone: "acid",
    icon: "code",
  },
];
