import type { ReactElement } from "react";
import type { Tool } from "../content";
import { githubUrl, heroCopy } from "../content";
import { ActionLink, Kicker } from "./HomeUi";
import { PosterVisual } from "./PosterVisual";

const heroVisual = {
  src: "/images/kleosr-hero-guardian.png",
  alt: "Roman cavalry guardian approaching an orange agent command interface",
  agent: "AGENT_00",
  status: "SESSION / ASSIGNED",
  code: ["repo: ./current", "scope: bounded", "tree: clean"],
} satisfies Tool["visual"];

export function Hero(): ReactElement {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-coordinate" aria-hidden="true">
          <span>41.9028° N</span>
          <span>12.4964° E</span>
        </div>
        <Kicker bar data-reveal>
          {heroCopy.kicker}
        </Kicker>
        <h1 id="hero-title" data-reveal>
          kleos<span>r</span>
        </h1>
        <p className="hero-headline" data-reveal>
          {heroCopy.headline}
        </p>
        <div className="hero-actions" data-reveal>
          <ActionLink href="#tools" tone="primary">
            {heroCopy.primary}
          </ActionLink>
          <ActionLink href={githubUrl} tone="ghost" external>
            {heroCopy.secondary}
          </ActionLink>
        </div>
      </div>

      <figure className="hero-visual" data-reveal>
        <PosterVisual visual={heroVisual} index="PLATE / 00" priority />
      </figure>

      <p className="hero-support" data-reveal>
        {heroCopy.support}
      </p>
    </section>
  );
}
