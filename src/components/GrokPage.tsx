import { useRef, type ReactElement } from "react";
import { grokHeroVisual } from "../grok-content";
import { useGrokMotion } from "../hooks/useGrokMotion";
import { GrokCrew } from "./GrokCrew";
import { GrokLogo } from "./GrokLogo";
import { PosterVisual } from "./PosterVisual";

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
        <span>Grok Bot / Mission Bay</span>
        <a className="grok-jump" href="#crew">
          Flight crew
        </a>
      </header>

      <main id="mission">
        <section className="grok-hero" aria-labelledby="grok-page-title">
          <div className="grok-hero-copy">
            <div className="grok-mark grok-lockup" data-grok-fade="hero">
              <GrokLogo className="grok-hero-logo" />
              <span>Grok Bot</span>
            </div>
            <h1 id="grok-page-title" data-grok-fade="hero">
              The work gets heavy. <span>The agents take it from here.</span>
            </h1>
            <p className="grok-lead" data-grok-fade="hero">
              Seven agents behind my Cursor sessions. Each one owns a seat.
            </p>
          </div>

          <figure className="grok-hero-visual" data-grok-fade="hero">
            <PosterVisual visual={grokHeroVisual} index="PLATE / GB" priority chrome="still" />
          </figure>
        </section>

        <GrokCrew />
      </main>

      <footer className="grok-footer">
        <span>KLEOSR / GROK BOT</span>
        <span>2026</span>
      </footer>
    </div>
  );
}
