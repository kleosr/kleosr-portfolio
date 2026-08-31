import type { ReactElement } from "react";
import { grokAgents, grokBayVisual, grokHeroVisual } from "../grok-content";
import { useReveal } from "../hooks/useReveal";
import { GrokLogo } from "./GrokLogo";
import { HomeLink } from "./HomeLink";
import { PosterVisual } from "./PosterVisual";

export function GrokPage(): ReactElement {
  useReveal();

  return (
    <div className="grok-page">
      <a className="skip-link" href="#mission">
        Skip to mission
      </a>
      <div className="grain" aria-hidden="true" />

      <header className="grok-nav">
        <HomeLink className="grok-brand" aria-label="Back to kleosr">
          kleos<span>r</span>
        </HomeLink>
        <span>GROK BOT / MISSION BAY</span>
        <HomeLink className="grok-back">Back to portfolio</HomeLink>
      </header>

      <main id="mission">
        <section className="grok-hero" aria-labelledby="grok-page-title">
          <div className="grok-hero-copy">
            <p className="grok-status" data-reveal>
              <i />
              Public controls in progress.
            </p>
            <div className="grok-mark grok-lockup" data-reveal>
              <GrokLogo className="grok-hero-logo" />
              <span>Grok Bot</span>
            </div>
            <h1 id="grok-page-title" data-reveal>
              The work gets heavy. <span>The agents take it from here.</span>
            </h1>
            <p className="grok-lead" data-reveal>
              Grok Bot is where I publish the agents behind my real Cursor sessions. They plan,
              build, test, and ship while I keep the mission pointed in one direction.
            </p>
          </div>

          <figure className="grok-hero-visual" data-reveal>
            <PosterVisual visual={grokHeroVisual} index="PLATE / GB" priority chrome="still" />
          </figure>
        </section>

        <section className="grok-crew" aria-labelledby="crew-title">
          <header data-reveal>
            <p>01 / FLIGHT CREW</p>
            <h2 id="crew-title">Seven agents. Clear ownership.</h2>
            <span>The bay is open. Interactive controls come next.</span>
          </header>
          <figure className="grok-crew-visual" data-reveal>
            <PosterVisual visual={grokBayVisual} index="PLATE / BAY" chrome="still" />
          </figure>
          <ol className="grok-agent-list">
            {grokAgents.map(([number, name, role, channel]) => (
              <li key={number} data-reveal>
                <span>{number}</span>
                <div>
                  <strong>{name}</strong>
                  <p>{role}</p>
                </div>
                <small>{channel}</small>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="grok-footer">
        <span>KLEOSR / GROK BOT</span>
        <strong>BUILDING IN PUBLIC</strong>
        <span>2026</span>
      </footer>
    </div>
  );
}
