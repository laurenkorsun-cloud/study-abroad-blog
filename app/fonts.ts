import { IBM_Plex_Mono, Inter } from "next/font/google";

/** Primary UI + headings — simple, neutral sans */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

/** Rome kicker — monospace */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap"
});
