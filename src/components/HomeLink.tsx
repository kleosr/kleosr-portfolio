import type { MouseEvent, ReactElement, ReactNode } from "react";

function returnHome(event: MouseEvent<HTMLAnchorElement>): void {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  if (window.history.length < 2) return;

  event.preventDefault();
  window.history.back();
}

export function HomeLink({
  className,
  children,
  "aria-label": ariaLabel,
}: {
  className: string;
  children: ReactNode;
  "aria-label"?: string;
}): ReactElement {
  return (
    <a className={className} href="/" aria-label={ariaLabel} onClick={returnHome}>
      {children}
    </a>
  );
}
