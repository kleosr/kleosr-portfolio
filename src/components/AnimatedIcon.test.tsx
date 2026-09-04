import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimatedIcon } from "./AnimatedIcon";

const icons = ["shield", "memory", "verify", "arrow"] as const;

const marks: Record<(typeof icons)[number], string[]> = {
  shield: ["icon-spine", "icon-shell"],
  memory: ["icon-fold", "icon-shell", "icon-back"],
  verify: ["icon-pan", "icon-beam"],
  arrow: ["icon-arrow-line", "icon-arrow-head"],
};

describe("AnimatedIcon", () => {
  it("renders each named icon with unique paths", () => {
    for (const name of icons) {
      const { container, unmount } = render(<AnimatedIcon name={name} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass(`animated-icon-${name}`);
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
      expect(svg).toHaveAttribute("fill", "none");
      expect(svg).toHaveAttribute("stroke", "currentColor");
      expect(svg).toHaveAttribute("stroke-width", "1.7");
      expect(svg).toHaveAttribute("stroke-linecap", "round");
      expect(svg).toHaveAttribute("stroke-linejoin", "round");
      expect(svg).toHaveAttribute("aria-hidden", "true");
      for (const mark of marks[name]) {
        expect(svg?.querySelector(`.${mark}`)).toBeTruthy();
      }
      expect(svg?.innerHTML).toMatchSnapshot();
      unmount();
    }
  });
});
