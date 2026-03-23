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
  /** Feed-style card (e.g. weekend trip moments) — image-first, rounded, “social” header */
  social?: boolean;
  /** Narrow feed card: rounded-2xl, full-bleed image top, meta “label · date” above body */
  variant?: "default" | "feed";
  /**
   * Omit `.content-box` shell (border/bg/shadow) when nesting inside another card.
   * Combine with `className` to tune padding (e.g. `!p-0`) if needed.
   */
  bare?: boolean;
}

function MiniSlideshow({
  images,
  variant = "default"
}: {
  images: ContentBoxImage[];
  /** `feed` = tall portrait-ish ratio for social-style cards */
  variant?: "default" | "feed";
}) {
  const [current, setCurrent] = useState(0);
  const { open } = useImageLightbox();

  if (images.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  const frameClass =
    variant === "feed"
      ? "relative aspect-[4/5] w-full min-h-[220px] overflow-hidden bg-slate-100 sm:min-h-[280px]"
      : "relative aspect-[16/10] overflow-hidden";

  return (
    <div className={frameClass}>
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
  rating,
  social,
  variant = "default",
  bare = false
}: ContentBoxProps) {
  const activeStyles = isActive ? "ring-2 ring-accent-primary bg-white" : "";
  const clickableStyles = onClick ? "cursor-pointer hover:shadow-md transition-shadow" : "";

  const avatarLetter = title.trim().charAt(0).toUpperCase() || "·";

  if (social) {
    return (
      <article
        className={`overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ${activeStyles} ${clickableStyles} ${className}`}
        onClick={onClick}
      >
        {/* Feed header — avatar + meta */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-slate-700 text-sm font-bold text-white shadow-inner"
            aria-hidden="true"
          >
            {avatarLetter}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-title text-sm font-semibold text-slate-900">{title}</p>
            <p className="truncate text-xs text-slate-500">
              {[label, date].filter(Boolean).join(" · ")}
            </p>
          </div>
          <span className="text-lg text-slate-400" aria-hidden="true">
            ···
          </span>
        </div>

        {images && images.length > 0 ? (
          <MiniSlideshow images={images} variant="feed" />
        ) : (
          <div className="flex aspect-[4/5] min-h-[160px] items-center justify-center bg-gradient-to-b from-slate-100 to-slate-50">
            <span className="text-4xl opacity-40" aria-hidden="true">
              ◎
            </span>
          </div>
        )}

        {/* Decorative “actions” — feed affordances (not wired) */}
        <div
          className="flex items-center gap-5 border-b border-slate-100 px-4 py-2.5 text-[1.35rem] leading-none text-slate-600"
          aria-hidden="true"
        >
          <span>♡</span>
          <span>💬</span>
          <span className="ml-auto text-base">↗</span>
        </div>

        <div className="space-y-2 px-4 pb-4 pt-3">
          {description ? (
            <p className="font-inter text-sm leading-relaxed text-slate-800">{description}</p>
          ) : null}

          {typeof rating === "number" && rating >= 0 && rating <= 5 && (
            <div className="flex items-center gap-0.5 pt-1" aria-label={`Rating: ${rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-base ${star <= rating ? "text-amber-400" : "text-slate-300"}`}
                  aria-hidden="true"
                >
                  {star <= rating ? "★" : "☆"}
                </span>
              ))}
              <span className="ml-1 text-xs text-text-muted">{rating}/5</span>
            </div>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-journal-accent hover:text-accent-hover"
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

  if (variant === "feed") {
    return (
      <article
        className={`overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md ${activeStyles} ${clickableStyles} ${className}`}
        onClick={onClick}
      >
        {images && images.length > 0 && (
          <div className="relative w-full overflow-hidden rounded-t-2xl bg-slate-100">
            <MiniSlideshow images={images} />
          </div>
        )}

        <div className="space-y-3 px-4 pb-4 pt-3">
          {(label || date) && (
            <p className="text-xs text-text-muted">
              {[label, date].filter(Boolean).join(" · ")}
            </p>
          )}

          <h3 className="font-title text-base font-semibold text-text-primary md:text-lg">
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
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:text-accent-hover"
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

  const outerShell = bare
    ? `bg-transparent ${activeStyles} ${clickableStyles} ${className}`.trim()
    : `content-box ${activeStyles} ${clickableStyles} ${className}`.trim();

  const Shell = bare ? "div" : "article";

  return (
    <Shell className={outerShell} onClick={onClick}>
      {images && images.length > 0 && (
        <div
          className={
            bare
              ? "mb-4 w-full overflow-hidden"
              : "-mx-box-padding -mt-box-padding mb-4 overflow-hidden rounded-t-box"
          }
        >
          <MiniSlideshow images={images} />
        </div>
      )}

      <div className={`space-y-3 ${bare ? "px-4 pb-4 pt-1" : ""}`}>
        {(label || date) && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted">
            {label && (
              <p className="uppercase tracking-[0.18em]">{label}</p>
            )}
            {date && <p>{date}</p>}
          </div>
        )}

        <h3 className="font-title text-base font-semibold text-text-primary md:text-lg">
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
    </Shell>
  );
}
