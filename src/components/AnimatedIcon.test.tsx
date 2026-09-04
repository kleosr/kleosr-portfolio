import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimatedIcon } from "./AnimatedIcon";

describe("AnimatedIcon", () => {
  it("renders each named icon", () => {
    for (const name of ["shield", "memory", "verify", "arrow"] as const) {
      const { container, unmount } = render(<AnimatedIcon name={name} />);
      expect(container.querySelector(`svg.animated-icon-${name}`)).toBeTruthy();
      expect(container.querySelector("svg")).toHaveAttribute("viewBox", "0 0 24 24");
      unmount();
    }
  });
});
