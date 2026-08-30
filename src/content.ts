export type ToolIcon = "shield" | "memory" | "verify" | "theme" | "research";

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
  href?: string;
};

export const tools: readonly Tool[] = [
  {
    number: "01",
    name: "cursordoctrine",
    year: 2026,
    description: "Ten Cursor hooks for doctrine, scope, shell guards, and a final review.",
    tags: ["Hooks", "Author", "JavaScript", "Cursor hooks"],
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
    tags: ["Memory", "Author", "Markdown", "Cursor skill"],
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
    description:
      "TypeScript checker for agents. Candidate patches in, JSON verdicts out. Install with npm install -g veredicto.",
    tags: ["Verification", "Author", "TypeScript", "Node"],
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
  {
    number: "04",
    name: "orangesor",
    year: 2025,
    description: "Dark editor theme with warm orange accents. Readable diffs, calm nights. On VSX.",
    tags: ["Theme", "Author", "VS Code theme", "JSON"],
    icon: "theme",
    visual: {
      src: "/images/tool-orangesor-column.png",
      alt: "Greek columns intersected by orange editor diff lines",
      agent: "AGENT_04",
      status: "THEME / LOADED",
      code: ["+ readable diff", "- visual noise", "night: calm"],
    },
    href: "https://github.com/kleosr/orangesor-cursortheme",
  },
  {
    number: "05",
    name: "Semantic Intent",
    year: 2026,
    description: "Preprint on keeping developer intent when LLM tools rewrite code. No new benchmarks.",
    tags: ["Research", "Author", "Preprint"],
    icon: "research",
    visual: {
      src: "/images/tool-semantic-geometry.png",
      alt: "Classical scholar inside a geometric research construction",
      agent: "AGENT_05",
      status: "INTENT / RETAINED",
      code: ["input: intent", "rewrite: bounded", "output: faithful"],
    },
  },
];

export const githubUrl = "https://github.com/kleosr";
