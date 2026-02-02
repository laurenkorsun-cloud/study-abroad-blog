import Link from "next/link";
import { ContentBox, ImageGallery, type GalleryImage } from "../components/shared";
import { InteractiveMap } from "../components/MapWrapper";
import { getAllEntries } from "../../data/mapEntries";
import {
  romePageHeader,
  romeEntriesSection,
  romeDailyPosts,
  romeSidebar,
  romeGalleryRoma,
  romeGalleryApartment,
  romeGalleriesSection,
  romeMapSection
} from "../../data/romeContent";
import { uiStrings } from "../../data/siteContent";

// ═══════════════════════════════════════════════════════════════════════════
// ROME PAGE - All content from data/romeContent.ts
// ═══════════════════════════════════════════════════════════════════════════

export default function RomePage() {
  const romeEntries = getAllEntries().filter(
    (entry) =>
      entry.latitude > 41.8 &&
      entry.latitude < 42.0 &&
      entry.longitude > 12.4 &&
      entry.longitude < 12.6
  );

  return (
    <div className="flex flex-col">
      {/* Page header */}
      <section className="section-container border-b border-slate-100">
        <div className="page-header">
          <p className="page-label">{romePageHeader.label}</p>
          <h1 className="page-title">{romePageHeader.title}</h1>
          <p className="page-description">{romePageHeader.description}</p>
        </div>
      </section>

      {/* Blog entries and sidebar */}
      <section className="section-container bg-box-bg">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="box-title">{romeEntriesSection.title}</h2>
              <span className="text-xs text-text-muted">
                {romeEntriesSection.subtitle}
              </span>
            </div>
            <div className="space-y-4">
              {romeDailyPosts.map((post) => (
                <ContentBox
                  key={post.id}
                  title={post.title}
                  label={post.label}
                  date={post.date}
                  description={post.description}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="image-card">
              <div
                className="h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(15,23,42,0.6)), url(${romeSidebar.heroImage})`
                }}
              />
              <div className="image-card-caption space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {romeSidebar.heroLabel}
                </p>
                <p className="text-sm text-text-secondary">
                  {romeSidebar.heroDescription}
                </p>
              </div>
            </div>

            <div className="content-box space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold">{romeSidebar.videoTitle}</h2>
                <span className="text-[11px] text-text-muted">
                  {uiStrings.comingSoon}
                </span>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-box bg-slate-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-text-primary text-white shadow-lg">
                    ▶
                  </div>
                  <p className="text-xs font-medium text-text-primary">
                    {romeSidebar.videoPlaceholderTitle}
                  </p>
                  <p className="text-[11px] text-text-muted">
                    {romeSidebar.videoPlaceholderDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image galleries */}
      <section className="section-container space-y-6">
        <ImageGallery
          title={romeGalleriesSection.roma.title}
          subtitle={romeGalleriesSection.roma.subtitle}
          images={romeGalleryRoma}
        />

        <ImageGallery
          title={romeGalleriesSection.apartment.title}
          subtitle={romeGalleriesSection.apartment.subtitle}
          images={romeGalleryApartment}
        />
      </section>

      {/* Map section */}
      <section className="section-container border-t border-slate-100 bg-box-bg">
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div className="space-y-2">
              <h2 className="box-title">{romeMapSection.title}</h2>
              <p className="max-w-md text-sm text-text-secondary">
                {romeMapSection.description}
              </p>
            </div>
            <Link href={romeMapSection.ctaHref} className="btn-primary">
              {romeMapSection.ctaButton}
            </Link>
          </div>

          <InteractiveMap
            entries={romeEntries}
            center={[41.9028, 12.4964]}
            zoom={13}
            height="50vh"
          />
        </div>
      </section>
    </div>
  );
}
