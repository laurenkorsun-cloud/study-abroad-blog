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
          className="fixed inset-0 z-[2000] flex cursor-default items-center justify-center bg-black/85 p-4 backdrop-blur-md backdrop-saturate-50"
          role="dialog"
          aria-modal="true"
          aria-label="Full size image"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute right-3 top-3 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/35 bg-black/50 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            className="max-h-[min(92vh,100%)] max-w-[min(96vw,100%)] cursor-default object-contain shadow-2xl"
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
      className={`cursor-default border-0 bg-cover bg-center bg-no-repeat p-0 text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-white/50 ${className}`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        open(src);
      }}
      aria-label={ariaLabel}
    />
  );
}
