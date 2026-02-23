"use client";

import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
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

// Fix default Leaflet marker icons in Next.js (only in browser)
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

interface InteractiveMapProps {
  entries: MapEntry[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showDetailPanel?: boolean;
  className?: string;
}

type CountryBounds = {
  type: string;
  properties?: {
    name?: string;
  };
  geometry: {
    type: string;
    coordinates: unknown;
  };
};

type CountryFeatureCollection = {
  type: "FeatureCollection";
  features: CountryBounds[];
};

const COUNTRY_NAME_TO_ISO3: Record<string, string> = {
  italy: "ITA",
  switzerland: "CHE",
  portugal: "PRT",
  "czech republic": "CZE",
  hungary: "HUN",
  netherlands: "NLD",
  ireland: "IRL",
  france: "FRA",
  malta: "MLT"
};

const COUNTRY_GEOJSON_BASE =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries";

function normalizeCountry(country: string): string {
  return country.trim().toLowerCase();
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
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
    className: "custom-marker",
    iconSize: [22, 22],
    iconAnchor: [11, 11]
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
  const [visitedCountryGeoJson, setVisitedCountryGeoJson] =
    useState<CountryFeatureCollection | null>(null);

  const visitedCountryCodes = useMemo(
    () =>
      Array.from(
        new Set(
          entries
            .map((entry) => COUNTRY_NAME_TO_ISO3[normalizeCountry(entry.country)])
            .filter((code): code is string => !!code)
        )
      ),
    [entries]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadCountryShapes() {
      if (visitedCountryCodes.length === 0) {
        setVisitedCountryGeoJson(null);
        return;
      }

      try {
        const responses = await Promise.all(
          visitedCountryCodes.map((code) =>
            fetch(`${COUNTRY_GEOJSON_BASE}/${code}.geo.json`).then((res) =>
              res.ok ? res.json() : null
            )
          )
        );

        if (cancelled) return;

        const features = responses
          .flatMap((item) => {
            if (!item || typeof item !== "object") return [];
            const maybeCollection = item as {
              type?: string;
              features?: CountryBounds[];
            };

            if (
              maybeCollection.type === "FeatureCollection" &&
              Array.isArray(maybeCollection.features)
            ) {
              return maybeCollection.features;
            }

            return [item as CountryBounds];
          })
          .filter((feature) => feature?.type === "Feature");

        setVisitedCountryGeoJson({
          type: "FeatureCollection",
          features
        });
      } catch {
        // If country overlay fails to load, keep map usable without blocking markers.
        if (!cancelled) setVisitedCountryGeoJson(null);
      }
    }

    loadCountryShapes();

    return () => {
      cancelled = true;
    };
  }, [visitedCountryCodes]);

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

            {/* Light pink overlay for countries you've visited */}
            {visitedCountryGeoJson && visitedCountryGeoJson.features.length > 0 && (
              <GeoJSON
                data={visitedCountryGeoJson as unknown as GeoJSON.GeoJsonObject}
                interactive={false}
                style={{
                  color: "#f9a8d4",
                  weight: 1,
                  fillColor: "#fbcfe8",
                  fillOpacity: 0.28
                }}
              />
            )}

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
