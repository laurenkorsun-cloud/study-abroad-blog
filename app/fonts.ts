import { DM_Sans, Fraunces } from "next/font/google";

/** Used on home cover variants for softer, less “default system” typography */
export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap"
});
