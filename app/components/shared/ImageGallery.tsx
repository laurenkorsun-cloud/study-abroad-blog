"use client";

import { useState } from "react";
import { useImageLightbox } from "./ImageLightbox";

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
  const { open } = useImageLightbox();
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
          <button
            type="button"
            className="h-44 w-full cursor-default border-0 bg-cover bg-center bg-no-repeat p-0 md:h-48"
            style={{ backgroundImage: `url(${image.imageUrl})` }}
            onClick={() => open(image.imageUrl)}
            aria-label={image.title ? `View full image: ${image.title}` : "View full image"}
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
  const { open } = useImageLightbox();

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <div className="relative overflow-hidden rounded-box-lg">
      <div className="relative h-[50vh] w-full md:h-[60vh]">
        {images.map((image, idx) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current
                ? "z-[1] opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <button
              type="button"
              className="h-full w-full cursor-default border-0 bg-cover bg-center bg-no-repeat p-0"
              style={{ backgroundImage: `url(${image.imageUrl})` }}
              onClick={() => open(image.imageUrl)}
              aria-label={image.title ? `View full image: ${image.title}` : "View full image"}
            />
            {(image.title || image.caption) && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 to-transparent px-6 py-6">
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
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
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
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Next image"
          >
            →
          </button>
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
            {images.map((_, idx) => (
              <button
                type="button"
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(idx);
                }}
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
