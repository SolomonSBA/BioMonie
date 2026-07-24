import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  /** Same proxy as dev — `vite preview` otherwise POST /api/contact hits the static server. */
  preview: {
    port: 8080,
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
