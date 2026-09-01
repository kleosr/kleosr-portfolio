import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function fadeIn(targets: HTMLElement[], trigger?: HTMLElement): void {
  if (!targets.length) return;
  gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 16 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.28,
      stagger: 0.06,
      ease: "power3.out",
      immediateRender: !trigger,
      scrollTrigger: trigger
        ? { trigger, start: "top 88%", once: true }
        : undefined,
    },
  );
}

export function useGrokMotion(root: RefObject<HTMLElement | null>): void {
  useGSAP(
    () => {
      const page = root.current;
      if (!page) return;

      const hero = gsap.utils.toArray<HTMLElement>("[data-grok-fade='hero']", page);
      const crew = gsap.utils.toArray<HTMLElement>("[data-grok-fade='crew']", page);
      const crewRoot = page.querySelector<HTMLElement>("#crew");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...hero, ...crew], { autoAlpha: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        fadeIn(hero);
        fadeIn(crew, crewRoot ?? undefined);
      });

      return () => mm.revert();
    },
    { scope: root },
  );
}
