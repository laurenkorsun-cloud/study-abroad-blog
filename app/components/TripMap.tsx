"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapEntry } from "../../data/mapEntries";

// Fix default Leaflet marker icons in Next.js
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
  });
}

type TripMapProps = {
  entries: MapEntry[];
  cityCenter: [number, number];
};

export function TripMap({ entries, cityCenter }: TripMapProps) {
  const [selected, setSelected] = useState<MapEntry | null>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);

  useEffect(() => {
    if (map && selected) {
      map.setView([selected.latitude, selected.longitude], 14);
    }
  }, [selected, map]);

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "restaurant":
        return "#0ea5e9";
      case "experience":
        return "#22c55e";
      case "landmark":
        return "#f97316";
      default:
        return "#111827";
    }
  };

  return (
    <div
      className={`flex gap-4 transition-all duration-500 ${
        selected ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      {/* Map */}
      <div
        className={`relative overflow-hidden border border-slate-200 bg-slate-100 transition-all duration-500 ${
          selected
            ? "h-[50vh] md:h-[70vh] md:w-2/3"
            : "h-[70vh] w-full md:h-[78vh]"
        }`}
      >
        <MapContainer
          center={[cityCenter[1], cityCenter[0]]}
          zoom={11}
          scrollWheelZoom
          className="h-full w-full"
          ref={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {entries.map((entry) => (
            <Marker
              key={entry.id}
              position={[entry.latitude, entry.longitude]}
              eventHandlers={{
                click: () => setSelected(entry)
              }}
            >
              <Popup>
                <div className="space-y-1 text-xs text-slate-900">
                  <p className="font-semibold">{entry.title}</p>
                  <p className="text-[11px] text-slate-700">
                    {entry.city}, {entry.country}
                  </p>
                  {entry.rating && (
                    <p className="text-[11px] text-amber-600">
                      ★ {entry.rating.toFixed(1)} / 5
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-1 text-[11px] font-medium text-sky-700 underline-offset-2 hover:underline"
                    onClick={() => setSelected(entry)}
                  >
                    View details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div
          className={`flex-1 overflow-y-auto border border-slate-200 bg-white p-6 transition-all duration-500 ${
            selected ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {selected.type}
              </p>
              <h3 className="mt-1 text-lg font-semibold md:text-xl">
                {selected.title}
              </h3>
              <p className="text-xs text-slate-500">
                {selected.city}, {selected.country}
              </p>
              {selected.rating && (
                <p className="mt-2 text-sm font-semibold text-amber-600">
                  ★ {selected.rating.toFixed(1)} / 5
                </p>
              )}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          {selected.notes && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Notes
              </p>
              <p className="mt-1 text-sm text-slate-700">{selected.notes}</p>
            </div>
          )}

          {selected.images && selected.images.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Gallery
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {selected.images.map((url, idx) => (
                  <div
                    key={idx}
                    className="h-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${url})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selected.tags && selected.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
