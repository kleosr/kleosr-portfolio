Now
Unified design system: `src/components/system/` serves both home and `/grok-bot/`. Spec in `design-system.md`.

State
PR open on `cursor/unified-design-system-3cd5`. Shared Kicker, Index, SectionHeader, Plate, Row, Link, Button, ProofFigure. Bay plate uses SEAT index (no duplicate PLATE/GB). GrokSeat removed.

Limits
Hard-refresh after Surge. dist/CNAME stays untracked.

Proof
pnpm check and pnpm build exit 0. Overflow clean at 390/430/768/1280 on both routes.

Next
Merge PR and deploy to kleosr.surge.sh.
