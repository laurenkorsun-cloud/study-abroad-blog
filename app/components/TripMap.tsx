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
  /** Optional id of the currently active/highlighted marker */
  activeMarkerId?: string | null;
  /** Called when a marker is selected from the map */
  onMarkerSelect?: (markerId: string | null) => void;
};

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

const createMarkerIcon = (type: string, isActive: boolean) => {
  const baseColor = getMarkerColor(type);
  const color = isActive ? "#0f172a" : baseColor;
  const size = isActive ? 28 : 22;

  return L.divIcon({
    html: `<span style="
      display:block;
      width:${size}px;
      height:${size}px;
      border-radius:9999px;
      background-color:${color};
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    "></span>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

export function TripMap({
  entries,
  cityCenter,
  activeMarkerId,
  onMarkerSelect
}: TripMapProps) {
  const [map, setMap] = useState<LeafletMap | null>(null);

  const activeEntry = activeMarkerId
    ? entries.find((entry) => entry.id === activeMarkerId) || null
    : null;

  useEffect(() => {
    if (map && activeEntry) {
      map.setView([activeEntry.latitude, activeEntry.longitude], 14);
    }
  }, [activeEntry, map]);

  const hasActive = !!activeEntry;

  return (
    <div
      className={`flex gap-4 transition-all duration-500 ${
        hasActive ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      {/* Map */}
      <div
        className={`relative overflow-hidden rounded-box-lg border border-slate-200 bg-slate-100 transition-all duration-500 ${
          hasActive
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
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {entries.map((entry) => (
            <Marker
              key={entry.id}
              position={[entry.latitude, entry.longitude]}
              icon={createMarkerIcon(
                entry.type,
                !!activeEntry && activeEntry.id === entry.id
              )}
              eventHandlers={{
                click: () => onMarkerSelect && onMarkerSelect(entry.id)
              }}
            >
              <Popup>
                <div className="space-y-1 text-xs text-slate-900">
                  <p className="font-semibold">{entry.title}</p>
                  <p className="text-[11px] text-slate-700">
                    {entry.address ?? `${entry.city}, ${entry.country}`}
                  </p>
                  {entry.rating && (
                    <p className="text-[11px] text-amber-600">
                      ★ {entry.rating.toFixed(1)} / 5
                    </p>
                  )}
                  <button
                    type="button"
                    className="mt-1 text-[11px] font-medium text-sky-700 underline-offset-2 hover:underline"
                    onClick={() => onMarkerSelect && onMarkerSelect(entry.id)}
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
      {activeEntry && (
        <div className="flex-1 overflow-y-auto rounded-box border border-slate-200 bg-white p-6 transition-all duration-500">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {activeEntry.type}
              </p>
              <h3 className="mt-1 text-lg font-semibold md:text-xl">
                {activeEntry.title}
              </h3>
              <p className="text-xs text-slate-500">
                {activeEntry.address ?? `${activeEntry.city}, ${activeEntry.country}`}
              </p>
              {activeEntry.rating && (
                <p className="mt-2 text-sm font-semibold text-amber-600">
                  ★ {activeEntry.rating.toFixed(1)} / 5
                </p>
              )}
            </div>
            <button
              onClick={() => onMarkerSelect && onMarkerSelect(null)}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          {activeEntry.notes && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Notes
              </p>
              <p className="mt-1 text-sm text-slate-700">{activeEntry.notes}</p>
            </div>
          )}

          {activeEntry.images && activeEntry.images.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Gallery
              </p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {activeEntry.images.map((url, idx) => (
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

          {activeEntry.tags && activeEntry.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeEntry.tags.map((tag) => (
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
