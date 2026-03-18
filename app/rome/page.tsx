import Link from "next/link";
import { ContentBox, ImageGallery } from "../components/shared";
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
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="section-container relative">
          <div className="page-header max-w-2xl">
            <p className="page-label">{romePageHeader.label}</p>
            <h1 className="page-title text-3xl md:text-4xl lg:text-5xl">
              {romePageHeader.title}
            </h1>
            <p className="page-description mt-4">{romePageHeader.description}</p>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-24 bg-slate-900" aria-hidden="true" />
        </div>
      </section>

      {/* Entries: floating cards + sticky sidebar */}
      <section className="section-container bg-white">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 className="box-title">{romeEntriesSection.title}</h2>
              {romeEntriesSection.subtitle && romeEntriesSection.subtitle.trim().length > 0 && (
                <span className="text-xs text-text-muted">
                  {romeEntriesSection.subtitle}
                </span>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {romeDailyPosts.map((post, index) => {
                const isFeatured = index % 5 === 0;
                return (
                  <div
                    key={post.id}
                    className={isFeatured ? "sm:col-span-2" : ""}
                  >
                    <div className="h-full rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                      <ContentBox
                        title={post.title}
                        label={post.label}
                        date={post.date}
                        description={post.description}
                        images={post.images}
                        className="!bg-transparent !shadow-none !rounded-2xl"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="image-card overflow-hidden rounded-box-lg shadow-md">
              <div
                className="h-48 bg-cover bg-center transition duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.08), rgba(15,23,42,0.5)), url(${romeSidebar.heroImage})`
                }}
              />
              <div className="image-card-caption space-y-2 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {romeSidebar.heroLabel}
                </p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {romeSidebar.heroDescription}
                </p>
              </div>
            </div>

            <div className="content-box space-y-3 rounded-box-lg shadow-sm">
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
          </aside>
        </div>
      </section>

      {/* Image galleries */}
      <section className="section-container space-y-8 bg-box-bg py-section-lg">
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
      <section className="section-container border-t border-slate-200 bg-white py-section-lg">
        <div className="space-y-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div className="space-y-2">
              <h2 className="box-title">{romeMapSection.title}</h2>
              <p className="max-w-md text-sm text-text-secondary">
                {romeMapSection.description}
              </p>
            </div>
            <Link href={romeMapSection.ctaHref} className="btn-primary shrink-0">
              {romeMapSection.ctaButton}
            </Link>
          </div>

          <div className="overflow-hidden rounded-box-lg border border-slate-200 shadow-sm">
            <InteractiveMap
              entries={romeEntries}
              center={[41.9028, 12.4964]}
              zoom={13}
              height="50vh"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

