import { useRef, useState, type CSSProperties, type ReactElement } from "react";
import { tools, toolsCopy, type Tool } from "../content";
import { githubRepo, snapshotDay } from "../data/github";
import { useToolOrbit } from "../hooks/useToolOrbit";
import { AnimatedIcon } from "./AnimatedIcon";
import { PosterVisual } from "./PosterVisual";

const slotStep = 360 / tools.length;

function ToolDock({ tool }: { tool: Tool }): ReactElement {
  const record = githubRepo(tool.fullName);

  return (
    <div className="tool-dock">
      <header className="tool-header">
        <div className="tool-title">
          <AnimatedIcon name={tool.icon} />
          <span className="tool-number">{tool.number}</span>
          <h3>
            <a href={tool.href} target="_blank" rel="noreferrer">
              {tool.name}
            </a>
          </h3>
        </div>
      </header>
      <p className="tool-description">{tool.description}</p>
      <ul className="tool-tags" aria-label={`${tool.name} tags`}>
        {tool.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p className="tool-meta">
        <a className="tool-source" href={tool.href} target="_blank" rel="noreferrer">
          {toolsCopy.openSource}
        </a>
        {record ? (
          <data className="tool-stars" value={record.stargazersCount}>
            {record.stargazersCount} {toolsCopy.stars}
          </data>
        ) : null}
      </p>
      {record ? <p className="tool-snapshot">{`${toolsCopy.snapshotKicker} ${snapshotDay()}`}</p> : null}
      {tool.install ? (
        <p className="tool-install">
          <code>{tool.install}</code>
        </p>
      ) : null}
    </div>
  );
}

export function Tools(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useToolOrbit(sectionRef, setActive);
  const tool = tools[active] ?? tools[0];

  return (
    <section ref={sectionRef} className="section tools-section" id="tools" aria-labelledby="tools-title">
      <header className="section-heading" data-reveal>
        <p>{toolsCopy.kicker}</p>
        <div>
          <h2 id="tools-title">{toolsCopy.title}</h2>
          <span className="section-code">{toolsCopy.code}</span>
        </div>
      </header>
      <div className="tool-orbit-hold">
        <div className="tool-orbit">
          <div className="tool-orbit-track" aria-hidden="true" />
          <div className="tool-orbit-ring">
            {tools.map((item, index) => (
              <div
                className="tool-orbit-slot"
                style={{ "--slot": `${index * slotStep}deg` } as CSSProperties}
                key={item.name}
              >
                <div
                  className={item.name === "cursordoctrine" ? "tool-orbit-card is-flipped" : "tool-orbit-card"}
                >
                  <PosterVisual visual={item.visual} index={`PLATE / ${item.number}`} chrome="still" />
                  <span className="tool-orbit-name">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToolDock tool={tool} />
      </div>
    </section>
  );
}
