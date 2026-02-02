import Link from "next/link";

type TripSection = {
  heading: string;
  body: string;
};

type TripGalleryItem = {
  id: string;
  title: string;
  imageUrl: string;
  locationLabel?: string;
};

type TripMapSpot = {
  id: string;
  label: string;
  description: string;
  x: string;
  y: string;
};

type FoodSpot = {
  id: string;
  name: string;
  description: string;
  highlight: string;
};

type WeekendTripDetail = {
  slug: string;
  title: string;
  location: string;
  country: string;
  dateRange: string;
  heroImage: string;
  sections: TripSection[];
  gallery: TripGalleryItem[];
  mapSpots: TripMapSpot[];
  foodSpots: FoodSpot[];
};

const TRIPS: WeekendTripDetail[] = [
  {
    slug: "florence-first-weekend",
    title: "Florence – First Weekend Away",
    location: "Florence",
    country: "Italy",
    dateRange: "Sept 5 – 7, 2026",
    heroImage:
      "https://images.pexels.com/photos/1796727/pexels-photo-1796727.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sections: [
      {
        heading: "Arriving in a city that feels like a painting",
        body:
          "We stepped off the train into warm air and a city that looked exactly how textbooks tried to describe it—only louder, more colorful, and full of tourists holding gelato at 10 a.m. The walk from the station to our hostel was a blur of cobblestones, scooters, and the first glimpse of the Duomo pulling the street upward like a magnet."
      },
      {
        heading: "Letting the art slow us down",
        body:
          "Instead of racing through museums, we decided on one gallery a day. The rest of the time we let ourselves move slowly—sitting on church steps, sketching in tiny notebooks, and choosing cafés based only on how sunlit their outdoor tables looked. Florence made it feel okay to take up space in the middle of the afternoon just to notice things."
      }
    ],
    gallery: [
      {
        id: "florence-bridge",
        title: "Sunset over the Arno",
        imageUrl:
          "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1600",
        locationLabel: "Ponte Vecchio"
      },
      {
        id: "florence-duomo",
        title: "Finding the Duomo around every corner",
        imageUrl:
          "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
        locationLabel: "Piazza del Duomo"
      },
      {
        id: "florence-side-street",
        title: "Quiet side streets between museums",
        imageUrl:
          "https://images.pexels.com/photos/210488/pexels-photo-210488.jpeg?auto=compress&cs=tinysrgb&w=1600",
        locationLabel: "Historic center"
      }
    ],
    mapSpots: [
      {
        id: "duomo",
        label: "Duomo",
        description: "Climbed to the top just before golden hour.",
        x: "58%",
        y: "32%"
      },
      {
        id: "arno",
        label: "Arno River",
        description: "Evening walks when the city finally cooled down.",
        x: "40%",
        y: "58%"
      },
      {
        id: "uffizi",
        label: "Uffizi",
        description: "Two hours of getting lost among paintings I knew from slides.",
        x: "53%",
        y: "45%"
      }
    ],
    foodSpots: [
      {
        id: "gelato",
        name: "Riverside Gelato Stand",
        description:
          "We went twice in one day and the staff remembered us by the second visit.",
        highlight: "Pistachio and stracciatella by the river."
      },
      {
        id: "trattoria",
        name: "Tiny Trattoria on a Side Street",
        description:
          "We only found it because we took a wrong turn. Shared a table with another group of students and swapped stories.",
        highlight: "Rich ragu and house wine in mismatched glasses."
      }
    ]
  },
  {
    slug: "amalfi-coast-escape",
    title: "Amalfi Coast Escape",
    location: "Amalfi Coast",
    country: "Italy",
    dateRange: "Sept 19 – 21, 2026",
    heroImage:
      "https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg?auto=compress&cs=tinysrgb&w=1600",
    sections: [
      {
        heading: "Cliffside buses and endless blue",
        body:
          "The first bus ride along the coast felt like a roller coaster with better views. Houses stacked on hillsides, lemon trees tucked into every spare patch of land, and water that looked too saturated to be real. Every turn felt a little bit like flying."
      },
      {
        heading: "Slowing down by the water",
        body:
          "We gave ourselves permission not to see everything. Instead, we spent entire afternoons on the same patch of rocky beach, reading, swimming, and counting how many ferries came and went. It was the first weekend that felt like real rest, not an itinerary."
      }
    ],
    gallery: [
      {
        id: "coastline",
        title: "Layers of houses above the sea",
        imageUrl:
          "https://images.pexels.com/photos/1796726/pexels-photo-1796726.jpeg?auto=compress&cs=tinysrgb&w=1600",
        locationLabel: "Amalfi"
      },
      {
        id: "boats",
        title: "Boats moving like little brushstrokes",
        imageUrl:
          "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1600",
        locationLabel: "Near Positano"
      },
      {
        id: "beach",
        title: "Long shadows at the end of the day",
        imageUrl:
          "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=1600",
        locationLabel: "Rocky beach"
      }
    ],
    mapSpots: [
      {
        id: "beach-spot",
        label: "Favorite Beach",
        description: "Where we stayed until the sun disappeared completely.",
        x: "42%",
        y: "64%"
      },
      {
        id: "viewpoint",
        label: "Cliffside Viewpoint",
        description: "Quick hike, huge payoff. The whole coastline opened up.",
        x: "60%",
        y: "30%"
      }
    ],
    foodSpots: [
      {
        id: "lemon-pastry",
        name: "Lemon Pastry Shop",
        description:
          "Everything tasted faintly of lemon and sea salt in the best possible way.",
        highlight: "Sfogliatella and lemon granita after a hot hike."
      }
    ]
  }
];

