import { useState, type KeyboardEvent, type ReactElement } from "react";
import { grokAgents, grokAgentIndex, grokBayVisual, grokCopy } from "../grok-content";
import { PosterVisual } from "./PosterVisual";

export function GrokCrew(): ReactElement {
  const [active, setActive] = useState(0);
  const locked = grokAgents[active] ?? grokAgents[0];

  function onListKey(event: KeyboardEvent<HTMLDivElement>): void {
    const next = grokAgentIndex(active, event.key);
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    event.currentTarget.querySelectorAll("button")[next]?.focus();
  }

  return (
    <section className="grok-crew" id="crew" aria-labelledby="crew-title">
      <header data-grok-fade="crew">
        <p>{grokCopy.crewKicker}</p>
        <h2 id="crew-title">{grokCopy.crewTitle}</h2>
        <span>{grokCopy.crewHint}</span>
      </header>
      <p className="grok-lock" aria-live="polite" data-grok-fade="crew">
        <span>LOCK</span>
        <data value={locked.number}>{locked.number}</data>
        <strong>{locked.name}</strong>
        <samp>{locked.channel}</samp>
        <em>{locked.owns}</em>
      </p>
      <figure className="grok-crew-visual grok-frame" data-grok-fade="crew">
        <PosterVisual visual={grokBayVisual} index="PLATE / BAY" chrome="still" />
        <figcaption>[ PLATE / BAY ]</figcaption>
      </figure>
      <div className="grok-agent-board" onKeyDown={onListKey}>
        <ol className="grok-agent-list">
          {grokAgents.map((agent, index) => (
            <li key={agent.number} data-grok-fade="crew">
              <button
                type="button"
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                <span>{agent.number}</span>
                <div>
                  <strong>{agent.name}</strong>
                  <p>{agent.role}</p>
                  <p className="grok-owns">{agent.owns}</p>
                </div>
                <small>{agent.channel}</small>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
