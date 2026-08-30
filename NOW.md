Now
Machine Vision motion is on every plate: hero, five tools, about spec, Grok Bot.

State
Overlays run the Editorial loop from Amir Mushich Machine Vision: 8 fps buckets, 90ms alpha blend, contrast assist, 0.9px marks. Site easing is cubic-bezier(0.22, 0.8, 0.22, 1), 280ms UI, 350ms stage fade. No image scale on hover. Canvases pause off-screen. No GSAP. No video analyzer.

Limits
Still not live camera analysis. Grok Bot remains a roster. Surge writes `dist/CNAME`.

Proof
`pnpm check && pnpm build && pnpm audit` (35 modules, 0 vulns). Browser: 7 `.overlay-canvas` drawn on home; tool plates show tracking boxes and labels. `pnpm dlx surge ./dist kleosr.surge.sh` → kleosr.surge.sh.

Next
Mario: hard-refresh https://kleosr.surge.sh. Git is live at https://github.com/kleosr/kleosr-portfolio.
