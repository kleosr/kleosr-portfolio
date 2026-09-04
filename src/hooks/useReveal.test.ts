import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";
import { FakeIntersectionObserver } from "../test/observers";
import { setMatchMedia } from "../test/matchMedia";
import { useReveal } from "./useReveal";

function mountReveal(): HTMLElement {
  const el = document.createElement("div");
  el.setAttribute("data-reveal", "");
  document.body.append(el);
  return el;
}

describe("useReveal", () => {
  it("shows immediately when motion is reduced", () => {
    setMatchMedia({ reduced: true });
    const el = mountReveal();
    renderHook(() => useReveal());
    expect(el.classList.contains("is-visible")).toBe(true);
  });

  it("shows immediately when IntersectionObserver is missing", () => {
    const Original = window.IntersectionObserver;
    Reflect.deleteProperty(window, "IntersectionObserver");
    const el = mountReveal();
    renderHook(() => useReveal());
    expect(el.classList.contains("is-visible")).toBe(true);
    window.IntersectionObserver = Original;
  });

  it("observes desktop and mobile thresholds and unobserves on reveal", () => {
    vi.useFakeTimers();
    const el = mountReveal();
    const { unmount } = renderHook(() => useReveal());
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(document.body.classList.contains("is-ready")).toBe(true);
    const observer = FakeIntersectionObserver.instances[0];
    expect(observer?.rootMargin).toBe("0px 0px -10%");
    expect(observer?.thresholds).toEqual([0.12]);
    observer?.trigger(false);
    expect(el.classList.contains("is-visible")).toBe(false);
    observer?.trigger(true);
    expect(el.classList.contains("is-visible")).toBe(true);
    unmount();
    expect(document.body.classList.contains("is-ready")).toBe(false);
    vi.useRealTimers();
  });

  it("uses mobile observer options", () => {
    setMatchMedia({ mobile: true });
    mountReveal();
    renderHook(() => useReveal());
    expect(FakeIntersectionObserver.instances[0]?.rootMargin).toBe("0px 0px -6%");
    expect(FakeIntersectionObserver.instances[0]?.thresholds).toEqual([0.06]);
  });
});
