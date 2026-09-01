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
    event.currentTarget.querySelectorAll("button")[next]?.focus();
  }

  return (
    <section className="grok-crew" id="crew" aria-labelledby="crew-title">
      <header data-grok-fade="crew">
        <p>{grokCopy.crewKicker}</p>
        <h2 id="crew-title">{grokCopy.crewTitle}</h2>
        <span>{grokCopy.crewHint}</span>
      </header>
      <p className="grok-lock" aria-live="polite">
        <span>LOCK</span>
        <data value={locked.number}>{locked.number}</data>
        <strong>{locked.name}</strong>
      </p>
      <div className="grok-bay-split">
        <GrokBayPlate agent={locked} />
        <ol className="grok-agent-list" onKeyDown={onListKey}>
          {grokAgents.map((agent, index) => (
            <li key={agent.number} data-grok-fade="crew">
              <GrokSeat agent={agent} pressed={index === active} onLock={() => setActive(index)} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
