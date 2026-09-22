import { afterEach, describe, expect, it, vi } from "vitest";
import { productPackCount, proofCopy } from "../content";
import { crewSeatCount } from "../grok-content";
import * as github from "./github";
import { proofFigures } from "./proof";

describe("proofFigures", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("includes featured stars from the snapshot", () => {
    const figures = proofFigures();
    expect(figures).toHaveLength(3);
    expect(figures[0]?.label).toBe(proofCopy.featuredStars);
    expect(figures[0]?.kicker.startsWith(proofCopy.snapshotKicker)).toBe(true);
    expect(figures[1]?.label).toBe(proofCopy.packs);
    expect(figures[1]?.value).toBe(productPackCount);
    expect(figures[1]?.kicker).toBe(proofCopy.packsKicker);
    expect(figures[2]?.label).toBe(proofCopy.seats);
    expect(figures[2]?.value).toBe(crewSeatCount);
    expect(figures[2]?.kicker).toBe(proofCopy.seatsKicker);
  });

  it("omits stars when a featured repo is missing", () => {
    vi.spyOn(github, "featuredStarTotal").mockReturnValue(null);
    const figures = proofFigures();
    expect(figures.map((figure) => figure.label)).toEqual([proofCopy.packs, proofCopy.seats]);
  });
});
