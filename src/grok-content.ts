import type { Tool } from "./content";

export type GrokAgent = {
  number: string;
  name: string;
  role: string;
  owns: string;
  channel: string;
};

export const grokAgents: readonly GrokAgent[] = [
  {
    number: "01",
    name: "Chief of Staff",
    role: "Routes the mission and owns every handoff.",
    owns: "Mission brief and handoffs",
    channel: "COMMAND",
  },
  {
    number: "02",
    name: "CTO",
    role: "Sets technical direction, standards, and security.",
    owns: "Stack, standards, security",
    channel: "VECTOR",
  },
  {
    number: "03",
    name: "Principal Architect",
    role: "Defines boundaries before implementation begins.",
    owns: "System boundaries",
    channel: "FLIGHT",
  },
  {
    number: "04",
    name: "Lead Engineer",
    role: "Builds the work and keeps the repository healthy.",
    owns: "The working tree",
    channel: "BUILD",
  },
  {
    number: "05",
    name: "QA / Bug Hunter",
    role: "Finds regressions and proves the repair.",
    owns: "Regression proof",
    channel: "VERIFY",
  },
  {
    number: "06",
    name: "Product Designer",
    role: "Shapes the interaction and visual system.",
    owns: "Interaction and visual system",
    channel: "DESIGN",
  },
  {
    number: "07",
    name: "DevOps",
    role: "Keeps builds, releases, and environments reliable.",
    owns: "Build and release path",
    channel: "LAUNCH",
  },
];

export const crewSeatCount = grokAgents.length;

export const grokCopy = {
  lead: `${crewSeatCount} agents behind my Cursor sessions. Each one owns a seat.`,
  crewKicker: "[ 01 / FLIGHT CREW ]",
  crewTitle: `${crewSeatCount} agents. Clear ownership.`,
  crewHint: "Arrow keys move the lock.",
} as const;

export const grokHeroVisual = {
  src: "/images/grok-bot-hero.png",
  alt: "Grok Bot sculpture in a kleosr command bay",
  agent: "GROK_BOT",
  status: "BAY / ONLINE",
  code: [`crew: ${crewSeatCount}`, "scope: session", "tree: clean"],
} satisfies Tool["visual"];

export const grokBayVisual = {
  src: "/images/grok-bot-bay.png",
  alt: "Grok Bot head tracked in the mission bay",
  agent: "AGENT_BAY",
  status: "CREW / LOCKED",
  code: ["channel: flight", "handoff: owned", "tree: clean"],
} satisfies Tool["visual"];

export function grokAgentIndex(current: number, key: string): number | null {
  const last = grokAgents.length - 1;
  if (key === "ArrowDown" || key === "ArrowRight") return Math.min(last, current + 1);
  if (key === "ArrowUp" || key === "ArrowLeft") return Math.max(0, current - 1);
  if (key === "Home") return 0;
  if (key === "End") return last;
  return null;
}
