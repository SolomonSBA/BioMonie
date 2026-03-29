import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/contact": "http://localhost:3000",
    },
  },
  /** Same proxy as dev — `vite preview` otherwise POST /contact hits the static server and fails. */
  preview: {
    port: 8080,
    proxy: {
      "/contact": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
