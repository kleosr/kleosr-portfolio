import type { ReactElement, ReactNode } from "react";

type KickerProps = {
  children: ReactNode;
  className?: string;
};

export function Kicker({ children, className }: KickerProps): ReactElement {
  return <p className={className ?? "ds-kicker"}>{children}</p>;
}
