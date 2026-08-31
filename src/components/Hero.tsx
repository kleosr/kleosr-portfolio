import type { ReactElement } from "react";
import type { Tool } from "../content";
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
        <p className="eyebrow" data-reveal>
          <span aria-hidden="true" />
          Cursor ambassador
        </p>
        <h1 id="hero-title" data-reveal>
          kleos<span>r</span>
        </h1>
        <p className="hero-headline" data-reveal>
          Tools for Cursor sessions that have to live in a real repo.
        </p>
        <p className="hero-support" data-reveal>
          Harnesses and checkers for people who run agents in a real repo, not a demo.
        </p>
      </div>

      <figure className="hero-visual" data-reveal>
        <PosterVisual visual={heroVisual} index="PLATE / 00" priority />
        <figcaption>
          <span>MYTH / MACHINE</span>
          <span>BUILD 2026.08</span>
        </figcaption>
      </figure>
    </section>
  );
}
