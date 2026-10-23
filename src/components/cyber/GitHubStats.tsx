import { useEffect, useState } from "react";
import { Github, GitBranch, Users, Star } from "lucide-react";
import { social } from "@/content/profile";

type Stats = {
  repos: number;
  followers: number;
  lastPush?: string;
  lastRepo?: string;
};

const USER = social.github.user;
const CACHE_KEY = "gh-stats-v1";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 min (happy path)
const ERR_BACKOFF_MS = 60 * 60 * 1000; // 1 hour (after rate-limit)
const ERR_KEY = "gh-stats-err-at";

// Static floor — displayed when both the network AND the cache have nothing.
// Keeps the section from looking broken on rate-limit / offline.
const FALLBACK: Stats = social.github.fallback;

function readCache(): Stats | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, stats } = JSON.parse(raw);
    if (Date.now() - at > CACHE_TTL_MS) return null;
    return stats as Stats;
  } catch {
    return null;
  }
}

function writeCache(stats: Stats) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), stats }));
  } catch {}
}

function recentError(): boolean {
  try {
    const at = parseInt(localStorage.getItem(ERR_KEY) || "0", 10);
    return at > 0 && Date.now() - at < ERR_BACKOFF_MS;
  } catch {
    return false;
  }
}

export function GitHubStats() {
  const cached = typeof window !== "undefined" ? readCache() : null;
  const [stats, setStats] = useState<Stats | null>(cached);
  const [degraded, setDegraded] = useState<boolean>(!cached && typeof window !== "undefined" && recentError());

  useEffect(() => {
    // Warm from cache; skip network if cached or if we recently got rate-limited.
    if (stats) return;
    if (recentError()) {
      setStats(FALLBACK);
      setDegraded(true);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`),
          fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=1`),
        ]);
        if (uRes.status === 403 || rRes.status === 403 || !uRes.ok || !rRes.ok) {
          throw new Error("api_unavailable");
        }
        const u = await uRes.json();
        const r = await rRes.json();
        if (cancelled) return;
        const next: Stats = {
          repos: u.public_repos ?? FALLBACK.repos,
          followers: u.followers ?? FALLBACK.followers,
          lastPush: r[0]?.pushed_at,
          lastRepo: r[0]?.name,
        };
        setStats(next);
        writeCache(next);
        try { localStorage.removeItem(ERR_KEY); } catch {}
      } catch {
        if (cancelled) return;
        try { localStorage.setItem(ERR_KEY, String(Date.now())); } catch {}
        setStats(FALLBACK);
        setDegraded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [stats]);

  return (
    <a
      href={`https://github.com/${USER}`}
      target="_blank"
      rel="noreferrer"
      className="group relative block border border-rule-strong bg-deck/70 px-5 py-4 hover:border-cyan transition-colors"
    >
      <span className="corner-bracket tl" />
      <span className="corner-bracket br" />

      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.28em]">
        <span className="flex items-center gap-2 text-cyan glow-cyan">
          <Github className="h-3.5 w-3.5" />
          LIVE_NODE · @{USER}
        </span>
        <span
          className={
            !stats
              ? "text-fade"
              : degraded
              ? "text-amber"
              : "text-acid glow-acid"
          }
        >
          ● {!stats ? "DIALING…" : degraded ? "CACHED" : "CONNECTED"}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-px bg-rule-strong border border-rule-strong">
        <Cell icon={<GitBranch className="h-3 w-3 text-cyan" />} k={stats?.repos ?? "—"} v="PUBLIC REPOS" />
        <Cell icon={<Users className="h-3 w-3 text-mag" />} k={stats?.followers ?? "—"} v="FOLLOWERS" />
        <Cell
          icon={<Star className="h-3 w-3 text-acid" />}
          k={stats?.lastPush ? timeAgo(stats.lastPush) : degraded ? "∿" : "—"}
          v="LAST PUSH"
        />
      </dl>

      {stats?.lastRepo && !degraded && (
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
          MOST_RECENT: <span className="text-bone">{stats.lastRepo}</span>
        </div>
      )}
      {degraded && (
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fade">
          <span className="text-amber">⚠</span> upstream rate-limited · live data
          at <span className="text-bone">github.com/{USER}</span>
        </div>
      )}
    </a>
  );
}

function Cell({ icon, k, v }: { icon: React.ReactNode; k: string | number; v: string }) {
  return (
    <div className="bg-deck px-3 py-3">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="font-zen text-lg md:text-xl text-bone num-tab leading-none">{k}</span>
      </div>
      <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fade">{v}</div>
    </div>
  );
}

function timeAgo(iso: string) {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const day = 86400e3;
  if (diff < day) return `${Math.max(1, Math.round(diff / 3600e3))}h`;
  if (diff < 30 * day) return `${Math.round(diff / day)}d`;
  if (diff < 365 * day) return `${Math.round(diff / (30 * day))}mo`;
  return `${Math.round(diff / (365 * day))}y`;
}
