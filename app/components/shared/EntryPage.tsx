"use client";

import Link from "next/link";
import { ContentBox } from "./ContentBox";
import { ImageGallery, type GalleryImage } from "./ImageGallery";
import { LightboxableImage } from "./ImageLightbox";
import { InteractiveMap } from "../MapWrapper";
import type { MapEntry } from "../../../data/mapEntries";

// ═══════════════════════════════════════════════════════════════════════════
// ENTRY PAGE - Reusable vlog/blog layout
// Combines MomentBoxes (ContentBox), Slideshow, ImageGallery, and MapComponent
// Used for Rome page, Weekend Trip detail pages
// ═══════════════════════════════════════════════════════════════════════════

export type MomentEntry = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  label?: string;
  images?: { imageUrl: string; caption?: string }[];
};

export type EntryPageProps = {
  /** Page label (e.g. "Rome · Daily Life", "Weekend Trip") */
  pageLabel: string;
  /** Main title */
  title: string;
  /** Optional subtitle/description */
  description?: string;
  /** Date/location tags */
  tags?: string[];
  /** Moment/activity entries (displayed as ContentBox) */
  moments: MomentEntry[];
  /** Sidebar hero image URL */
  sidebarHeroImage?: string;
  /** Sidebar hero label */
  sidebarHeroLabel?: string;
  /** Sidebar hero description */
  sidebarHeroDescription?: string;
  /** Entries section title */
  entriesTitle?: string;
  /** Sidebar summary title */
  sidebarSummaryTitle?: string;
  /** Sidebar summary text (supports {location} and {count} placeholders) */
  sidebarSummaryTemplate?: string;
  /** Galleries: { title, subtitle, images } */
  galleries?: Array<{
    title: string;
    subtitle?: string;
    images: GalleryImage[];
  }>;
  /** Map entries for this page */
  mapEntries?: MapEntry[];
  /** Map center [lat, lng] */
  mapCenter?: [number, number];
  /** Map zoom level */
  mapZoom?: number;
  /** Map section title */
  mapTitle?: string;
  /** Map section description */
  mapDescription?: string;
  /** Map CTA button text */
  mapCtaButton?: string;
  /** Map CTA href */
  mapCtaHref?: string;
  /** Show detail panel when marker clicked */
  showMapDetailPanel?: boolean;
};

export function EntryPage({
  pageLabel,
  title,
  description,
  tags = [],
  moments,
  sidebarHeroImage,
  sidebarHeroLabel,
  sidebarHeroDescription,
  entriesTitle = "Entries",
  sidebarSummaryTitle,
  sidebarSummaryTemplate,
  galleries = [],
  mapEntries = [],
  mapCenter,
  mapZoom = 12,
  mapTitle,
  mapDescription,
  mapCtaButton,
  mapCtaHref,
  showMapDetailPanel = false
}: EntryPageProps) {
  return (
    <div className="flex flex-col">
      {/* Page header */}
      <section className="section-container border-b border-slate-100">
        <div className="page-header">
          <p className="page-label">{pageLabel}</p>
          <h1 className="page-title">{title}</h1>
          {description && (
            <p className="page-description">{description}</p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main content + sidebar */}
      <section className="section-container bg-box-bg">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            {entriesTitle && (
              <div className="flex items-center justify-between gap-2">
                <h2 className="box-title">{entriesTitle}</h2>
              </div>
            )}
            <div className="space-y-4">
              {moments.map((m) => (
                <ContentBox
                  key={m.id}
                  title={m.title}
                  label={m.label}
                  date={m.date}
                  description={m.description}
                  images={m.images}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {sidebarHeroImage && (
              <div className="image-card">
                <LightboxableImage
                  src={sidebarHeroImage}
                  className="h-44 w-full"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(15,23,42,0.6)), url(${sidebarHeroImage})`
                  }}
                />
                {(sidebarHeroLabel || sidebarHeroDescription) && (
                  <div className="image-card-caption space-y-2">
                    {sidebarHeroLabel && (
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                        {sidebarHeroLabel}
                      </p>
                    )}
                    {sidebarHeroDescription && (
                      <p className="text-sm text-text-secondary">
                        {sidebarHeroDescription}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            {sidebarSummaryTitle && sidebarSummaryTemplate && (
              <div className="content-box space-y-3">
                <h2 className="font-title text-sm font-semibold">{sidebarSummaryTitle}</h2>
                <p className="text-sm text-text-secondary">
                  {sidebarSummaryTemplate
                    .replace("{location}", title)
                    .replace("{count}", String(moments.length))}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image galleries */}
      {galleries.length > 0 && (
        <section className="section-container space-y-6">
          {galleries.map((g) => (
            <ImageGallery
              key={g.title}
              title={g.title}
              subtitle={g.subtitle}
              images={g.images}
            />
          ))}
        </section>
      )}

      {/* Map section */}
      {mapEntries.length > 0 && mapCenter && (
        <section className="section-container border-t border-slate-100 bg-box-bg">
          <div className="space-y-4">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div className="space-y-2">
                {mapTitle && <h2 className="box-title">{mapTitle}</h2>}
                {mapDescription && (
                  <p className="max-w-md text-sm text-text-secondary">
                    {mapDescription}
                  </p>
                )}
              </div>
              {mapCtaButton && mapCtaHref && (
                <Link href={mapCtaHref} className="btn-primary">
                  {mapCtaButton}
                </Link>
              )}
            </div>

            <InteractiveMap
              entries={mapEntries}
              center={mapCenter}
              zoom={mapZoom}
              height="50vh"
              showDetailPanel={showMapDetailPanel}
            />
          </div>
        </section>
      )}
    </div>
  );
}