function getTripBySlug(slug: string): WeekendTripDetail | undefined {
  return TRIPS.find((trip) => trip.slug === slug);
}

type TripPageProps = {
  params: {
    slug: string;
  };
};

type MapPreviewProps = {
  spots: TripMapSpot[];
  cityLabel: string;
};

function TripMapPreview({ spots, cityLabel }: MapPreviewProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight md:text-xl">
            Places this weekend took me
          </h2>
          <p className="max-w-md text-xs text-slate-400 md:text-sm">
            A small preview of the neighborhoods, viewpoints, and stretches of
            water that defined this trip. Later, this map will become fully
            interactive.
          </p>
        </div>
        <span className="inline-flex w-max items-center rounded-full bg-slate-50 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-900 shadow shadow-slate-950/40">
          {cityLabel}
        </span>
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] md:items-start">
        <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 md:h-72">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 0, rgba(148,163,184,0.5), transparent 60%), radial-gradient(circle at 80% 100%, rgba(15,23,42,0.9), transparent 70%)"
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-[12%] rounded-3xl border border-dashed border-slate-700/70" />
          <div className="absolute inset-[24%] rounded-3xl border border-dashed border-slate-800/90" />

          {spots.map((spot) => (
            <button
              key={spot.id}
              type="button"
              className="group absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: spot.x, top: spot.y }}
            >
              <span className="block h-3 w-3 rounded-full bg-sky-400 shadow-md shadow-sky-500/50 ring-2 ring-slate-950 transition group-hover:scale-110" />
              <span className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-slate-950/95 px-3 py-1 text-[10px] font-medium text-slate-100 shadow-lg ring-1 ring-slate-800 group-hover:inline-flex">
                {spot.label}
              </span>
            </button>
          ))}
        </div>

        <ul className="space-y-3 text-xs text-slate-200 md:text-sm">
          {spots.map((spot) => (
            <li
              key={spot.id}
              className="flex items-start justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {spot.label}
                </p>
                <p className="text-sm font-medium text-slate-50">
                  {spot.description}
                </p>
              </div>
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400 shadow shadow-sky-500/50" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

type TripGalleryProps = {
  items: TripGalleryItem[];
};

function TripGallery({ items }: TripGalleryProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          Scenes from the weekend
        </h2>
        <p className="text-xs text-slate-400 md:text-sm">
          A few frames that anchor this trip in my memory — the in-betweens as
          much as the landmarks.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item, index) => (
          <figure
            key={item.id}
            className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div
              className="h-40 w-full bg-cover bg-center md:h-44"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            />
            <figcaption className="space-y-1 px-3 py-2 text-xs">
              <p className="font-medium text-slate-50">{item.title}</p>
              {item.locationLabel ? (
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  {item.locationLabel}
                </p>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

type FoodListProps = {
  spots: FoodSpot[];
  city: string;
};

function FoodList({ spots, city }: FoodListProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight md:text-xl">
            Food memories from this trip
          </h2>
          <p className="max-w-md text-xs text-slate-400 md:text-sm">
            The meals, snacks, and coffees that stitched the weekend together.
            Later, these will link directly into the main Food page.
          </p>
        </div>
        <Link
          href="/food"
          className="inline-flex w-max items-center justify-center rounded-full bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-lg shadow-slate-950/40 transition hover:bg-slate-200"
        >
          Explore all food in {city}
        </Link>
      </div>

      <ul className="space-y-3 text-xs text-slate-200 md:text-sm">
        {spots.map((spot) => (
          <li
            key={spot.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-3"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {spot.name}
            </p>
            <p className="text-sm font-medium text-slate-50">
              {spot.highlight}
            </p>
            <p className="mt-1 text-xs text-slate-300">{spot.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function WeekendTripDetailPage({ params }: TripPageProps) {
  const trip = getTripBySlug(params.slug);

  if (!trip) {
    return (
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Weekend Trip
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Trip not found
        </h1>
        <p className="text-sm text-slate-300 md:text-base">
          This trip doesn&apos;t exist yet. Try choosing another weekend from
          the overview page.
        </p>
        <Link
          href="/weekend-trips"
          className="inline-flex w-max items-center justify-center rounded-full bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-lg shadow-slate-950/40 transition hover:bg-slate-200"
        >
          Back to weekend trips
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 px-5 py-8 md:px-8 md:py-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.25), rgba(15,23,42,0.95)), url(${trip.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
            Weekend Trip · {trip.location}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {trip.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200 md:text-sm">
            <span className="rounded-full bg-slate-950/70 px-3 py-1 ring-1 ring-slate-600/70">
              {trip.dateRange}
            </span>
            <span className="rounded-full bg-slate-950/70 px-3 py-1 ring-1 ring-slate-600/70">
              {trip.location}, {trip.country}
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)]">
        <div className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
          {trip.sections.map((section) => (
            <article key={section.heading} className="space-y-2">
              <h2 className="text-base font-semibold tracking-tight md:text-lg">
                {section.heading}
              </h2>
              <p className="text-sm text-slate-200 md:text-[0.95rem]">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold tracking-tight md:text-base">
              Trip notes
            </h2>
            <p className="text-xs text-slate-400">
              Quick context for this weekend — how we got there, who came, and
              what we were hoping to find.
            </p>
          </div>
          <ul className="space-y-2 text-xs text-slate-200 md:text-sm">
            <li>
              <span className="font-medium text-slate-50">From Rome:</span>{" "}
              Train out on Friday afternoon, back late Sunday night.
            </li>
            <li>
              <span className="font-medium text-slate-50">Travel crew:</span>{" "}
              A rotating cast of classmates, new friends, and whoever said
              &quot;yes&quot; in the group chat.
            </li>
            <li>
              <span className="font-medium text-slate-50">Vibe:</span> A mix of
              wandering, people-watching, and finding one place to linger in
              each city.
            </li>
          </ul>
        </section>
      </section>

      <TripGallery items={trip.gallery} />

      <TripMapPreview spots={trip.mapSpots} cityLabel={trip.location} />

      <FoodList spots={trip.foodSpots} city={trip.location} />
    </div>
  );
}


