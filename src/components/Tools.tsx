import type { ReactElement } from "react";
import { tools, type Tool } from "../content";
import { AnimatedIcon } from "./AnimatedIcon";
import { PosterVisual } from "./PosterVisual";

function ToolBody({ tool }: { tool: Tool }): ReactElement {
  return (
    <>
      <PosterVisual visual={tool.visual} index={`PLATE / ${tool.number}`} />
      <div className="tool-copy">
        <header className="tool-header">
          <div className="tool-title">
            <AnimatedIcon name={tool.icon} />
            <h3>
              <span>{tool.number}</span>
              {tool.name}
            </h3>
          </div>
          <span className="tool-year">{tool.year}</span>
        </header>
        <p className="tool-description">{tool.description}</p>
        <ul className="tool-tags" aria-label={`${tool.name} tags`}>
          {tool.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="tool-readout" aria-hidden="true">
          <span>{tool.visual.agent}</span>
          <span>OPEN / SOURCE</span>
        </div>
      </div>
    </>
  );
}

export function Tools(): ReactElement {
  return (
    <section className="section tools-section" id="tools" aria-labelledby="tools-title">
      <header className="section-heading" data-reveal>
        <p>01 / INDEX</p>
        <div>
          <h2 id="tools-title">Tools</h2>
          <span className="section-code">KLSR.PUBLIC_WORK / 0005</span>
        </div>
      </header>
      <div className="tool-list">
        {tools.map((tool) =>
          tool.href ? (
            <a
              className="tool-card"
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              data-reveal
              key={tool.name}
            >
              <ToolBody tool={tool} />
            </a>
          ) : (
            <article className="tool-card" data-reveal key={tool.name}>
              <ToolBody tool={tool} />
            </article>
          ),
        )}
      </div>
    </section>
  );
}
