import Link from "next/link";
import { getAllTrips } from "../../data/tripPages";
import {
  weekendTripsOverview
} from "../../data/weekendTripsContent";

// ═══════════════════════════════════════════════════════════════════════════
// WEEKEND TRIPS OVERVIEW - Trip cards from data/tripPages.ts
// Page content from data/weekendTripsContent.ts
// ═══════════════════════════════════════════════════════════════════════════

function TripCard({
  trip,
  cardLabel,
  yearSuffix,
  defaultCoverImage
}: {
  trip: ReturnType<typeof getAllTrips>[0];
  cardLabel: string;
  yearSuffix: string;
  defaultCoverImage: string;
}) {
  const coverImage = trip.slideshow?.[0]?.imageUrl || defaultCoverImage;

  const dateRange = trip.dateRange.replace(`, ${yearSuffix}`, "");

  return (
    <Link
      href={`/weekend-trips/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-sm shadow-slate-950/40 transition hover:-translate-y-1 hover:border-slate-400/70 hover:shadow-lg"
    >
      <div
        className="relative h-40 w-full bg-cover bg-center md:h-44"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-slate-950/40" />
        <p className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-100 ring-1 ring-slate-600/70">
          {cardLabel}
        </p>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2 px-4 py-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-300">
            {trip.location}
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            {trip.country}
          </p>
        </div>
        <p className="text-xs text-slate-400">
          {dateRange}, {yearSuffix}
        </p>
      </div>
    </Link>
  );
}

export default function WeekendTripsPage() {
  const trips = getAllTrips();

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          {weekendTripsOverview.label}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {weekendTripsOverview.title}
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          {weekendTripsOverview.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TripCard
            key={trip.slug}
            trip={trip}
            cardLabel={weekendTripsOverview.cardLabel}
            yearSuffix={weekendTripsOverview.yearSuffix}
            defaultCoverImage={weekendTripsOverview.defaultCoverImage}
          />
        ))}
      </div>
    </section>
  );
}
