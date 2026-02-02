import Link from "next/link";

type SectionCardProps = {
  title: string;
  description: string;
  href: string;
  label: string;
  imageUrl: string;
};

function SectionCard({
  title,
  description,
  href,
  label,
  imageUrl
}: SectionCardProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.15), rgba(15,23,42,0.9)), url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col justify-between gap-6 px-6 py-8 md:flex-row md:px-10 md:py-10">
        <div className="space-y-3 md:max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            {label}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className="text-sm text-slate-200 md:text-base">{description}</p>
        </div>
        <div className="flex items-end md:items-center">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full bg-slate-50 px-5 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-slate-950/40 transition hover:bg-slate-200"
          >
            Explore {label}
          </Link>
        </div>
      </div>
    </section>
  );
}

type MapStop = {
  id: string;
  label: string;
  city: string;
  country: string;
  x: string;
  y: string;
};

const MAP_STOPS: MapStop[] = [
  {
    id: "rome",
    label: "Home Base",
    city: "Rome",
    country: "Italy",
    x: "55%",
    y: "52%"
  },
  {
    id: "florence",
    label: "Weekend Trip",
    city: "Florence",
    country: "Italy",
    x: "54%",
    y: "48%"
  },
  {
    id: "paris",
    label: "Fall Break",
    city: "Paris",
    country: "France",
    x: "47%",
    y: "40%"
  },
  {
    id: "barcelona",
    label: "Beach Weekend",
    city: "Barcelona",
    country: "Spain",
    x: "43%",
    y: "50%"
  }
];

function MapPreview() {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Map Preview
          </p>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Tracing everywhere this semester takes me
          </h2>
          <p className="max-w-md text-sm text-slate-300 md:text-base">
            A bird&apos;s-eye view of Rome and the weekend trips that orbit
            around it. Each dot marks a memory we&apos;ll eventually bring to
            life with photos, stories, and routes.
          </p>
        </div>
        <Link
          href="/weekend-trips"
          className="inline-flex w-max items-center justify-center rounded-full bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-lg shadow-slate-950/40 transition hover:bg-slate-200"
        >
          View weekend trips
        </Link>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start">
        <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 md:h-72">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(248,250,252,0.15), transparent 55%), radial-gradient(circle at 80% 80%, rgba(148,163,184,0.4), transparent 55%)"
            }}
          />
          <div className="absolute inset-[12%] rounded-3xl border border-dashed border-slate-600/60" />
          <div className="absolute inset-[22%] rounded-3xl border border-dashed border-slate-700/60" />

          {MAP_STOPS.map((stop) => (
            <button
              key={stop.id}
              type="button"
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: stop.x, top: stop.y }}
            >
              <span className="block h-3 w-3 rounded-full bg-sky-400 shadow-md shadow-sky-500/50 ring-2 ring-slate-900 transition group-hover:scale-110" />
              <span className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-slate-900/95 px-3 py-1 text-[10px] font-medium text-slate-100 shadow-lg ring-1 ring-slate-800 group-hover:inline-flex">
                {stop.city}, {stop.country}
              </span>
            </button>
          ))}
        </div>

        <ul className="space-y-3 text-sm text-slate-200">
          {MAP_STOPS.map((stop) => (
            <li
              key={stop.id}
              className="flex items-start justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {stop.label}
                </p>
                <p className="text-sm font-medium text-slate-50">
                  {stop.city}
                </p>
                <p className="text-xs text-slate-400">{stop.country}</p>
              </div>
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400 shadow shadow-sky-500/50" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-10 md:space-y-14">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 px-6 py-10 md:px-10 md:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(15,23,42,0.9)), url('https://images.pexels.com/photos/4606725/pexels-photo-4606725.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-xl space-y-4 md:space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
            Semester Abroad · 2026
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            A visual diary of the months I called Europe home.
          </h1>
          <p className="text-sm text-slate-200 md:text-base">
            From slow mornings in Rome to spontaneous weekend trains, this
            journal gathers the small details, the messy in-betweens, and the
            moments I never want to forget.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/rome"
              className="inline-flex items-center justify-center rounded-full bg-slate-50 px-5 py-2 text-sm font-medium text-slate-900 shadow-lg shadow-slate-950/40 transition hover:bg-slate-200"
            >
              Start in Rome
            </Link>
            <Link
              href="/weekend-trips"
              className="inline-flex items-center justify-center rounded-full border border-slate-300/40 bg-slate-900/70 px-5 py-2 text-sm font-medium text-slate-50 backdrop-blur transition hover:border-slate-100/60"
            >
              Browse weekend trips
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-10 top-10 hidden h-40 w-40 rounded-full border border-slate-500/40 bg-slate-900/70 blur-3xl md:block" />
      </section>

      <SectionCard
        label="Rome"
        title="Finding a rhythm in the city of endless layers"
        description="My home base: cobblestone streets, grocery runs in Italian, late-afternoon light on terracotta rooftops, and the tiny routines that slowly turned Rome into home."
        href="/rome"
        imageUrl="https://images.pexels.com/photos/1797124/pexels-photo-1797124.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <SectionCard
        label="Weekend Trips"
        title="Chasing new cities between classes and deadlines"
        description="Fast trains, packed backpacks, and just enough time to fall in love with somewhere new. These are the quick escapes that shaped the semester in unexpected ways."
        href="/weekend-trips"
        imageUrl="https://images.pexels.com/photos/286763/pexels-photo-286763.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <SectionCard
        label="Food"
        title="Meals that anchored me to each place"
        description="Plates of cacio e pepe, flaky pastries eaten on the go, market finds, and long dinners with new friends. This space is for the flavors I never want to forget."
        href="/food"
        imageUrl="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1600"
      />

      <MapPreview />
    </div>
  );
}


