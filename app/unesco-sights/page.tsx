"use client";

import { useMemo, useState } from "react";
import { InteractiveMap } from "../components/MapWrapper";
import type { MapEntry } from "../../data/mapEntries";
import {
  getAllUnescoSights,
  unescoPageHeader,
  type UnescoSight,
  type UnescoStatus
} from "../../data/unescoSights";
import { useImageLightbox } from "../components/shared/ImageLightbox";

function formatVisitDate(date: string | undefined) {
  if (!date) return "Planned";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return "Planned";
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function isVisited(status: UnescoStatus) {
  return status === "visited";
}

function SightCard({ sight }: { sight: UnescoSight }) {
  const { open } = useImageLightbox();
  const cover = sight.imageUrls?.[0];
  const visited = isVisited(sight.status);

  return (
    <article className="content-box overflow-hidden p-0">
      <div className="relative">
        <button
          type="button"
          disabled={!cover}
          className="h-52 w-full cursor-zoom-in border-0 bg-slate-200 bg-cover bg-center p-0 disabled:cursor-default md:h-56"
          style={{
            backgroundImage: cover
              ? `linear-gradient(to bottom, rgba(15,23,42,0.10), rgba(15,23,42,0.55)), url(${cover})`
              : "linear-gradient(to bottom, rgba(15,23,42,0.06), rgba(15,23,42,0.14))"
          }}
          onClick={() => cover && open(cover)}
          aria-label={cover ? `View full image: ${sight.name}` : undefined}
        />

        <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full border bg-white/95 text-sm shadow-sm ${
              visited ? "border-slate-300 text-slate-900" : "border-slate-200 text-slate-300"
            }`}
            aria-label={visited ? "Visited" : "Not visited"}
            title={visited ? "Visited" : "Not visited"}
          >
            {visited ? "✓" : ""}
          </div>
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-primary">
            {visited ? "Visited" : "To visit"}
          </span>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="space-y-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-text-primary md:text-lg">
              {sight.name}
            </h3>
            <span className="tag">{sight.unescoCategory}</span>
          </div>
          <p className="text-xs text-text-muted">
            {sight.city}, {sight.country}
            {typeof sight.inscriptionYear === "number"
              ? ` · UNESCO since ${sight.inscriptionYear}`
              : ""}
          </p>
          <p className="text-xs text-text-muted">
            {visited ? "Visited:" : "Planned:"} {formatVisitDate(sight.visitDate)}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-text-secondary">
          {sight.memory || sight.notes || "Add your notes here."}
        </p>

        {Array.isArray(sight.imageUrls) && sight.imageUrls.length > 1 && (
          <div className="grid grid-cols-3 gap-2">
            {sight.imageUrls.slice(0, 3).map((url, idx) => (
              <button
                key={`${sight.id}-${idx}`}
                type="button"
                className="h-20 cursor-zoom-in overflow-hidden rounded-xl border-0 bg-slate-200 bg-cover bg-center bg-no-repeat p-0"
                style={{ backgroundImage: `url(${url})` }}
                onClick={() => open(url)}
                aria-label={`View photo ${idx + 1} full size`}
              />
            ))}
          </div>
        )}

        {Array.isArray(sight.tags) && sight.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {sight.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white px-2.5 py-1 text-[11px] text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function UnescoSightsPage() {
  const sights = getAllUnescoSights();
  const [searchQuery, setSearchQuery] = useState("");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const countries = useMemo(
    () => Array.from(new Set(sights.map((s) => s.country))).sort((a, b) => a.localeCompare(b)),
    [sights]
  );

  const filteredSights = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sights.filter((sight) => {
      const countryMatches = countryFilter === "all" || sight.country === countryFilter;
      const queryMatches =
        !query ||
        [sight.name, sight.city, sight.country, sight.unescoCategory, ...(sight.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return countryMatches && queryMatches;
    });
  }, [countryFilter, searchQuery, sights]);

  const visitedCount = sights.filter((s) => s.status === "visited").length;
  const plannedCount = sights.filter((s) => s.status !== "visited").length;

  const mapEntries: MapEntry[] = filteredSights.map((sight) => ({
    id: sight.id,
    title: sight.name,
    type: "landmark",
    latitude: sight.lat,
    longitude: sight.lng,
    city: sight.city,
    country: sight.country,
    pageSlug: "/unesco-sights",
    notes: sight.memory || sight.notes || "Add notes for this UNESCO sight.",
    images: sight.imageUrls,
    tags: [sight.unescoCategory, ...sight.tags]
  }));

  const sortedSights = useMemo(() => {
    return [...filteredSights].sort((a, b) => {
      const aVisited = isVisited(a.status);
      const bVisited = isVisited(b.status);
      if (aVisited !== bVisited) return aVisited ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [filteredSights]);

  return (
    <div className="flex flex-col">
      <section className="section-container border-b border-slate-100">
        <div className="page-header">
          <p className="page-label">{unescoPageHeader.label}</p>
          <h1 className="page-title">{unescoPageHeader.title}</h1>
          <p className="page-description">{unescoPageHeader.description}</p>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-box-bg px-6 py-4 md:px-10">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="tag">{sights.length} total sights</span>
          <span className="tag">{visitedCount} visited</span>
          <span className="tag">{plannedCount} still to explore</span>
          <span className="tag">{countries.length} countries</span>
        </div>
      </section>

      <section className="section-container border-b border-slate-100 bg-box-bg">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sights, countries, tags..."
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-text-primary placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
          />

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-text-primary focus:border-slate-500 focus:outline-none"
          >
            <option value="all">All countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Photo-first grid */}
      <section className="section-container bg-white">
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
              <h2 className="box-title">Checklist</h2>
              <p className="text-sm text-text-secondary">
                Checkmarks show what you&apos;ve visited. (Edit each item&apos;s
                `status` in `content/unesco-sights.json`.)
              </p>
            </div>
            <span className="tag">{sortedSights.length} shown</span>
          </div>

          {sortedSights.length === 0 ? (
            <div className="content-box">
              <p className="text-sm text-text-secondary">
                No UNESCO sites match your search and filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sortedSights.map((sight) => (
                <SightCard key={sight.id} sight={sight} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-container">
        <InteractiveMap entries={mapEntries} center={[43.2, 12.7]} zoom={4} height="62vh" />
      </section>
    </div>
  );
}
