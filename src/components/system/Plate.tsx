import type { ReactElement, ReactNode } from "react";
import type { Tool } from "../../content";
import { PosterVisual } from "../PosterVisual";

type PlateAspect = "4:3" | "4:5";
type PlateChrome = "full" | "still";

type PlateProps = {
  visual: Tool["visual"];
  index: string;
  meta?: string;
  aspect?: PlateAspect;
  priority?: boolean;
  chrome?: PlateChrome;
  scanline?: boolean;
  className?: string;
  figcaption?: ReactNode;
  children?: ReactNode;
  id?: string;
  fade?: string;
  reveal?: boolean;
};

export function Plate({
  visual,
  index,
  meta,
  aspect = "4:3",
  priority = false,
  chrome = "full",
  scanline = false,
  className,
  figcaption,
  children,
  id,
  fade,
  reveal,
}: PlateProps): ReactElement {
  const aspectClass = aspect === "4:5" ? " plate-aspect-45" : "";

  return (
    <figure
      className={`${className ?? "ds-plate"}${aspectClass}`}
      id={id}
      {...(fade ? { "data-grok-fade": fade } : {})}
      {...(reveal ? { "data-reveal": true } : {})}
    >
      <PosterVisual
        visual={visual}
        index={index}
        meta={meta}
        priority={priority}
        chrome={chrome}
        scanline={scanline}
      />
      {children}
      {figcaption}
    </figure>
  );
}
