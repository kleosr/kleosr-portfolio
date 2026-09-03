import type { ReactElement, ReactNode } from "react";

export function GrokKicker({ children }: { children: ReactNode }): ReactElement {
  return <p className="grok-kicker">{children}</p>;
}

export function GrokIndex({ value }: { value: string }): ReactElement {
  return <span className="grok-index">{value}</span>;
}

type GrokControlProps = {
  children: ReactNode;
  tone?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  external?: boolean;
};

export function GrokControl({
  children,
  tone = "ghost",
  href,
  onClick,
  external = false,
}: GrokControlProps): ReactElement {
  const className = `grok-control grok-control-${tone}`;
  if (href) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
