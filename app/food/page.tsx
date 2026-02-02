import { InteractiveMap } from "../components/MapWrapper";
import { getAllRestaurants } from "../../data/restaurants";
import { getAllEntries, type MapEntry } from "../../data/mapEntries";
import { foodPageHeader, foodPageSections } from "../../data/foodContent";
import { uiStrings } from "../../data/siteContent";

// ═══════════════════════════════════════════════════════════════════════════
// FOOD PAGE - All content from data/foodContent.ts
// Restaurants from data/restaurants.ts
// ═══════════════════════════════════════════════════════════════════════════

export default function FoodPage() {
  const restaurants = getAllRestaurants();
  const allEntries = getAllEntries();
  const restaurantEntries = allEntries.filter((e) => e.type === "restaurant");

  const mapEntries: MapEntry[] = restaurants.map((r) => ({
    id: r.id,
    title: r.name,
    type: "restaurant" as const,
    latitude: r.lat,
    longitude: r.lng,
    city: r.city,
    country: r.country,
    notes: `${r.highlight}\n\n${r.notes}`,
    rating: r.rating,
    images: r.imageUrls,
    pageSlug:
      r.relatedTripSlugs && r.relatedTripSlugs.length > 0
        ? `/weekend-trips/${r.relatedTripSlugs[0]}`
        : "/rome",
    tags: [r.city, r.country, r.neighborhood].filter(Boolean) as string[]
  }));

  restaurantEntries.forEach((entry) => {
    if (!mapEntries.find((m) => m.id === entry.id)) {
      mapEntries.push(entry);
    }
  });

  const cityCount = new Set(restaurants.map((r) => r.city)).size;
  const countryCount = new Set(restaurants.map((r) => r.country)).size;

  return (
    <div className="flex flex-col">
      <section className="section-container border-b border-slate-100">
        <div className="page-header">
          <p className="page-label">{foodPageHeader.label}</p>
          <h1 className="page-title">{foodPageHeader.title}</h1>
          <p className="page-description">{foodPageHeader.description}</p>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-box-bg px-6 py-4 md:px-10">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="tag">
            {mapEntries.length} {foodPageSections.placesLabel}
          </span>
          <span className="tag">
            {cityCount} {foodPageSections.citiesLabel}
          </span>
          <span className="tag">
            {countryCount} {foodPageSections.countriesLabel}
          </span>
        </div>
      </section>

      <section className="section-container">
        <InteractiveMap
          entries={mapEntries}
          center={[42, 12]}
          zoom={5}
          height="70vh"
          showDetailPanel={true}
        />
      </section>

      <section className="section-container border-t border-slate-100 bg-box-bg">
        <div className="space-y-4">
          <h2 className="box-title">{foodPageSections.allPlacesTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.slice(0, 6).map((r) => (
              <div key={r.id} className="content-box space-y-2">
                {r.imageUrls[0] && (
                  <div
                    className="-mx-box-padding -mt-box-padding mb-3 h-32 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${r.imageUrls[0]})`,
                      borderRadius: "1rem 1rem 0 0"
                    }}
                  />
                )}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-text-primary">{r.name}</p>
                    <p className="text-xs text-text-muted">
                      {r.city}, {r.country}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-amber-600">
                    ★ {r.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{r.highlight}</p>
              </div>
            ))}
          </div>
          {restaurants.length > 6 && (
            <p className="text-center text-sm text-text-muted">
              + {restaurants.length - 6} {foodPageSections.moreOnMapSuffix}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
