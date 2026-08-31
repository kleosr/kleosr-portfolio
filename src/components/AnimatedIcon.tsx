import type { ReactElement } from "react";
import type { ToolIcon } from "../content";

type IconName = ToolIcon | "arrow";

function IconPaths({ name }: { name: IconName }): ReactElement {
  switch (name) {
    case "shield":
      return (
        <>
          <path className="icon-spine" d="M12 7v14" />
          <path
            className="icon-shell"
            d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
          />
        </>
      );
    case "memory":
      return (
        <>
          <path className="icon-fold" d="M20 7h-3a2 2 0 0 1-2-2V2" />
          <path
            className="icon-shell"
            d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"
          />
          <path className="icon-back" d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
        </>
      );
    case "verify":
      return (
        <>
          <path className="icon-pan" d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path className="icon-pan" d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path className="icon-beam" d="M12 3v18M7 21h10M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </>
      );
    case "theme":
      return (
        <>
          <path
            className="icon-shell"
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.12-.29-.29-.44-.65-.44-1.13A1.64 1.64 0 0 1 14.45 16h2c3.05 0 5.55-2.5 5.55-5.55C22 6.01 17.46 2 12 2z"
          />
          <circle className="icon-dot" cx="8.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
          <circle className="icon-dot" cx="6.5" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle className="icon-dot" cx="13.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          <circle className="icon-dot" cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
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
