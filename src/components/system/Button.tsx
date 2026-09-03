import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, type = "button", ...props }: ButtonProps): ReactElement {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
