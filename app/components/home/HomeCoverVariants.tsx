"use client";

import Link from "next/link";
import { uiStrings } from "../../../data/siteContent";
import type { MapEntry } from "../../../data/mapEntries";
import { InteractiveMap } from "../MapWrapper";
import { useSearchParams } from "next/navigation";

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

export type HomeCoverVariant = "minimal" | "bold" | "editorial" | "startup" | "classic";

type HomeCoverProps = {
  hero: HomeHero;
  sections: HomeSection[];
  mapPreview: HomeMapPreview;
  entries: MapEntry[];
};

function VariantPills({ current }: { current: HomeCoverVariant }) {
  const items: Array<{ id: HomeCoverVariant; label: string }> = [
    { id: "classic", label: "Classic" },
    { id: "minimal", label: "Minimal" },
    { id: "bold", label: "Bold" },
    { id: "editorial", label: "Editorial" },
    { id: "startup", label: "Startup" }
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 pt-6 md:px-10">
      <div className="flex flex-wrap justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2.5 py-2 shadow-sm backdrop-blur">
        {items.map((item) => {
          const active = item.id === current;
          return (
            <Link
              key={item.id}
              href={`/?cover=${item.id}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-text-secondary hover:bg-slate-100 hover:text-text-primary"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function HeroButtons({ hero }: { hero: HomeHero }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 pt-2">
      <Link href={hero.primaryButtonHref} className="btn-primary">
        {hero.primaryButton}
      </Link>
      <Link href={hero.secondaryButtonHref} className="btn-secondary">
        {hero.secondaryButton}
      </Link>
    </div>
  );
}

function MapPreviewSection({
  mapPreview,
  entries,
  variant
}: {
  mapPreview: HomeMapPreview;
  entries: MapEntry[];
  variant: HomeCoverVariant;
}) {
  const base = "section-container";
  const bg =
    variant === "bold"
      ? "bg-slate-950 text-white"
      : variant === "startup"
        ? "bg-slate-950 text-white"
        : "bg-box-bg";

  const labelClass =
    variant === "bold" || variant === "startup"
      ? "text-xs font-semibold uppercase tracking-[0.3em] text-slate-300"
      : "page-label";

  const titleClass =
    variant === "bold" || variant === "startup"
      ? "text-2xl font-semibold tracking-tight text-white md:text-3xl"
      : "box-title";

  const descClass =
    variant === "bold" || variant === "startup"
      ? "max-w-md text-sm text-slate-200 md:text-base"
      : "max-w-md text-sm text-text-secondary";

  const ctaClass =
    variant === "bold" || variant === "startup"
      ? "inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
      : "btn-primary";

  const mapFrameClass =
    variant === "bold" || variant === "startup"
      ? "overflow-hidden rounded-box-lg border border-white/10 bg-white/5"
      : "overflow-hidden rounded-box-lg border border-slate-200 bg-slate-50";

  return (
    <section className={`${base} ${bg}`}>
      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div className="space-y-2">
            <p className={labelClass}>{mapPreview.label}</p>
            <h2 className={titleClass}>{mapPreview.title}</h2>
            <p className={descClass}>{mapPreview.description}</p>
          </div>
          <Link href={mapPreview.ctaHref} className={ctaClass}>
            {mapPreview.ctaButton}
          </Link>
        </div>

        <div className={mapFrameClass}>
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

function SectionGridMinimal({ sections }: { sections: HomeSection[] }) {
  return (
    <section className="section-container">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-col gap-2 text-center">
          <p className="page-label">Explore</p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Pick a section to dive into
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-text-secondary md:text-base">
            Food, weekend trips, and highlights—all organized so it’s easy to
            browse.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group overflow-hidden rounded-box-lg border border-slate-200 bg-white transition hover:shadow-md"
            >
              <div
                className="h-40 w-full bg-cover bg-center transition duration-300 group-hover:scale-[1.02]"
                style={{ backgroundImage: `url(${section.imageUrl})` }}
                aria-hidden="true"
              />
              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                  {section.label}
                </p>
                <h3 className="text-lg font-semibold tracking-tight">
                  {section.title}
                </h3>
                <p className="text-sm text-text-secondary">{section.description}</p>
                <div className="pt-1 text-sm font-medium text-accent-primary group-hover:text-accent-hover">
                  {uiStrings.explorePrefix} {section.label} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionStackClassic({ sections }: { sections: HomeSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.id} className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.12), rgba(15,23,42,0.62)), url(${section.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex min-h-[42vh] flex-col justify-between gap-6 px-6 py-12 md:min-h-[50vh] md:flex-row md:items-center md:px-10 md:py-16">
            <div className="space-y-3 md:max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
                {section.label}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {section.title}
              </h2>
              <p className="text-sm text-slate-200 md:text-base">
                {section.description}
              </p>
            </div>
            <Link
              href={section.href}
              className="inline-flex w-max items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-text-primary shadow-lg transition hover:bg-slate-100"
            >
              {uiStrings.explorePrefix} {section.label}
            </Link>
          </div>
        </section>
      ))}
    </>
  );
}

function SectionGridBold({ sections }: { sections: HomeSection[] }) {
  return (
    <section className="section-container bg-slate-950 text-white">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
            Browse
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Where to next?
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-200 md:text-base">
            Quick entry points to the best stuff—maps, moments, and weekend trips.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group relative overflow-hidden rounded-box-lg border border-white/10 bg-white/5 transition hover:bg-white/10"
            >
              <div className="pointer-events-none absolute inset-0 opacity-90">
                <div
                  className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent-primary/30 blur-2xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-sky-400/20 blur-2xl"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 space-y-3 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
                  {section.label}
                </p>
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {section.title}
                </h3>
                <p className="text-sm text-slate-200">{section.description}</p>
                <div className="pt-2 text-sm font-medium text-white/90 group-hover:text-white">
                  {uiStrings.explorePrefix} {section.label} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionGridEditorial({ sections }: { sections: HomeSection[] }) {
  return (
    <section className="section-container">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="space-y-3">
            <p className="page-label">Archive</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              A curated index
            </h2>
            <p className="max-w-xl text-sm text-text-secondary md:text-base">
              Short, skimmable sections with room for detail when you click in.
            </p>
          </div>

          <div className="rounded-box-lg border border-slate-200 bg-box-bg p-5 md:p-6">
            <p className="text-sm font-medium text-text-primary">Quick links</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sections.map((section) => (
                <Link key={section.id} href={section.href} className="tag hover:bg-white">
                  {section.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sections.map((section, idx) => (
            <Link
              key={section.id}
              href={section.href}
              className="group grid overflow-hidden rounded-box-lg border border-slate-200 bg-white transition hover:shadow-md md:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="relative">
                <div
                  className="h-44 w-full bg-cover bg-center md:h-full"
                  style={{ backgroundImage: `url(${section.imageUrl})` }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/35 to-transparent" />
              </div>
              <div className="space-y-2 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                  {String(idx + 1).padStart(2, "0")} · {section.label}
                </p>
                <h3 className="text-xl font-semibold tracking-tight">{section.title}</h3>
                <p className="text-sm text-text-secondary">{section.description}</p>
                <div className="pt-1 text-sm font-medium text-accent-primary group-hover:text-accent-hover">
                  Read more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroClassic({ hero }: { hero: HomeHero }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.15), rgba(15,23,42,0.85)), url(${hero.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[68vh] items-center px-6 py-14 md:min-h-[80vh] md:px-10 md:py-20">
        <div className="mx-auto w-full max-w-5xl space-y-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
            {hero.label}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {hero.title}
          </h1>
          <p className="text-sm text-slate-200 md:text-base">{hero.description}</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href={hero.primaryButtonHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-text-primary shadow-lg transition hover:bg-slate-100"
            >
              {hero.primaryButton}
            </Link>
            <Link
              href={hero.secondaryButtonHref}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
            >
              {hero.secondaryButton}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMinimal({ hero }: { hero: HomeHero }) {
  return (
    <section className="section-container">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <p className="page-label">{hero.label}</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="max-w-xl text-sm text-text-secondary md:text-base">
              {hero.description}
            </p>
            <HeroButtons hero={hero} />
          </div>

          <div className="overflow-hidden rounded-box-lg border border-slate-200 bg-slate-100">
            <div
              className="aspect-[4/3] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${hero.backgroundImage})` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBold({ hero }: { hero: HomeHero }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent-primary/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
                {hero.label}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              <p className="max-w-xl text-sm text-slate-200 md:text-base">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={hero.primaryButtonHref}
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                >
                  {hero.primaryButton}
                </Link>
                <Link
                  href={hero.secondaryButtonHref}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
                >
                  {hero.secondaryButton}
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-box-lg border border-white/10 bg-white/5">
              <div
                className="aspect-[16/12] w-full bg-cover bg-center opacity-90"
                style={{ backgroundImage: `url(${hero.backgroundImage})` }}
                aria-hidden="true"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-slate-950/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroEditorial({ hero }: { hero: HomeHero }) {
  return (
    <section className="section-container">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-4">
            <p className="page-label">{hero.label}</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {hero.title}
            </h1>
            <p className="max-w-xl text-sm text-text-secondary md:text-base">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={hero.primaryButtonHref} className="btn-primary">
                {hero.primaryButton}
              </Link>
              <Link href={hero.secondaryButtonHref} className="btn-secondary">
                {hero.secondaryButton}
              </Link>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="overflow-hidden rounded-box-lg border border-slate-200 bg-slate-100">
              <div
                className="aspect-[3/4] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${hero.backgroundImage})` }}
                aria-hidden="true"
              />
            </div>
            <div className="space-y-3">
              <div className="rounded-box-lg border border-slate-200 bg-box-bg p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                  Highlight
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight">
                  A living travel log
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  Notes, photos, and favorites—organized so it’s easy to revisit.
                </p>
              </div>
              <div className="rounded-box-lg border border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                  Tip
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  Use the map preview below to jump around by place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStartup({ hero }: { hero: HomeHero }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sky-200 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-200 blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-text-secondary shadow-sm">
                <span className="h-2 w-2 rounded-full bg-accent-primary" />
                {hero.label}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              <p className="max-w-xl text-sm text-text-secondary md:text-base">
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={hero.primaryButtonHref} className="btn-primary">
                  {hero.primaryButton}
                </Link>
                <Link
                  href={hero.secondaryButtonHref}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-text-primary shadow-sm transition hover:bg-slate-50"
                >
                  {hero.secondaryButton}
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="tag">Maps</span>
                <span className="tag">Weekend trips</span>
                <span className="tag">Food & favorites</span>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="overflow-hidden rounded-box-lg border border-slate-200 bg-slate-100">
                <div
                  className="aspect-[16/10] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${hero.backgroundImage})` }}
                  aria-hidden="true"
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-box-lg border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                    Updated
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    New trips and highlights added regularly.
                  </p>
                </div>
                <div className="rounded-box-lg border border-slate-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                    Organized
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    Browse by theme, or jump by location on the map.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getVariantFromSearchParams(searchParams: URLSearchParams | null): HomeCoverVariant {
  if (!searchParams) return "classic";
  const raw = searchParams.get("cover") ?? "";
  const v = raw.toLowerCase();
  if (v === "classic" || v === "minimal" || v === "bold" || v === "editorial" || v === "startup") {
    return v;
  }
  return "classic";
}

export function HomeCover({ hero, sections, mapPreview, entries }: HomeCoverProps) {
  const searchParams = useSearchParams();
  const variant = getVariantFromSearchParams(searchParams);

  return (
    <div className="flex flex-col">
      <VariantPills current={variant} />

      {variant === "classic" && <HeroClassic hero={hero} />}
      {variant === "minimal" && <HeroMinimal hero={hero} />}
      {variant === "bold" && <HeroBold hero={hero} />}
      {variant === "editorial" && <HeroEditorial hero={hero} />}
      {variant === "startup" && <HeroStartup hero={hero} />}

      {variant === "classic" && <SectionStackClassic sections={sections} />}
      {variant === "minimal" && <SectionGridMinimal sections={sections} />}
      {variant === "bold" && <SectionGridBold sections={sections} />}
      {variant === "editorial" && <SectionGridEditorial sections={sections} />}
      {variant === "startup" && <SectionGridMinimal sections={sections} />}

      <MapPreviewSection mapPreview={mapPreview} entries={entries} variant={variant} />
    </div>
  );
}
