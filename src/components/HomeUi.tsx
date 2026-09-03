import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export function Kicker({
  children,
  bar = false,
  ...props
}: {
  children: ReactNode;
  bar?: boolean;
} & HTMLAttributes<HTMLParagraphElement>): ReactElement {
  return (
    <p className="eyebrow" {...props}>
      {bar ? <span aria-hidden="true" /> : null}
      {children}
    </p>
  );
}

export function IndexMark({
  value,
  className = "index-mark",
}: {
  value: string;
  className?: string;
}): ReactElement {
  return <span className={className}>{value}</span>;
}

export function ActionLink({
  href,
  tone,
  children,
  external = false,
}: {
  href: string;
  tone: "primary" | "ghost";
  children: ReactNode;
  external?: boolean;
}): ReactElement {
  return (
    <a
      className={`action action-${tone}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
