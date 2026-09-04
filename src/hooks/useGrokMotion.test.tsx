import { render } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { setMatchMedia } from "../test/matchMedia";
import { useGrokMotion } from "./useGrokMotion";

function scrollTriggerOf(value: object): { start: string; once: boolean } {
  const record = value as { start?: string; once?: boolean };
  if (typeof record.start !== "string" || typeof record.once !== "boolean") {
    throw new Error("crew trigger missing");
  }
  return { start: record.start, once: record.once };
}

function Host({ crew = true, marks = true }: { crew?: boolean; marks?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGrokMotion(ref);
  return (
    <div ref={ref}>
      {marks ? <p data-grok-fade="hero">hero</p> : null}
      {crew ? <section id="crew" data-grok-fade="crew">crew</section> : <p data-grok-fade="crew">crew</p>}
    </div>
  );
}

describe("useGrokMotion", () => {
  it("returns without a root node", () => {
    function Empty() {
      const ref = useRef<HTMLDivElement>(null);
      useGrokMotion(ref);
      return <div />;
    }
    render(<Empty />);
  });

  it("clears motion when the user prefers reduced motion", async () => {
    setMatchMedia({ reduced: true });
    const gsap = (await import("gsap")).default;
    const set = vi.spyOn(gsap, "set");
    const { unmount } = render(<Host />);
    expect(set).toHaveBeenCalled();
    const vars = set.mock.calls[0]?.[1] as { autoAlpha: number; y: number; clearProps: string };
    expect(vars.autoAlpha).toBe(1);
    expect(vars.y).toBe(0);
    expect(vars.clearProps).toBe("opacity,visibility,transform");
    unmount();
    set.mockRestore();
  });

  it("fades hero immediately and crew on scroll, including empty target lists", async () => {
    setMatchMedia({ reduced: false });
    const gsap = (await import("gsap")).default;
    const fromTo = vi.spyOn(gsap, "fromTo");
    const { unmount } = render(<Host />);
    expect(fromTo).toHaveBeenCalled();
    const heroFrom = fromTo.mock.calls[0]?.[1];
    const heroTo = fromTo.mock.calls[0]?.[2];
    const crewTo = fromTo.mock.calls[1]?.[2];
    expect(heroFrom).toEqual({ autoAlpha: 0, y: 20 });
    if (!heroTo || typeof heroTo === "number") throw new Error("hero tween missing");
    if (!crewTo || typeof crewTo === "number") throw new Error("crew tween missing");
    expect(heroTo.autoAlpha).toBe(1);
    expect(heroTo.y).toBe(0);
    expect(heroTo.duration).toBe(0.3);
    expect(heroTo.stagger).toBe(0.07);
    expect(heroTo.ease).toBe("power3.out");
    expect(heroTo.immediateRender).toBe(true);
    expect(heroTo.scrollTrigger).toBeUndefined();
    expect(crewTo.immediateRender).toBe(false);
    const trigger = crewTo.scrollTrigger;
    if (!trigger || typeof trigger !== "object") throw new Error("crew trigger missing");
    expect(scrollTriggerOf(trigger)).toEqual({ start: "top 88%", once: true });
    unmount();
    fromTo.mockRestore();
    const { unmount: unmountEmpty } = render(<Host marks={false} crew={false} />);
    unmountEmpty();
  });

  it("reverts matchMedia on unmount", async () => {
    setMatchMedia({ reduced: false });
    const gsap = (await import("gsap")).default;
    const revert = vi.fn();
    const add = vi.fn();
    vi.spyOn(gsap, "matchMedia").mockReturnValue({ add, revert } as never);
    const { unmount } = render(<Host />);
    expect(add).toHaveBeenCalledTimes(2);
    expect(add.mock.calls[0]?.[0]).toBe("(prefers-reduced-motion: reduce)");
    expect(add.mock.calls[1]?.[0]).toBe("(prefers-reduced-motion: no-preference)");
    unmount();
    expect(revert).toHaveBeenCalled();
    vi.restoreAllMocks();
  });
});
