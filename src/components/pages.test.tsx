import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { App } from "../App";
import { crewSeatCount, grokCopy } from "../grok-content";
import { GrokPage } from "./GrokPage";

describe("App", () => {
  it("renders the skip link and primary landmarks", () => {
    const { container } = render(<App />);
    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main");
    expect(container.querySelector("a.skip-link")).toBeTruthy();
    expect(container.querySelector(".grain")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("main#main")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "kleosr" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tools" })).toBeInTheDocument();
  });

  it("arms reveal on the document body", async () => {
    render(<App />);
    await waitFor(() => {
      expect(document.body.classList.contains("is-ready")).toBe(true);
    });
  });

  it("does not scroll without a hash", async () => {
    const scroll = vi.spyOn(Element.prototype, "scrollIntoView");
    render(<App />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(scroll).not.toHaveBeenCalled();
  });

  it("scrolls the hash target after mount", async () => {
    window.history.replaceState(null, "", "/#about");
    const scroll = vi.spyOn(Element.prototype, "scrollIntoView");
    const { unmount } = render(<App />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(scroll).toHaveBeenCalled();
    unmount();
  });
});

describe("GrokPage", () => {
  it("renders the mission bay", async () => {
    const gsap = (await import("gsap")).default;
    const fromTo = vi.spyOn(gsap, "fromTo");
    const { container } = render(<GrokPage />);
    expect(container.querySelector(".grok-page")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Skip to flight crew" })).toHaveAttribute("href", "#crew");
    expect(document.getElementById("grok-page-title")?.textContent).toContain("The work gets heavy");
    expect(document.getElementById("grok-page-title")?.textContent).toContain(
      "The agents take it from here.",
    );
    expect(screen.getByText(grokCopy.lead)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to kleosr" })).toHaveAttribute("href", "/");
    expect(screen.getByText("[ GROK BOT / MISSION BAY ]")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "[ CREW ]" })).toHaveAttribute("href", "#crew");
    expect(screen.getByText(`UNIT / ${String(crewSeatCount).padStart(2, "0")}`)).toBeInTheDocument();
    expect(screen.getByText("REV 2026.08")).toBeInTheDocument();
    expect(screen.getByText("SCOPE / SESSION")).toBeInTheDocument();
    expect(container.querySelector(".poster-index")?.textContent).toBe("PLATE / GB");
    expect(container.querySelector(".poster-scanline")).toBeTruthy();
    expect(screen.getByText("[ KLEOSR / GROK BOT ]")).toBeInTheDocument();
    expect(screen.getByText("REV 2026")).toBeInTheDocument();
    expect(fromTo).toHaveBeenCalled();
    fromTo.mockRestore();
  });
});
