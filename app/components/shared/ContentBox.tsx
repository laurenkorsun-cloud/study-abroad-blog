"use client";

import { useState } from "react";
import { useImageLightbox } from "./ImageLightbox";

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
  /** Optional: external link URL (e.g. Airbnb listing). Shown as a clickable link at the bottom. */
  link?: string;
  /** Optional: label for the link, e.g. "View on Airbnb" */
  linkLabel?: string;
  /** Optional: rating out of 5, displayed as star graphics (e.g. for accommodation) */
  rating?: number;
}

function MiniSlideshow({ images }: { images: ContentBoxImage[] }) {
  const [current, setCurrent] = useState(0);
  const { open } = useImageLightbox();

  if (images.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      {images.map((image, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-500 ${
            idx === current
              ? "z-[1] opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <button
            type="button"
            className="h-full w-full cursor-default border-0 bg-cover bg-center bg-no-repeat p-0"
            style={{ backgroundImage: `url(${image.imageUrl})` }}
            onClick={(e) => {
              e.stopPropagation();
              open(image.imageUrl);
            }}
            aria-label={image.caption ? `View full image: ${image.caption}` : "View full image"}
          />
          {image.caption && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent px-4 py-3">
              <p className="text-xs text-white md:text-sm">{image.caption}</p>
            </div>
          )}
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-900 shadow-md transition hover:bg-white"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-900 shadow-md transition hover:bg-white"
            aria-label="Next image"
          >
            →
          </button>
          <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(idx);
                }}
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
  isActive,
  link,
  linkLabel,
  rating
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

        <h3 className="font-helvetica text-base font-semibold text-text-primary md:text-lg">
          {title}
        </h3>

        {typeof rating === "number" && rating >= 0 && rating <= 5 && (
          <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-lg ${star <= rating ? "text-amber-400" : "text-slate-300"}`}
                aria-hidden="true"
              >
                {star <= rating ? "★" : "☆"}
              </span>
            ))}
            <span className="ml-1.5 text-sm text-text-muted">{rating}/5</span>
          </div>
        )}

        {description && (
          <p className="text-sm leading-relaxed text-text-secondary md:text-base">
            {description}
          </p>
        )}

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:text-accent-hover"
            onClick={(e) => e.stopPropagation()}
          >
            {linkLabel ?? "View listing"}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}
