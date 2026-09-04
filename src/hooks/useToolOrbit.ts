import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type RefObject } from "react";
import { refreshAfterImages, scrubOrbit } from "./toolOrbit";

// Stryker disable next-line CallExpression: plugin registration is module-load and idempotent
gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useToolOrbit(
  sectionRef: RefObject<HTMLElement | null>,
  onIndex: (index: number) => void,
): void {
  const onIndexRef = useRef(onIndex);
  onIndexRef.current = onIndex;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const stage = section.querySelector<HTMLElement>(".tool-orbit");
      const ring = section.querySelector<HTMLElement>(".tool-orbit-ring");
      if (!stage || !ring) return;

      const cards = gsap.utils.toArray<HTMLElement>(".tool-orbit-card", ring);
      if (cards.length < 2) return;

      const setIndex = (index: number): void => onIndexRef.current(index);
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            section.classList.add("is-static");
            cards.forEach((card) => card.removeAttribute("inert"));
            return () => section.classList.remove("is-static");
          }

          section.classList.remove("is-static");
          scrubOrbit(section, stage, ring, cards, setIndex);
          refreshAfterImages(stage);
          return undefined;
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );
}
