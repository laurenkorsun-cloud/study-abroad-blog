import { IBM_Plex_Mono, Inter, Outfit } from "next/font/google";

/** Primary UI + body — neutral sans */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

/** Titles / display — geometric sans (distinct from body Inter) */
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap"
});

/** Rome kicker — monospace */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap"
});
