import type { Tool } from "./content";

export type GrokAgent = {
  number: string;
  name: string;
  role: string;
  channel: string;
  owns: readonly string[];
  anti: string;
};

export const grokAgents: readonly GrokAgent[] = [
  {
    number: "01",
    name: "Chief of Staff",
    role: "Routes the mission and owns every handoff.",
    channel: "COMMAND",
    owns: ["Who is on point", "Handoff between seats", "When the mission is blocked"],
    anti: "Does not implement.",
  },
  {
    number: "02",
    name: "CTO",
    role: "Sets technical direction, standards, and security.",
    channel: "VECTOR",
    owns: ["Stack calls", "Security constraints", "What we will not add"],
    anti: "Does not paint UI.",
  },
  {
    number: "03",
    name: "Principal Architect",
    role: "Defines boundaries before implementation begins.",
    channel: "FLIGHT",
    owns: ["Module edges", "What is in scope", "What waits"],
    anti: "Does not merge under pressure.",
  },
  {
    number: "04",
    name: "Lead Engineer",
    role: "Builds the work and keeps the repository healthy.",
    channel: "BUILD",
    owns: ["The diff", "Types", "Tree cleanliness"],
    anti: "Does not skip the checker.",
  },
  {
    number: "05",
    name: "QA / Bug Hunter",
    role: "Finds regressions and proves the repair.",
    channel: "VERIFY",
    owns: ["Repro", "Failing case", "Proof the fix holds"],
    anti: "Does not ship on vibe.",
  },
  {
    number: "06",
    name: "Product Designer",
    role: "Shapes the interaction and visual system.",
    channel: "DESIGN",
    owns: ["Layout contract", "Tokens", "Motion that earns its keep"],
    anti: "Does not add a second aesthetic.",
  },
  {
    number: "07",
    name: "DevOps",
    role: "Keeps builds, releases, and environments reliable.",
    channel: "LAUNCH",
    owns: ["pnpm build", "Surge", "Env that can fail the build"],
    anti: "Does not force-push main.",
  },
];

export const crewSeatCount = grokAgents.length;

export function crewAt(index: number): GrokAgent {
  return grokAgents.at(index) ?? grokAgents[0];
}

export const grokCopy = {
  lead: `${crewSeatCount} agents behind my Cursor sessions. Each one owns a seat.`,
  crewKicker: "01 / Flight crew",
  crewTitle: `${crewSeatCount} agents. Clear ownership.`,
  crewHint: "Arrow keys move the lock.",
} as const;

export const grokPlateCopy = {
  plate: "PLATE / GB",
  seat: "SEAT",
  owns: "OWNS",
  anti: "ANTI",
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
