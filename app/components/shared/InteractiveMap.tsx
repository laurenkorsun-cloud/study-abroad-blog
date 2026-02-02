"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapEntry } from "../../../data/mapEntries";
import { mapLegend, uiStrings } from "../../../data/siteContent";

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE MAP - Unified map component for all pages
// Used on: Home page, Rome page, Weekend Trip pages, Food page
// All maps share the same behavior and styling
// 
// IMPORTANT: This component MUST be dynamically imported with ssr: false
// Example: const InteractiveMap = dynamic(() => import("./InteractiveMap"), { ssr: false })
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

interface InteractiveMapProps {
  entries: MapEntry[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showDetailPanel?: boolean;
  className?: string;
}

interface DetailPanelProps {
  entry: MapEntry;
  onClose: () => void;
}

function DetailPanel({ entry, onClose }: DetailPanelProps) {
  return (
    <div className="h-full overflow-y-auto border-l border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">
            {entry.type}
          </p>
          <h3 className="text-lg font-semibold text-text-primary">
            {entry.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-text-secondary hover:bg-slate-50"
        >
          {uiStrings.close}
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted">
          {entry.date && <span className="tag">{entry.date}</span>}
          <span className="tag">
            {entry.latitude.toFixed(2)}, {entry.longitude.toFixed(2)}
          </span>
        </div>

        {entry.rating && (
          <p className="text-sm font-medium text-amber-600">
            ★ {entry.rating.toFixed(1)} / 5
          </p>
        )}

        {entry.notes && (
          <p className="text-sm leading-relaxed text-text-secondary">
            {entry.notes}
          </p>
        )}

        {entry.images && entry.images.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              Photos
            </p>
            <div className="grid grid-cols-2 gap-2">
              {entry.images.map((url, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-box bg-slate-100"
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

        {entry.pageSlug && (
          <a
            href={entry.pageSlug}
            className="btn-primary mt-4 w-full justify-center text-center"
          >
            View full post →
          </a>
        )}
      </div>
    </div>
  );
}

function getMarkerColor(type: string): string {
  switch (type) {
    case "restaurant":
      return "#0ea5e9"; // sky-500
    case "experience":
      return "#22c55e"; // green-500
    case "landmark":
      return "#f97316"; // orange-500
    default:
      return "#64748b"; // slate-500
  }
}

function createCustomIcon(type: string) {
  const color = getMarkerColor(type);
  return L.divIcon({
    html: `<div style="
      background-color: ${color};
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: "custom-marker",
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
}

export function InteractiveMap({
  entries,
  center = [20, 0],
  zoom = 2,
  height = "60vh",
  showDetailPanel = true,
  className = ""
}: InteractiveMapProps) {
  const [selected, setSelected] = useState<MapEntry | null>(null);
  const [map, setMap] = useState<LeafletMap | null>(null);

  useEffect(() => {
    if (map && selected) {
      map.setView([selected.latitude, selected.longitude], 14);
    }
  }, [selected, map]);

  const handleClose = () => {
    setSelected(null);
    if (map && center) {
      map.setView(center, zoom);
    }
  };

  return (
    <div className={`overflow-hidden rounded-box-lg border border-slate-200 bg-slate-50 ${className}`}>
      <div
        className={`flex transition-all duration-300 ${
          selected && showDetailPanel ? "flex-row" : ""
        }`}
        style={{ height }}
      >
        {/* Map */}
        <div
          className={`transition-all duration-300 ${
            selected && showDetailPanel ? "w-1/2" : "w-full"
          }`}
          style={{ height }}
        >
          <MapContainer
            center={center}
            zoom={zoom}
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

            {entries.map((entry) => (
              <Marker
                key={entry.id}
                position={[entry.latitude, entry.longitude]}
                icon={createCustomIcon(entry.type)}
                eventHandlers={{
                  click: () => setSelected(entry)
                }}
              >
                <Popup>
                  <div className="space-y-1 text-xs text-text-primary">
                    <p className="font-semibold">{entry.title}</p>
                    <p className="text-[11px] capitalize text-text-muted">
                      {entry.type}
                    </p>
                    {entry.rating && (
                      <p className="text-[11px] text-amber-600">
                        ★ {entry.rating.toFixed(1)} / 5
                      </p>
                    )}
                    <button
                      type="button"
                      className="mt-1 text-[11px] font-medium text-sky-700 underline-offset-2 hover:underline"
                      onClick={() => {
                        setSelected(entry);
                        map?.closePopup();
                      }}
                    >
                      {uiStrings.viewDetails}
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Detail panel - slides in when marker selected */}
        {selected && showDetailPanel && (
          <div
            className="w-1/2 animate-in slide-in-from-right"
            style={{ height }}
          >
            <DetailPanel entry={selected} onClose={handleClose} />
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3">
        <p className="text-xs text-text-muted">
          {mapLegend.instructions}
        </p>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-marker-restaurant"></span>
            {mapLegend.food}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-marker-experience"></span>
            {mapLegend.experience}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-marker-landmark"></span>
            {mapLegend.landmark}
          </span>
        </div>
      </div>
    </div>
  );
}
