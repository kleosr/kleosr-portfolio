import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GrokPage } from "./components/GrokPage";
import "./styles/grok-app.css";

const root = document.getElementById("root");

if (!root) throw new Error("Root element is missing");

createRoot(root).render(
  <StrictMode>
    <GrokPage />
  </StrictMode>,
);
