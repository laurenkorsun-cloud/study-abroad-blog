"use client";

import Link from "next/link";
import type { MapEntry } from "../../../data/mapEntries";
import { InteractiveMap } from "../MapWrapper";
import { LightboxableImage } from "../shared/ImageLightbox";

type HomeHero = {
  label: string;
  title: string;
  description: string;
  backgroundImage: string;
  primaryButton: string;
  primaryButtonHref: string;
  secondaryButton: string;
  secondaryButtonHref: string;
};

type HomeSection = {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
};

type HomeMapPreview = {
  label: string;
  title: string;
  description: string;
  ctaButton: string;
  ctaHref: string;
};

type HomeCoverProps = {
  hero: HomeHero;
  sections: HomeSection[];
  mapPreview: HomeMapPreview;
  entries: MapEntry[];
};

/** Map block — journal: paper tone, teal accents, minimal frame */
function MapPreviewSection({
  mapPreview,
  entries
}: {
  mapPreview: HomeMapPreview;
  entries: MapEntry[];
}) {
  return (
    <section className="section-container border-t border-slate-200/80 bg-journal-paper">
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="space-y-2">
            {mapPreview.label.trim() ? (
              <p className="font-title text-xs font-semibold uppercase tracking-[0.25em] text-journal-accent">
                {mapPreview.label}
              </p>
            ) : null}
            {mapPreview.title.trim() ? (
              <h2 className="font-title text-2xl font-semibold text-slate-900 md:text-3xl">
                {mapPreview.title}
              </h2>
            ) : null}
            {mapPreview.description.trim() ? (
              <p className="font-inter max-w-md text-sm text-slate-600 md:text-base">{mapPreview.description}</p>
            ) : null}
          </div>
          <Link
            href={mapPreview.ctaHref}
            className="font-inter inline-flex shrink-0 items-center text-sm font-semibold text-journal-accent underline decoration-teal-400/70 underline-offset-4 transition hover:text-teal-950 sm:self-end"
          >
            {mapPreview.ctaButton}
          </Link>
        </div>

        <div className="overflow-hidden rounded-sm border border-slate-200/90 bg-white shadow-md">
          <InteractiveMap
            entries={entries}
            center={[45, 10]}
            zoom={4}
            height="60vh"
            showDetailPanel={true}
          />
        </div>
      </div>
    </section>
  );
}

function HeroJournal({ hero }: { hero: HomeHero }) {
  return (
    <section className="border-b border-slate-200/70 bg-journal-paper">
      <div className="mx-auto max-w-4xl px-6 py-16 md:px-8 md:py-24">
        <div className="space-y-8 text-center">
          <div className="flex items-center justify-center gap-4 font-title text-sm font-medium tracking-[0.12em] text-journal-accent">
            <span className="h-px w-12 bg-teal-600/50" aria-hidden="true" />
            <span>{hero.label}</span>
            <span className="h-px w-12 bg-teal-600/50" aria-hidden="true" />
          </div>
          <h1 className="font-title text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem]">
            {hero.title}
          </h1>
          {hero.description.trim() ? (
            <p className="font-inter text-lg leading-relaxed text-slate-600 md:text-xl">{hero.description}</p>
          ) : null}
          <div className="flex flex-col items-center justify-center gap-4 border-t border-slate-200 pt-8 font-inter sm:flex-row sm:gap-10">
            <Link
              href={hero.primaryButtonHref}
              className="text-base font-semibold text-journal-accent underline decoration-teal-400/70 underline-offset-[6px] transition hover:text-teal-950"
            >
              {hero.primaryButton}
            </Link>
            <Link
              href={hero.secondaryButtonHref}
              className="text-base text-slate-600 transition hover:text-slate-900"
            >
              {hero.secondaryButton}
            </Link>
          </div>
        </div>

        <div className="relative left-1/2 right-1/2 -mx-[50vw] mt-12 w-screen max-w-none border-t border-slate-200 pt-10 md:mt-16 md:pt-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-sm shadow-xl">
              <LightboxableImage
                src={hero.backgroundImage}
                className="min-h-[clamp(14rem,65vw,22rem)] w-full cursor-default sm:min-h-[clamp(18rem,55vw,28rem)] md:min-h-[clamp(20rem,45vw,32rem)] lg:min-h-[clamp(24rem,40vw,36rem)]"
                style={{ backgroundImage: `url(${hero.backgroundImage})` }}
                ariaLabel="View hero image full size"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionJournal({ sections }: { sections: HomeSection[] }) {
  return (
    <section className="bg-journal-paper px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-4xl">
        <ul className="divide-y divide-slate-200 border-y border-slate-200 font-inter">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                href={section.href}
                className="group flex flex-col gap-6 py-10 transition hover:bg-white/40 md:flex-row md:items-start md:gap-10 md:py-12"
              >
                <div className="w-full shrink-0 overflow-hidden rounded-sm bg-slate-200 shadow-sm md:w-[min(100%,22rem)] lg:w-[28rem]">
                  <LightboxableImage
                    src={section.imageUrl}
                    className="aspect-[4/3] w-full transition duration-300 group-hover:scale-[1.02] sm:aspect-[16/10] md:min-h-[14rem] md:aspect-auto md:h-56 lg:h-64"
                    style={{ backgroundImage: `url(${section.imageUrl})` }}
                    ariaLabel={`View section image: ${section.title}`}
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-3">
                  <p className="font-title text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {section.label}
                  </p>
                  <h3 className="font-title text-2xl font-semibold text-slate-900 md:text-3xl">{section.title}</h3>
                  <p className="text-base text-slate-600 md:text-lg">{section.description}</p>
                  <span className="inline-block pt-1 text-sm font-medium text-journal-accent group-hover:underline">
                    Continue
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Home page — journal layout only (site-wide theme matches this) */
export function HomeCover({ hero, sections, mapPreview, entries }: HomeCoverProps) {
  return (
    <div className="flex flex-col">
      <HeroJournal hero={hero} />
      <SectionJournal sections={sections} />
      <MapPreviewSection mapPreview={mapPreview} entries={entries} />
    </div>
  );
}
