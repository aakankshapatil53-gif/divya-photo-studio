import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C8A24A",
          light: "#DDBE79",
          dark: "#A9812F",
        },
        charcoal: "#1C1C1C",
        warmwhite: "#FAF8F5",
        beige: "#EFE7DA",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -15px rgba(28,28,28,0.15)",
        gold: "0 10px 40px -10px rgba(200,162,74,0.45)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #DDBE79 0%, #C8A24A 50%, #A9812F 100%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s ease forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
