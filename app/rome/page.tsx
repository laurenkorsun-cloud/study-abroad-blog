import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  date: string;
  neighborhood: string;
  excerpt: string;
};

type GalleryItem = {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  aspect?: "square" | "landscape" | "portrait";
};

const DAILY_POSTS: BlogPost[] = [
  {
    id: "first-morning",
    title: "First Morning: Market Coffee and Cobblestones",
    date: "2026-09-02",
    neighborhood: "Trastevere",
    excerpt:
      "I woke up to the sound of the street below coming to life — carts, voices, and the soft clink of espresso cups. I walked to the corner bar where no one spoke English, ordered my first cappuccino entirely in broken Italian, and watched the city stretch awake."
  },
  {
    id: "getting-lost",
    title: "Getting Lost on Purpose After Class",
    date: "2026-09-12",
    neighborhood: "Centro Storico",
    excerpt:
      "Instead of taking the tram home, I decided to walk with no map — just following whatever alley looked most interesting. I kept stumbling onto tiny churches, laundry hanging overhead, and little pockets of quiet that made the city feel strangely intimate."
  },
  {
    id: "routine-forms",
    title: "When a Routine Finally Started to Form",
    date: "2026-10-01",
    neighborhood: "Testaccio",
    excerpt:
      "Somewhere between the morning walk across the Tiber, afternoon classes, and evening grocery runs, life here stopped feeling like a trip and more like a life I belonged to, even if only temporarily."
  }
];

const ROME_GALLERY: GalleryItem[] = [
  {
    id: "evening-river",
    title: "Golden hour along the Tiber",
    location: "Lungotevere",
    imageUrl:
      "https://images.pexels.com/photos/4606725/pexels-photo-4606725.jpeg?auto=compress&cs=tinysrgb&w=1600",
    aspect: "landscape"
  },
  {
    id: "street-cafe",
    title: "Tiny street-side café",
    location: "Trastevere",
    imageUrl:
      "https://images.pexels.com/photos/4606723/pexels-photo-4606723.jpeg?auto=compress&cs=tinysrgb&w=1600",
    aspect: "portrait"
  },
  {
    id: "piazza-night",
    title: "Piazza lights after dinner",
    location: "Campo de' Fiori",
    imageUrl:
      "https://images.pexels.com/photos/1797124/pexels-photo-1797124.jpeg?auto=compress&cs=tinysrgb&w=1600",
    aspect: "landscape"
  }
];

const APARTMENT_GALLERY: GalleryItem[] = [
  {
    id: "kitchen-window",
    title: "Kitchen window view",
    location: "Apartment",
    imageUrl:
      "https://images.pexels.com/photos/3952039/pexels-photo-3952039.jpeg?auto=compress&cs=tinysrgb&w=1600",
    aspect: "landscape"
  },
  {
    id: "desk-corner",
    title: "Study desk and postcards",
    location: "Bedroom",
    imageUrl:
      "https://images.pexels.com/photos/3752981/pexels-photo-3752981.jpeg?auto=compress&cs=tinysrgb&w=1600",
    aspect: "portrait"
  },
  {
    id: "living-room",
    title: "Late-night catch-ups in the living room",
    location: "Living room",
    imageUrl:
      "https://images.pexels.com/photos/3958961/pexels-photo-3958961.jpeg?auto=compress&cs=tinysrgb&w=1600",
    aspect: "landscape"
  }
];

type BlogPostCardProps = {
  post: BlogPost;
};

function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <p className="uppercase tracking-[0.18em] text-slate-400">
          Daily Life · {post.neighborhood}
        </p>
        <p>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </p>
      </div>
      <h3 className="text-base font-semibold text-slate-50 md:text-lg">
        {post.title}
      </h3>
      <p className="text-sm text-slate-200 md:text-[0.95rem]">{post.excerpt}</p>
      <button
        type="button"
        className="text-xs font-medium text-slate-200 underline-offset-4 hover:underline"
      >
        Read full entry (coming soon)
      </button>
    </article>
  );
}

type ImageGalleryProps = {
  title: string;
  subtitle?: string;
  items: GalleryItem[];
};

