import type { Tone } from "./types";

// NOW section: hand-kept. Bump `asOf` whenever this changes.
export const now = {
  asOf: "2026-10-23",
  shipping: [
    { k: "INVT / Cybergrid", v: "MQTT · observability", active: true },
    { k: "Metaspry", v: "extension + cloud app", active: true },
    { k: "Liftorra", v: "MVP · building now", active: true },
    { k: "Coograph", v: "OSS · code-graph fixes", active: true },
    { k: "DBuddy", v: "perf · themes", active: true },
  ],
  learning: [
    { k: "OSCP prep", tone: "cyan" },
    { k: "CRDTs", tone: "acid" },
    { k: "WebGPU shaders", tone: "mag" },
  ] as { k: string; tone: Exclude<Tone, "blood"> }[],
  reading: [
    { k: "Designing Data-Intensive Apps", author: "Kleppmann", status: "Re-read" },
    { k: "The Web App Hacker's Handbook", author: "Stuttard", status: "In progress" },
    { k: "Atomic Habits", author: "Clear", status: "Finished" },
  ],
  today:
    "Shipping Liftorra's Plus subscription, tightening the Metaspry side panel, and fixing name lookups in Coograph's code graph.",
};
