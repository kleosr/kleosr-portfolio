import type { ReactElement } from "react";
import { githubUrl } from "../content";
import { grokCopy } from "../grok-content";
import { GrokControl, GrokKicker } from "./GrokUi";

export function GrokClose({ onLockFirst }: { onLockFirst: () => void }): ReactElement {
  return (
    <section className="grok-close" aria-labelledby="close-title">
      <header data-grok-fade="rest">
        <GrokKicker>{grokCopy.closeKicker}</GrokKicker>
        <h2 id="close-title">{grokCopy.closeTitle}</h2>
        <p>{grokCopy.closeLead}</p>
      </header>
      <div className="grok-actions" data-grok-fade="rest">
        <GrokControl href="/">{grokCopy.home}</GrokControl>
        <GrokControl href={githubUrl} external>
          {grokCopy.github}
        </GrokControl>
        <GrokControl tone="primary" onClick={onLockFirst}>
          {grokCopy.lockSeat}
        </GrokControl>
      </div>
    </section>
  );
}
