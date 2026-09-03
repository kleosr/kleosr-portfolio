import type { ReactElement } from "react";

type IndexProps = {
  value: string;
  className?: string;
};

export function Index({ value, className }: IndexProps): ReactElement {
  return <span className={className ?? "ds-index"}>{value}</span>;
}
