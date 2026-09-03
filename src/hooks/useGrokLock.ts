import { useCallback, useState } from "react";
import { grokAgents } from "../grok-content";

function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToId(id: string, block: ScrollLogicalPosition): void {
  document.getElementById(id)?.scrollIntoView({
    block,
    behavior: reducedMotion() ? "auto" : "smooth",
  });
}

function focusSeat(index: number): void {
  document.querySelectorAll<HTMLButtonElement>(".grok-seat")[index]?.focus({ preventScroll: true });
}

export function useGrokLock(): {
  active: number;
  locked: (typeof grokAgents)[number];
  lockSeat: (index: number, targetId?: string) => void;
  lockFirst: () => void;
} {
  const [active, setActive] = useState(0);
  const locked = grokAgents[active] ?? grokAgents[0];

  const lockSeat = useCallback((index: number, targetId?: string) => {
    setActive(index);
    if (targetId) scrollToId(targetId, "nearest");
  }, []);

  const lockFirst = useCallback(() => {
    setActive(0);
    scrollToId("crew", "start");
    window.setTimeout(() => focusSeat(0), 0);
  }, []);

  return { active, locked, lockSeat, lockFirst };
}
