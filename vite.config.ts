import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: {
        main: new URL("./index.html", import.meta.url).pathname,
        grok: new URL("./grok-bot/index.html", import.meta.url).pathname,
      },
    },
  },
});
