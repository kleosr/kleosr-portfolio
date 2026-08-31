export type ToolIcon = "shield" | "memory" | "verify";

export type Tool = {
  number: string;
  name: string;
  year: number;
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
};

export const tools: readonly Tool[] = [
  {
    number: "01",
    name: "cursordoctrine",
    year: 2026,
    description: "Ten Cursor hooks for doctrine, scope, shell guards, and a final review.",
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
    year: 2026,
    description: "Local skill plus two markdown files for project facts and live task state.",
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
  },
  {
    number: "03",
    name: "veredicto",
    year: 2026,
    description: "TypeScript checker. Patches in, JSON verdicts out.",
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
  },
];

export const githubUrl = "https://github.com/kleosr";
