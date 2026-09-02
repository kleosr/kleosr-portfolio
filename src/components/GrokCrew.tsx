import { useState, type KeyboardEvent, type ReactElement } from "react";
import { grokAgents, grokAgentIndex, grokCopy } from "../grok-content";
import { GrokBayPlate } from "./GrokBayPlate";
import { GrokSeat } from "./GrokSeat";

export function GrokCrew(): ReactElement {
  const [active, setActive] = useState(0);
  const locked = grokAgents[active] ?? grokAgents[0];

  function onListKey(event: KeyboardEvent<HTMLOListElement>): void {
    const next = grokAgentIndex(active, event.key);
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }

  function onSeatKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
    const next = grokAgentIndex(active, event.key);
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    const buttons = event.currentTarget.closest("ol")?.querySelectorAll<HTMLButtonElement>("button");
    buttons?.[next]?.focus();
  }

  return (
    <section className="grok-crew" id="crew" aria-labelledby="crew-title">
      <header data-grok-fade="crew">
        <p>{grokCopy.crewKicker}</p>
        <h2 id="crew-title">{grokCopy.crewTitle}</h2>
        <span>{grokCopy.crewHint}</span>
      </header>
      <div className="sr-only" aria-live="polite">
        {locked.number} {locked.name}
      </div>
      <div className="grok-bay-split">
        <GrokBayPlate agent={locked} />
        <ol className="grok-agent-list" onKeyDown={onListKey}>
          {grokAgents.map((agent, index) => (
            <li key={agent.number} data-grok-fade="crew">
              <GrokSeat
                agent={agent}
                pressed={index === active}
                onLock={() => setActive(index)}
                onKeyDown={onSeatKeyDown}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
