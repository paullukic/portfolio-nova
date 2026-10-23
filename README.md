# portfolio-nova: paullukic.com

Paul Lukić's portfolio. It merges three earlier sites into one:

- **v3** (`paullukic/portfolio-v3`, cyberpunk.paullukic.com). This repo is a fork of it with full history: the layout, the look and the interactions.
- **v2** (`paullukic/cyberpunk-v2-portfolio`, cyberpunk-v2.paullukic.com). It contributes the Blackwall shader and the certs / offensive-toolkit content, now in `/CLEARANCE`.
- **v1** (`react-projects`, react.paullukic.com). It is kept as an archive link; its name-scramble lives on as `DecodeOnView`.

Stack: React 19, Vite 6, Tailwind 4, TypeScript, motion (LazyMotion), Lenis, and React Three Fiber for the hero scene (lazy-loaded). It builds as a static site, prerenders with Playwright, and is hosted on Firebase Hosting.

## Commands

```bash
npm ci
npm run dev            # http://localhost:5173
npm run check          # typecheck + lint
npm run build          # vite build + prerender / and 404 into dist/
npm run check:site     # PII, SEO/domain, prerender and TODO checks on dist/
npm run build:release  # build + checks that fail on TODO(paul) or dead links
npm run og             # regenerate public/og.png from scripts/og-template.html
npm run shoot          # screenshots into .shots/ (needs `npm run preview`)
```

The Playwright scripts use Playwright's bundled Chromium. Set `PW_CHANNEL=chrome` to use the installed Chrome instead.

## Editing content

All career facts live in `src/content/`. Components only render them.

| File | Feeds |
|---|---|
| `profile.ts` | Hero, brief, terminal, footer, availability, social links, CV link (`cv: null` hides it everywhere) |
| `projects.ts` | Selected Work plates and case-study drawers, plus the marquee, press strip and terminal `ls` |
| `experience.ts` | Career ledger and press strip |
| `skills.ts` | Toolkit and marquee stack row |
| `certs.ts` | Clearance section, toolkit schooling/languages strip |
| `now.ts` | NOW feed (bump `asOf`) |
| `archive.ts` | Lab relics (earlier portfolios) |
| `sections.ts` | Nav, HUD bar, mission rail, command palette shortcuts |
| `changelog.ts` | Dossier changelog |

Mark anything unverified with `TODO(paul)`. `npm run build:release` refuses to pass while any remain.

## Deploy: paullukic.com (apex only)

Hosting target `main` maps to the site `paullukic-com` in the existing Firebase project `cyberpunk-portfolio-paxhax` (`.firebaserc`). The project's default site keeps serving cyberpunk.paullukic.com as the v3 archive. The GitHub workflows run only on manual dispatch.

Cutover checklist (Hermes / Paul):

1. Host the old terminal site at `terminal.paullukic.com` (or change `TERMINAL_ARCHIVE` in `src/content/archive.ts` and the `/gui/*` redirect in `firebase.json`), then delete the `TODO(paul)` in `archive.ts`.
2. Create the hosting site: `firebase hosting:sites:create paullukic-com --project cyberpunk-portfolio-paxhax`.
3. `npm run build:release`, then deploy: `firebase deploy --only hosting:main --project cyberpunk-portfolio-paxhax`.
4. In the Firebase console, remove `paullukic.com` from the project that serves the terminal site today. Then add `paullukic.com` (apex) to site `paullukic-com`, and add `www.paullukic.com` as a redirect to the apex.
5. Add `paullukic.com` as a site in Plausible (the script now reports to that domain).
6. Optional: re-enable push-triggered deploys in `.github/workflows/`.

The redirect `/gui/*` → `terminal.paullukic.com/gui/*` keeps the old Win98 link alive. Unknown paths get the themed 404.
