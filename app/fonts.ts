import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

/** Primary UI + body — neutral sans */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

/** Titles / display — geometric sans (distinct from Inter body) */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

/** Rome kicker — monospace */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap"
});
