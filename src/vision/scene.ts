import type {
  FrameOverlay,
  OverlayAnchor,
  OverlayBox,
  OverlayBracket,
  OverlayConnection,
  OverlayLabel,
} from "./types";

const ANCHORS: OverlayAnchor[] = [
  { x: 0.18, y: 0.22, kind: "point", size: 2.2 },
  { x: 0.31, y: 0.18, kind: "cross", size: 2.4 },
  { x: 0.42, y: 0.34, kind: "point", size: 1.8 },
  { x: 0.28, y: 0.48, kind: "square", size: 2.1 },
  { x: 0.22, y: 0.68, kind: "point", size: 2 },
  { x: 0.48, y: 0.58, kind: "cross", size: 2 },
  { x: 0.62, y: 0.26, kind: "point", size: 1.7 },
  { x: 0.74, y: 0.38, kind: "square", size: 2.3 },
  { x: 0.68, y: 0.52, kind: "point", size: 1.9 },
  { x: 0.82, y: 0.44, kind: "cross", size: 2.1 },
  { x: 0.58, y: 0.72, kind: "point", size: 1.6 },
  { x: 0.78, y: 0.66, kind: "square", size: 1.8 },
];

const LINES: OverlayConnection[] = [
  { ax: 0.18, ay: 0.22, bx: 0.31, by: 0.18, alpha: 0.55 },
  { ax: 0.31, ay: 0.18, bx: 0.42, by: 0.34, alpha: 0.4 },
  { ax: 0.28, ay: 0.48, bx: 0.22, by: 0.68, alpha: 0.48 },
  { ax: 0.42, ay: 0.34, bx: 0.48, by: 0.58, alpha: 0.38 },
  { ax: 0.62, ay: 0.26, bx: 0.74, by: 0.38, alpha: 0.52 },
  { ax: 0.74, ay: 0.38, bx: 0.82, by: 0.44, alpha: 0.44 },
  { ax: 0.68, ay: 0.52, bx: 0.78, by: 0.66, alpha: 0.36 },
  { ax: 0.48, ay: 0.58, bx: 0.58, by: 0.72, alpha: 0.33 },
];

const LABELS: OverlayLabel[] = [
  { x: 0.2, y: 0.14, text: "IDX 003", align: "left" },
  { x: 0.44, y: 0.3, text: "S .86", align: "left" },
  { x: 0.86, y: 0.32, text: "A07", align: "right" },
  { x: 0.8, y: 0.72, text: "C .91", align: "right" },
];

const BRACKETS: OverlayBracket[] = [
  { x: 0.31, y: 0.18, size: 0.022 },
  { x: 0.74, y: 0.38, size: 0.02 },
  { x: 0.22, y: 0.68, size: 0.018 },
];

const BOXES: OverlayBox[] = [
  { id: 1, x: 0.08, y: 0.1, width: 0.4, height: 0.78, confidence: 0.84 },
  { id: 2, x: 0.52, y: 0.24, width: 0.4, height: 0.52, confidence: 0.77 },
];

function drift(time: number, index: number, amount: number, seed: number): number {
  return Math.sin(time * 0.0007 + index * 1.7 + seed * 0.02) * amount;
}

export function overlayAt(time: number, seed = 42): FrameOverlay {
  return {
    anchors: ANCHORS.map((anchor, index) => ({
      ...anchor,
      x: anchor.x + drift(time, index, 0.004, seed),
      y: anchor.y + drift(time, index + 4, 0.003, seed),
    })),
    lines: LINES,
    labels: LABELS,
    brackets: BRACKETS,
    boxes: BOXES.map((box, index) => ({
      ...box,
      x: box.x + drift(time, index, 0.007, seed),
      y: box.y + drift(time, index + 2, 0.005, seed),
      confidence: box.confidence + drift(time, index + 8, 0.04, seed),
    })),
  };
}
