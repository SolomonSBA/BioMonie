import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "::",
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  /** Same proxy as dev so API calls during preview reach the local Node server. */
  preview: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
