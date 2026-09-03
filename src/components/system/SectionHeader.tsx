import type { ReactElement, ReactNode } from "react";
import { Kicker } from "./Kicker";

type SectionHeaderProps = {
  kicker: string;
  title: string;
  titleId?: string;
  code?: string;
  hint?: ReactNode;
  className?: string;
  reveal?: boolean;
  fade?: string;
};

export function SectionHeader({
  kicker,
  title,
  titleId,
  code,
  hint,
  className,
  reveal,
  fade,
}: SectionHeaderProps): ReactElement {
  return (
    <header
      className={className ?? "section-heading"}
      {...(reveal ? { "data-reveal": true } : {})}
      {...(fade ? { "data-grok-fade": fade } : {})}
    >
      <Kicker>{kicker}</Kicker>
      <div>
        <h2 id={titleId}>{title}</h2>
        {code ? <span className="section-code">{code}</span> : null}
        {hint}
      </div>
    </header>
  );
}
