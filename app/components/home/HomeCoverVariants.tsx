"use client";

import Link from "next/link";
import { uiStrings } from "../../../data/siteContent";
import type { MapEntry } from "../../../data/mapEntries";
import { InteractiveMap } from "../MapWrapper";
import { useSearchParams } from "next/navigation";
import { parseCoverVariant, type HomeCoverVariant } from "../../../lib/coverVariants";

export type { HomeCoverVariant };

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
  const isDark = variant === "bold" || variant === "startup";

  const bg = isDark
    ? "bg-slate-950 text-white"
    : variant === "fluid"
      ? "bg-gradient-to-b from-white via-violet-50/40 to-fuchsia-50/30"
      : variant === "warm"
        ? "bg-gradient-to-b from-orange-50/50 to-stone-100/70"
        : variant === "journal"
          ? "border-t border-slate-200/80 bg-[#f5f5f4]"
          : "bg-box-bg";

  const labelClass = isDark
    ? "text-xs font-semibold uppercase tracking-[0.3em] text-slate-300"
    : variant === "fluid"
      ? "font-dm text-sm font-medium text-violet-700"
      : variant === "warm"
        ? "font-dm text-xs font-semibold uppercase tracking-[0.3em] text-orange-900/70"
        : variant === "journal"
          ? "font-dm text-xs font-semibold uppercase tracking-[0.25em] text-teal-800"
          : "page-label";

  const titleClass = isDark
    ? "text-2xl font-semibold tracking-tight text-white md:text-3xl"
    : variant === "fluid"
      ? "font-fraunces text-2xl font-semibold text-slate-900 md:text-3xl"
      : variant === "warm"
        ? "font-fraunces text-2xl font-semibold text-stone-900 md:text-3xl"
        : variant === "journal"
          ? "font-fraunces text-2xl font-semibold text-slate-900 md:text-3xl"
          : "box-title";

  const descClass = isDark
    ? "max-w-md text-sm text-slate-200 md:text-base"
    : variant === "fluid"
      ? "font-dm max-w-md text-sm text-slate-600 md:text-base"
      : variant === "warm"
        ? "font-dm max-w-md text-sm text-stone-700 md:text-base"
        : variant === "journal"
          ? "font-dm max-w-md text-sm text-slate-600 md:text-base"
          : "max-w-md text-sm text-text-secondary";

  const ctaClass = isDark
    ? "inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
    : variant === "fluid"
      ? "font-dm inline-flex items-center text-sm font-semibold text-violet-800 underline decoration-violet-300 underline-offset-4 transition hover:text-violet-950"
      : variant === "warm"
        ? "font-dm inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-orange-50 transition hover:bg-stone-800"
        : variant === "journal"
          ? "font-dm inline-flex items-center text-sm font-semibold text-teal-800 underline decoration-teal-400/70 underline-offset-4 transition hover:text-teal-950"
          : "btn-primary";

  const mapFrameClass = isDark
    ? "overflow-hidden rounded-box-lg border border-white/10 bg-white/5"
    : variant === "fluid"
      ? "overflow-hidden rounded-[1.75rem] bg-white/70 shadow-2xl shadow-violet-200/35 ring-1 ring-violet-100/70"
      : variant === "warm"
        ? "overflow-hidden rounded-[1.5rem] bg-white/80 shadow-xl shadow-orange-200/40 ring-1 ring-orange-100/60"
        : variant === "journal"
          ? "overflow-hidden rounded-sm border border-slate-200/90 bg-white shadow-md"
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

