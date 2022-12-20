import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup.js",
    coverage: {
      provider: "c8",
      statements: 100,
      branches: 100,
      reporter: ["text", "json", "html"],
    },
  },
});
