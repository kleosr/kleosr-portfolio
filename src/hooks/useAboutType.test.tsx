import { render } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it } from "vitest";
import { setMatchMedia } from "../test/matchMedia";
import { useAboutType } from "./useAboutType";

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
    render(<Empty />);
    render(<Blank />);
  });

  it("writes the full line when motion is reduced", () => {
    setMatchMedia({ reduced: true });
    const { container } = render(<Host text="hello" typed="typed" />);
    expect(container.querySelector(".about-type")?.textContent).toBe("typed");
  });

  it("types from data-type then from text content", async () => {
    setMatchMedia({ reduced: false });
    const { container, rerender } = render(<Host text="hello" typed="typed line" />);
    expect(container.querySelector(".about-type")?.classList.contains("is-typing")).toBe(true);
    rerender(<Host text="fallback" />);
  });
});
