import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { proofCopy } from "../content";
import { ProofBand } from "./ProofBand";

describe("ProofBand", () => {
  it("renders ledger figures", () => {
    render(<ProofBand />);
    expect(screen.getByRole("heading", { name: proofCopy.title })).toBeInTheDocument();
    expect(screen.getByText(proofCopy.code)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: proofCopy.featuredStars })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: proofCopy.packs })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: proofCopy.seats })).toBeInTheDocument();
  });
});
