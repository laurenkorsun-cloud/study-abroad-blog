"use client";

import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// MOMENT BOX / CONTENT BOX - Reusable box for blog posts, moments, notes
// Displays: title, date/location, text, optional image slideshow
// Faded grey background, adjustable sizing via data
// Used on: Rome page, Weekend Trip pages, anywhere you need a content card
// ═══════════════════════════════════════════════════════════════════════════

export interface ContentBoxImage {
  imageUrl: string;
  caption?: string;
}

export interface ContentBoxProps {
  title: string;
  description?: string;
  label?: string;
  date?: string;
  images?: ContentBoxImage[];
  className?: string;
  /** Optional click handler for making the whole card clickable (used in timelines) */
  onClick?: () => void;
  /** When true, visually highlight the card as the active timeline entry */
  isActive?: boolean;
}

function MiniSlideshow({ images }: { images: ContentBoxImage[] }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      {images.map((image, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image.imageUrl})` }}
          />
          {image.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent px-4 py-3">
              <p className="text-xs text-white md:text-sm">{image.caption}</p>
            </div>
          )}
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-900 shadow-md transition hover:bg-white"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-900 shadow-md transition hover:bg-white"
            aria-label="Next image"
          >
            →
          </button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  idx === current ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ContentBox({
  title,
  description,
  label,
  date,
  images,
  className = "",
  onClick,
  isActive
}: ContentBoxProps) {
  const activeStyles = isActive ? "ring-2 ring-accent-primary bg-white" : "";
  const clickableStyles = onClick ? "cursor-pointer hover:shadow-md transition-shadow" : "";

  return (
    <article
      className={`content-box ${activeStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {images && images.length > 0 && (
        <div className="-mx-box-padding -mt-box-padding mb-4 overflow-hidden rounded-t-box">
          <MiniSlideshow images={images} />
        </div>
      )}

      <div className="space-y-3">
        {(label || date) && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted">
            {label && (
              <p className="uppercase tracking-[0.18em]">{label}</p>
            )}
            {date && <p>{date}</p>}
          </div>
        )}

        <h3 className="text-base font-semibold text-text-primary md:text-lg">
          {title}
        </h3>

        {description && (
          <p className="text-sm leading-relaxed text-text-secondary md:text-base">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}
