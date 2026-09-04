import type { ReactElement } from "react";
import type { Tool } from "../content";
import { VisionOverlay } from "./VisionOverlay";

type PosterChrome = "full" | "still";

type PosterVisualProps = {
  visual: Tool["visual"];
  index: string;
  meta?: string;
  priority?: boolean;
  chrome?: PosterChrome;
  scanline?: boolean;
};

export function plateSeed(index: string): number {
  return [...index].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function PosterVisual({
  visual,
  index,
  meta,
  priority = false,
  chrome = "full",
  scanline = false,
}: PosterVisualProps): ReactElement {
  return (
    <div className={`poster-visual${scanline ? " has-scanline" : ""}`}>
      <img
        src={visual.src}
        alt={visual.alt}
        width="1536"
        height="1024"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      {chrome === "full" ? (
        <>
          <VisionOverlay seed={plateSeed(index)} assist />
          <div className="poster-agent" aria-hidden="true">
            <span>{visual.agent}</span>{" "}
            <strong>{visual.status}</strong>
            <i />
          </div>
          <div className="poster-code" aria-hidden="true">
            {visual.code.map((line, lineIndex) => (
              <span key={line}>
                <b>{String(lineIndex + 1).padStart(2, "0")}</b>{" "}
                {line}
              </span>
            ))}
          </div>
          <span className="poster-binary" aria-hidden="true">
            01001011 01001100 01000101 01001111 01010011 01010010
          </span>
        </>
      ) : null}{" "}
      <span className="poster-index" aria-hidden="true">
        {index}
      </span>
      {meta ? (
        <>
          {" "}
          <span className="poster-meta" aria-hidden="true">
            {meta}
          </span>
        </>
      ) : null}
      {scanline ? <span className="poster-scanline" aria-hidden="true" /> : null}
    </div>
  );
}
