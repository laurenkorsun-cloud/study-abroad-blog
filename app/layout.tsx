import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ResponsiveLayout } from "./components/ResponsiveLayout";
import { siteMeta } from "../data/siteContent";
import { dmSans, fraunces } from "./fonts";

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
      <body
        className={`${dmSans.variable} ${fraunces.variable} flex min-h-screen flex-col bg-journal-paper font-dm text-slate-900`}
      >
        <ResponsiveLayout>{children}</ResponsiveLayout>
      </body>
    </html>
  );
}