function ImageGallery({ title, subtitle, items }: ImageGalleryProps) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="text-xs text-slate-400 md:text-sm">{subtitle}</p>
        ) : null}
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <figure
            key={item.id}
            className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/80 ${
              item.aspect === "portrait"
                ? "md:row-span-2"
                : item.aspect === "landscape"
                  ? "md:col-span-2"
                  : ""
            }`}
          >
            <div
              className="h-40 w-full bg-cover bg-center md:h-44"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            />
            <figcaption className="space-y-1 px-3 py-2 text-xs">
              <p className="font-medium text-slate-50">{item.title}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                {item.location}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function RomeMapPreview() {
  const pins = [
    {
      id: "home",
      label: "Apartment",
      area: "Trastevere",
      x: "36%",
      y: "62%"
    },
    {
      id: "campus",
      label: "Campus",
      area: "University area",
      x: "64%",
      y: "38%"
    },
    {
      id: "favorite-cafe",
      label: "Morning coffee",
      area: "Corner café",
      x: "52%",
      y: "55%"
    },
    {
      id: "sunset-spot",
      label: "Sunset overlook",
      area: "Janiculum Hill",
      x: "28%",
      y: "30%"
    }
  ];

  return (
    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:p-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight md:text-xl">
            My Rome, zoomed in
          </h2>
          <p className="max-w-md text-xs text-slate-400 md:text-sm">
            A focused view on the part of the city that became my everyday
            orbit: home, campus, favorite cafés, and where I went to watch the
            sun set over terracotta rooftops.
          </p>
        </div>
        <Link
          href="/food"
          className="inline-flex w-max items-center justify-center rounded-full bg-slate-50 px-4 py-2 text-xs font-medium text-slate-900 shadow-lg shadow-slate-950/40 transition hover:bg-slate-200"
        >
          See food spots
        </Link>
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] md:items-start">
        <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 md:h-72">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.9)), url('https://images.pexels.com/photos/4606725/pexels-photo-4606725.jpeg?auto=compress&cs=tinysrgb&w=1600')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full w-full">
            {pins.map((pin) => (
              <button
                key={pin.id}
                type="button"
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pin.x, top: pin.y }}
              >
                <span className="block h-3 w-3 rounded-full bg-emerald-400 shadow-md shadow-emerald-500/50 ring-2 ring-slate-900 transition group-hover:scale-110" />
                <span className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-slate-950/95 px-3 py-1 text-[10px] font-medium text-slate-100 shadow-lg ring-1 ring-slate-800 group-hover:inline-flex">
                  {pin.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <ul className="space-y-3 text-xs text-slate-200 md:text-sm">
          {pins.map((pin) => (
            <li
              key={pin.id}
              className="flex items-start justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {pin.label}
                </p>
                <p className="text-sm font-medium text-slate-50">
                  {pin.area}
                </p>
              </div>
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400 shadow shadow-emerald-500/50" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function RomePage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Rome · Daily Life
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          The in-between moments that made Rome feel like home.
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          This page gathers the slow mornings, small routines, and late-night
          walks that defined my months in Rome — not just the monuments, but
          the ordinary days that quietly rewired what &quot;home&quot; means.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)]">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight md:text-xl">
              Recent entries
            </h2>
            <span className="text-xs text-slate-400">
              Long-form posts coming soon
            </span>
          </div>
          <div className="space-y-3">
            {DAILY_POSTS.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
            <div
              className="h-40 bg-cover bg-center md:h-44"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(15,23,42,0.85)), url('https://images.pexels.com/photos/4606721/pexels-photo-4606721.jpeg?auto=compress&cs=tinysrgb&w=1600')"
              }}
            />
            <div className="space-y-2 px-4 py-3 text-xs md:px-5 md:py-4">
              <p className="font-semibold uppercase tracking-[0.18em] text-slate-300">
                Daily rhythms
              </p>
              <p className="text-slate-200">
                A semester of tram tickets, grocery lists in Italian, new
                friends, and streets that slowly became familiar.
              </p>
            </div>
          </div>

          <section className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-4 md:p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold tracking-tight md:text-base">
                Rome video moments
              </h2>
              <span className="text-[11px] text-slate-400">
                Embedded clips coming soon
              </span>
            </div>
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
                <div className="aspect-video w-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900 shadow-lg shadow-slate-950/60">
                    ▶
                  </div>
                  <p className="text-xs font-medium text-slate-100">
                    Evening walk from class to the apartment
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Placeholder for future video embeds from your camera roll.
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                You&apos;ll be able to drop in short clips here: café ambience,
                street musicians, tram rides, and everything that feels more
                like a soundscape than a single moment.
              </p>
            </div>
          </section>
        </div>
      </div>

      <ImageGallery
        title="Roma in still frames"
        subtitle="Scenes from the walk to class, weekend afternoons, and evenings wandering back home."
        items={ROME_GALLERY}
      />

      <ImageGallery
        title="Apartment snapshots"
        subtitle="The tiny details of the space I called home: light on the walls, cluttered desks, and all."
        items={APARTMENT_GALLERY}
      />

      <RomeMapPreview />
    </div>
  );
}


