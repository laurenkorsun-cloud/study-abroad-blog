"use client";

import { useIsMobile } from "../hooks/useIsMobile";
import { Header } from "./Header";
import { ImageLightboxProvider } from "./shared/ImageLightbox";

/**
 * App shell for all pages: Header + main. Main has data-viewport so pages
 * and CSS can target mobile vs desktop. Use useIsMobile() in any page when
 * you need to render different UI (e.g. map vs list).
 */
export function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <ImageLightboxProvider>
      <Header />
      <main
        className="flex w-full flex-1 flex-col px-0 py-0"
        data-viewport={isMobile ? "mobile" : "desktop"}
      >
        {children}
      </main>
    </ImageLightboxProvider>
  );
}
