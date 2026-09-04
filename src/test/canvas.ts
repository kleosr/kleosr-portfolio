export type TraceValue = string | number | boolean | null;
export type TraceCall = {
  readonly op: string;
  readonly args: readonly TraceValue[];
  readonly alpha: number;
  readonly stroke: string;
  readonly fill: string;
};

type MutableState = {
  globalAlpha: number;
  strokeStyle: string;
  fillStyle: string;
  lineWidth: number;
  font: string;
  textAlign: string;
  textBaseline: string;
  lineCap: string;
  lineJoin: string;
};

export function createRecordingContext(): {
  context: CanvasRenderingContext2D;
  calls: TraceCall[];
} {
  const calls: TraceCall[] = [];
  const state: MutableState = {
    globalAlpha: 1,
    strokeStyle: "",
    fillStyle: "",
    lineWidth: 1,
    font: "",
    textAlign: "start",
    textBaseline: "alphabetic",
    lineCap: "butt",
    lineJoin: "miter",
  };
  const context = new Proxy(state, {
    get(target, prop) {
      if (prop in target) return target[prop as keyof MutableState];
      return (...args: TraceValue[]) => {
        calls.push({
          op: String(prop),
          args,
          alpha: target.globalAlpha,
          stroke: target.strokeStyle,
          fill: target.fillStyle,
        });
      };
    },
    set(target, prop, value: string | number) {
      const key = String(prop) as keyof MutableState;
      if (key === "globalAlpha" || key === "lineWidth") {
        target[key] = Number(value);
        return true;
      }
      if (
        key === "strokeStyle" ||
        key === "fillStyle" ||
        key === "font" ||
        key === "textAlign" ||
        key === "textBaseline" ||
        key === "lineCap" ||
        key === "lineJoin"
      ) {
        target[key] = String(value);
      }
      return true;
    },
  });
  return { context: context as CanvasRenderingContext2D, calls };
}
