import type { ReactElement } from "react";
import { proofCopy } from "../content";
import { proofFigures } from "../data/proof";

export function ProofBand(): ReactElement | null {
  const figures = proofFigures();
  if (figures.length === 0) return null;

  return (
    <section className="section proof-section" id="proof" aria-labelledby="proof-title">
      <header className="section-heading" data-reveal>
        <p>{proofCopy.kicker}</p>
        <div>
          <h2 id="proof-title">{proofCopy.title}</h2>
          <span className="section-code">{proofCopy.code}</span>
        </div>
      </header>
      <ul className="proof-figures" data-reveal>
        {figures.map((figure) => (
          <li className="proof-figure" key={figure.label}>
            <p>{figure.kicker}</p>
            <data value={figure.value}>{figure.value}</data>
            <h3>{figure.label}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
