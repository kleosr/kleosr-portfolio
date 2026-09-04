import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FakeIntersectionObserver } from "../test/observers";
import { OVERLAY_COLOR } from "../vision/draw";
import { VisionOverlay } from "./VisionOverlay";

describe("VisionOverlay", () => {
  it("attaches the overlay with defaults and custom props", () => {
    const { container, rerender, unmount } = render(
      <div style={{ width: 200, height: 120 }}>
        <VisionOverlay />
      </div>,
    );
    const canvas = container.querySelector("canvas.overlay-canvas");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
    expect(OVERLAY_COLOR).toBe("#e85a2a");
    const first = FakeIntersectionObserver.instances.length;
    expect(first).toBeGreaterThan(0);
    rerender(
      <div style={{ width: 200, height: 120 }}>
        <VisionOverlay seed={11} color="#12110f" assist />
      </div>,
    );
    expect(FakeIntersectionObserver.instances.length).toBeGreaterThan(first);
    unmount();
  });
});
