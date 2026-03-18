import Link from "next/link";
import { InteractiveMap } from "./components/MapWrapper";
import {
  homeHero,
  homeSections,
  homeMapPreview
} from "../data/homeContent";
import { uiStrings } from "../data/siteContent";
import { getAllEntries } from "../data/mapEntries";
import { HomeCover, type HomeCoverVariant } from "./components/home/HomeCoverVariants";

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

function parseCoverVariant(value: unknown): HomeCoverVariant {
  if (typeof value !== "string") return "classic";
  const v = value.toLowerCase();
  if (v === "classic" || v === "minimal" || v === "bold" || v === "editorial" || v === "startup") {
    return v;
  }
  return "classic";
}

export default function HomePage({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const entries = getAllEntries();
  const coverVariant = parseCoverVariant(searchParams?.cover);

  return (
    <HomeCover
      variant={coverVariant}
      hero={homeHero}
      sections={homeSections}
      mapPreview={homeMapPreview}
      entries={entries}
    />
  );
}
