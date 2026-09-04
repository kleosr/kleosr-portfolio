import { afterEach, describe, expect, it, vi } from "vitest";
import { FakeIntersectionObserver, FakeResizeObserver } from "../test/observers";
import {
  ANALYSIS_MS,
  attachOverlay,
  createOverlaySession,
  onIntersect,
  overlayAlpha,
  paintOverlay,
  stageTooSmall,
  startOverlay,
  stopOverlay,
  tickOverlay,
} from "./session";

const options = { seed: 11, color: "#12110f", assist: true, reduced: false };

function stageAt(width: number, height: number): { canvas: HTMLCanvasElement; stage: HTMLDivElement } {
  const stage = document.createElement("div");
  const canvas = document.createElement("canvas");
  stage.append(canvas);
  document.body.append(stage);
  vi.spyOn(stage, "getBoundingClientRect").mockReturnValue({
    width,
    height,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    toJSON: () => ({}),
  });
  return { canvas, stage };
}

describe("overlay session math", () => {
  it("treats sub-2px stages as too small", () => {
    expect(stageTooSmall(1.9, 10)).toBe(true);
    expect(stageTooSmall(10, 1.9)).toBe(true);
    expect(stageTooSmall(2, 2)).toBe(false);
    expect(stageTooSmall(1, 1)).toBe(true);
    expect(stageTooSmall(2, 1.5)).toBe(true);
  });

  it("fades in unless reduced motion is on", () => {
    expect(overlayAlpha(true, 1000, 0)).toBe(1);
    expect(overlayAlpha(true, 0, 1000)).toBe(1);
    expect(overlayAlpha(false, 0, 0)).toBe(0.48);
    expect(overlayAlpha(false, 90, 0)).toBe(1);
    expect(overlayAlpha(false, 45, 0)).toBe(0.98);
    expect(overlayAlpha(false, 180, 90)).toBe(1);
    expect(ANALYSIS_MS).toBe(125);
  });
});

describe("overlay session loop", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns without attaching when canvas or parent is missing", () => {
    expect(attachOverlay(null, options)).toBeUndefined();
    expect(attachOverlay(document.createElement("canvas"), options)).toBeUndefined();
  });

  it("paints on attach, resize, and intersection, then disconnects", () => {
    const { canvas } = stageAt(200, 120);
    const frames: FrameRequestCallback[] = [];
    window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      frames.push(cb);
      return frames.length;
    }) as typeof window.requestAnimationFrame;
    const cancel = vi.fn();
    window.cancelAnimationFrame = cancel as typeof window.cancelAnimationFrame;
    const dispose = attachOverlay(canvas, options);
    expect(FakeIntersectionObserver.instances).toHaveLength(1);
    expect(FakeResizeObserver.instances).toHaveLength(1);
    expect(canvas.width).toBeGreaterThan(0);
    FakeResizeObserver.instances[0]?.trigger();
    FakeIntersectionObserver.instances[0]?.trigger(true);
    expect(frames.length).toBeGreaterThan(0);
    FakeIntersectionObserver.instances[0]?.trigger(false);
    dispose?.();
    expect(FakeIntersectionObserver.instances[0]?.disconnected).toBe(true);
    expect(FakeResizeObserver.instances[0]?.disconnected).toBe(true);
    expect(cancel).toHaveBeenCalled();
  });

  it("skips paint for a tiny stage and refreshes overlay on a new bucket", () => {
    const { canvas, stage } = stageAt(1, 1);
    const session = createOverlaySession(canvas, stage, options);
    expect(session.lastBucket).toBe(-1);
    expect(session.snapshot).toBe(0);
    expect(session.visible).toBe(false);
    expect(session.raf).toBe(0);
    expect(session.options).toEqual(options);
    paintOverlay(session, 0);
    expect(session.lastBucket).toBe(-1);
    vi.spyOn(stage, "getBoundingClientRect").mockReturnValue({
      width: 200,
      height: 120,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 200,
      bottom: 120,
      toJSON: () => ({}),
    });
    paintOverlay(session, 0);
    const first = session.overlay;
    expect(session.lastBucket).toBe(0);
    expect(session.snapshot).toBe(0);
    paintOverlay(session, 10);
    expect(session.overlay).toBe(first);
    expect(session.lastBucket).toBe(0);
    paintOverlay(session, ANALYSIS_MS);
    expect(session.lastBucket).toBe(1);
    expect(session.snapshot).toBe(ANALYSIS_MS);
    expect(session.overlay).not.toBe(first);
    expect(session.overlay.anchors[0]?.x).not.toBe(first.anchors[0]?.x);
  });

  it("starts a raf loop, ignores a second start, and guards a stopped tick", () => {
    const { canvas, stage } = stageAt(200, 120);
    const session = createOverlaySession(canvas, stage, options);
    const frames: FrameRequestCallback[] = [];
    window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      frames.push(cb);
      return frames.length + 6;
    }) as typeof window.requestAnimationFrame;
    const cancel = vi.fn();
    window.cancelAnimationFrame = cancel as typeof window.cancelAnimationFrame;
    startOverlay(session);
    expect(session.visible).toBe(true);
    expect(session.raf).toBe(7);
    expect(frames).toHaveLength(1);
    frames[0]?.(16);
    expect(frames).toHaveLength(2);
    frames[1]?.(32);
    expect(frames).toHaveLength(3);
    startOverlay(session);
    expect(frames).toHaveLength(3);
    session.visible = false;
    const before = frames.length;
    tickOverlay(session, 16);
    expect(frames).toHaveLength(before);
    session.visible = true;
    tickOverlay(session, 16);
    expect(frames.length).toBeGreaterThan(before);
    stopOverlay(session);
    expect(session.visible).toBe(false);
    expect(session.raf).toBe(0);
    expect(cancel).toHaveBeenCalled();
    onIntersect(session, [{ isIntersecting: true }, { isIntersecting: false }]);
    expect(session.visible).toBe(true);
    onIntersect(session, [{ isIntersecting: false }, { isIntersecting: false }]);
    expect(session.visible).toBe(false);
    expect(session.raf).toBe(0);
    onIntersect(session, []);
    expect(session.visible).toBe(false);
  });

  it("paints once under reduced motion", () => {
    const { canvas, stage } = stageAt(200, 120);
    const session = createOverlaySession(canvas, stage, { ...options, reduced: true });
    const raf = vi.fn();
    window.requestAnimationFrame = raf as typeof window.requestAnimationFrame;
    vi.spyOn(performance, "now").mockReturnValue(250);
    startOverlay(session);
    expect(session.visible).toBe(false);
    expect(raf).not.toHaveBeenCalled();
    expect(session.lastBucket).toBe(2);
  });
});
