import { useRef, type ReactElement } from "react";
import { aboutCopy, contactCopy, githubUrl } from "../content";
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
          <p>{aboutCopy.kicker}</p>
          <div>
            <h2 id="about-title">{aboutCopy.title}</h2>
            <span className="section-code">{aboutCopy.code}</span>
          </div>
        </header>
        <div className="about-body">
          <div className="about-spec" aria-hidden="true" data-reveal>
            <VisionOverlay seed={11} color="#12110f" assist />
            <span>AMBASSADOR / 01</span>
            <strong>K</strong>
            <i />
            <small>
              01001011
              <br />
              01001100
              <br />
              01000101
              <br />
              01001111
            </small>
          </div>
          <div className="about-copy">
            <p className="about-type" data-type={aboutCopy.lead}>
              {aboutCopy.lead}
            </p>
            <p data-reveal>{aboutCopy.name}</p>
            <p data-reveal>{aboutCopy.body}</p>
            <p data-reveal>{aboutCopy.close}</p>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <header className="section-heading" data-reveal>
          <p>{contactCopy.kicker}</p>
          <div>
            <h2 id="contact-title">{contactCopy.title}</h2>
            <span className="section-code">{contactCopy.code}</span>
          </div>
        </header>
        <p className="contact-copy" data-reveal>
          <a className="contact-github" href={githubUrl} target="_blank" rel="noreferrer">
            <small>{contactCopy.ready}</small>
            <span>
              {contactCopy.link}
              <AnimatedIcon name="arrow" />
            </span>
          </a>
          {contactCopy.after}
        </p>
      </section>
    </>
  );
}
