export type ToolIcon = "shield" | "memory" | "verify";

export type Tool = {
  number: string;
  name: string;
  fullName: string;
  description: string;
  tags: readonly string[];
  icon: ToolIcon;
  visual: {
    src: string;
    alt: string;
    agent: string;
    status: string;
    code: readonly string[];
  };
  href: string;
  install?: string;
};

export type CatalogPack = {
  number: string;
  name: string;
  fullName: string;
  description: string;
  tags: readonly string[];
  href: string;
};

export const tools: readonly Tool[] = [
  {
    number: "01",
    name: "cursordoctrine",
    fullName: "kleosr/cursordoctrine",
    description:
      "Cursor hook pack: doctrine at session start, Step 0 hard gate on writes, shell deny-list without force-push, and one final review at stop.",
    tags: ["Hooks", "JavaScript", "Cursor"],
    icon: "shield",
    visual: {
      src: "/images/tool-doctrine-guardian.png",
      alt: "Line-art Greek guardian framed by technical construction marks",
      agent: "AGENT_01",
      status: "SHELL_GUARD / ACTIVE",
      code: ["beforeShell()", "scope: repository", "verdict: allow"],
    },
    href: "https://github.com/kleosr/cursordoctrine",
  },
  {
    number: "02",
    name: "cursorkleosr",
    fullName: "kleosr/cursorkleosr",
    description: "One always-on Cursor rule plus root markdown state.",
    tags: ["Memory", "Markdown", "Cursor"],
    icon: "memory",
    visual: {
      src: "/images/tool-memory-bust.png",
      alt: "Classical memory bust surrounded by state diagrams",
      agent: "AGENT_02",
      status: "MEMORY / SYNCED",
      code: ["PROJECT.md", "NOW.md", "state: current"],
    },
    href: "https://github.com/kleosr/cursorkleosr",
    install: "git clone https://github.com/kleosr/cursorkleosr.git",
  },
  {
    number: "03",
    name: "veredicto",
    fullName: "kleosr/veredicto",
    description:
      "Agent-native TypeScript checker. Batch-verify candidate patches against a live project session and get structured JSON back.",
    tags: ["Verification", "TypeScript", "Node"],
    icon: "verify",
    visual: {
      src: "/images/tool-veredicto-judge.png",
      alt: "Classical judge and scale integrated with a verification diagram",
      agent: "AGENT_03",
      status: "VERDICT / PASS",
      code: ['"valid": true', '"risk": "low"', '"exit": 0'],
    },
    href: "https://github.com/kleosr/veredicto",
    install: "npm install -g veredicto",
  },
];

export const catalog: readonly CatalogPack[] = [
  {
    number: "04",
    name: "kleosrules",
    fullName: "kleosr/kleosrules",
    description: "Cursor harness pack. User Rules, companions, skills, Bash hooks, local NOW.md memory.",
    tags: ["Hooks", "Bash", "Cursor"],
    href: "https://github.com/kleosr/kleosrules",
  },
  {
    number: "05",
    name: "orangesor-cursortheme",
    fullName: "kleosr/orangesor-cursortheme",
    description: "Orange-accented color theme for VS Code and Cursor.",
    tags: ["Theme", "VS Code", "Cursor"],
    href: "https://github.com/kleosr/orangesor-cursortheme",
  },
  {
    number: "06",
    name: "PE2-CLI",
    fullName: "kleosr/PE2-CLI",
    description: "Drop in a rough prompt. Get back a PE2-structured prompt you can ship.",
    tags: ["CLI", "Rust", "Prompts"],
    href: "https://github.com/kleosr/PE2-CLI",
  },
];

export const toolsCopy = {
  kicker: "01 / INDEX",
  title: "Tools",
  code: `KLSR.PUBLIC_WORK / ${String(tools.length).padStart(4, "0")}`,
  openSource: "Open source",
  stars: "stars",
  snapshotKicker: "GH / SNAPSHOT",
} as const;

export const catalogCopy = {
  kicker: `CATALOG / ${String(catalog.length).padStart(4, "0")}`,
  title: "Index",
  snapshotKicker: "GH / SNAPSHOT",
} as const;

export const proofCopy = {
  kicker: "02 / LEDGER",
  title: "Proof",
  code: "KLSR.LEDGER / SOURCE",
  featuredStars: "Featured stars",
  packs: "Public packs",
  seats: "Crew seats",
  snapshotKicker: "GH / SNAPSHOT",
  packsKicker: "PACKS / LIST",
  seatsKicker: "GROK / CONTENT",
} as const;

export const githubUrl = "https://github.com/kleosr";

export const productPackCount = tools.length + catalog.length;

export const aboutCopy = {
  kicker: "03 / PROFILE",
  title: "About",
  code: "OPERATOR / KLEOSR",
  lead: `${productPackCount} public packs.`,
  name: "I am kleosr. I am a Cursor Ambassador.",
  body: "I care about agents that remember the project, stay inside the repo, and do not wreck the tree. The public work is hooks, session memory, a TypeScript checker, a harness pack, a theme, and a prompt CLI.",
  close: "When I am not in the editor I am still in the same problem: make the next session cheaper than the last one.",
} as const;

export const contactCopy = {
  kicker: "04 / SIGNAL",
  title: "Contact",
  code: "KLSR.CHANNEL / 0001",
  link: "GitHub",
  after: " is the door until email is listed.",
  ready: "EXTERNAL_LINK / READY",
} as const;
