"use client";

import { useMemo, useState } from "react";
import { InteractiveMap } from "../components/MapWrapper";
import type { MapEntry } from "../../data/mapEntries";
import {
  getAllUnescoSights,
  unescoPageHeader,
  unescoStatuses,
  type UnescoSight,
  type UnescoStatus
} from "../../data/unescoSights";

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

export default function UnescoSightsPage() {
  const sights = getAllUnescoSights();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<UnescoStatus | "all">("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const countries = useMemo(
    () => Array.from(new Set(sights.map((s) => s.country))).sort((a, b) => a.localeCompare(b)),
    [sights]
  );

  const filteredSights = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return sights.filter((sight) => {
      const statusMatches = statusFilter === "all" || sight.status === statusFilter;
      const countryMatches = countryFilter === "all" || sight.country === countryFilter;
      const queryMatches =
        !query ||
        [sight.name, sight.city, sight.country, sight.unescoCategory, ...(sight.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return statusMatches && countryMatches && queryMatches;
    });
  }, [countryFilter, searchQuery, sights, statusFilter]);

  const sightsByStatus = useMemo(() => {
    const grouped: Record<UnescoStatus, UnescoSight[]> = {
      visited: [],
      "next-up": [],
      wishlist: []
    };
    filteredSights.forEach((sight) => grouped[sight.status].push(sight));
    (Object.keys(grouped) as UnescoStatus[]).forEach((status) => {
      grouped[status].sort((a, b) => a.name.localeCompare(b.name));
    });
    return grouped;
  }, [filteredSights]);

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
        <div className="grid gap-3 md:grid-cols-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sights, countries, tags..."
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-text-primary placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UnescoStatus | "all")}
            className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-text-primary focus:border-slate-500 focus:outline-none"
          >
            <option value="all">All statuses</option>
            {unescoStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>

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

      <section className="section-container">
        <InteractiveMap entries={mapEntries} center={[43.2, 12.7]} zoom={4} height="62vh" />
      </section>

      <section className="section-container border-t border-slate-100 bg-box-bg">
        <div className="space-y-4">
          <h2 className="box-title">Organized by Progress</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {unescoStatuses.map((status) => (
              <div key={status.id} className="content-box space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{status.label}</h3>
                  <p className="text-sm text-text-muted">{status.description}</p>
                </div>

                <div className="space-y-3">
                  {sightsByStatus[status.id].length === 0 && (
                    <p className="rounded-box border border-dashed border-slate-300 px-3 py-4 text-xs text-text-muted">
                      No sights match the current filters.
                    </p>
                  )}

                  {sightsByStatus[status.id].map((sight) => (
                    <article key={sight.id} className="rounded-box border border-slate-200 bg-white p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <p className="font-medium text-text-primary">{sight.name}</p>
                        <span className="tag">{sight.unescoCategory}</span>
                      </div>
                      <p className="text-xs text-text-muted">
                        {sight.city}, {sight.country}
                      </p>
                      <p className="mt-2 text-sm text-text-secondary">
                        {sight.memory || sight.notes || "Add your notes here."}
                      </p>
                      <p className="mt-3 text-xs text-text-muted">
                        Visit date: {formatVisitDate(sight.visitDate)}
                        {typeof sight.inscriptionYear === "number"
                          ? ` | UNESCO since ${sight.inscriptionYear}`
                          : ""}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
