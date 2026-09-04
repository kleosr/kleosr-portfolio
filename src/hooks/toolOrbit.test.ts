import { describe, expect, it, vi } from "vitest";
import { frontIndex, markFront, refreshAfterImages, scrubOrbit, writeRadius } from "./toolOrbit";

type ScrubVars = {
  rotationY: number;
  ease: string;
  onUpdate: () => void;
  scrollTrigger: {
    start: string;
    pin: boolean;
    scrub: number;
    anticipatePin: number;
    invalidateOnRefresh: boolean;
    end: () => string;
    onRefresh: () => void;
    snap: { snapTo: number; duration: number; ease: string };
  };
};

describe("tool orbit helpers", () => {
  it("clamps the front index", () => {
    expect(frontIndex(0, 2)).toBe(0);
    expect(frontIndex(0.5, 2)).toBe(1);
    expect(frontIndex(1, 2)).toBe(2);
    expect(frontIndex(-1, 2)).toBe(0);
    expect(frontIndex(2, 2)).toBe(2);
    expect(frontIndex(0.24, 2)).toBe(0);
    expect(frontIndex(0.26, 2)).toBe(1);
  });

  it("writes a floor radius of 120px", () => {
    const stage = document.createElement("div");
    Object.defineProperty(stage, "clientWidth", { value: 100, configurable: true });
    Object.defineProperty(stage, "clientHeight", { value: 80, configurable: true });
    writeRadius(stage);
    expect(stage.style.getPropertyValue("--radius")).toBe("120px");
    Object.defineProperty(stage, "clientWidth", { value: 400, configurable: true });
    Object.defineProperty(stage, "clientHeight", { value: 400, configurable: true });
    writeRadius(stage);
    expect(stage.style.getPropertyValue("--radius")).toBe(`${Math.round(400 * 0.38)}px`);
    Object.defineProperty(stage, "clientWidth", { value: 1000, configurable: true });
    Object.defineProperty(stage, "clientHeight", { value: 400, configurable: true });
    writeRadius(stage);
    expect(stage.style.getPropertyValue("--radius")).toBe(`${Math.round(400 * 0.38)}px`);
  });

  it("marks the front card and inert siblings", () => {
    const cards = [document.createElement("div"), document.createElement("div")];
    markFront(cards, 1);
    expect(cards[0]?.classList.contains("is-front")).toBe(false);
    expect(cards[1]?.classList.contains("is-front")).toBe(true);
    expect(cards[0]?.hasAttribute("inert")).toBe(true);
    expect(cards[1]?.hasAttribute("inert")).toBe(false);
    markFront(cards, 0);
    expect(cards[0]?.classList.contains("is-front")).toBe(true);
    expect(cards[1]?.hasAttribute("inert")).toBe(true);
  });

  it("refreshes ScrollTrigger after images decode", async () => {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const refresh = vi.spyOn(ScrollTrigger, "refresh").mockImplementation(() => []);
    const stage = document.createElement("div");
    const ok = document.createElement("img");
    const bad = document.createElement("img");
    ok.decode = () => Promise.resolve();
    bad.decode = () => Promise.reject(new Error("decode"));
    stage.append(ok, bad);
    refreshAfterImages(stage);
    await vi.waitFor(() => expect(refresh).toHaveBeenCalled());
    refresh.mockRestore();
  });

  it("scrubs the ring and notifies index changes", async () => {
    const gsap = (await import("gsap")).default;
    const calls: number[] = [];
    const section = document.createElement("section");
    const stage = document.createElement("div");
    const ring = document.createElement("div");
    const cards = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
    Object.defineProperty(stage, "clientWidth", { value: 500, configurable: true });
    Object.defineProperty(stage, "clientHeight", { value: 400, configurable: true });
    const tween = { progress: () => 0 };
    const set = vi.spyOn(gsap, "set");
    const to = vi.spyOn(gsap, "to").mockImplementation((_target, vars) => {
      const typed = vars as ScrubVars;
      expect(typed.rotationY).toBe(-(360 - 360 / 3));
      expect(typed.ease).toBe("none");
      expect(typed.scrollTrigger.start).toBe("top top");
      expect(typed.scrollTrigger.pin).toBe(true);
      expect(typed.scrollTrigger.scrub).toBe(0.65);
      expect(typed.scrollTrigger.anticipatePin).toBe(1);
      expect(typed.scrollTrigger.invalidateOnRefresh).toBe(true);
      expect(typed.scrollTrigger.snap).toEqual({
        snapTo: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
      typed.onUpdate.call(tween);
      tween.progress = () => 0.5;
      typed.onUpdate.call(tween);
      typed.onUpdate.call(tween);
      window.innerHeight = 800;
      expect(typed.scrollTrigger.end()).toBe(`+=${Math.round(800 * 3.4)}`);
      typed.scrollTrigger.onRefresh();
      return tween as never;
    });
    scrubOrbit(section, stage, ring, cards, (index) => calls.push(index));
    expect(calls).toEqual([0, 1]);
    expect(set.mock.calls[0]?.[1]).toMatchObject({ rotationX: 12, rotationY: 0, force3D: true });
    expect(stage.style.getPropertyValue("--radius")).toBe(`${Math.round(400 * 0.38)}px`);
    to.mockRestore();
    set.mockRestore();
  });
});
