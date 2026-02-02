"use client";

import { useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// IMAGE GALLERY - Reusable gallery/slideshow component
// Used on: Rome page, Weekend Trip pages, Food page, anywhere with images
// ═══════════════════════════════════════════════════════════════════════════

export interface GalleryImage {
  id: string;
  imageUrl: string;
  title?: string;
  location?: string;
  caption?: string;
  aspect?: "square" | "landscape" | "portrait";
}

interface ImageGalleryProps {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  layout?: "grid" | "slideshow";
  className?: string;
}

function GridGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {images.map((image) => (
        <figure
          key={image.id}
          className={`image-card ${
            image.aspect === "portrait"
              ? "md:row-span-2"
              : image.aspect === "landscape"
                ? "md:col-span-2"
                : ""
          }`}
        >
          <div
            className="h-44 w-full bg-cover bg-center md:h-48"
            style={{ backgroundImage: `url(${image.imageUrl})` }}
          />
          <figcaption className="image-card-caption space-y-1">
            {image.title && (
              <p className="font-medium text-text-primary">{image.title}</p>
            )}
            {image.location && (
              <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
                {image.location}
              </p>
            )}
            {image.caption && (
              <p className="text-xs text-text-secondary">{image.caption}</p>
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function SlideshowGallery({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-box-lg">
      <div className="relative h-[50vh] w-full md:h-[60vh]">
        {images.map((image, idx) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image.imageUrl})` }}
            />
            {(image.title || image.caption) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 to-transparent px-6 py-6">
                {image.title && (
                  <p className="font-medium text-white">{image.title}</p>
                )}
                {image.caption && (
                  <p className="mt-1 text-sm text-slate-200">{image.caption}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Next image"
          >
            →
          </button>
          <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 w-2 rounded-full transition ${
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

export function ImageGallery({
  title,
  subtitle,
  images,
  layout = "grid",
  className = ""
}: ImageGalleryProps) {
  return (
    <section className={`content-box-lg space-y-4 ${className}`}>
      <div className="space-y-1">
        <h2 className="box-title">{title}</h2>
        {subtitle && <p className="box-subtitle">{subtitle}</p>}
      </div>

      {layout === "slideshow" ? (
        <SlideshowGallery images={images} />
      ) : (
        <GridGallery images={images} />
      )}
    </section>
  );
}
