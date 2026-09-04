import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  mountRoot: vi.fn(),
}));

vi.mock("./mount", () => ({
  mountRoot: mocks.mountRoot,
}));

vi.mock("./styles/app.css", () => ({}));
vi.mock("./App", () => ({
  App: () => null,
}));

describe("main entry", () => {
  beforeEach(() => {
    mocks.mountRoot.mockReset();
    vi.resetModules();
  });

  it("mounts the site", async () => {
    await import("./main");
    expect(mocks.mountRoot).toHaveBeenCalledOnce();
  });
});
