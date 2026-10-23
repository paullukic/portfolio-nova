// Shared shapes for everything under src/content. Components render these;
// they never hard-code career facts themselves.

export type Tone = "cyan" | "mag" | "acid" | "amber" | "blood";

/** Watermark diagram drawn behind a Selected Work plate (components/cyber/ProjectDiagrams.tsx). */
export type DiagramKey =
  | "graph"
  | "grid"
  | "highlight"
  | "map"
  | "shop"
  | "timeline"
  | "game"
  | "spike"
  | "blocks"
  | "shield"
  | "audit"
  | "cards"
  | "lifts";

export type Metric = { k: string; v: string };

export type CaseStudy = {
  problem: string;
  approach: string[];
  outcome: string;
  challenges?: string[];
  stack?: string[];
};

export type ProjectStatus =
  | "LIVE"
  | "SHIPPING"
  | "ONGOING"
  | "BUILDING"
  | "ACQUIRED"
  | "DELIVERED"
  | "ARCHIVED";

export type Project = {
  /** Stable id, also used to link the project from other sections. */
  id: string;
  title: string;
  /** One-line "who · when · role" strip. */
  client: string;
  blurb: string;
  tags: string[];
  status: ProjectStatus;
  tone: Tone;
  diagram: DiagramKey;
  link?: string;
  span: "feature" | "tall" | "wide" | "default";
  metrics?: Metric[];
  caseStudy?: CaseStudy;
  /** Short label for the marquee / press strip / terminal listings. */
  short: string;
  /** Shown in the press strip (TRANSMITTED_FROM). */
  press?: { label: string; sub: string };
  /** Kind of work, used to split products from client/employment work. */
  kind: "product" | "oss" | "employment" | "client";
};

export type Experience = {
  id: string;
  /** Year shown on the ledger rail. */
  year: string;
  span: string;
  org: string;
  role: string;
  location?: string;
  link?: string;
  highlights: string[];
  stack: string[];
  tone: Tone;
  /** Shown in the press strip (TRANSMITTED_FROM). */
  press?: { label: string; sub: string };
};

export type Section = { id: string; label: string; navLabel?: string };
