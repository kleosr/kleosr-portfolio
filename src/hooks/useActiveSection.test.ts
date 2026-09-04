import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it } from "vitest";
import { FakeIntersectionObserver } from "../test/observers";
import { setMatchMedia } from "../test/matchMedia";
import { useActiveSection } from "./useActiveSection";

function mountSections(): void {
  for (const id of ["tools", "about", "contact"]) {
    const section = document.createElement("section");
    section.id = id;
    document.body.append(section);
  }
}

describe("useActiveSection", () => {
  it("stays on top until a section intersects, preferring later ids", () => {
    mountSections();
    const { result } = renderHook(() => useActiveSection());
    expect(result.current).toBe("top");
    const observer = FakeIntersectionObserver.instances[0];
    expect(observer?.rootMargin).toBe("-28% 0px -62%");
    expect(observer?.thresholds).toEqual([0]);
    act(() => observer?.trigger(true, "tools"));
    expect(result.current).toBe("tools");
    act(() => observer?.trigger(true, "about"));
    expect(result.current).toBe("about");
    act(() => observer?.trigger(true, "contact"));
    expect(result.current).toBe("contact");
    act(() => observer?.trigger(false, "contact"));
    expect(result.current).toBe("about");
    const about = document.getElementById("about");
    observer?.unobserve(about ?? document.body);
    observer?.disconnect();
  });

  it("uses the mobile root margin and ignores missing sections", () => {
    setMatchMedia({ mobile: true });
    const { result } = renderHook(() => useActiveSection());
    expect(result.current).toBe("top");
    expect(FakeIntersectionObserver.instances[0]?.rootMargin).toBe("-12% 0px -55%");
    act(() => FakeIntersectionObserver.instances[0]?.trigger(false));
    expect(result.current).toBe("top");
  });
});
