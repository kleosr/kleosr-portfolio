import type { AnchorHTMLAttributes, ReactElement, ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean;
  children: ReactNode;
};

export function Link({
  external = false,
  children,
  target,
  rel,
  ...props
}: LinkProps): ReactElement {
  return (
    <a
      {...props}
      target={external ? "_blank" : target}
      rel={external ? "noreferrer" : rel}
    >
      {children}
    </a>
  );
}
