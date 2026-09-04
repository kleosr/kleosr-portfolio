import { describe, expect, it } from "vitest";
import { catalog, productPackCount, toolAt, tools } from "./content";
import { crewAt, crewSeatCount, grokAgentIndex, grokAgents } from "./grok-content";

describe("content helpers", () => {
  it("counts packs and clamps tool index", () => {
    expect(productPackCount).toBe(tools.length + catalog.length);
    expect(toolAt(0)).toBe(tools[0]);
    expect(toolAt(1)).toBe(tools[1]);
    expect(toolAt(99)).toBe(tools[0]);
    expect(toolAt(-1)).toBe(tools[0]);
  });
});

describe("grok helpers", () => {
  it("counts seats and clamps crew index", () => {
    expect(crewSeatCount).toBe(grokAgents.length);
    expect(crewAt(0)).toBe(grokAgents[0]);
    expect(crewAt(6)).toBe(grokAgents[6]);
    expect(crewAt(99)).toBe(grokAgents[0]);
    expect(crewAt(-1)).toBe(grokAgents[0]);
  });

  it("maps crew keys", () => {
    expect(grokAgentIndex(3, "ArrowDown")).toBe(4);
    expect(grokAgentIndex(3, "ArrowRight")).toBe(4);
    expect(grokAgentIndex(6, "ArrowDown")).toBe(6);
    expect(grokAgentIndex(3, "ArrowUp")).toBe(2);
    expect(grokAgentIndex(3, "ArrowLeft")).toBe(2);
    expect(grokAgentIndex(0, "ArrowUp")).toBe(0);
    expect(grokAgentIndex(4, "Home")).toBe(0);
    expect(grokAgentIndex(1, "End")).toBe(grokAgents.length - 1);
    expect(grokAgentIndex(1, "Enter")).toBeNull();
  });
});
