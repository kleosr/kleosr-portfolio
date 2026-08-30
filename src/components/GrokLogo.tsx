import type { ReactElement } from "react";

export function GrokLogo({ className }: { className?: string }): ReactElement {
  return <img className={className} src="/grok-bot-icon.png" alt="" aria-hidden="true" />;
}
