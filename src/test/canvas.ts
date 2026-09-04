type TraceValue = string | number | boolean | null;
export type TraceCall = {
  readonly op: string;
  readonly args: readonly TraceValue[];
  readonly alpha: number;
  readonly stroke: string;
  readonly fill: string;
  readonly lineWidth: number;
  readonly font: string;
  readonly textAlign: string;
  readonly textBaseline: string;
  readonly lineCap: string;
  readonly lineJoin: string;
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

function snapshot(state: MutableState, op: string, args: readonly TraceValue[]): TraceCall {
  return {
    op,
    args,
    alpha: state.globalAlpha,
    stroke: state.strokeStyle,
    fill: state.fillStyle,
    lineWidth: state.lineWidth,
    font: state.font,
    textAlign: state.textAlign,
    textBaseline: state.textBaseline,
    lineCap: state.lineCap,
    lineJoin: state.lineJoin,
  };
}

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
        calls.push(snapshot(target, String(prop), args));
      };
    },
    set(target, prop, value: string | number) {
      const key = String(prop) as keyof MutableState;
      if (key === "globalAlpha" || key === "lineWidth") {
        target[key] = Number(value);
        calls.push(snapshot(target, `set:${key}`, [Number(value)]));
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
        calls.push(snapshot(target, `set:${key}`, [String(value)]));
      }
      return true;
    },
  });
  return { context: context as CanvasRenderingContext2D, calls };
}
