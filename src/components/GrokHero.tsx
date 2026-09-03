import type { ReactElement } from "react";
import { crewSeatCount, grokCopy } from "../grok-content";
import { GrokControl } from "./GrokUi";
import { GrokLogo } from "./GrokLogo";

export function GrokHero({ onLockFirst }: { onLockFirst: () => void }): ReactElement {
  return (
    <section className="grok-hero" aria-labelledby="grok-page-title">
      <p className="grok-meta" data-grok-fade="hero">
        <data value={crewSeatCount}>{grokCopy.heroKicker}</data>
        <span>{grokCopy.heroRev}</span>
        <span>{grokCopy.heroScope}</span>
      </p>
      <div className="grok-mark grok-lockup" data-grok-fade="hero">
        <GrokLogo className="grok-hero-logo" />
        <span>Grok Bot</span>
      </div>
      <h1 id="grok-page-title" data-grok-fade="hero">
        {grokCopy.heroTitle} <span>{grokCopy.heroLine}</span>
      </h1>
      <p className="grok-lead" data-grok-fade="hero">
        {grokCopy.lead}
      </p>
      <div className="grok-actions" data-grok-fade="hero">
        <GrokControl tone="primary" onClick={onLockFirst}>
          {grokCopy.lockSeat}
        </GrokControl>
        <GrokControl href="/">{grokCopy.home}</GrokControl>
      </div>
    </section>
  );
}
