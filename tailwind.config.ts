import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        biomonie: {
          teal: "#295C72",
          "teal-dark": "#0f1e26",
          "teal-mid": "#1a3d4f",
          "teal-light": "#3a7a96",
          lemon: "#F5FF00",
          lemon2: "#E2FF02",
          pale: "#EBF3F7",
          card: "#f5fafb",
          muted: "#5a7a8a",
          text: "#0f1e26",
        },
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "monospace"],
        serif: ['"Source Serif 4"', "Georgia", "ui-serif", "serif"],
      },
      boxShadow: {
        "biomonie-sm": "0 4px 24px rgba(15, 30, 38, 0.06)",
        "biomonie-md": "0 12px 40px rgba(41, 92, 114, 0.1)",
        "biomonie-nav": "0 8px 32px rgba(15, 30, 38, 0.25)",
        "biomonie-cta": "0 4px 20px rgba(245, 255, 0, 0.22)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
