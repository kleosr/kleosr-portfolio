import { render } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { setMatchMedia } from "../test/matchMedia";
import { useGrokMotion } from "./useGrokMotion";

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
    render(<Host />);
    expect(set).toHaveBeenCalled();
    set.mockRestore();
  });

  it("fades hero immediately and crew on scroll, including empty target lists", async () => {
    setMatchMedia({ reduced: false });
    const gsap = (await import("gsap")).default;
    const fromTo = vi.spyOn(gsap, "fromTo");
    render(<Host />);
    expect(fromTo).toHaveBeenCalled();
    const withTrigger = fromTo.mock.calls.find((call) => {
      const vars = call[2] as { scrollTrigger?: { trigger: HTMLElement } };
      return Boolean(vars.scrollTrigger);
    });
    expect(withTrigger).toBeTruthy();
    fromTo.mockRestore();
    render(<Host marks={false} crew={false} />);
  });
});
