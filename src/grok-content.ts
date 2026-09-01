import type { Tool } from "./content";

export type GrokAgent = {
  number: string;
  name: string;
  role: string;
  channel: string;
};

export const grokHeroVisual = {
  src: "/images/grok-bot-hero.png",
  alt: "Grok Bot sculpture in a kleosr command bay",
  agent: "GROK_BOT",
  status: "BAY / ONLINE",
  code: ["crew: 7", "scope: session", "tree: clean"],
} satisfies Tool["visual"];

export const grokBayVisual = {
  src: "/images/grok-bot-bay.png",
  alt: "Grok Bot head tracked in the mission bay",
  agent: "AGENT_BAY",
  status: "CREW / LOCKED",
  code: ["channel: flight", "handoff: owned", "tree: clean"],
} satisfies Tool["visual"];

export const grokAgents: readonly GrokAgent[] = [
  { number: "01", name: "Chief of Staff", role: "Routes the mission and owns every handoff.", channel: "COMMAND" },
  { number: "02", name: "CTO", role: "Sets technical direction, standards, and security.", channel: "VECTOR" },
  { number: "03", name: "Principal Architect", role: "Defines boundaries before implementation begins.", channel: "FLIGHT" },
  { number: "04", name: "Lead Engineer", role: "Builds the work and keeps the repository healthy.", channel: "BUILD" },
  { number: "05", name: "QA / Bug Hunter", role: "Finds regressions and proves the repair.", channel: "VERIFY" },
  { number: "06", name: "Product Designer", role: "Shapes the interaction and visual system.", channel: "DESIGN" },
  { number: "07", name: "DevOps", role: "Keeps builds, releases, and environments reliable.", channel: "LAUNCH" },
];

export function grokAgentIndex(current: number, key: string): number | null {
  const last = grokAgents.length - 1;
  if (key === "ArrowDown" || key === "ArrowRight") return Math.min(last, current + 1);
  if (key === "ArrowUp" || key === "ArrowLeft") return Math.max(0, current - 1);
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
}
