import type { KeyboardEvent, ReactElement } from "react";
import { grokAgentIndex, grokAgents, grokCopy, type GrokAgent } from "../grok-content";
import { GrokBayPlate } from "./GrokBayPlate";
import { GrokSeat } from "./GrokSeat";
import { GrokKicker } from "./GrokUi";

type GrokCrewProps = {
  active: number;
  locked: GrokAgent;
  onLock: (index: number) => void;
};

function moveLock(
  event: KeyboardEvent<HTMLElement>,
  active: number,
  onLock: (index: number) => void,
): void {
  const next = grokAgentIndex(active, event.key);
  if (next === null) return;
  event.preventDefault();
  onLock(next);
  const list = event.currentTarget.closest("ol") ?? event.currentTarget;
  list.querySelectorAll<HTMLButtonElement>("button")[next]?.focus({ preventScroll: true });
}

export function GrokCrew({ active, locked, onLock }: GrokCrewProps): ReactElement {
  return (
    <section className="grok-crew" id="crew" aria-labelledby="crew-title">
      <header data-grok-fade="crew">
        <GrokKicker>{grokCopy.crewKicker}</GrokKicker>
        <h2 id="crew-title">{grokCopy.crewTitle}</h2>
        <span>{grokCopy.crewHint}</span>
      </header>
      <div className="sr-only" aria-live="polite">
        {locked.number} {locked.name}
      </div>
      <div className="grok-bay-split">
        <GrokBayPlate agent={locked} />
        <ol className="grok-agent-list" onKeyDown={(event) => moveLock(event, active, onLock)}>
          {grokAgents.map((agent, index) => (
            <li key={agent.number} data-grok-fade="crew">
              <GrokSeat
                agent={agent}
                pressed={index === active}
                onLock={() => onLock(index)}
                onKeyDown={(event) => moveLock(event, active, onLock)}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
