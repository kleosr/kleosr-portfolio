import { useEffect, type ReactElement } from "react";
import { AboutContact } from "./components/AboutContact";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { ProofBand } from "./components/ProofBand";
import { ToolCatalog } from "./components/ToolCatalog";
import { Tools } from "./components/Tools";
import { useReveal } from "./hooks/useReveal";

export function App(): ReactElement {
  useReveal();

  useEffect(() => {
    if (!window.location.hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    });

    return () => window.clearTimeout(timer);
    // Stryker disable next-line ArrayDeclaration: one-shot hash scroll, constant deps are equivalent
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">
        <Hero />
        <Tools />
        <ToolCatalog />
        <ProofBand />
        <AboutContact />
      </main>
    </>
  );
}
