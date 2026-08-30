import type { FrameOverlay } from "./types";

const COLOR = "#e85a2a";

function px(value: number, size: number): number {
  return value * size;
}

function strokeLines(
  ctx: CanvasRenderingContext2D,
  overlay: FrameOverlay,
  width: number,
  height: number,
  gain: number,
): void {
  for (const line of overlay.lines) {
    ctx.globalAlpha = line.alpha * gain;
    ctx.beginPath();
    ctx.moveTo(px(line.ax, width), px(line.ay, height));
    ctx.lineTo(px(line.bx, width), px(line.by, height));
    ctx.stroke();
  }
}

function strokeAnchors(
  ctx: CanvasRenderingContext2D,
  overlay: FrameOverlay,
  width: number,
  height: number,
  gain: number,
): void {
  ctx.globalAlpha = gain;
  for (const anchor of overlay.anchors) {
    const x = px(anchor.x, width);
    const y = px(anchor.y, height);
    const size = Math.max(1, anchor.size);
    ctx.save();
    ctx.translate(x, y);
    if (anchor.kind === "point") {
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.72, 0, Math.PI * 2);
      ctx.fill();
    } else if (anchor.kind === "cross") {
      ctx.beginPath();
      ctx.moveTo(-size * 1.8, 0);
      ctx.lineTo(size * 1.8, 0);
      ctx.moveTo(0, -size * 1.8);
      ctx.lineTo(0, size * 1.8);
      ctx.stroke();
    } else {
      ctx.strokeRect(-size, -size, size * 2, size * 2);
    }
    ctx.restore();
  }
}

function strokeBrackets(
  ctx: CanvasRenderingContext2D,
  overlay: FrameOverlay,
  width: number,
  height: number,
  gain: number,
): void {
  ctx.globalAlpha = gain;
  for (const bracket of overlay.brackets) {
    const x = px(bracket.x, width);
    const y = px(bracket.y, height);
    const size = px(bracket.size, Math.min(width, height));
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(-size, -size * 0.3);
    ctx.lineTo(-size, -size);
    ctx.lineTo(-size * 0.3, -size);
    ctx.moveTo(size * 0.3, size);
    ctx.lineTo(size, size);
    ctx.lineTo(size, size * 0.3);
    ctx.stroke();
    ctx.restore();
  }
}

function strokeBoxes(
  ctx: CanvasRenderingContext2D,
  overlay: FrameOverlay,
  width: number,
  height: number,
  gain: number,
): void {
  ctx.font = "500 9px Manrope, Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  for (const box of overlay.boxes) {
    const left = px(box.x, width);
    const top = px(box.y, height);
    const boxWidth = px(box.width, width);
    const boxHeight = px(box.height, height);
    const corner = Math.min(18, boxWidth * 0.24, boxHeight * 0.24);
    ctx.globalAlpha = 0.92 * gain;
    ctx.beginPath();
    ctx.moveTo(left, top + corner);
    ctx.lineTo(left, top);
    ctx.lineTo(left + corner, top);
    ctx.moveTo(left + boxWidth - corner, top);
    ctx.lineTo(left + boxWidth, top);
    ctx.lineTo(left + boxWidth, top + corner);
    ctx.moveTo(left + boxWidth, top + boxHeight - corner);
    ctx.lineTo(left + boxWidth, top + boxHeight);
    ctx.lineTo(left + boxWidth - corner, top + boxHeight);
    ctx.moveTo(left + corner, top + boxHeight);
    ctx.lineTo(left, top + boxHeight);
    ctx.lineTo(left, top + boxHeight - corner);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(left + boxWidth, top + 8);
    ctx.lineTo(left + boxWidth + 13, top + 8);
    ctx.stroke();
    ctx.fillText(`B${String(box.id).padStart(2, "0")}  ${box.confidence.toFixed(2)}`, left + boxWidth + 5, top - 5);
  }
}

function fillLabels(
  ctx: CanvasRenderingContext2D,
  overlay: FrameOverlay,
  width: number,
  height: number,
  gain: number,
): void {
  ctx.font = "500 9px Manrope, Arial, sans-serif";
  ctx.textBaseline = "middle";
  ctx.globalAlpha = 0.92 * gain;
  for (const label of overlay.labels) {
    ctx.textAlign = label.align;
    ctx.fillText(label.text, px(label.x, width), px(label.y, height));
  }
}

export type DrawOptions = {
  alpha?: number;
  color?: string;
  assist?: boolean;
};

function paintPass(
  ctx: CanvasRenderingContext2D,
  overlay: FrameOverlay,
  width: number,
  height: number,
  color: string,
  lineWidth: number,
  gain: number,
): void {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;
  strokeLines(ctx, overlay, width, height, gain);
  strokeAnchors(ctx, overlay, width, height, gain);
  strokeBrackets(ctx, overlay, width, height, gain);
  strokeBoxes(ctx, overlay, width, height, gain);
  fillLabels(ctx, overlay, width, height, gain);
}

export function drawOverlay(
  canvas: HTMLCanvasElement,
  overlay: FrameOverlay,
  stageWidth: number,
  stageHeight: number,
  options: DrawOptions = {},
): void {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const pixelWidth = Math.max(1, Math.round(stageWidth * dpr));
  const pixelHeight = Math.max(1, Math.round(stageHeight * dpr));
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const alpha = options.alpha ?? 1;
  const color = options.color ?? COLOR;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, stageWidth, stageHeight);
  ctx.lineCap = "square";
  ctx.lineJoin = "miter";
  if (options.assist) {
    paintPass(ctx, overlay, stageWidth, stageHeight, "rgba(0,0,0,0.72)", 2.05, alpha * 0.2);
  }
  paintPass(ctx, overlay, stageWidth, stageHeight, color, 0.9, alpha);
  ctx.globalAlpha = 1;
}
