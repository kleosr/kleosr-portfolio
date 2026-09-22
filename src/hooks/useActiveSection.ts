import { useEffect, useState } from "react";

const sectionIds = ["tools", "about", "contact"] as const;

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const next = [...sectionIds].reverse().find((id) => visible.has(id));
        setActiveSection(next ?? "top");
      },
      {
        rootMargin: window.matchMedia("(max-width: 39.99rem)").matches
          ? "-12% 0px -55%"
          : "-28% 0px -62%",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // Stryker disable next-line ArrayDeclaration: one-shot effect, constant deps are equivalent
  }, []);

  return activeSection;
}
