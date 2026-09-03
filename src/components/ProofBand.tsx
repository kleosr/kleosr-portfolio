import type { ReactElement } from "react";
import { proofCopy } from "../content";
import { proofFigures } from "../data/proof";
import { ProofFigure, SectionHeader } from "./system";

export function ProofBand(): ReactElement | null {
  const figures = proofFigures();
  if (figures.length === 0) return null;

  return (
    <section className="section proof-section" id="proof" aria-labelledby="proof-title">
      <SectionHeader
        kicker={proofCopy.kicker}
        title={proofCopy.title}
        titleId="proof-title"
        code={proofCopy.code}
        reveal
      />
      <ul className="proof-figures" data-reveal>
        {figures.map((figure) => (
          <ProofFigure
            key={figure.label}
            kicker={figure.kicker}
            value={figure.value}
            label={figure.label}
          />
        ))}
      </ul>
    </section>
  );
}
