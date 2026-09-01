import { useState, type KeyboardEvent, type ReactElement } from "react";
import { grokAgents, grokAgentIndex, grokBayVisual } from "../grok-content";
import { PosterVisual } from "./PosterVisual";

export function GrokCrew(): ReactElement {
  const [active, setActive] = useState(0);

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
        <p>01 / Flight crew</p>
        <h2 id="crew-title">Seven agents. Clear ownership.</h2>
        <span>Each seat owns one job. Arrow keys move the lock.</span>
      </header>
      <figure className="grok-crew-visual" data-grok-fade="crew">
        <PosterVisual visual={grokBayVisual} index="PLATE / BAY" chrome="still" />
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
