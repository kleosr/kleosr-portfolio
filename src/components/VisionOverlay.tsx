import { useEffect, useRef, type ReactElement } from "react";
import { drawOverlay } from "../vision/draw";
import { overlayAt } from "../vision/scene";
import type { FrameOverlay } from "../vision/types";

const ANALYSIS_MS = 125;

export function VisionOverlay({
  seed = 42,
  color = "#e85a2a",
  assist = false,
}: {
  seed?: number;
  color?: string;
  assist?: boolean;
}): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    if (!canvas || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let overlay: FrameOverlay = overlayAt(0, seed);
    let lastBucket = -1;
    let snapshot = 0;
    let visible = false;
    let raf = 0;

    const paint = (now: number) => {
      const box = stage.getBoundingClientRect();
      if (box.width < 2 || box.height < 2) return;
      const bucket = Math.floor(now / ANALYSIS_MS);
      if (bucket !== lastBucket) {
        overlay = overlayAt(bucket * 180, seed);
        snapshot = now;
        lastBucket = bucket;
      }
      const alpha = reduced ? 1 : Math.min(1, 0.48 + (now - snapshot) / 90);
      drawOverlay(canvas, overlay, box.width, box.height, { alpha, color, assist });
    };

    const loop = (now: number) => {
      if (!visible) return;
      paint(now);
      raf = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduced || raf) {
        paint(performance.now());
        return;
      }
      visible = true;
      raf = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      visible = false;
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) start();
      else stop();
    });
    io.observe(stage);
    const resize = new ResizeObserver(() => paint(performance.now()));
    resize.observe(stage);
    paint(0);

    return () => {
      stop();
      io.disconnect();
      resize.disconnect();
    };
  }, [assist, color, seed]);

  return <canvas className="overlay-canvas" ref={canvasRef} aria-hidden="true" />;
}
