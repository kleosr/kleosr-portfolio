import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { catalog, catalogCopy } from "../content";
import * as github from "../data/github";
import { ToolCatalog } from "./ToolCatalog";

describe("ToolCatalog", () => {
  it("lists every pack with snapshot stars", () => {
    const { container } = render(<ToolCatalog />);
    expect(container.querySelector("section#catalog.catalog-section")).toBeTruthy();
    expect(screen.getByRole("heading", { name: catalogCopy.title })).toBeInTheDocument();
    expect(screen.getByText(catalogCopy.kicker)).toBeInTheDocument();
    expect(screen.getByText(`${catalogCopy.snapshotKicker} ${github.snapshotDay()}`)).toBeInTheDocument();
    for (const pack of catalog) {
      const link = screen.getByRole("link", { name: new RegExp(pack.name) });
      expect(link).toHaveAttribute("href", pack.href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
      expect(screen.getByText(pack.number)).toBeInTheDocument();
      expect(screen.getByText(pack.description)).toBeInTheDocument();
    }
  });

  it("hides counts when a pack is missing from the snapshot", () => {
    vi.spyOn(github, "githubRepo").mockReturnValue(undefined);
    render(<ToolCatalog />);
    expect(document.querySelector("data")).toBeNull();
    vi.restoreAllMocks();
  });
});
