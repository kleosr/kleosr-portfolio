import { describe, expect, it } from "vitest";
import { createRecordingContext } from "../test/canvas";
import { drawOverlay, OVERLAY_COLOR } from "./draw";
import { overlayAt } from "./scene";
import type { FrameOverlay } from "./types";

function canvasWith(context: CanvasRenderingContext2D | null): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.getContext = ((id: string) => {
    if (id !== "2d") return null;
    return context;
  }) as HTMLCanvasElement["getContext"];
  return canvas;
}

const tinyOverlay: FrameOverlay = {
  anchors: [
    { x: 0.5, y: 0.5, kind: "point", size: 0.4 },
    { x: 0.2, y: 0.2, kind: "cross", size: 2 },
    { x: 0.8, y: 0.8, kind: "square", size: 2 },
  ],
  lines: [{ ax: 0.1, ay: 0.1, bx: 0.2, by: 0.2, alpha: 0.5 }],
  labels: [
    { x: 0.1, y: 0.1, text: "IDX", align: "left" },
    { x: 0.9, y: 0.2, text: "A07", align: "right" },
  ],
  brackets: [{ x: 0.3, y: 0.3, size: 0.02 }],
  boxes: [{ id: 1, x: 0.1, y: 0.1, width: 0.4, height: 0.4, confidence: 0.84 }],
};

describe("drawOverlay", () => {
  it("skips work when the 2d context is missing", () => {
    const canvas = canvasWith(null);
    drawOverlay(canvas, overlayAt(0), 120, 80);
    expect(canvas.width).toBeGreaterThan(0);
  });

  it("pins the assist and color paint traces", () => {
    const { context, calls } = createRecordingContext();
    const canvas = canvasWith(context);
    window.devicePixelRatio = 3;
    drawOverlay(canvas, tinyOverlay, 200, 100, { assist: true, alpha: 0.5, color: "#12110f" });
    expect(OVERLAY_COLOR).toBe("#e85a2a");
    expect(canvas.width).toBe(400);
    expect(canvas.height).toBe(200);
    expect(calls).toMatchSnapshot();
    const widths = canvas.width;
    drawOverlay(canvas, tinyOverlay, 200, 100, { assist: true, color: "#12110f" });
    expect(canvas.width).toBe(widths);
  });

  it("pins defaults, a missing devicePixelRatio, and overflowing labels", () => {
    const { context, calls } = createRecordingContext();
    const canvas = canvasWith(context);
    window.devicePixelRatio = 0;
    drawOverlay(canvas, tinyOverlay, 80, 80);
    expect(canvas.width).toBe(80);
    expect(calls.some((call) => call.stroke === OVERLAY_COLOR)).toBe(true);
    expect(calls.some((call) => call.op === "fillText" && String(call.args[0]).includes("B01"))).toBe(
      false,
    );
    expect(calls).toMatchSnapshot();
  });

  it("pins a live overlay frame", () => {
    const { context, calls } = createRecordingContext();
    const canvas = canvasWith(context);
    window.devicePixelRatio = 1;
    drawOverlay(canvas, overlayAt(180, 42), 320, 200, { assist: true, alpha: 1, color: OVERLAY_COLOR });
    expect(calls).toMatchSnapshot();
  });
});
