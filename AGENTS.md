# AGENTS.md

Repository handbook for coding agents working on `kleosr-portfolio`. All agents follow the rules, workflows, and conventions defined in this single source of truth.

## Rules

- **Stack**: Vite 8 MPA + React 19 + TypeScript + Tailwind CSS v4. Node `>=22`, pnpm `>=10`.
- **Entries**: Two HTML entry points configured in `vite.config.ts`:
  - `index.html` → `src/main.tsx` (main site)
  - `grok-bot/index.html` → `src/grok-main.tsx` (grok bot page)
- **Static architecture**: No backend API, auth, or server runtime in production. Deployment target is Surge (`dist/`).
- **Secrets & environment**: Never commit secrets, `.env` files, private keys, or tokens.
- **GitHub stats**: Product stats in `src/data/github.snapshot.json` are committed. Generated via `scripts/snapshot-github.mjs` at build time. The browser runtime must never query `api.github.com`.
- **Operator copy**: Copy lives in `src/content.ts` and `src/grok-content.ts`.
- **Surge deployment**: `dist/` publishes to Surge (`https://kleosr.surge.sh`). `dist/CNAME` stays untracked. Treat `dist` as public.
- **Code standards**: ESLint enforces cyclomatic complexity `<= 10` on TypeScript files (`src/**/*.{ts,tsx}` and `vite.config.ts`). Do not disable or raise this limit without explicit mandate.

## Skills

- This repository does not currently define local task skills in `.agents/skills`.
- Reusable recipes and procedures may be added to `.agents/skills/<skill-name>/` in the future if established.

## Workflows

- **Package manager**: `pnpm` exclusively (`packageManager: pnpm@11.24.0`).
- **Development**:
  - `pnpm dev` - Launch local Vite dev server.
- **Verification & quality**:
  - `pnpm lint` - Run ESLint across configured sources.
  - `pnpm check` - Run TypeScript typecheck (`tsc -b`) and ESLint (`pnpm lint`).
- **Snapshot update**:
  - `pnpm snapshot` - Run `node scripts/snapshot-github.mjs`. Keeps prior snapshot if fetch fails.
- **Build**:
  - `pnpm build` - Executes `node scripts/snapshot-github.mjs && tsc -b && vite build`.
- **Preview**:
  - `pnpm preview` - Preview production build locally.
- **Verification protocol**: Verification is complete when `pnpm check` and `pnpm build` exit 0.

## Memory

- Agent context and handoff state are tracked directly in repository-root markdown:
  - `NOW.md`: Active task status, current state, constraints, proof command, and next steps.
  - `HANDOFF.md`: Architectural summary, file roles, build status, and deployment notes.
- This repository does not use a `docs/` folder or vendor memory subsystems; update `NOW.md` and `HANDOFF.md` to maintain cross-agent continuity.
