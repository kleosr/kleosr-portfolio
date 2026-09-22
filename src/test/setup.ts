import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";
import { createRecordingContext } from "./canvas";
import { setMatchMedia } from "./matchMedia";
import { FakeIntersectionObserver, FakeResizeObserver } from "./observers";

function installCanvas(): void {
  HTMLCanvasElement.prototype.getContext = function getContext(id: string) {
    if (id !== "2d") return null;
    return createRecordingContext().context;
  } as HTMLCanvasElement["getContext"];
}

function installScroll(): void {
  Element.prototype.scrollIntoView = function scrollIntoView() {
    return undefined;
  };
  window.scrollTo = () => undefined;
}

function installImageDecode(): void {
  HTMLImageElement.prototype.decode = function decode() {
    return Promise.resolve();
  };
}

function installObservers(): void {
  FakeIntersectionObserver.instances = [];
  FakeResizeObserver.instances = [];
  window.IntersectionObserver = FakeIntersectionObserver;
  window.ResizeObserver = FakeResizeObserver;
}

setMatchMedia();
installObservers();
installCanvas();
installImageDecode();
installScroll();

beforeEach(() => {
  setMatchMedia();
  installObservers();
  installCanvas();
  installImageDecode();
  installScroll();
  document.body.innerHTML = "";
  document.body.className = "";
  window.history.replaceState(null, "", "/");
});

afterEach(() => {
  document.body.innerHTML = "";
});
