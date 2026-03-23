import Link from "next/link";
import type { MapEntry } from "../../../data/mapEntries";
import { InteractiveMap } from "../MapWrapper";

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
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className="font-dm text-xs font-semibold uppercase tracking-[0.25em] text-journal-accent">
              {mapPreview.label}
            </p>
            <h2 className="font-fraunces text-2xl font-semibold text-slate-900 md:text-3xl">
              {mapPreview.title}
            </h2>
            <p className="font-dm max-w-md text-sm text-slate-600 md:text-base">{mapPreview.description}</p>
          </div>
          <Link
            href={mapPreview.ctaHref}
            className="font-dm inline-flex items-center text-sm font-semibold text-journal-accent underline decoration-teal-400/70 underline-offset-4 transition hover:text-teal-950"
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
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28">
        <div className="space-y-8">
          <div className="flex items-center gap-4 font-dm text-sm text-journal-accent">
            <span className="h-px w-12 bg-teal-600/50" aria-hidden="true" />
            <span>{hero.label}</span>
          </div>
          <h1 className="font-fraunces text-4xl font-semibold leading-[1.15] text-slate-900 md:text-5xl lg:text-[3.5rem]">
            {hero.title}
          </h1>
          <p className="font-dm text-lg leading-relaxed text-slate-600 md:text-xl">{hero.description}</p>
          <div className="flex flex-wrap gap-8 border-t border-slate-200 pt-8 font-dm">
            <Link
              href={hero.primaryButtonHref}
              className="text-base font-semibold text-journal-accent underline decoration-teal-400/70 underline-offset-[6px] transition hover:text-teal-950"
            >
              {hero.primaryButton}
            </Link>
            <Link href={hero.secondaryButtonHref} className="text-base text-slate-600 transition hover:text-slate-900">
              {hero.secondaryButton}
            </Link>
          </div>
        </div>

        <div className="mt-14 border-t border-slate-200 pt-10">
          <div className="overflow-hidden rounded-sm shadow-lg">
            <div
              className="aspect-[21/9] w-full max-w-2xl bg-cover bg-center md:aspect-[2/1]"
              style={{ backgroundImage: `url(${hero.backgroundImage})` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionJournal({ sections }: { sections: HomeSection[] }) {
  return (
    <section className="bg-journal-paper px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-fraunces text-2xl font-semibold text-slate-900 md:text-3xl">Contents</h2>
        <p className="mt-2 font-dm text-slate-600">Jump in—each line is a door.</p>

        <ol className="mt-10 divide-y divide-slate-200 border-y border-slate-200 font-dm">
          {sections.map((section, i) => (
            <li key={section.id}>
              <Link href={section.href} className="group flex gap-6 py-8 transition hover:bg-white/60">
                <span className="w-8 shrink-0 pt-1 font-fraunces text-2xl text-teal-800/80 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{section.label}</p>
                  <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">{section.title}</h3>
                  <p className="text-slate-600">{section.description}</p>
                  <span className="inline-block pt-1 text-sm font-medium text-journal-accent group-hover:underline">
                    Continue
                  </span>
                </div>
                <div className="hidden h-24 w-32 shrink-0 overflow-hidden rounded-sm bg-slate-200 sm:block">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${section.imageUrl})` }}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ol>
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
