import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { toolsCopy } from "../content";
import * as github from "../data/github";
import { Tools } from "./Tools";

const orbit = vi.hoisted(() => ({
  setActive: (_index: number) => undefined as void,
}));

vi.mock("../hooks/useToolOrbit", () => ({
  useToolOrbit: (_ref: { current: HTMLElement | null }, onIndex: (index: number) => void) => {
    orbit.setActive = onIndex;
  },
}));

describe("Tools", () => {
  it("flips the doctrine card and swaps the dock by orbit index", () => {
    render(<Tools />);
    expect(screen.getByRole("heading", { name: "Tools" })).toBeInTheDocument();
    expect(screen.getByText(toolsCopy.code)).toBeInTheDocument();
    expect(document.querySelector(".tool-orbit-card.is-flipped")?.textContent).toContain(
      "cursordoctrine",
    );
    expect(screen.getByRole("heading", { name: "cursordoctrine" })).toBeInTheDocument();
    expect(screen.queryByText(/git clone/)).toBeNull();
    act(() => orbit.setActive(1));
    expect(screen.getByRole("heading", { name: "cursorkleosr" })).toBeInTheDocument();
    expect(screen.getByText("git clone https://github.com/kleosr/cursorkleosr.git")).toBeInTheDocument();
    act(() => orbit.setActive(2));
    expect(screen.getByText("npm install -g veredicto")).toBeInTheDocument();
    expect(screen.getByText(`${toolsCopy.snapshotKicker} ${github.snapshotDay()}`)).toBeInTheDocument();
  });

  it("hides stars when a repo is missing from the snapshot", () => {
    vi.spyOn(github, "githubRepo").mockReturnValue(undefined);
    render(<Tools />);
    expect(screen.queryByText(/stars/)).toBeNull();
    vi.restoreAllMocks();
  });
});
