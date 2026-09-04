import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Tool } from "../content";
import { plateSeed, PosterVisual } from "./PosterVisual";

const visual: Tool["visual"] = {
  src: "/images/x.png",
  alt: "poster alt",
  agent: "AGENT_X",
  status: "STATUS / ON",
  code: ["line-a", "line-b"],
};

describe("plateSeed", () => {
  it("sums character codes from zero", () => {
    expect(plateSeed("")).toBe(0);
    expect(plateSeed("A")).toBe(65);
    expect(plateSeed("AB")).toBe(131);
  });
});

describe("PosterVisual", () => {
  it("renders full chrome, lazy loading, and overlay", () => {
    const { container } = render(<PosterVisual visual={visual} index="PLATE / 01" />);
    const img = screen.getByAltText("poster alt");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("fetchPriority", "auto");
    expect(img).toHaveAttribute("src", "/images/x.png");
    expect(img).toHaveAttribute("width", "1536");
    expect(img).toHaveAttribute("height", "1024");
    expect(container.querySelector(".poster-agent")?.textContent).toContain("AGENT_X");
    expect(container.querySelector(".poster-agent")?.textContent).toContain("STATUS / ON");
    expect(container.querySelector(".poster-code")?.textContent).toContain("01");
    expect(container.querySelector(".poster-code")?.textContent).toContain("02");
    expect(container.querySelector(".poster-code")?.textContent).toContain("line-a");
    expect(container.querySelector(".poster-code")?.textContent).toContain("line-b");
    expect(container.querySelector(".poster-binary")?.textContent).toBe(
      "01001011 01001100 01000101 01001111 01010011 01010010",
    );
    expect(container.querySelector(".overlay-canvas")).toBeTruthy();
    expect(container.querySelector(".has-scanline")).toBeNull();
    expect(container.querySelector(".poster-meta")).toBeNull();
    expect(container.querySelector(".poster-index")?.textContent).toBe("PLATE / 01");
  });

  it("renders still chrome, priority, meta, and scanline", () => {
    const { container } = render(
      <PosterVisual
        visual={visual}
        index="PLATE / GB"
        meta="SEAT / 01"
        priority
        chrome="still"
        scanline
      />,
    );
    const img = screen.getByAltText("poster alt");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchPriority", "high");
    expect(container.querySelector(".poster-agent")).toBeNull();
    expect(container.querySelector(".overlay-canvas")).toBeNull();
    expect(container.querySelector(".poster-meta")?.textContent).toBe("SEAT / 01");
    expect(container.querySelector(".has-scanline")).toBeTruthy();
    expect(container.querySelector(".poster-scanline")).toBeTruthy();
    expect(container.querySelector(".poster-index")?.textContent).toBe("PLATE / GB");
  });
});
