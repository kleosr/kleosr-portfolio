type AnchorKind = "point" | "cross" | "square";

export type OverlayAnchor = {
  x: number;
  y: number;
  kind: AnchorKind;
  size: number;
};

export type OverlayConnection = {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  alpha: number;
};

export type OverlayLabel = {
  x: number;
  y: number;
  text: string;
  align: "left" | "right";
};

export type OverlayBracket = {
  x: number;
  y: number;
  size: number;
};

export type OverlayBox = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
};

export type FrameOverlay = {
  anchors: OverlayAnchor[];
  lines: OverlayConnection[];
  labels: OverlayLabel[];
  brackets: OverlayBracket[];
  boxes: OverlayBox[];
};
