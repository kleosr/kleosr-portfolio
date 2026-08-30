import type { ReactElement } from "react";
import type { Tool } from "../content";
import { VisionOverlay } from "./VisionOverlay";

type PosterVisualProps = {
  visual: Tool["visual"];
  index: string;
  priority?: boolean;
};

function plateSeed(index: string): number {
  return [...index].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function PosterVisual({
  visual,
  index,
  priority = false,
}: PosterVisualProps): ReactElement {
  return (
    <div className="poster-visual">
      <img
        src={visual.src}
        alt={visual.alt}
        width="1536"
        height="1024"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      <VisionOverlay seed={plateSeed(index)} assist />
      <div className="poster-agent" aria-hidden="true">
        <span>{visual.agent}</span>
        <strong>{visual.status}</strong>
        <i />
      </div>
      <div className="poster-code" aria-hidden="true">
        {visual.code.map((line, lineIndex) => (
          <span key={line}>
            <b>{String(lineIndex + 1).padStart(2, "0")}</b>
            {line}
          </span>
        ))}
      </div>
      <span className="poster-binary" aria-hidden="true">
        01001011 01001100 01000101 01001111 01010011 01010010
      </span>
      <span className="poster-index" aria-hidden="true">
        {index}
      </span>
    </div>
  );
}
