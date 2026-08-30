import type { ReactElement } from "react";
import { GrokLogo } from "./GrokLogo";

export function GrokLink({
  className,
  shared = false,
}: {
  className: string;
  shared?: boolean;
}): ReactElement {
  return (
    <a className={className} href="/grok-bot/">
      <span className={shared ? "grok-lockup" : undefined}>
        <GrokLogo className="grok-link-logo" />
        Grok Bot
      </span>
    </a>
  );
}
