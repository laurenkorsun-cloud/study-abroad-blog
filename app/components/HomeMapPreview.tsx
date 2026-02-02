"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getAllEntries } from "../../data/mapEntries";
import { mapLegend } from "../../data/siteContent";

// ═══════════════════════════════════════════════════════════════════════════
// HOME MAP PREVIEW - Simplified map for the home page
// Shows all global entries as a preview
//
// IMPORTANT: This component MUST be dynamically imported with ssr: false
// ═══════════════════════════════════════════════════════════════════════════

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

function getMarkerColor(type: string): string {
  switch (type) {
    case "restaurant":
      return "#0ea5e9";
    case "experience":
      return "#22c55e";
    case "landmark":
      return "#f97316";
    default:
      return "#64748b";
  }
}

function createCustomIcon(type: string) {
  const color = getMarkerColor(type);
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: "custom-marker",
    iconSize: [10, 10],
    iconAnchor: [5, 5]
  });
}

export function HomeMapPreview() {
  const entries = getAllEntries();
  const center: [number, number] = [45, 10]; // Europe-ish center

  return (
    <div className="overflow-hidden rounded-box-lg border border-slate-200 bg-slate-50">
      <div className="h-64 w-full md:h-72">
        <MapContainer
          center={center}
          zoom={4}
          scrollWheelZoom={false}
          className="h-full w-full"
          minZoom={3}
          maxZoom={10}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {entries.map((entry) => (
            <Marker
              key={entry.id}
              position={[entry.latitude, entry.longitude]}
              icon={createCustomIcon(entry.type)}
            >
              <Popup>
                <div className="space-y-1 text-xs">
                  <p className="font-semibold">{entry.title}</p>
                  <p className="text-[11px] capitalize text-slate-500">
                    {entry.type}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-2.5">
        <p className="text-xs text-text-muted">
          {mapLegend.previewDescription}
        </p>
        <div className="flex items-center gap-3 text-[11px] text-text-muted">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-marker-restaurant"></span>
            {mapLegend.food}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-marker-experience"></span>
            {mapLegend.experience}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-marker-landmark"></span>
            {mapLegend.landmark}
          </span>
        </div>
      </div>
    </div>
  );
}
