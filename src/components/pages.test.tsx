import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { App } from "../App";
import { grokCopy } from "../grok-content";
import { GrokPage } from "./GrokPage";

describe("App", () => {
  it("renders the skip link and primary landmarks", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    expect(screen.getByRole("heading", { name: "kleosr" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tools" })).toBeInTheDocument();
  });

  it("scrolls the hash target after mount", async () => {
    window.history.replaceState(null, "", "/#about");
    render(<App />);
    const about = document.getElementById("about");
    if (!about) throw new Error("about missing");
    const spy = vi.spyOn(about, "scrollIntoView");
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(spy).toHaveBeenCalled();
  });
});

describe("GrokPage", () => {
  it("renders the mission bay", () => {
    render(<GrokPage />);
    expect(screen.getByRole("link", { name: "Skip to flight crew" })).toHaveAttribute("href", "#crew");
    expect(screen.getByRole("heading", { name: /The work gets heavy/ })).toBeInTheDocument();
    expect(screen.getByText(grokCopy.lead)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to kleosr" })).toHaveAttribute("href", "/");
  });
});
