import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0c",
        surface: "#121217",
        "surface-2": "#16161d",
        "surface-3": "#1b1b24",
        border: "#27272a",
        accent: {
          DEFAULT: "#3b82f6",
          soft: "rgba(59, 130, 246, 0.12)",
        },
        coral: {
          DEFAULT: "#ff6d5a",
          soft: "rgba(255, 109, 90, 0.12)",
        },
        ink: {
          DEFAULT: "#fafafa",
          secondary: "#a1a1aa",
          muted: "#6b6b76",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        "accent-glow": "0 0 0 1px rgba(59,130,246,0.25), 0 12px 40px -12px rgba(59,130,246,0.4)",
        "coral-glow": "0 0 0 1px rgba(255,109,90,0.25), 0 12px 40px -12px rgba(255,109,90,0.4)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
