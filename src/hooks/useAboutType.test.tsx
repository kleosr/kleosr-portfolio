import { render } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { setMatchMedia } from "../test/matchMedia";
import { typedCopy, useAboutType } from "./useAboutType";

const LONG = "abcdefghijklmnopqrstuvwxyz1234";

type TypeVars = {
  n: number;
  duration: number;
  ease: string;
  snap: { n: number };
  scrollTrigger: { trigger: HTMLElement; start: string; once: boolean };
  onUpdate: () => void;
  onComplete: () => void;
};

function Host({ text, typed }: { text: string; typed?: string }) {
  const ref = useRef<HTMLElement>(null);
  useAboutType(ref);
  return (
    <section ref={ref}>
      <p className="about-type" data-type={typed}>
        {text}
      </p>
    </section>
  );
}

describe("typedCopy", () => {
  it("prefers data-type and trims text, including null", () => {
    expect(typedCopy("typed", "ignored")).toBe("typed");
    expect(typedCopy(undefined, "  hello  ")).toBe("hello");
    expect(typedCopy(undefined, null)).toBe("");
    expect(typedCopy("", "  ")).toBe("");
  });
});

describe("useAboutType", () => {
  it("returns without a typed node or empty copy", () => {
    function Empty() {
      const ref = useRef<HTMLElement>(null);
      useAboutType(ref);
      return <section ref={ref} />;
    }
    function Blank() {
      const ref = useRef<HTMLElement>(null);
      useAboutType(ref);
      return (
        <section ref={ref}>
          <p className="about-type">   </p>
        </section>
      );
    }
    const empty = render(<Empty />);
    empty.unmount();
    const blank = render(<Blank />);
    blank.unmount();
  });

  it("writes the full line when motion is reduced", () => {
    setMatchMedia({ reduced: true });
    const { container, unmount } = render(<Host text="hello" typed="typed" />);
    const el = container.querySelector(".about-type");
    expect(el?.textContent).toBe("typed");
    expect(el?.classList.contains("is-typing")).toBe(false);
    unmount();
  });

  it("types from data-type then from text content", async () => {
    setMatchMedia({ reduced: false });
    const gsap = (await import("gsap")).default;
    const captured: TypeVars[] = [];
    const to = vi.spyOn(gsap, "to").mockImplementation((target, vars) => {
      const typed = vars as TypeVars;
      captured.push(typed);
      const cursor = target as { n: number };
      const el = typed.scrollTrigger.trigger;
      const full = typed.n === LONG.length ? LONG : "fallback";
      expect(el.classList.contains("is-typing")).toBe(true);
      expect(el.textContent).toBe("");
      cursor.n = 5;
      typed.onUpdate();
      expect(el.textContent).toBe(full.slice(0, 5));
      cursor.n = typed.n;
      typed.onUpdate();
      expect(el.textContent).toBe(full);
      typed.onComplete();
      expect(el.classList.contains("is-typing")).toBe(false);
      return { progress: () => 1, kill: () => undefined } as never;
    });
    const typed = render(<Host text="hello" typed={LONG} />);
    expect(to).toHaveBeenCalled();
    expect(captured[0]?.n).toBe(LONG.length);
    expect(captured[0]?.duration).toBe(1.6);
    expect(captured[0]?.ease).toBe("none");
    expect(captured[0]?.snap).toEqual({ n: 1 });
    expect(captured[0]?.scrollTrigger.start).toBe("top 78%");
    expect(captured[0]?.scrollTrigger.once).toBe(true);
    typed.unmount();
    const fallback = render(<Host text="fallback" />);
    expect(captured[1]?.n).toBe("fallback".length);
    expect(captured[1]?.duration).toBe(0.045 * 8 + 0.4);
    fallback.unmount();
    to.mockRestore();
  });

  it("reverts matchMedia on unmount", async () => {
    setMatchMedia({ reduced: true });
    const gsap = (await import("gsap")).default;
    const revert = vi.fn();
    const add = vi.fn();
    vi.spyOn(gsap, "matchMedia").mockReturnValue({ add, revert } as never);
    const { unmount } = render(<Host text="hello" typed="typed" />);
    expect(add).toHaveBeenCalled();
    unmount();
    expect(revert).toHaveBeenCalled();
    vi.restoreAllMocks();
  });
});
