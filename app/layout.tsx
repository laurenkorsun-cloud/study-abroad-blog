import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "Semester Abroad | Travel Journal",
  description: "Personal travel blog documenting a semester studying abroad."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-5xl flex-1 px-4 py-8 md:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}