/** Soft gradients, organic radii, link-style CTAs — less “boxed” UI */
function HeroFluid({ hero }: { hero: HomeHero }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/30">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-pink-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-24 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7 font-dm text-slate-900">
            <p className="text-sm font-medium tracking-wide text-violet-700/90">{hero.label}</p>
            <h1 className="font-fraunces text-[2.75rem] font-semibold leading-[1.08] md:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">{hero.description}</p>
            <div className="flex flex-wrap items-baseline gap-8 pt-2">
              <Link
                href={hero.primaryButtonHref}
                className="group inline-flex items-center gap-2 text-base font-semibold text-violet-800 underline decoration-violet-300/80 decoration-2 underline-offset-[6px] transition hover:text-violet-950 hover:decoration-violet-500"
              >
                {hero.primaryButton}
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                  →
                </span>
              </Link>
              <Link
                href={hero.secondaryButtonHref}
                className="text-base font-medium text-slate-600 transition hover:text-slate-900"
              >
                {hero.secondaryButton}
              </Link>
            </div>
          </div>

          <div className="relative lg:pl-2">
            <div className="absolute -inset-1 rounded-[2.25rem] bg-gradient-to-tr from-violet-300/25 via-transparent to-fuchsia-200/20 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-violet-300/25 ring-1 ring-white/80">
              <div
                className="aspect-[4/3] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${hero.backgroundImage})` }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionFluid({ sections }: { sections: HomeSection[] }) {
  return (
    <section className="relative bg-white px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="max-w-2xl space-y-3 font-dm">
          <p className="text-sm font-medium text-violet-700">Explore</p>
          <h2 className="font-fraunces text-3xl font-semibold text-slate-900 md:text-4xl">
            Where to wander
          </h2>
          <p className="text-slate-600">Soft shapes and breathing room—no harsh card grid.</p>
        </div>

        <div className="flex flex-col gap-14">
          {sections.map((section, i) => (
            <Link
              key={section.id}
              href={section.href}
              className={`group flex flex-col gap-6 md:flex-row md:items-center md:gap-12 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative md:w-[48%]">
                <div className="overflow-hidden rounded-[1.75rem] shadow-xl shadow-slate-200/60 ring-1 ring-slate-100/80 transition duration-300 group-hover:shadow-2xl group-hover:shadow-violet-200/50">
                  <div
                    className="aspect-[16/10] w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url(${section.imageUrl})` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1 space-y-3 font-dm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600/80">
                  {section.label}
                </p>
                <h3 className="font-fraunces text-2xl font-semibold text-slate-900 md:text-3xl">
                  {section.title}
                </h3>
                <p className="text-slate-600">{section.description}</p>
                <p className="pt-1 text-sm font-semibold text-violet-800">
                  {uiStrings.explorePrefix} {section.label} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Terracotta / cream warmth — rounded imagery, minimal chrome */
function HeroWarm({ hero }: { hero: HomeHero }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/90 via-amber-50/50 to-stone-100/80">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,146,60,0.14),transparent)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:gap-14 md:px-10 md:py-28">
        <div className="space-y-6 font-dm text-stone-800">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-800/70">{hero.label}</p>
          <h1 className="font-fraunces text-4xl font-semibold leading-[1.12] text-stone-900 md:text-5xl lg:text-[3.25rem]">
            {hero.title}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-stone-700">{hero.description}</p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Link
              href={hero.primaryButtonHref}
              className="inline-flex w-fit items-center justify-center rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-orange-50 shadow-lg shadow-orange-900/15 transition hover:bg-stone-800"
            >
              {hero.primaryButton}
            </Link>
            <Link
              href={hero.secondaryButtonHref}
              className="inline-flex w-fit items-center text-sm font-semibold text-orange-900/90 underline decoration-orange-400/60 underline-offset-4 hover:text-stone-900"
            >
              {hero.secondaryButton}
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-orange-200/40 to-amber-100/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl shadow-orange-200/50">
            <div
              className="aspect-[5/4] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${hero.backgroundImage})` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionWarm({ sections }: { sections: HomeSection[] }) {
  return (
    <section className="bg-gradient-to-b from-stone-100/60 to-orange-50/30 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-xl space-y-2 font-dm">
          <h2 className="font-fraunces text-3xl text-stone-900 md:text-4xl">Stories by theme</h2>
          <p className="text-stone-600">Frosted panels and warm light—no sharp boxes.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white/70 shadow-md shadow-orange-200/30 backdrop-blur-sm transition hover:bg-white hover:shadow-xl hover:shadow-orange-200/40"
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <div
                  className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${section.imageUrl})` }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-6 font-dm">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-800/70">
                  {section.label}
                </span>
                <h3 className="font-fraunces text-xl font-semibold text-stone-900">{section.title}</h3>
                <p className="flex-1 text-sm text-stone-600">{section.description}</p>
                <span className="text-sm font-semibold text-orange-900/90">Open →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Narrow editorial column, teal accents, list-based structure */
function HeroJournal({ hero }: { hero: HomeHero }) {
  return (
    <section className="border-b border-slate-200/70 bg-[#fafaf9]">
      <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28">
        <div className="space-y-8">
          <div className="flex items-center gap-4 font-dm text-sm text-teal-800/90">
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
              className="text-base font-semibold text-teal-800 underline decoration-teal-400/70 underline-offset-[6px] transition hover:text-teal-950"
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
    <section className="bg-[#fafaf9] px-6 py-16 md:px-10 md:py-24">
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
                  <span className="inline-block pt-1 text-sm font-medium text-teal-800 group-hover:underline">
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

export function HomeCover({ hero, sections, mapPreview, entries }: HomeCoverProps) {
  const searchParams = useSearchParams();
  const variant = parseCoverVariant(searchParams);

  return (
    <div className="flex flex-col">
      {variant === "classic" && <HeroClassic hero={hero} />}
      {variant === "minimal" && <HeroMinimal hero={hero} />}
      {variant === "bold" && <HeroBold hero={hero} />}
      {variant === "editorial" && <HeroEditorial hero={hero} />}
      {variant === "startup" && <HeroStartup hero={hero} />}
      {variant === "fluid" && <HeroFluid hero={hero} />}
      {variant === "warm" && <HeroWarm hero={hero} />}
      {variant === "journal" && <HeroJournal hero={hero} />}

      {variant === "classic" && <SectionStackClassic sections={sections} />}
      {variant === "minimal" && <SectionGridMinimal sections={sections} />}
      {variant === "bold" && <SectionGridBold sections={sections} />}
      {variant === "editorial" && <SectionGridEditorial sections={sections} />}
      {variant === "startup" && <SectionGridMinimal sections={sections} />}
      {variant === "fluid" && <SectionFluid sections={sections} />}
      {variant === "warm" && <SectionWarm sections={sections} />}
      {variant === "journal" && <SectionJournal sections={sections} />}

      <MapPreviewSection mapPreview={mapPreview} entries={entries} variant={variant} />
    </div>
  );
}
