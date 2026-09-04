import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { aboutCopy, contactCopy } from "../content";
import { AboutContact } from "./AboutContact";
import { Hero } from "./Hero";
import { Nav } from "./Nav";

describe("Hero", () => {
  it("renders the operator mark and poster chrome", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("section.hero#top")).toBeTruthy();
    expect(screen.getByRole("heading", { name: "kleosr" })).toBeInTheDocument();
    expect(screen.getByText("Cursor ambassador")).toBeInTheDocument();
    expect(screen.getByText("Tools for Cursor sessions that have to live in a real repo.")).toBeInTheDocument();
    expect(
      screen.getByText("Harnesses and checkers for people who run agents in a real repo, not a demo."),
    ).toBeInTheDocument();
    expect(container.querySelector(".hero-coordinate")?.textContent).toContain("41.9028° N");
    expect(container.querySelector(".hero-coordinate")?.textContent).toContain("12.4964° E");
    const img = screen.getByAltText(/Roman cavalry guardian/);
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("src", "/images/kleosr-hero-guardian.png");
    expect(img).toHaveAttribute("fetchPriority", "high");
    expect(container.querySelector(".poster-agent")?.textContent).toContain("AGENT_00");
    expect(container.querySelector(".poster-agent")?.textContent).toContain("SESSION / ASSIGNED");
    expect(container.querySelector(".poster-code")?.textContent).toContain("repo: ./current");
    expect(container.querySelector(".poster-code")?.textContent).toContain("scope: bounded");
    expect(container.querySelector(".poster-code")?.textContent).toContain("tree: clean");
    expect(container.querySelector(".poster-index")?.textContent).toBe("PLATE / 00");
    expect(screen.getByText("MYTH / MACHINE")).toBeInTheDocument();
    expect(screen.getByText("BUILD 2026.08")).toBeInTheDocument();
  });
});

describe("Nav", () => {
  it("marks the intersecting section current", async () => {
    const tools = document.createElement("section");
    tools.id = "tools";
    document.body.append(tools);
    const { FakeIntersectionObserver } = await import("../test/observers");
    const { container } = render(<Nav />);
    expect(container.querySelector("header.nav-shell")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "kleosr home" })).toHaveAttribute("href", "#top");
    expect(screen.getByRole("link", { name: "Tools" })).toHaveAttribute("href", "#tools");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: "Tools" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Tools" })).toHaveClass("nav-link");
    act(() => {
      FakeIntersectionObserver.instances[0]?.trigger(true, "tools");
    });
    expect(screen.getByRole("link", { name: "Tools" })).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: "Tools" })).toHaveClass("is-active");
    expect(screen.getByRole("link", { name: "Grok Bot" })).toHaveAttribute("href", "/grok-bot/");
    expect(screen.getByRole("link", { name: "Grok Bot" })).toHaveClass("nav-grok");
  });
});

describe("AboutContact", () => {
  it("renders about copy and the GitHub door", () => {
    const { container } = render(<AboutContact />);
    expect(container.querySelector("section#about.about-section")).toBeTruthy();
    expect(container.querySelector("section#contact.contact-section")).toBeTruthy();
    expect(screen.getByRole("heading", { name: aboutCopy.title })).toBeInTheDocument();
    expect(screen.getByText(aboutCopy.kicker)).toBeInTheDocument();
    expect(screen.getByText(aboutCopy.code)).toBeInTheDocument();
    expect(screen.getByText(aboutCopy.name)).toBeInTheDocument();
    expect(screen.getByText(aboutCopy.body)).toBeInTheDocument();
    expect(screen.getByText(aboutCopy.close)).toBeInTheDocument();
    expect(container.querySelector(".about-type")).toHaveAttribute("data-type", aboutCopy.lead);
    expect(container.querySelector(".about-spec")?.textContent).toContain("AMBASSADOR / 01");
    expect(screen.getByRole("heading", { name: contactCopy.title })).toBeInTheDocument();
    expect(screen.getByText(contactCopy.kicker)).toBeInTheDocument();
    expect(screen.getByText(contactCopy.code)).toBeInTheDocument();
    const github = screen.getByRole("link", { name: /GitHub/ });
    expect(github).toHaveAttribute("href", "https://github.com/kleosr");
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noreferrer");
    expect(github.querySelector(".animated-icon-arrow")).toBeTruthy();
    expect(document.querySelector(".contact-copy")?.textContent).toContain("is the door until email is listed.");
  });
});
