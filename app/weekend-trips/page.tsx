import { getAllTrips } from "../../data/tripPages";
import { weekendTripsOverview } from "../../data/weekendTripsContent";
import { TripCard } from "../components/TripCard";

// ═══════════════════════════════════════════════════════════════════════════
// WEEKEND TRIPS OVERVIEW - Trip cards from data/tripPages.ts
// Page content from data/weekendTripsContent.ts
// ═══════════════════════════════════════════════════════════════════════════

export default function WeekendTripsPage() {
  const trips = getAllTrips();

  return (
    <div className="flex flex-col bg-journal-paper">
      {/* Match home cover: journal paper + soft border (HeroJournal / section rhythm) */}
      <section className="section-container border-b border-slate-200/70 bg-journal-paper">
        <div className="page-header">
          <p className="page-label">{weekendTripsOverview.label}</p>
          <h1 className="page-title">{weekendTripsOverview.title}</h1>
          <p className="page-description">{weekendTripsOverview.description}</p>
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
