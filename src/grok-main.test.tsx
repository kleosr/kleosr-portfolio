import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  mountRoot: vi.fn(),
}));

vi.mock("./mount", () => ({
  mountRoot: mocks.mountRoot,
}));

vi.mock("./styles/grok-app.css", () => ({}));
vi.mock("./components/GrokPage", () => ({
  GrokPage: () => null,
}));

describe("grok entry", () => {
  beforeEach(() => {
    mocks.mountRoot.mockReset();
    vi.resetModules();
  });

  it("mounts the grok page", async () => {
    await import("./grok-main");
    expect(mocks.mountRoot).toHaveBeenCalledOnce();
  });
});
