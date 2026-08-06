import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#FAFAF8",
        graphite: "#111312",
        accent: {
          DEFAULT: "#0F5132",
          foreground: "#FAFAF8",
          // Lighter tint of the same hue, used only for text/icons on dark
          // (graphite) backgrounds where the deep accent fails contrast.
          tint: "#3D9970",
        },
        border: "rgba(17, 19, 18, 0.12)",
        "border-dark": "rgba(250, 250, 248, 0.16)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(2.75rem, 7vw, 6rem)",
      },
      lineHeight: {
        tight95: "0.95",
      },
      spacing: {
        section: "8rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 200ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
