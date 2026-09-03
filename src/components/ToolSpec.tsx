import type { ReactElement } from "react";
import { toolsCopy, type Tool } from "../content";
import { githubRepo, snapshotDay } from "../data/github";
import { AnimatedIcon } from "./AnimatedIcon";
import { PosterVisual } from "./PosterVisual";

export function ToolSpec({
  tool,
  variant,
}: {
  tool: Tool;
  variant: "dock" | "card";
}): ReactElement {
  const record = githubRepo(tool.fullName);
  const name =
    variant === "dock" ? (
      <a className="tool-title-link" href={tool.href} target="_blank" rel="noreferrer">
        {tool.name}
      </a>
    ) : (
      tool.name
    );

  return (
    <div className={`tool-spec tool-spec-${variant}`}>
      <header className="tool-header">
        <div className="tool-title">
          {variant === "dock" ? <AnimatedIcon name={tool.icon} /> : null}
          <span className="tool-number">{tool.number}</span>
          <h3>{name}</h3>
        </div>
      </header>
      <p className="tool-description">{tool.description}</p>
      <ul className="tool-tags" aria-label={`${tool.name} tags`}>
        {tool.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p className="tool-meta">
        {variant === "dock" ? (
          <a className="tool-source" href={tool.href} target="_blank" rel="noreferrer">
            {toolsCopy.openSource}
          </a>
        ) : null}
        {record ? (
          <data className="tool-stars" value={record.stargazersCount}>
            {record.stargazersCount} {toolsCopy.stars}
          </data>
        ) : null}
      </p>
      {record ? <p className="tool-snapshot">{`${toolsCopy.snapshotKicker} ${snapshotDay()}`}</p> : null}
      {variant === "dock" && tool.install ? (
        <p className="tool-install">
          <code>{tool.install}</code>
        </p>
      ) : null}
    </div>
  );
}

export function OrbitCard({ tool }: { tool: Tool }): ReactElement {
  const flipped = tool.name === "cursordoctrine";

  return (
    <a
      className={flipped ? "tool-orbit-card is-flipped" : "tool-orbit-card"}
      href={tool.href}
      target="_blank"
      rel="noreferrer"
      aria-label={tool.name}
    >
      <PosterVisual visual={tool.visual} index={`PLATE / ${tool.number}`} chrome="still" />
      <ToolSpec tool={tool} variant="card" />
    </a>
  );
}
