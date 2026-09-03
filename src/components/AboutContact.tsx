import { useRef, type ReactElement } from "react";
import { aboutCopy, contactCopy, githubUrl } from "../content";
import { useAboutType } from "../hooks/useAboutType";
import { AnimatedIcon } from "./AnimatedIcon";
import { Link, SectionHeader } from "./system";
import { VisionOverlay } from "./VisionOverlay";

export function AboutContact(): ReactElement {
  const aboutRef = useRef<HTMLElement>(null);
  useAboutType(aboutRef);

  return (
    <>
      <section ref={aboutRef} className="section about-section" id="about" aria-labelledby="about-title">
        <SectionHeader
          kicker={aboutCopy.kicker}
          title={aboutCopy.title}
          titleId="about-title"
          code={aboutCopy.code}
          reveal
        />
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
              01001101
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
        <SectionHeader
          kicker={contactCopy.kicker}
          title={contactCopy.title}
          titleId="contact-title"
          code={contactCopy.code}
          reveal
        />
        <p className="contact-copy" data-reveal>
          <Link className="contact-github" href={githubUrl} external>
            <small>{contactCopy.ready}</small>
            <span>
              {contactCopy.link}
              <AnimatedIcon name="arrow" />
            </span>
          </Link>
          {contactCopy.after}
        </p>
      </section>
    </>
  );
}
