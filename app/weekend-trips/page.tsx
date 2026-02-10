import Link from "next/link";
import { getAllTrips } from "../../data/tripPages";
import { weekendTripsOverview } from "../../data/weekendTripsContent";

// ═══════════════════════════════════════════════════════════════════════════
// WEEKEND TRIPS OVERVIEW - Trip cards from data/tripPages.ts
// Page content from data/weekendTripsContent.ts
// ═══════════════════════════════════════════════════════════════════════════

function TripCard({
  trip,
  yearSuffix,
  defaultCoverImage
}: {
  trip: ReturnType<typeof getAllTrips>[0];
  yearSuffix: string;
  defaultCoverImage: string;
}) {
  const coverImage = trip.slideshow?.[0]?.imageUrl || defaultCoverImage;
  const rawDate = trip.dateRange ?? "";
  const dateRange = rawDate ? rawDate.replace(`, ${yearSuffix}`, "").trim() || rawDate : rawDate;

  return (
    <Link
      href={`/weekend-trips/${trip.slug}`}
      className="flex min-w-0 flex-col overflow-hidden rounded-[1rem] border border-slate-200 bg-[#f8fafc] no-underline text-inherit shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 w-full"
    >
      <div
        className="relative h-36 w-full shrink-0 rounded-t-[1rem] bg-cover bg-center md:h-40"
        style={{ backgroundImage: `url(${coverImage})` }}
      >
        <div className="absolute inset-0 rounded-t-[1rem] bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-1.5 px-4 py-3">
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-slate-900">{trip.title}</p>
          <p className="text-xs text-slate-400">
            {trip.location}, {trip.country}
          </p>
        </div>
        <p className="text-xs text-slate-600">{dateRange}</p>
      </div>
    </Link>
  );
}

export default function WeekendTripsPage() {
  const trips = getAllTrips();

  return (
    <div className="flex flex-col">
      <section className="section-container border-b border-slate-100">
        <div className="page-header">
          <p className="page-label">{weekendTripsOverview.label}</p>
          <h1 className="page-title">{weekendTripsOverview.title}</h1>
          <p className="page-description">{weekendTripsOverview.description}</p>
        </div>
      </section>

      <section className="section-container bg-box-bg">
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
