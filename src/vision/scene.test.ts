import { describe, expect, it } from "vitest";
import { overlayAt } from "./scene";

describe("overlayAt", () => {
  it("keeps overlay collection sizes stable", () => {
    const a = overlayAt(0, 42);
    expect(a.anchors).toHaveLength(12);
    expect(a.lines).toHaveLength(8);
    expect(a.labels).toHaveLength(4);
    expect(a.brackets).toHaveLength(3);
    expect(a.boxes).toHaveLength(2);
    expect(a.anchors.map((anchor) => anchor.kind).sort()).toEqual(
      ["cross", "cross", "cross", "point", "point", "point", "point", "point", "point", "square", "square", "square"].sort(),
    );
    expect(a.labels[0]?.align).toBe("left");
    expect(a.labels[2]?.align).toBe("right");
  });

  it("drifts anchors with time and seed", () => {
    const a = overlayAt(0, 42);
    const b = overlayAt(180, 42);
    const c = overlayAt(0, 99);
    const first = a.anchors[0];
    const later = b.anchors[0];
    const other = c.anchors[0];
    expect(first).toBeDefined();
    expect(later).toBeDefined();
    expect(other).toBeDefined();
    if (!first || !later || !other) return;
    expect(first.x).not.toBe(later.x);
    expect(first.y).not.toBe(later.y);
    expect(first.x).not.toBe(other.x);
  });

  it("drifts boxes with time and pins connections", () => {
    const a = overlayAt(0, 42);
    const b = overlayAt(180, 42);
    const boxA = a.boxes[0];
    const boxB = b.boxes[0];
    expect(boxA).toBeDefined();
    expect(boxB).toBeDefined();
    if (!boxA || !boxB) return;
    expect(boxA.confidence).not.toBe(boxB.confidence);
    expect(boxA.x).not.toBe(boxB.x);
    expect(a.lines).toEqual(b.lines);
    expect(b).toMatchSnapshot();
    expect(overlayAt(0, 99)).toMatchSnapshot();
  });

  it("defaults seed to 42", () => {
    expect(overlayAt(0)).toEqual(overlayAt(0, 42));
    expect(overlayAt(0, 42)).toMatchSnapshot();
  });
});
