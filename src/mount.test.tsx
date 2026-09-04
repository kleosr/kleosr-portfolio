import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { mountRoot } from "./mount";

describe("mountRoot", () => {
  it("throws when #root is missing", () => {
    expect(() => mountRoot(createElement("div"))).toThrow("Root element is missing");
  });

  it("renders into #root", () => {
    const root = document.createElement("div");
    root.id = "root";
    document.body.append(root);
    const tree = mountRoot(createElement("p", null, "hello"));
    expect(root.textContent).toContain("hello");
    tree.unmount();
  });
});
