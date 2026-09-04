import { describe, expect, it } from "vitest";
import { overlayAt } from "./scene";

describe("overlayAt", () => {
  it("drifts anchors and boxes with time and seed", () => {
    const a = overlayAt(0, 42);
    const b = overlayAt(180, 42);
    const c = overlayAt(0, 99);
    expect(a.anchors).toHaveLength(12);
    expect(a.lines).toHaveLength(8);
    expect(a.labels).toHaveLength(4);
    expect(a.brackets).toHaveLength(3);
    expect(a.boxes).toHaveLength(2);
    expect(a.anchors.map((anchor) => anchor.kind).sort()).toEqual(
      ["cross", "cross", "cross", "point", "point", "point", "point", "point", "point", "square", "square", "square"].sort(),
    );
    expect(a.anchors[0]?.x).not.toBe(b.anchors[0]?.x);
    expect(a.anchors[0]?.x).not.toBe(c.anchors[0]?.x);
    expect(a.boxes[0]?.confidence).not.toBe(b.boxes[0]?.confidence);
    expect(a.lines).toEqual(b.lines);
    expect(a.labels[0]?.align).toBe("left");
    expect(a.labels[2]?.align).toBe("right");
  });

  it("defaults seed to 42", () => {
    expect(overlayAt(0)).toEqual(overlayAt(0, 42));
  });
});
