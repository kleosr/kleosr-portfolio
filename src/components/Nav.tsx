import type { ReactElement } from "react";
import { githubUrl } from "../content";
import { useActiveSection } from "../hooks/useActiveSection";
import { GrokLink } from "./GrokLink";

const links = [
  { href: "#tools", id: "tools", label: "Tools" },
  { href: "#about", id: "about", label: "About" },
  { href: "#contact", id: "contact", label: "Contact" },
] as const;

export function Nav(): ReactElement {
  const activeSection = useActiveSection();

  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav-logo" href="#top" aria-label="kleosr home">
          kleos<span>r</span>
        </a>
        <div className="nav-primary">
          {links.map((link) => (
            <a
              className={activeSection === link.id ? "nav-link is-active" : "nav-link"}
              href={link.href}
              aria-current={activeSection === link.id ? "location" : undefined}
              key={link.id}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <GrokLink className="nav-link nav-grok" shared />
          <a className="nav-link nav-github" href={githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
