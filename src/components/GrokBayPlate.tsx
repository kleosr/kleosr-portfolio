import type { ReactElement } from "react";
import { grokBayVisual, grokPlateCopy, type GrokAgent } from "../grok-content";
import { PosterVisual } from "./PosterVisual";

export function GrokBayPlate({ agent }: { agent: GrokAgent }): ReactElement {
  return (
    <figure className="grok-bay grok-frame" id="bay" data-grok-fade="crew">
      <PosterVisual
        visual={grokBayVisual}
        index={grokPlateCopy.plate}
        meta={`${grokPlateCopy.seat} / ${agent.number}`}
        chrome="still"
        scanline
      />
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
    </figure>
  );
}
