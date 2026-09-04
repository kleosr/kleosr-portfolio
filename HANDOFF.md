TASK
Vite 8 MPA, React 19. Two HTML entries: `index.html` → `src/main.tsx` and `grok-bot/index.html` → `src/grok-main.tsx`.
GitHub product stats are a committed snapshot (`src/data/github.snapshot.json`) written by `scripts/snapshot-github.mjs` at build time. A failed fetch keeps the last file. The browser never calls api.github.com.

Quality bar is `pnpm quality`: typecheck, lint (complexity ≤ 10, cognitive ≤ 21), 100% Vitest coverage, Knip, Halstead < 80, CRAP < 25, file LOC < 500, no `any`/`unknown`, Stryker mutation score 100% via the command runner (`pnpm exec vitest run`).

FILES
`src/content.ts` and `src/grok-content.ts` hold operator copy.
`src/data/github.snapshot.json` holds repo records plus `fetchedAt`.
`scripts/quality-gates.mjs` enforces Halstead, CRAP, LOC, and banned types.
`stryker.config.json` uses `testRunner: "command"` (not `@stryker-mutator/vitest-runner`).
`dist/` publishes to Surge. No Three, no API server, no auth.

STATUS
`pnpm check`, `pnpm coverage`, `pnpm deadcode`, and `pnpm metrics` are green on this branch. `pnpm mutate` is the remaining gate.

NEXT
Land mutation score 100%, then `pnpm build`. Hard-refresh https://kleosr.surge.sh after deploy. `dist/CNAME` stays untracked.
