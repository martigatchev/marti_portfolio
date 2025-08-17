// src/app/fonts.tsx

import { Inter, Bebas_Neue } from "next/font/google";
// or use next/font/local if you buy Druk:
// import localFont from "next/font/local";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const display = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// If you buy Druk (or similar), do this instead:
// export const display = localFont({
//   src: [{ path: "./fonts/DrukCondensed-Super.woff2", weight: "900" }],
//   variable: "--font-display",
//   display: "swap",
// });
