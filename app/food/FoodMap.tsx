"use client";

import { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getAllRestaurants, type Restaurant } from "../../data/restaurants";

// Fix default Leaflet marker icons in Next.js
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

type FoodMapProps = {
  initialZoom?: number;
};

type RestaurantModalProps = {
  restaurant: Restaurant;
  onClose: () => void;
};

function RestaurantModal({ restaurant, onClose }: RestaurantModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Food Spot
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-slate-50 md:text-xl">
              {restaurant.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="grid max-h-[70vh] gap-4 overflow-y-auto p-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-3 text-sm text-slate-200">
            <p className="text-xs text-slate-400">
              {restaurant.city}, {restaurant.country}
              {restaurant.neighborhood ? ` · ${restaurant.neighborhood}` : ""}
            </p>
            <p className="text-xs font-semibold text-amber-300">
              ★ {restaurant.rating.toFixed(1)} / 5
            </p>
            <p className="text-sm font-medium text-slate-50">
              {restaurant.highlight}
            </p>
            <p className="text-sm text-slate-200">{restaurant.notes}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Gallery
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              {restaurant.imageUrls.map((url) => (
                <div
                  key={url}
                  className="h-28 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                >
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${url})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FoodMap({ initialZoom = 2 }: FoodMapProps) {
  const restaurants = useMemo(() => getAllRestaurants(), []);
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);

  const center: [number, number] = [20, 0]; // world-ish center

  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 md:h-[78vh]">
      <MapContainer
        center={center}
        zoom={initialZoom}
        scrollWheelZoom
        className="h-full w-full"
        ref={setMap}
        minZoom={2}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.lat, restaurant.lng]}
            eventHandlers={{
              click: () => setSelected(restaurant)
            }}
          >
            <Popup>
              <div className="space-y-1 text-xs text-slate-900">
                <p className="font-semibold">{restaurant.name}</p>
                <p className="text-[11px] text-slate-700">
                  {restaurant.city}, {restaurant.country}
                </p>
                <p className="text-[11px] text-amber-600">
                  ★ {restaurant.rating.toFixed(1)} / 5
                </p>
                <button
                  type="button"
                  className="mt-1 text-[11px] font-medium text-sky-700 underline-offset-2 hover:underline"
                  onClick={() => {
                    setSelected(restaurant);
                    map?.closePopup();
                  }}
                >
                  Open details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selected ? (
        <RestaurantModal restaurant={selected} onClose={() => setSelected(null)} />
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-4 py-3">
        <div className="pointer-events-auto rounded-full bg-slate-950/70 px-4 py-2 text-xs text-slate-100 ring-1 ring-slate-700/80">
          Drag, scroll, and click markers to explore food memories across the
          semester.
        </div>
      </div>
    </div>
  );
}

