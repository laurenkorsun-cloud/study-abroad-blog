import Link from "next/link";
import { InteractiveMap } from "./components/MapWrapper";
import {
  homeHero,
  homeSections,
  homeMapPreview
} from "../data/homeContent";
import { uiStrings } from "../data/siteContent";
import { getAllEntries } from "../data/mapEntries";

// ═══════════════════════════════════════════════════════════════════════════
// HOME PAGE - All content from data/homeContent.ts
// ═══════════════════════════════════════════════════════════════════════════

type SectionCardProps = {
  label: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
};

function SectionCard({
  label,
  title,
  description,
  href,
  imageUrl
}: SectionCardProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.12), rgba(15,23,42,0.62)), url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[42vh] flex-col justify-between gap-6 px-6 py-12 md:min-h-[50vh] md:flex-row md:items-center md:px-10 md:py-16">
        <div className="space-y-3 md:max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            {label}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {title}
          </h2>
          <p className="text-sm text-slate-200 md:text-base">{description}</p>
        </div>
        <Link
          href={href}
          className="inline-flex w-max items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-text-primary shadow-lg transition hover:bg-slate-100"
        >
          {uiStrings.explorePrefix} {label}
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  const entries = getAllEntries();

  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.15), rgba(15,23,42,0.85)), url(${homeHero.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex min-h-[68vh] items-center px-6 py-14 md:min-h-[80vh] md:px-10 md:py-20">
          <div className="mx-auto w-full max-w-5xl space-y-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              {homeHero.label}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
              {homeHero.title}
            </h1>
            <p className="text-sm text-slate-200 md:text-base">
              {homeHero.description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                href={homeHero.primaryButtonHref}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-text-primary shadow-lg transition hover:bg-slate-100"
              >
                {homeHero.primaryButton}
              </Link>
              <Link
                href={homeHero.secondaryButtonHref}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
              >
                {homeHero.secondaryButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section cards */}
      {homeSections.map((section) => (
        <SectionCard
          key={section.id}
          label={section.label}
          title={section.title}
          description={section.description}
          href={section.href}
          imageUrl={section.imageUrl}
        />
      ))}

      {/* Map preview section */}
      <section className="section-container bg-box-bg">
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div className="space-y-2">
              <p className="page-label">{homeMapPreview.label}</p>
              <h2 className="box-title">{homeMapPreview.title}</h2>
              <p className="max-w-md text-sm text-text-secondary">
                {homeMapPreview.description}
              </p>
            </div>
            <Link href={homeMapPreview.ctaHref} className="btn-primary">
              {homeMapPreview.ctaButton}
            </Link>
          </div>

          <InteractiveMap
            entries={entries}
            center={[45, 10]}
            zoom={4}
            height="60vh"
            showDetailPanel={true}
          />
        </div>
      </section>
    </div>
  );
}
