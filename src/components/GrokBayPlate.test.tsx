import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { crewAt, grokPlateCopy } from "../grok-content";
import { GrokBayPlate } from "./GrokBayPlate";

describe("GrokBayPlate", () => {
  it("prints the locked seat brief", () => {
    const agent = crewAt(2);
    render(<GrokBayPlate agent={agent} />);
    expect(screen.getByRole("heading", { name: agent.name })).toBeInTheDocument();
    expect(screen.getByText(grokPlateCopy.owns)).toBeInTheDocument();
    expect(screen.getByText(grokPlateCopy.anti)).toBeInTheDocument();
    expect(screen.getByText(agent.owns[0] ?? "")).toBeInTheDocument();
    expect(document.querySelector(".poster-meta")?.textContent).toBe(
      `${grokPlateCopy.seat} / ${agent.number}`,
    );
  });
});
