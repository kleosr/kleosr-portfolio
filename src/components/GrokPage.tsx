import { useRef, type ReactElement } from "react";
import { grokCopy } from "../grok-content";
import { useGrokMotion } from "../hooks/useGrokMotion";
import { GrokCrew } from "./GrokCrew";
import { GrokLogo } from "./GrokLogo";

export function GrokPage(): ReactElement {
  const pageRef = useRef<HTMLDivElement>(null);
  useGrokMotion(pageRef);

  return (
    <div className="grok-page" ref={pageRef}>
      <a className="skip-link" href="#crew">
        Skip to flight crew
      </a>
      <div className="grain" aria-hidden="true" />

      <header className="grok-nav">
        <a className="grok-brand" href="/" aria-label="Back to kleosr">
          kleos<span>r</span>
        </a>
        <div className="grok-mark grok-lockup">
          <GrokLogo className="grok-hero-logo" />
          <span>Grok Bot</span>
        </div>
        <a className="grok-jump" href="#crew">
          Crew
        </a>
      </header>

      <main id="mission">
        <section className="grok-hero" aria-labelledby="grok-page-title">
          <h1 id="grok-page-title" data-grok-fade="hero">
            The work gets heavy. <span>The agents take it from here.</span>
          </h1>
          <p className="grok-lead" data-grok-fade="hero">
            {grokCopy.lead}
          </p>
        </section>

        <GrokCrew />
      </main>

      <footer className="grok-footer">
        <span>kleosr</span>
        <span>Grok Bot</span>
      </footer>
    </div>
  );
}
