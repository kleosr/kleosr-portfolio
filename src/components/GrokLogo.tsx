import type { ReactElement } from "react";

export function GrokLogo({ className }: { className?: string }): ReactElement {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#f4ecd9" />
      <g fill="#090909" transform="rotate(54.5 21.32 9.14)">
        <rect x="16.27" y="11.05" width="8.64" height="4.14" rx="2.07" />
        <rect x="17.74" y="3.78" width="8.64" height="2.78" rx="1.39" />
      </g>
    </svg>
  );
}
