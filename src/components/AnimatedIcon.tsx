import type { ReactElement } from "react";
import type { ToolIcon } from "../content";

type IconName = ToolIcon | "arrow";

function IconPaths({ name }: { name: IconName }): ReactElement {
  switch (name) {
    case "shield":
      return (
        <>
          <path className="icon-shell" d="M12 3 19 6v5c0 4.8-2.8 8-7 10-4.2-2-7-5.2-7-10V6l7-3Z" />
          <path className="icon-mark" d="m8.5 12 2.2 2.2 4.8-5" />
        </>
      );
    case "memory":
      return (
        <>
          <circle className="icon-shell" cx="12" cy="12" r="3.5" />
          <path className="icon-orbit" d="M3 12c0-2.5 4-4.5 9-4.5s9 2 9 4.5-4 4.5-9 4.5-9-2-9-4.5Z" />
          <path className="icon-orbit icon-orbit-y" d="M12 3c2.5 0 4.5 4 4.5 9s-2 9-4.5 9-4.5-4-4.5-9S9.5 3 12 3Z" />
        </>
      );
    case "verify":
      return (
        <>
          <path className="icon-bracket" d="M8 4H5v16h3M16 4h3v16h-3" />
          <path className="icon-mark" d="m8.5 12 2.2 2.2 4.8-5" />
        </>
      );
    case "theme":
      return (
        <>
          <path className="icon-shell" d="M5 20h14M7 18h10M8 7v11M12 7v11M16 7v11M6 5h12L12 2 6 5Z" />
          <path className="icon-scan" d="M4 12h16" />
        </>
      );
    case "research":
      return (
        <>
          <circle className="icon-shell" cx="12" cy="12" r="8" />
          <path className="icon-orbit" d="M12 2v20M2 12h20" />
          <path className="icon-needle" d="m14.8 9.2-1.6 4-4 1.6 1.6-4 4-1.6Z" />
        </>
      );
    case "arrow":
      return (
        <>
          <path className="icon-arrow-line" d="M5 12h14" />
          <path className="icon-arrow-head" d="m14 7 5 5-5 5" />
        </>
      );
  }

  const _exhaustive: never = name;
  return _exhaustive;
}

export function AnimatedIcon({ name }: { name: IconName }): ReactElement {
  return (
    <svg
      className={`animated-icon animated-icon-${name}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <IconPaths name={name} />
    </svg>
  );
}
