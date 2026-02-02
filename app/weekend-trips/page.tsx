import Link from "next/link";

type WeekendTrip = {
  slug: string;
  location: string;
  country: string;
  dateRange: string;
  coverImage: string;
};

const WEEKEND_TRIPS: WeekendTrip[] = [
  {
    slug: "florence-first-weekend",
    location: "Florence",
    country: "Italy",
    dateRange: "Sept 5 – 7",
    coverImage:
      "https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "amalfi-coast-escape",
    location: "Amalfi Coast",
    country: "Italy",
    dateRange: "Sept 19 – 21",
    coverImage:
      "https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "naples-pizza-pilgrimage",
    location: "Naples",
    country: "Italy",
    dateRange: "Sept 26 – 28",
    coverImage:
      "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "tuscany-autumn-hills",
    location: "Tuscany",
    country: "Italy",
    dateRange: "Oct 3 – 5",
    coverImage:
      "https://images.pexels.com/photos/1450383/pexels-photo-1450383.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "cinque-terre-cliffside-trails",
    location: "Cinque Terre",
    country: "Italy",
    dateRange: "Oct 10 – 12",
    coverImage:
      "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "paris-fall-break",
    location: "Paris",
    country: "France",
    dateRange: "Oct 17 – 20",
    coverImage:
      "https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "barcelona-sea-and-streets",
    location: "Barcelona",
    country: "Spain",
    dateRange: "Oct 24 – 26",
    coverImage:
      "https://images.pexels.com/photos/666697/pexels-photo-666697.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "vienna-cozy-museums",
    location: "Vienna",
    country: "Austria",
    dateRange: "Nov 1 – 3",
    coverImage:
      "https://images.pexels.com/photos/208702/pexels-photo-208702.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "prague-cobblestones-and-cafes",
    location: "Prague",
    country: "Czech Republic",
    dateRange: "Nov 7 – 9",
    coverImage:
      "https://images.pexels.com/photos/415980/pexels-photo-415980.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "budapest-thermal-evenings",
    location: "Budapest",
    country: "Hungary",
    dateRange: "Nov 14 – 16",
    coverImage:
      "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "milan-fashion-and-trains",
    location: "Milan",
    country: "Italy",
    dateRange: "Nov 21 – 23",
    coverImage:
      "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "lake-como-quiet-water",
    location: "Lake Como",
    country: "Italy",
    dateRange: "Nov 28 – 30",
    coverImage:
      "https://images.pexels.com/photos/1674046/pexels-photo-1674046.jpeg?auto=compress&cs=tinysrgb&w=1600"
  },
  {
    slug: "munich-christmas-markets",
    location: "Munich",
    country: "Germany",
    dateRange: "Dec 5 – 7",
    coverImage:
      "https://images.pexels.com/photos/236699/pexels-photo-236699.jpeg?auto=compress&cs=tinysrgb&w=1600"
  }
];

function TripCard({ trip }: { trip: WeekendTrip }) {
  return (
    <Link
      href={`/weekend-trips/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-sm shadow-slate-950/40 transition hover:-translate-y-1 hover:border-slate-400/70 hover:shadow-lg"
    >
      <div
        className="relative h-40 w-full bg-cover bg-center md:h-44"
        style={{ backgroundImage: `url(${trip.coverImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-slate-950/40" />
        <p className="absolute bottom-3 left-3 rounded-full bg-slate-950/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-100 ring-1 ring-slate-600/70">
          Weekend Trip
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
        <p className="text-xs text-slate-400">{trip.dateRange}, 2026</p>
      </div>
    </Link>
  );
}

export default function WeekendTripsPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Weekend Escapes
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          The cities that stretched this semester beyond Rome.
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          A quick overview of every place I slipped away to between classes —
          mornings on trains, nights in new streets, and all the tiny details I
          want to remember from each weekend.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WEEKEND_TRIPS.map((trip) => (
          <TripCard key={trip.slug} trip={trip} />
        ))}
      </div>
    </section>
  );
}

