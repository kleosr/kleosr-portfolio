import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function typeLine(el: HTMLElement, full: string): void {
  const cursor = { n: 0 };
  el.textContent = "";
  el.classList.add("is-typing");
  gsap.to(cursor, {
    n: full.length,
    duration: Math.min(1.6, 0.045 * full.length + 0.4),
    ease: "none",
    snap: { n: 1 },
    scrollTrigger: {
      trigger: el,
      start: "top 78%",
      once: true,
    },
    onUpdate: () => {
      el.textContent = full.slice(0, cursor.n);
    },
    onComplete: () => {
      el.classList.remove("is-typing");
    },
  });
}

export function useAboutType(sectionRef: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const el = sectionRef.current?.querySelector<HTMLElement>(".about-type");
      if (!el) return;

      const full = el.dataset.type ?? el.textContent?.trim() ?? "";
      if (!full) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (context.conditions?.reduce) {
            el.textContent = full;
            el.classList.remove("is-typing");
            return undefined;
          }
          typeLine(el, full);
          return undefined;
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );
}
