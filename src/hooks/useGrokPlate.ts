import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

export function useGrokPlate(root: RefObject<HTMLElement | null>, key: string): void {
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(el, { autoAlpha: 1, clearProps: "opacity,visibility" });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: "power3.out" });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [key] },
  );
}
