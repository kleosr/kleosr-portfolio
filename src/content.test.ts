import { describe, expect, it } from "vitest";
import {
  aboutCopy,
  catalog,
  catalogCopy,
  contactCopy,
  githubUrl,
  productPackCount,
  proofCopy,
  toolAt,
  tools,
  toolsCopy,
} from "./content";
import {
  crewAt,
  crewSeatCount,
  grokAgentIndex,
  grokAgents,
  grokBayVisual,
  grokCopy,
  grokHeroVisual,
  grokPlateCopy,
} from "./grok-content";

describe("content helpers", () => {
  it("counts packs and clamps tool index", () => {
    expect(productPackCount).toBe(tools.length + catalog.length);
    expect(toolAt(0)).toBe(tools[0]);
    expect(toolAt(1)).toBe(tools[1]);
    expect(toolAt(99)).toBe(tools[0]);
    expect(toolAt(-1)).toBe(tools[tools.length - 1]);
  });

  it("pins operator copy", () => {
    expect(tools).toMatchSnapshot();
    expect(catalog).toMatchSnapshot();
    expect(toolsCopy).toMatchSnapshot();
    expect(catalogCopy).toMatchSnapshot();
    expect(proofCopy).toMatchSnapshot();
    expect(aboutCopy).toMatchSnapshot();
    expect(contactCopy).toMatchSnapshot();
    expect(githubUrl).toMatchSnapshot();
  });
});

describe("grok helpers", () => {
  it("counts seats and clamps crew index", () => {
    expect(crewSeatCount).toBe(grokAgents.length);
    expect(crewAt(0)).toBe(grokAgents[0]);
    expect(crewAt(6)).toBe(grokAgents[6]);
    expect(crewAt(99)).toBe(grokAgents[0]);
    expect(crewAt(-1)).toBe(grokAgents[grokAgents.length - 1]);
  });

  it("pins crew copy", () => {
    expect(grokAgents).toMatchSnapshot();
    expect(grokCopy).toMatchSnapshot();
    expect(grokPlateCopy).toMatchSnapshot();
    expect(grokHeroVisual).toMatchSnapshot();
    expect(grokBayVisual).toMatchSnapshot();
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
    expect(grokAgentIndex(1, " ")).toBeNull();
    expect(grokAgentIndex(0, "ArrowLeft")).toBe(0);
    expect(grokAgentIndex(6, "ArrowRight")).toBe(6);
    expect(toolAt(tools.length)).toBe(tools[0]);
    expect(crewAt(crewSeatCount)).toBe(grokAgents[0]);
  });
});
