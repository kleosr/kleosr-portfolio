import type { Tool } from "./content";

export const grokHeroVisual = {
  src: "/images/grok-bot-hero.png",
  alt: "Grok Bot sculpture in a kleosr command bay",
  agent: "GROK_BOT",
  status: "BAY / ONLINE",
  code: ["crew: 7", "scope: session", "public: building"],
} satisfies Tool["visual"];

export const grokBayVisual = {
  src: "/images/grok-bot-bay.png",
  alt: "Grok Bot head tracked in the mission bay",
  agent: "AGENT_BAY",
  status: "CREW / LOCKED",
  code: ["channel: flight", "handoff: owned", "tree: clean"],
} satisfies Tool["visual"];

export const grokAgents = [
  ["01", "Chief of Staff", "Routes the mission and owns every handoff.", "COMMAND"],
  ["02", "CTO", "Sets technical direction, standards, and security.", "VECTOR"],
  ["03", "Principal Architect", "Defines boundaries before implementation begins.", "FLIGHT"],
  ["04", "Lead Engineer", "Builds the work and keeps the repository healthy.", "BUILD"],
  ["05", "QA / Bug Hunter", "Finds regressions and proves the repair.", "VERIFY"],
  ["06", "Product Designer", "Shapes the interaction and visual system.", "DESIGN"],
  ["07", "DevOps", "Keeps builds, releases, and environments reliable.", "LAUNCH"],
] as const;
