import { useRef, type ReactElement } from "react";
import { grokCopy } from "../grok-content";
import { useGrokLock } from "../hooks/useGrokLock";
import { useGrokMotion } from "../hooks/useGrokMotion";
import { GrokClose } from "./GrokClose";
import { GrokCrew } from "./GrokCrew";
import { GrokHero } from "./GrokHero";
import { GrokMissions } from "./GrokMissions";

export function GrokPage(): ReactElement {
  const pageRef = useRef<HTMLDivElement>(null);
  const { active, locked, lockSeat, lockFirst } = useGrokLock();
  useGrokMotion(pageRef);

  return (
    <div className="grok-page" ref={pageRef}>
      <a className="skip-link" href="#crew">
        Skip to flight crew
      </a>
      <div className="grain" aria-hidden="true" />

      <header className="grok-nav">
        <a className="grok-brand" href="/" aria-label="Back to kleosr">
          kleos<span>r</span>
        </a>
        <span>{`[ ${grokCopy.navMark} ]`}</span>
        <a className="grok-jump" href="#crew">
          {`[ ${grokCopy.crewJump} ]`}
        </a>
      </header>

      <main id="mission">
        <GrokHero onLockFirst={lockFirst} />
        <GrokCrew active={active} locked={locked} onLock={lockSeat} />
        <GrokMissions active={active} onLock={(index) => lockSeat(index, "bay")} />
        <GrokClose onLockFirst={lockFirst} />
      </main>

      <footer className="grok-footer">
        <span>{`[ ${grokCopy.footerMark} ]`}</span>
        <span>{grokCopy.footerRev}</span>
      </footer>
    </div>
  );
}
