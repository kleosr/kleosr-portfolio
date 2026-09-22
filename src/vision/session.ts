import { drawOverlay } from "./draw";
import { overlayAt } from "./scene";
import type { FrameOverlay } from "./types";

export const ANALYSIS_MS = 125;

export type OverlayOptions = {
  seed: number;
  color: string;
  assist: boolean;
  reduced: boolean;
};

export type OverlaySession = {
  canvas: HTMLCanvasElement;
  stage: HTMLElement;
  options: OverlayOptions;
  overlay: FrameOverlay;
  lastBucket: number;
  snapshot: number;
  visible: boolean;
  raf: number;
};

export function stageTooSmall(width: number, height: number): boolean {
  return width < 2 || height < 2;
}

export function overlayAlpha(reduced: boolean, now: number, snapshot: number): number {
  if (reduced) return 1;
  return Math.min(1, 0.48 + (now - snapshot) / 90);
}

export function createOverlaySession(
  canvas: HTMLCanvasElement,
  stage: HTMLElement,
  options: OverlayOptions,
): OverlaySession {
  return {
    canvas,
    stage,
    options,
    overlay: overlayAt(0, options.seed),
    lastBucket: -1,
    snapshot: 0,
    visible: false,
    raf: 0,
  };
}

export function paintOverlay(session: OverlaySession, now: number): void {
  const box = session.stage.getBoundingClientRect();
  if (stageTooSmall(box.width, box.height)) return;
  const bucket = Math.floor(now / ANALYSIS_MS);
  if (bucket !== session.lastBucket) {
    session.overlay = overlayAt(bucket * 180, session.options.seed);
    session.snapshot = now;
    session.lastBucket = bucket;
  }
  drawOverlay(session.canvas, session.overlay, box.width, box.height, {
    alpha: overlayAlpha(session.options.reduced, now, session.snapshot),
    color: session.options.color,
    assist: session.options.assist,
  });
}

export function tickOverlay(session: OverlaySession, now: number): void {
  if (!session.visible) return;
  paintOverlay(session, now);
  session.raf = window.requestAnimationFrame((time) => tickOverlay(session, time));
}

export function startOverlay(session: OverlaySession): void {
  if (session.options.reduced || session.raf) {
    paintOverlay(session, performance.now());
    return;
  }
  session.visible = true;
  session.raf = window.requestAnimationFrame((time) => tickOverlay(session, time));
}

export function stopOverlay(session: OverlaySession): void {
  session.visible = false;
  window.cancelAnimationFrame(session.raf);
  session.raf = 0;
}

export function onIntersect(
  session: OverlaySession,
  entries: readonly { isIntersecting: boolean }[],
): void {
  if (entries.some((entry) => entry.isIntersecting)) startOverlay(session);
  else stopOverlay(session);
}

export function attachOverlay(
  canvas: HTMLCanvasElement | null,
  options: OverlayOptions,
): (() => void) | undefined {
  const stage = canvas?.parentElement;
  if (!canvas || !stage) return undefined;
  const session = createOverlaySession(canvas, stage, options);
  const io = new IntersectionObserver((entries) => onIntersect(session, entries));
  io.observe(stage);
  const resize = new ResizeObserver(() => paintOverlay(session, performance.now()));
  resize.observe(stage);
  paintOverlay(session, 0);
  return () => {
    stopOverlay(session);
    io.disconnect();
    resize.disconnect();
  };
}
