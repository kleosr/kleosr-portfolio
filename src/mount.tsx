import { StrictMode, type ReactElement } from "react";
import { createRoot, type Root } from "react-dom/client";

export function mountRoot(node: ReactElement): Root {
  const root = document.getElementById("root");
  if (!root) throw new Error("Root element is missing");
  const tree = createRoot(root);
  tree.render(<StrictMode>{node}</StrictMode>);
  return tree;
}
