Now
Grok-bot plates are eager. Logo SVG is sized. No lazy imgs on that page.

State
Bay `PosterVisual` uses `priority` like hero. `GrokLogo` has width/height 32. Home tools still lazy.

Limits
Live surge still has the old bay `loading=lazy` until deploy.

Proof
`pnpm check` exit 0. `pnpm build` exit 0. Preview `/grok-bot/`: both plates `loading=eager`, `lazyCount` 0, logo `svg[width=32][height=32]`.

Next
Mario: deploy if live should match. Hard-refresh `/grok-bot/` after.
