import { productPackCount, proofCopy, tools } from "../content";
import { crewSeatCount } from "../grok-content";
import * as github from "./github";

export type ProofFigure = {
  label: string;
  value: number;
  kicker: string;
};

export function proofFigures(): readonly ProofFigure[] {
  const figures: ProofFigure[] = [];
  const stars = github.featuredStarTotal(tools.map((tool) => tool.fullName));
  if (stars !== null) {
    figures.push({
      label: proofCopy.featuredStars,
      value: stars,
      kicker: `${proofCopy.snapshotKicker} ${github.snapshotDay()}`,
    });
  }
  figures.push({
    label: proofCopy.packs,
    value: productPackCount,
    kicker: proofCopy.packsKicker,
  });
  figures.push({
    label: proofCopy.seats,
    value: crewSeatCount,
    kicker: proofCopy.seatsKicker,
  });
  return figures;
}
