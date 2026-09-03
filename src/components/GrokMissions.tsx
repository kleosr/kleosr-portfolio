import type { ReactElement } from "react";
import { grokAgents, grokCopy, grokMissions } from "../grok-content";
import { GrokIndex, GrokKicker } from "./GrokUi";

export function GrokMissions({
  active,
  onLock,
}: {
  active: number;
  onLock: (index: number) => void;
}): ReactElement {
  return (
    <section className="grok-missions" aria-labelledby="mission-title">
      <header data-grok-fade="rest">
        <GrokKicker>{grokCopy.missionKicker}</GrokKicker>
        <h2 id="mission-title">{grokCopy.missionTitle}</h2>
      </header>
      <ul>
        {grokMissions.map((mission) => {
          const agent = grokAgents[mission.seat] ?? grokAgents[0];
          return (
            <li key={mission.label} data-grok-fade="rest">
              <button
                type="button"
                className="grok-mission"
                aria-pressed={mission.seat === active}
                onClick={() => onLock(mission.seat)}
              >
                <GrokIndex value={agent.number} />
                <strong>{mission.label}</strong>
                <span className="grok-vector">{agent.channel}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
