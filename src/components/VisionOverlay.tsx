import { useEffect, useRef, type ReactElement } from "react";
import { OVERLAY_COLOR } from "../vision/draw";
import { attachOverlay } from "../vision/session";

export function VisionOverlay({
  seed = 42,
  color = OVERLAY_COLOR,
  assist = false,
}: {
  seed?: number;
  color?: string;
  assist?: boolean;
}): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return attachOverlay(canvasRef.current, {
      seed,
      color,
      assist,
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, [assist, color, seed]);

  return <canvas className="overlay-canvas" ref={canvasRef} aria-hidden="true" />;
}
