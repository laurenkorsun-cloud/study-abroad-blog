import Link from "next/link";
import { ContentBox, ImageGallery, LightboxableImage } from "../components/shared";
import { InteractiveMap } from "../components/MapWrapper";
import { getAllEntries } from "../../data/mapEntries";
import {
  type RomePageHeader,
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
// ROME PAGE — Typographic “naked” modern hero + content from romeContent
// ═══════════════════════════════════════════════════════════════════════════

export default function RomePage() {
  const romeEntries = getAllEntries().filter(
    (entry) =>
      entry.latitude > 41.8 &&
      entry.latitude < 42.0 &&
      entry.longitude > 12.4 &&
      entry.longitude < 12.6
  );

  const header: RomePageHeader = romePageHeader;

  return (
    <div className="flex flex-col bg-white">
      {/* Hero — white, minimal, typography-led */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <span
            className="font-helvetica text-[clamp(14rem,40vw,28rem)] font-bold leading-none tracking-tighter text-slate-200/50"
            aria-hidden="true"
          >
            {header.watermark}
          </span>
        </div>

        <div className="section-container relative z-10 flex min-h-[min(85vh,52rem)] flex-col items-center justify-center px-6 pt-20 pb-16 text-center md:px-10 md:pt-24 md:pb-20">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-slate-300 md:w-12" aria-hidden="true" />
              <p className="font-mono-kicker text-[11px] font-medium tracking-[0.35em] text-slate-500 md:text-xs">
                {header.kicker}
              </p>
              <span className="h-px w-8 bg-slate-300 md:w-12" aria-hidden="true" />
            </div>

            <h1 className="font-helvetica text-[clamp(2.25rem,8vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-slate-900">
              {header.title}
            </h1>
          </div>

          <div className="mt-24 flex flex-col items-center gap-6 md:mt-36 md:gap-8 lg:mt-44">
            <Link
              href={header.primaryCta.href}
              className="font-inter text-xs font-semibold uppercase tracking-[0.28em] text-slate-900 underline decoration-slate-400 decoration-1 underline-offset-[10px] transition hover:text-slate-600"
            >
              {header.primaryCta.label}
            </Link>
            <Link
              href={header.secondaryCta.href}
              className="font-inter text-xs font-semibold uppercase tracking-[0.28em] text-slate-900 underline decoration-slate-400 decoration-1 underline-offset-[10px] transition hover:text-slate-600"
            >
              {header.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section id="rome-entries" className="section-container border-t border-slate-100 bg-white">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-helvetica text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
                {romeEntriesSection.title}
              </h2>
              {romeEntriesSection.subtitle && romeEntriesSection.subtitle.trim().length > 0 && (
                <span className="font-inter text-xs text-text-muted">{romeEntriesSection.subtitle}</span>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {romeDailyPosts.map((post, index) => {
                const isFeatured = index % 5 === 0;
                return (
                  <div key={post.id} className={isFeatured ? "sm:col-span-2" : ""}>
                    <div className="h-full rounded-sm border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md">
                      <ContentBox
                        title={post.title}
                        label={post.label}
                        date={post.date}
                        description={post.description}
                        images={post.images}
                        className="!bg-transparent !shadow-none !rounded-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-sm border border-slate-200/80 bg-white shadow-sm">
              <LightboxableImage
                src={romeSidebar.heroImage}
                className="h-48 w-full cursor-zoom-in transition duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.08), rgba(15,23,42,0.5)), url(${romeSidebar.heroImage})`
                }}
                ariaLabel="View sidebar image full size"
              />
              <div className="space-y-2 px-5 py-4">
                <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {romeSidebar.heroLabel}
                </p>
                <p className="font-inter text-sm leading-relaxed text-text-secondary">
                  {romeSidebar.heroDescription}
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-sm border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-helvetica text-sm font-semibold">{romeSidebar.videoTitle}</h2>
                <span className="font-inter text-[11px] text-text-muted">{uiStrings.comingSoon}</span>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-sm bg-slate-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-text-primary text-white shadow-lg">
                    ▶
                  </div>
                  <p className="font-inter text-xs font-medium text-text-primary">
                    {romeSidebar.videoPlaceholderTitle}
                  </p>
                  <p className="font-inter text-[11px] text-text-muted">
                    {romeSidebar.videoPlaceholderDescription}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Image galleries */}
      <section className="section-container space-y-8 border-t border-slate-100 bg-white py-section-lg">
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
      <section className="section-container border-t border-slate-100 bg-white py-section-lg">
        <div className="space-y-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div className="space-y-2">
              <h2 className="font-helvetica text-base font-semibold text-slate-900">{romeMapSection.title}</h2>
              <p className="font-inter max-w-md text-sm text-text-secondary">{romeMapSection.description}</p>
            </div>
            <Link href={romeMapSection.ctaHref} className="btn-primary shrink-0">
              {romeMapSection.ctaButton}
            </Link>
          </div>

          <div className="overflow-hidden rounded-sm border border-slate-200 shadow-sm">
            <InteractiveMap entries={romeEntries} center={[41.9028, 12.4964]} zoom={13} height="50vh" />
          </div>
        </div>
      </section>
    </div>
  );
}
