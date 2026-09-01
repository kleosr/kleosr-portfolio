import { useRef, type ReactElement } from "react";
import { crewSeatCount, grokCopy, grokHeroVisual } from "../grok-content";
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
        <span>[ GROK BOT / MISSION BAY ]</span>
        <a className="grok-jump" href="#crew">
          [ CREW ]
        </a>
      </header>

      <main id="mission">
        <section className="grok-hero" aria-labelledby="grok-page-title">
          <div className="grok-hero-copy">
            <p className="grok-meta" data-grok-fade="hero">
              <data value={crewSeatCount}>{`UNIT / ${String(crewSeatCount).padStart(2, "0")}`}</data>
              <span>REV 2026.08</span>
              <span>SCOPE / SESSION</span>
            </p>
            <p className="grok-unit" aria-hidden="true">
              {String(crewSeatCount).padStart(2, "0")}
            </p>
            <div className="grok-mark grok-lockup" data-grok-fade="hero">
              <GrokLogo className="grok-hero-logo" />
              <span>Grok Bot</span>
            </div>
            <h1 id="grok-page-title" data-grok-fade="hero">
              The work gets heavy. <span>The agents take it from here.</span>
            </h1>
            <p className="grok-lead" data-grok-fade="hero">
              {grokCopy.lead}
            </p>
          </div>

          <figure className="grok-hero-visual grok-frame" data-grok-fade="hero">
            <PosterVisual visual={grokHeroVisual} index="PLATE / GB" priority chrome="still" />
            <figcaption>[ PLATE / GB ]</figcaption>
          </figure>
        </section>

        <GrokCrew />
      </main>

      <footer className="grok-footer">
        <span>[ KLEOSR / GROK BOT ]</span>
        <span>REV 2026</span>
      </footer>
    </div>
  );
}
