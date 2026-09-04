import { render } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { setMatchMedia } from "../test/matchMedia";
import { useToolOrbit } from "./useToolOrbit";

type OrbitVars = {
  rotationY: number;
  ease: string;
  scrollTrigger: {
    start: string;
    pin: boolean;
    scrub: number;
    anticipatePin: number;
    invalidateOnRefresh: boolean;
    snap: { snapTo: number; duration: number; ease: string };
  };
};

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
    const section = container.querySelector("section");
    expect(section?.classList.contains("is-static")).toBe(true);
    expect(container.querySelector(".tool-orbit-card")?.hasAttribute("inert")).toBe(false);
    unmount();
    expect(section?.classList.contains("is-static")).toBe(false);
  });

  it("scrubs when motion is allowed", async () => {
    setMatchMedia({ reduced: false });
    const gsap = (await import("gsap")).default;
    const set = vi.spyOn(gsap, "set");
    const to = vi.spyOn(gsap, "to").mockReturnValue({ progress: () => 0 } as never);
    render(<Host />);
    expect(to).toHaveBeenCalled();
    const vars = to.mock.calls[0]?.[1] as OrbitVars;
    expect(vars.ease).toBe("none");
    expect(vars.rotationY).toBe(-(360 - 360 / 2));
    expect(vars.scrollTrigger.start).toBe("top top");
    expect(vars.scrollTrigger.pin).toBe(true);
    expect(vars.scrollTrigger.scrub).toBe(0.65);
    expect(vars.scrollTrigger.anticipatePin).toBe(1);
    expect(vars.scrollTrigger.invalidateOnRefresh).toBe(true);
    expect(vars.scrollTrigger.snap).toEqual({ snapTo: 1, duration: 0.3, ease: "power2.out" });
    expect(set.mock.calls[0]?.[1]).toMatchObject({
      rotationX: 12,
      rotationY: 0,
      force3D: true,
    });
    to.mockRestore();
    set.mockRestore();
  });

  it("reverts matchMedia on unmount", async () => {
    setMatchMedia({ reduced: false });
    const gsap = (await import("gsap")).default;
    const revert = vi.fn();
    const add = vi.fn();
    vi.spyOn(gsap, "matchMedia").mockReturnValue({ add, revert } as never);
    const { unmount } = render(<Host />);
    expect(add).toHaveBeenCalled();
    unmount();
    expect(revert).toHaveBeenCalled();
    vi.restoreAllMocks();
  });
});
