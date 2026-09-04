import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { catalog, catalogCopy } from "../content";
import * as github from "../data/github";
import { ToolCatalog } from "./ToolCatalog";

describe("ToolCatalog", () => {
  it("lists every pack with snapshot stars", () => {
    render(<ToolCatalog />);
    expect(screen.getByRole("heading", { name: catalogCopy.title })).toBeInTheDocument();
    expect(screen.getByText(`${catalogCopy.snapshotKicker} ${github.snapshotDay()}`)).toBeInTheDocument();
    for (const pack of catalog) {
      expect(screen.getByRole("link", { name: new RegExp(pack.name) })).toHaveAttribute(
        "href",
        pack.href,
      );
    }
  });

  it("hides counts when a pack is missing from the snapshot", () => {
    vi.spyOn(github, "githubRepo").mockReturnValue(undefined);
    render(<ToolCatalog />);
    expect(document.querySelector("data")).toBeNull();
    vi.restoreAllMocks();
  });
});
