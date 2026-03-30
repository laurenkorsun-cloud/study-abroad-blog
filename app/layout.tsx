import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CRITICAL_FALLBACK_CSS } from "./criticalFallbackCss";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { siteMeta } from "../data/siteContent";
import { ibmPlexMono, inter, spaceGrotesk } from "./fonts";

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_FALLBACK_CSS }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} flex min-h-screen flex-col bg-journal-paper font-inter text-slate-900`}
      >
        <ResponsiveLayout>{children}</ResponsiveLayout>
      </body>
    </html>
  );
}

