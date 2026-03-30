import type { Metadata } from "next";
import { getAllTrips } from "../../data/tripPages";
import {
  WEEKEND_TRIPS_LIST_TITLE,
  weekendTripsOverview
} from "../../data/weekendTripsContent";
import { TripCard } from "../components/TripCard";

// ═══════════════════════════════════════════════════════════════════════════
// WEEKEND TRIPS OVERVIEW - Trip cards from data/tripPages.ts
// Page content from data/weekendTripsContent.ts
// ═══════════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  title: WEEKEND_TRIPS_LIST_TITLE
};

export default function WeekendTripsPage() {
  const trips = getAllTrips();

  return (
    <div className="flex flex-col bg-journal-paper">
      {/* Match home cover: journal paper + soft border (HeroJournal / section rhythm) */}
      <section className="section-container border-b border-slate-200/70 bg-journal-paper">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {weekendTripsOverview.label.trim() ? (
            <p className="page-label">{weekendTripsOverview.label}</p>
          ) : null}
          <h1 className="page-title w-full text-center">
            {WEEKEND_TRIPS_LIST_TITLE}
          </h1>
          {weekendTripsOverview.description.trim() ? (
            <p className="page-description">{weekendTripsOverview.description}</p>
          ) : null}
        </div>
      </section>

      <section className="section-container border-t border-slate-200/80 bg-journal-paper py-section md:py-section-lg">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
          <TripCard
            key={trip.slug}
            trip={trip}
            yearSuffix={weekendTripsOverview.yearSuffix}
            defaultCoverImage={weekendTripsOverview.defaultCoverImage}
          />
          ))}
        </div>
      </section>
    </div>
  );
}
