import { render } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { setMatchMedia } from "../test/matchMedia";
import { useToolOrbit } from "./useToolOrbit";

function Host({ cards = 2 }: { cards?: number }) {
  const ref = useRef<HTMLElement>(null);
  useToolOrbit(ref, vi.fn());
  return (
    <section ref={ref}>
      <div className="tool-orbit">
        <div className="tool-orbit-ring">
          {Array.from({ length: cards }, (_, index) => (
            <div className="tool-orbit-card" key={index}>
              {index}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

describe("useToolOrbit", () => {
  it("returns when the section ref is empty", () => {
    function Empty() {
      const ref = useRef<HTMLElement>(null);
      useToolOrbit(ref, vi.fn());
      return <div />;
    }
    render(<Empty />);
  });

  it("returns without a stage or ring", () => {
    function Missing() {
      const ref = useRef<HTMLElement>(null);
      useToolOrbit(ref, vi.fn());
      return <section ref={ref} />;
    }
    render(<Missing />);
  });

  it("returns without a ring inside the stage", () => {
    function NoRing() {
      const ref = useRef<HTMLElement>(null);
      useToolOrbit(ref, vi.fn());
      return (
        <section ref={ref}>
          <div className="tool-orbit" />
        </section>
      );
    }
    render(<NoRing />);
  });

  it("returns with fewer than two cards", () => {
    render(<Host cards={1} />);
    render(<Host cards={0} />);
  });

  it("marks the orbit static when the user prefers reduced motion", () => {
    setMatchMedia({ reduced: true });
    const { container, unmount } = render(<Host />);
    expect(container.querySelector("section")?.classList.contains("is-static")).toBe(true);
    expect(container.querySelector(".tool-orbit-card")?.hasAttribute("inert")).toBe(false);
    unmount();
  });

  it("scrubs when motion is allowed", async () => {
    setMatchMedia({ reduced: false });
    const gsap = (await import("gsap")).default;
    const to = vi.spyOn(gsap, "to").mockReturnValue({ progress: () => 0 } as never);
    render(<Host />);
    expect(to).toHaveBeenCalled();
    to.mockRestore();
  });
});
