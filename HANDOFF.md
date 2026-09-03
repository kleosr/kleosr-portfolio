TASK
Vite 8 MPA, React 19. Two HTML entries: `index.html` → `src/main.tsx` and `grok-bot/index.html` → `src/grok-main.tsx`.
GitHub product stats are a committed snapshot (`src/data/github.snapshot.json`) written by `scripts/snapshot-github.mjs` at build time. A failed fetch keeps the last file. The browser never calls api.github.com.

FILES
`src/content.ts` and `src/grok-content.ts` hold operator copy.
`src/data/github.snapshot.json` holds repo records plus `fetchedAt`.
`design-system.md` and `src/components/system/` define the shared instrument used by both HTML entries.
`dist/` publishes to Surge. No Three, no API server, no auth.

STATUS
`pnpm build` is `node scripts/snapshot-github.mjs && tsc -b && vite build`.

NEXT
Hard-refresh https://kleosr.surge.sh after deploy. `dist/CNAME` stays untracked.
