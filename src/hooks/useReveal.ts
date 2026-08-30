import { useEffect } from "react";

export function useReveal(): void {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const readyTimer = window.setTimeout(() => document.body.classList.add("is-ready"), 60);

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => window.clearTimeout(readyTimer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      window.clearTimeout(readyTimer);
      observer.disconnect();
      document.body.classList.remove("is-ready");
    };
  }, []);
}
