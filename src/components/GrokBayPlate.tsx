import type { ReactElement } from "react";
import { grokBayVisual, grokPlateCopy, type GrokAgent } from "../grok-content";
import { Plate } from "./system";

export function GrokBayPlate({ agent }: { agent: GrokAgent }): ReactElement {
  return (
    <Plate
      className="grok-bay grok-frame"
      id="bay"
      fade="crew"
      aspect="4:5"
      visual={grokBayVisual}
      index={`${grokPlateCopy.seat} / ${agent.number}`}
      priority
      chrome="still"
      scanline
    >
      <div className="grok-bay-brief">
        <p className="grok-seat-vector">{agent.channel}</p>
        <h3>{agent.name}</h3>
        <p>{agent.role}</p>
        <div className="grok-bay-owns">
          <p>{grokPlateCopy.owns}</p>
          <ul>
            {agent.owns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <p className="grok-bay-anti">
          <span>{grokPlateCopy.anti}</span>
          {` ${agent.anti}`}
        </p>
      </div>
    </Plate>
  );
}
