"use client";

import { useMemo, useState } from "react";
import { InteractiveMap } from "../components/MapWrapper";
import { getAllRestaurants, type Restaurant } from "../../data/restaurants";
import { getAllEntries, type MapEntry } from "../../data/mapEntries";
import {
  foodPageCoverImage,
  foodPageHeader,
  foodPageSections
} from "../../data/foodContent";

// ═══════════════════════════════════════════════════════════════════════════
// FOOD PAGE - All content from data/foodContent.ts
// Restaurants from data/restaurants.ts
// ═══════════════════════════════════════════════════════════════════════════

type FoodRestaurant = Restaurant & {
  pageSlug?: string;
};

function RestaurantModal({
  restaurant,
  onClose
}: {
  restaurant: FoodRestaurant;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/70 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-box-lg bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
              {restaurant.city}, {restaurant.country}
            </p>
            <h3 className="text-xl font-semibold text-text-primary">
              {restaurant.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 p-6">
          {restaurant.imageUrls.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {restaurant.imageUrls.map((url, idx) => (
                <div
                  key={`${restaurant.id}-${idx}`}
                  className="h-56 overflow-hidden rounded-box border border-slate-200 bg-slate-50"
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-3">
              {restaurant.highlight && (
                <p className="text-sm font-medium text-text-primary">
                  {restaurant.highlight}
                </p>
              )}
              {restaurant.notes && (
                <p className="text-sm leading-relaxed text-text-secondary">
                  {restaurant.notes}
                </p>
              )}
            </div>
            <div className="space-y-2 text-sm">
              {restaurant.neighborhood && (
                <p className="text-text-secondary">
                  <span className="font-medium text-text-primary">Area:</span>{" "}
                  {restaurant.neighborhood}
                </p>
              )}
              <p className="text-text-secondary">
                <span className="font-medium text-text-primary">Rating:</span>{" "}
                {restaurant.rating > 0 ? `★ ${restaurant.rating.toFixed(1)}` : "Not rated yet"}
              </p>
              <p className="text-text-secondary">
                <span className="font-medium text-text-primary">Coordinates:</span>{" "}
                {restaurant.lat.toFixed(3)}, {restaurant.lng.toFixed(3)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FoodPage() {
  const baseRestaurants = getAllRestaurants();
  const allEntries = getAllEntries();
  const restaurantEntries = allEntries.filter((e) => e.type === "restaurant");
  const [selectedRestaurant, setSelectedRestaurant] = useState<FoodRestaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const restaurants: FoodRestaurant[] = useMemo(() => {
    const merged: FoodRestaurant[] = [...baseRestaurants];
    const existingIds = new Set(baseRestaurants.map((r) => r.id));

    restaurantEntries.forEach((entry) => {
      if (!existingIds.has(entry.id)) {
        merged.push({
          id: entry.id,
          name: entry.title,
          city: entry.city,
          country: entry.country,
          neighborhood: entry.tags?.[0] ?? "",
          lat: entry.latitude,
          lng: entry.longitude,
          rating: entry.rating ?? 0,
          notes: entry.notes ?? "Add your review and notes here.",
          highlight: entry.notes ?? "Add your highlight here.",
          imageUrls: entry.images ?? [],
          relatedTripSlugs: [],
          pageSlug: entry.pageSlug
        });
      }
    });

    return merged;
  }, [baseRestaurants, restaurantEntries]);

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
  const filteredRestaurants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return restaurants;

    return restaurants.filter((restaurant) =>
      [
        restaurant.name,
        restaurant.city,
        restaurant.country,
        restaurant.neighborhood ?? ""
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [restaurants, searchQuery]);

  const restaurantsByCity = useMemo(() => {
    const grouped = filteredRestaurants.reduce<Record<string, FoodRestaurant[]>>((acc, restaurant) => {
      if (!acc[restaurant.city]) acc[restaurant.city] = [];
      acc[restaurant.city].push(restaurant);
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([city, items]) => ({
        city,
        items: items.sort((a, b) => a.name.localeCompare(b.name))
      }));
  }, [filteredRestaurants]);

  return (
    <div className="flex flex-col">
      <div
        className="h-48 w-full bg-slate-200 bg-cover bg-center md:h-56 lg:h-64"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.06), rgba(15,23,42,0.35)), url(${foodPageCoverImage})`
        }}
        role="img"
        aria-label="Food cover"
      />

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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant, city, or country..."
              className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-text-primary outline-none ring-0 placeholder:text-slate-400 focus:border-slate-500 sm:max-w-md"
            />
            <p className="text-xs text-text-muted">
              {filteredRestaurants.length} result{filteredRestaurants.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="space-y-8">
            {restaurantsByCity.map(({ city, items }) => (
              <div key={city} className="space-y-3">
                <h3 className="text-lg font-semibold text-text-primary">{city}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRestaurant(r)}
                      className="content-box space-y-2 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                    >
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
                          {r.rating > 0 ? `★ ${r.rating.toFixed(1)}` : "Not rated"}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {r.highlight || "Click to view photos and notes."}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {restaurantsByCity.length === 0 && (
              <div className="rounded-box border border-slate-200 bg-white px-4 py-6 text-center text-sm text-text-muted">
                No restaurants found for "{searchQuery}".
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedRestaurant && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}
    </div>
  );
}
