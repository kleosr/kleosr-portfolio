import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { proofCopy } from "../content";
import { proofFigures } from "../data/proof";
import { ProofBand } from "./ProofBand";

describe("ProofBand", () => {
  it("renders ledger figures", () => {
    render(<ProofBand />);
    expect(screen.getByRole("heading", { name: proofCopy.title })).toBeInTheDocument();
    expect(screen.getByText(proofCopy.kicker)).toBeInTheDocument();
    expect(screen.getByText(proofCopy.code)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: proofCopy.featuredStars })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: proofCopy.packs })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: proofCopy.seats })).toBeInTheDocument();
    for (const figure of proofFigures()) {
      expect(screen.getByText(figure.kicker)).toBeInTheDocument();
      expect(screen.getByText(String(figure.value))).toBeInTheDocument();
    }
  });
});
