import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function writeRadius(stage: HTMLElement): void {
  const span = Math.min(stage.clientWidth, stage.clientHeight) * 0.38;
  stage.style.setProperty("--radius", `${Math.max(120, Math.round(span))}px`);
}

export function frontIndex(progress: number, last: number): number {
  return Math.min(last, Math.max(0, Math.round(progress * last)));
}

export function markFront(cards: HTMLElement[], index: number): void {
  for (const [i, card] of cards.entries()) {
    card.classList.toggle("is-front", i === index);
    card.toggleAttribute("inert", i !== index);
  }
}

export function refreshAfterImages(stage: HTMLElement): void {
  const frames = [...stage.querySelectorAll("img")];
  void Promise.all(frames.map((img) => img.decode().catch(() => undefined))).then(() => {
    ScrollTrigger.refresh();
  });
}

export function scrubOrbit(
  section: HTMLElement,
  stage: HTMLElement,
  ring: HTMLElement,
  cards: HTMLElement[],
  onIndex: (index: number) => void,
): void {
  const last = cards.length - 1;
  let current = 0;
  writeRadius(stage);
  gsap.set(ring, { rotationX: 12, rotationY: 0, force3D: true });
  markFront(cards, 0);
  onIndex(0);

  gsap.to(ring, {
    rotationY: -(360 - 360 / cards.length),
    ease: "none",
    onUpdate() {
      const index = frontIndex(this.progress(), last);
      if (index === current) return;
      current = index;
      markFront(cards, index);
      onIndex(index);
    },
    scrollTrigger: {
      trigger: section,
      start: () =>
        window.matchMedia("(max-width: 39.99rem)").matches ? "top 8.25rem" : "top 5.25rem",
      end: () => `+=${Math.round(window.innerHeight * 3.4)}`,
      pin: true,
      scrub: 0.65,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: 1 / last,
        duration: 0.3,
        ease: "power2.out",
      },
      onRefresh: () => writeRadius(stage),
    },
  });
}
