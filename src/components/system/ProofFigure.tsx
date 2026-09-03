import type { ReactElement } from "react";
import { Kicker } from "./Kicker";

type ProofFigureProps = {
  kicker: string;
  value: number;
  label: string;
};

export function ProofFigure({ kicker, value, label }: ProofFigureProps): ReactElement {
  return (
    <li className="proof-figure">
      <Kicker>{kicker}</Kicker>
      <data value={value}>{value}</data>
      <h3>{label}</h3>
    </li>
  );
}
