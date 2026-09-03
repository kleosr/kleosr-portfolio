import { useRef, useState, type CSSProperties, type ReactElement } from "react";
import { tools, toolsCopy } from "../content";
import { useToolOrbit } from "../hooks/useToolOrbit";
import { OrbitCard, ToolSpec } from "./ToolSpec";

const slotStep = 360 / tools.length;

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
                <OrbitCard tool={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="tool-dock">
          <ToolSpec tool={tool} variant="dock" />
        </div>
      </div>
    </section>
  );
}
