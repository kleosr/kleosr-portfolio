# kleosr Design System

One instrument shared by the home site (`index.html`) and the Grok mission bay (`grok-bot/index.html`). Both entry points import primitives from `src/components/system/`.

## Identity (immutable)

| Token | Value | Role |
|-------|-------|------|
| `--black` | `#090909` | Page ground |
| `--ink` | `#12110f` | Dark panels |
| `--cream` | `#f4ecd9` | Primary text on dark |
| `--paper` | `#e9ddc2` | Plate ground |
| `--orange` | `#e85a2a` | Accent, kickers |
| `--orange-hot` | `#ff5c00` | Focus rings |
| `--navy` | `#071b32` | Code blocks |

Typography: self-hosted **Manrope** for display and body; system mono (`--mono`) for kickers and telemetry. Wordmark: `kleos` + orange `r`.

Signature object: **`PosterVisual`** (via **`Plate`**) — home plates 4:3, Grok bay plates 4:5. Hairlines, index tabs, mono metadata, orange offset shadow, grain overlay. No glass, no mesh gradients.

## Section anatomy

Every home section and the Grok crew bay instantiate the same vertical stack:

```
kicker → index → title → body → plate-or-proof → footer-metadata
```

| Slot | Component | Example |
|------|-----------|---------|
| kicker | `Kicker` | `01 / INDEX` |
| index | `Index` | `01` (row tabular number or decorative unit) |
| title | `SectionHeader` `<h2>` | `Tools` |
| body | section-specific copy | descriptions, lead paragraphs |
| plate-or-proof | `Plate` or `ProofFigure` | poster visual or ledger stat |
| footer-metadata | `SectionHeader` code slot | `KLSR.PUBLIC_WORK / 0003` |

Home section order: Nav → Hero → Tools → Catalog → Proof → About → Contact.  
Grok section order: Nav → Hero intro → Flight crew bay.

Continuous kicker density and mono telemetry rhythm match across both routes.

## Shared components (`src/components/system/`)

| Component | Role |
|-----------|------|
| `Kicker` | Mono orange section label |
| `Index` | Tabular row/section index numeral |
| `SectionHeader` | kicker + title + footer-metadata grid |
| `Plate` | `<figure>` wrapping `PosterVisual` (4:3 or 4:5) |
| `Row` | `catalog` and `crew-seat` interactive list variants |
| `Link` | External and internal anchors with focus/active/hover gating |
| `ProofFigure` | Single ledger stat in proof band |

Route files compose these primitives; they do not re-implement kicker, plate, or row markup locally.

## Motion

- Page transition: 350ms fade + brightness dip (`--duration-stage`, `--ease: cubic-bezier(0.22, 0.8, 0.22, 1)`).
- Reveal, tool-orbit pin, about-type, grok-fade systems respect `prefers-reduced-motion: reduce` — all content exposed immediately, no stuck `autoAlpha: 0`.

## Interaction bar

At 390, 430, 768, and 1280px:

- No horizontal scroll
- Hero clears fixed header
- Hover only under `(hover: hover) and (pointer: fine)`
- Focus: 2px `--orange-hot` outline, 2px offset
- Active: scale(0.98) press state
- Tap targets ≥ 44×44px at widths ≤ 959px
- Locked crew seat: `aria-pressed` + left border (not color alone)

## Content sources

- Home copy: `src/content.ts`
- Grok copy and seats: `src/grok-content.ts`
- GitHub stats snapshot: `src/data/github.snapshot.json` (never live API in browser)
