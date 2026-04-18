import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#1e1b4b",
        },
        home: {
          bg: "#080C10",
          surface: "#0D1117",
          "surface-elevated": "#161B22",
          border: "#21262D",
          primary: "#F97316",
          glow: "rgba(249, 115, 22, 0.15)",
          "text-primary": "#E6EDF3",
          "text-secondary": "#8B949E",
          "text-accent": "#F97316",
          "syntax-green": "#3FB950",
          "syntax-blue": "#58A6FF",
          "syntax-purple": "#BC8CFF"
        }
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "var(--font-geist-mono)", "monospace"],
        display: ["var(--font-syne)", "sans-serif"],
        ui: ["var(--font-dm-sans)", "sans-serif"]
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
        rotateBorder: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        }
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        fadeIn: "fadeIn 0.4s ease forwards",
        drift: "drift 4s linear infinite",
        "rotate-border": "rotateBorder 3s ease infinite",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("@tailwindcss/typography"),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("tailwindcss-animate"),
  ],
};

export default config;
