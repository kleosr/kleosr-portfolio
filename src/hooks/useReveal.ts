import { useEffect } from "react";

export function useReveal(): void {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const readyTimer = window.setTimeout(() => document.body.classList.add("is-ready"), 60);

    const mobile = window.matchMedia("(max-width: 39.99rem)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: mobile ? "0px 0px -6%" : "0px 0px -10%",
        threshold: mobile ? 0.06 : 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      window.clearTimeout(readyTimer);
      observer.disconnect();
      document.body.classList.remove("is-ready");
    };
  }, []);
}
