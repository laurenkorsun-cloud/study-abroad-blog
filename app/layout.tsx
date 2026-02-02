import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { siteMeta } from "../data/siteContent";

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-slate-900">
        <Header />
        <main className="flex w-full flex-1 flex-col px-0 py-0">
          {children}
        </main>
      </body>
    </html>
  );
}

