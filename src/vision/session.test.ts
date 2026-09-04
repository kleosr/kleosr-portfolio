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
  });

  it("fades in unless reduced motion is on", () => {
    expect(overlayAlpha(true, 1000, 0)).toBe(1);
    expect(overlayAlpha(false, 0, 0)).toBe(0.48);
    expect(overlayAlpha(false, 90, 0)).toBe(1);
    expect(overlayAlpha(false, 45, 0)).toBe(0.48 + 0.5);
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

  it("paints on attach, resize, and intersection", () => {
    const { canvas } = stageAt(200, 120);
    const dispose = attachOverlay(canvas, options);
    expect(FakeIntersectionObserver.instances).toHaveLength(1);
    expect(FakeResizeObserver.instances).toHaveLength(1);
    FakeResizeObserver.instances[0]?.trigger();
    FakeIntersectionObserver.instances[0]?.trigger(true);
    FakeIntersectionObserver.instances[0]?.trigger(false);
    dispose?.();
  });

  it("skips paint for a tiny stage and refreshes overlay on a new bucket", () => {
    const { canvas, stage } = stageAt(1, 1);
    const session = createOverlaySession(canvas, stage, options);
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
    paintOverlay(session, 10);
    expect(session.overlay).toBe(first);
    paintOverlay(session, ANALYSIS_MS);
    expect(session.lastBucket).toBe(1);
    expect(session.overlay).not.toBe(first);
  });

  it("starts a raf loop, ignores a second start, and guards a stopped tick", () => {
    const { canvas, stage } = stageAt(200, 120);
    const session = createOverlaySession(canvas, stage, options);
    let frame: FrameRequestCallback | undefined;
    window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      frame = cb;
      return 7;
    }) as typeof window.requestAnimationFrame;
    window.cancelAnimationFrame = (() => undefined) as typeof window.cancelAnimationFrame;
    startOverlay(session);
    expect(session.visible).toBe(true);
    expect(session.raf).toBe(7);
    startOverlay(session);
    session.visible = false;
    tickOverlay(session, 16);
    session.visible = true;
    tickOverlay(session, 16);
    expect(frame).toBeTypeOf("function");
    stopOverlay(session);
    expect(session.raf).toBe(0);
    onIntersect(session, [{ isIntersecting: true }, { isIntersecting: false }]);
    onIntersect(session, [{ isIntersecting: false }]);
  });

  it("paints once under reduced motion", () => {
    const { canvas, stage } = stageAt(200, 120);
    const session = createOverlaySession(canvas, stage, { ...options, reduced: true });
    const raf = vi.fn();
    window.requestAnimationFrame = raf as typeof window.requestAnimationFrame;
    startOverlay(session);
    expect(session.visible).toBe(false);
    expect(raf).not.toHaveBeenCalled();
  });
});
