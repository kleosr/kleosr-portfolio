import { describe, expect, it, vi } from "vitest";
import { frontIndex, markFront, refreshAfterImages, scrubOrbit, writeRadius } from "./toolOrbit";

describe("tool orbit helpers", () => {
  it("clamps the front index", () => {
    expect(frontIndex(0, 2)).toBe(0);
    expect(frontIndex(0.5, 2)).toBe(1);
    expect(frontIndex(1, 2)).toBe(2);
    expect(frontIndex(-1, 2)).toBe(0);
    expect(frontIndex(2, 2)).toBe(2);
  });

  it("writes a floor radius of 120px", () => {
    const stage = document.createElement("div");
    Object.defineProperty(stage, "clientWidth", { value: 100 });
    Object.defineProperty(stage, "clientHeight", { value: 80 });
    writeRadius(stage);
    expect(stage.style.getPropertyValue("--radius")).toBe("120px");
    Object.defineProperty(stage, "clientWidth", { value: 400 });
    Object.defineProperty(stage, "clientHeight", { value: 400 });
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
  });

  it("scrubs the ring and notifies index changes", async () => {
    const gsap = (await import("gsap")).default;
    const calls: number[] = [];
    const section = document.createElement("section");
    const stage = document.createElement("div");
    const ring = document.createElement("div");
    const cards = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
    Object.defineProperty(stage, "clientWidth", { value: 500 });
    Object.defineProperty(stage, "clientHeight", { value: 400 });
    const tween = { progress: () => 0 };
    const to = vi.spyOn(gsap, "to").mockImplementation((_target, vars) => {
      const typed = vars as {
        rotationY: number;
        onUpdate: () => void;
        scrollTrigger: { end: () => string; onRefresh: () => void; snap: { snapTo: number } };
      };
      typed.onUpdate.call(tween);
      tween.progress = () => 0.5;
      typed.onUpdate.call(tween);
      typed.onUpdate.call(tween);
      expect(typed.rotationY).toBe(-(360 - 360 / 3));
      expect(typed.scrollTrigger.snap.snapTo).toBe(0.5);
      window.innerHeight = 800;
      expect(typed.scrollTrigger.end()).toBe(`+=${Math.round(800 * 3.4)}`);
      typed.scrollTrigger.onRefresh();
      return tween as never;
    });
    scrubOrbit(section, stage, ring, cards, (index) => calls.push(index));
    expect(calls[0]).toBe(0);
    expect(calls).toContain(1);
    expect(stage.style.getPropertyValue("--radius")).toBe(`${Math.round(400 * 0.38)}px`);
    to.mockRestore();
  });
});
