import { DM_Sans, Fraunces, IBM_Plex_Mono, Inter, Oswald } from "next/font/google";

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

/** Navigation + “naked” modern UI */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

/** Rome hero — tight display sans */
export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap"
});

/** Rome kicker — monospace */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap"
});
