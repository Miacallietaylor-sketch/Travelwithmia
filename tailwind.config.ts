import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14130F",
        paper: "#FBF8F3",
        "paper-2": "#F3ECDF",
        charcoal: "#3A362E",
        gold: "#B08D57",
        "gold-ink": "#7E6230",
        beige: "#E9DFCC",
        sand: "#D8CBAE",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
        label: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        note: ["var(--font-caveat)", "cursive"],
      },
      maxWidth: {
        content: "1180px",
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,19,15,0.04), 0 12px 30px -18px rgba(20,19,15,0.25)",
        lift: "0 20px 45px -22px rgba(20,19,15,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
