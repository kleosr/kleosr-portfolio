import type { KeyboardEvent, ReactElement } from "react";
import type { GrokAgent } from "../grok-content";

type GrokSeatProps = {
  agent: GrokAgent;
  pressed: boolean;
  onLock: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
};

export function GrokSeat({ agent, pressed, onLock, onKeyDown }: GrokSeatProps): ReactElement {
  return (
    <button
      type="button"
      className="grok-seat"
      aria-pressed={pressed}
      onClick={onLock}
      onKeyDown={onKeyDown}
    >
      <span className="grok-seat-index">{agent.number}</span>
      <span className="grok-seat-body">
        <strong>{agent.name}</strong>
        <p>{agent.role}</p>
      </span>
      <span className="grok-seat-vector">{agent.channel}</span>
    </button>
  );
}
