"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode
} from "react";

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE LIGHTBOX — click any photo to view full size (site-wide)
// Wrap the app with ImageLightboxProvider (see ResponsiveLayout).
// ═══════════════════════════════════════════════════════════════════════════

type LightboxContextValue = {
  open: (url: string) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [url, setUrl] = useState<string | null>(null);

  const open = useCallback((u: string) => {
    if (u) setUrl(u);
  }, []);

  const close = useCallback(() => setUrl(null), []);

  useEffect(() => {
    if (!url) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [url]);

  useEffect(() => {
    if (!url) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [url, close]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {url && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Full size image"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Close
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            className="max-h-[min(92vh,100%)] max-w-[min(96vw,100%)] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </LightboxContext.Provider>
  );
}

export function useImageLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useImageLightbox must be used within ImageLightboxProvider");
  }
  return ctx;
}

/** Full-area button styled as a cover image; opens `src` in the lightbox. */
export function LightboxableImage({
  src,
  className = "",
  style,
  ariaLabel = "View full image"
}: {
  src: string;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}) {
  const { open } = useImageLightbox();
  return (
    <button
      type="button"
      className={`border-0 bg-cover bg-center bg-no-repeat p-0 text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-white/50 ${className}`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        open(src);
      }}
      aria-label={ariaLabel}
    />
  );
}
