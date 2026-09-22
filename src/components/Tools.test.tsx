import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { tools, toolsCopy } from "../content";
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
    const { container } = render(<Tools />);
    expect(container.querySelector("section#tools.tools-section")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Tools" })).toBeInTheDocument();
    expect(screen.getByText(toolsCopy.kicker)).toBeInTheDocument();
    expect(screen.getByText(toolsCopy.code)).toBeInTheDocument();
    const slots = [...container.querySelectorAll<HTMLElement>(".tool-orbit-slot")];
    expect(slots).toHaveLength(tools.length);
    const step = 360 / tools.length;
    for (const [index, slot] of slots.entries()) {
      expect(slot.style.getPropertyValue("--slot")).toBe(`${index * step}deg`);
    }
    const flipped = [...container.querySelectorAll(".tool-orbit-card.is-flipped")];
    expect(flipped).toHaveLength(1);
    expect(flipped[0]?.textContent).toContain("cursordoctrine");
    expect(screen.getByRole("heading", { name: "cursordoctrine" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "cursordoctrine" })).toHaveAttribute(
      "href",
      "https://github.com/kleosr/cursordoctrine",
    );
    expect(screen.queryByText(/git clone/)).toBeNull();
    act(() => orbit.setActive(1));
    expect(screen.getByRole("heading", { name: "cursorkleosr" })).toBeInTheDocument();
    expect(screen.getByText("git clone https://github.com/kleosr/cursorkleosr.git")).toBeInTheDocument();
    act(() => orbit.setActive(2));
    expect(screen.getByText("npm install -g veredicto")).toBeInTheDocument();
    expect(screen.getByText(`${toolsCopy.snapshotKicker} ${github.snapshotDay()}`)).toBeInTheDocument();
    expect(screen.getByText(toolsCopy.openSource)).toBeInTheDocument();
  });

  it("hides stars when a repo is missing from the snapshot", () => {
    vi.spyOn(github, "githubRepo").mockReturnValue(undefined);
    render(<Tools />);
    expect(screen.queryByText(/stars/)).toBeNull();
    vi.restoreAllMocks();
  });
});
