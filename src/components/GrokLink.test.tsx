import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GrokLink } from "./GrokLink";
import { GrokLogo } from "./GrokLogo";

describe("GrokLink", () => {
  it("wraps the lockup when shared", () => {
    const { rerender } = render(<GrokLink className="nav-link" />);
    const link = screen.getByRole("link", { name: "Grok Bot" });
    expect(link).toHaveAttribute("href", "/grok-bot/");
    expect(link.querySelector(".grok-lockup")).toBeNull();
    rerender(<GrokLink className="nav-link nav-grok" shared />);
    expect(screen.getByRole("link", { name: "Grok Bot" }).querySelector(".grok-lockup")).toBeTruthy();
  });
});

describe("GrokLogo", () => {
  it("accepts a class name", () => {
    const { container, rerender } = render(<GrokLogo className="mark" />);
    expect(container.querySelector("svg.mark")).toHaveAttribute("viewBox", "0 0 32 32");
    rerender(<GrokLogo />);
    expect(container.querySelector("svg")).not.toHaveClass("mark");
  });
});
