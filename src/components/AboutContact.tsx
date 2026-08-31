import { useRef, type ReactElement } from "react";
import { githubUrl } from "../content";
import { useAboutType } from "../hooks/useAboutType";
import { AnimatedIcon } from "./AnimatedIcon";
import { VisionOverlay } from "./VisionOverlay";

export function AboutContact(): ReactElement {
  const aboutRef = useRef<HTMLElement>(null);
  useAboutType(aboutRef);

  return (
    <>
      <section ref={aboutRef} className="section about-section" id="about" aria-labelledby="about-title">
        <header className="section-heading" data-reveal>
          <p>02 / PROFILE</p>
          <div>
            <h2 id="about-title">About</h2>
            <span className="section-code">OPERATOR / KLEOSR</span>
          </div>
        </header>
        <div className="about-body">
          <div className="about-spec" aria-hidden="true" data-reveal>
            <VisionOverlay seed={11} color="#12110f" assist />
            <span>AMBASSADOR / 01</span>
            <strong>K</strong>
            <i />
            <small>01001011<br />01001100<br />01000101<br />01001111</small>
          </div>
          <div className="about-copy">
            <p className="about-type" data-type="Four public tools.">
              Four public tools.
            </p>
            <p data-reveal>I am kleosr. I am a Cursor Ambassador.</p>
            <p data-reveal>
              I care about agents that remember the project, stay inside the repo, and do not wreck
              the tree. The public work is hooks, scope files, session memory, a TypeScript checker
              that answers in JSON, and themes for long nights.
            </p>
            <p data-reveal>
              When I am not in the editor I am still in the same problem: make the next session
              cheaper than the last one.
            </p>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <header className="section-heading" data-reveal>
          <p>03 / SIGNAL</p>
          <div>
            <h2 id="contact-title">Contact</h2>
            <span className="section-code">KLSR.CHANNEL / 0001</span>
          </div>
        </header>
        <p className="contact-copy" data-reveal>
          <a className="contact-github" href={githubUrl} target="_blank" rel="noreferrer">
            <small>EXTERNAL_LINK / READY</small>
            <span>
              GitHub
              <AnimatedIcon name="arrow" />
            </span>
          </a>{" "}
          is the door until email is listed.
        </p>
      </section>
    </>
  );
}
