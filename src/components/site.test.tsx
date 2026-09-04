import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { aboutCopy, contactCopy } from "../content";
import { AboutContact } from "./AboutContact";
import { Hero } from "./Hero";
import { Nav } from "./Nav";

describe("Hero", () => {
  it("renders the operator mark", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { name: "kleosr" })).toBeInTheDocument();
    expect(screen.getByAltText(/Roman cavalry guardian/)).toHaveAttribute("loading", "eager");
  });
});

describe("Nav", () => {
  it("marks the intersecting section current", async () => {
    const tools = document.createElement("section");
    tools.id = "tools";
    document.body.append(tools);
    const { FakeIntersectionObserver } = await import("../test/observers");
    render(<Nav />);
    expect(screen.getByRole("link", { name: "kleosr home" })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("link", { name: "Tools" })).toHaveAttribute("href", "#tools");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: "Tools" })).not.toHaveAttribute("aria-current");
    act(() => {
      FakeIntersectionObserver.instances[0]?.trigger(true, "tools");
    });
    expect(screen.getByRole("link", { name: "Tools" })).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: "Tools" }).className).toContain("is-active");
    expect(screen.getByRole("link", { name: "Grok Bot" })).toHaveAttribute("href", "/grok-bot/");
  });
});

describe("AboutContact", () => {
  it("renders about copy and the GitHub door", () => {
    render(<AboutContact />);
    expect(screen.getByRole("heading", { name: aboutCopy.title })).toBeInTheDocument();
    expect(screen.getByText(aboutCopy.name)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: contactCopy.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/kleosr",
    );
  });
});
