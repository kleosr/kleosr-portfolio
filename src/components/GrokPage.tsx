import { useRef, type ReactElement } from "react";
import { crewSeatCount, grokCopy, grokHeroVisual, grokPlateCopy } from "../grok-content";
import { useGrokMotion } from "../hooks/useGrokMotion";
import { GrokCrew } from "./GrokCrew";
import { GrokLogo } from "./GrokLogo";
import { Kicker, Link, Plate } from "./system";

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
        <Link className="grok-brand" href="/" aria-label="Back to kleosr">
          kleos<span>r</span>
        </Link>
        <span>[ GROK BOT / MISSION BAY ]</span>
        <Link className="grok-jump" href="#crew">
          [ CREW ]
        </Link>
      </header>

      <main id="mission">
        <section className="grok-hero" aria-labelledby="grok-page-title">
          <div className="grok-hero-copy">
            <div className="grok-meta" data-grok-fade="hero">
              <Kicker>
                <data value={crewSeatCount}>{`UNIT / ${String(crewSeatCount).padStart(2, "0")}`}</data>
              </Kicker>
              <Kicker>REV 2026.08</Kicker>
              <Kicker>SCOPE / SESSION</Kicker>
            </div>
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

          <Plate
            className="grok-hero-visual grok-frame"
            aspect="4:5"
            visual={grokHeroVisual}
            index={grokPlateCopy.plate}
            priority
            chrome="still"
            scanline
            fade="hero"
          />
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
