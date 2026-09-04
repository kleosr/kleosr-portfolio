Now
Quality gates: cyclomatic < 22 (ESLint cap 10), cognitive < 22, Halstead < 80, LOC < 500, 100% coverage, CRAP < 25, no any/unknown, zero dead/redundant code, Stryker 100%.

State
Toolchain and tests are in place on `cursor/quality-gates-8306`. `pnpm check`, `pnpm coverage`, `pnpm deadcode`, and `pnpm metrics` exit 0. Mutation score is the remaining bar (`pnpm mutate`, command runner, break at 100).

Limits
Do not lower Stryker `thresholds.break` from 100. Do not use the Vitest Stryker runner (runtime mutants survive under Vitest 5). `dist/CNAME` stays untracked. Never query `api.github.com` from the browser.

Proof
`pnpm check && pnpm coverage && pnpm deadcode && pnpm metrics` exit 0. Coverage 481/481 stmts, 193/193 branches, 133/133 fns, 423/423 lines.

Next
`pnpm mutate` must exit 0 (no surviving mutants), then `pnpm build`.
