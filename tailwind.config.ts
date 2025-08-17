// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./src/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Body default (your Inter variable)
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Display face for headings/nav
        display: ["var(--font-display)", "var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-.04em",
      },
    },
  },
  plugins: [],
};

export default config;
