// ═══════════════════════════════════════════════════════════════════════════
// MAP ENTRIES - Edit content/map-entries.json to add/remove/edit markers
// Markers appear on all maps (Home, Rome, Weekend Trips, Food)
// ═══════════════════════════════════════════════════════════════════════════

import mapEntriesData from "../content/map-entries.json";

export type MapEntryType = "restaurant" | "experience" | "landmark";

export interface MapEntry {
  id: string;
  title: string;
  type: MapEntryType;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  pageSlug: string;
  /** Optional: street address for display (e.g. "Bahnhofstrasse 1, 8001 Zurich") */
  address?: string;
  images?: string[];
  notes?: string;
  date?: string;
  rating?: number;
  tags?: string[];
}

export const MAP_ENTRIES = mapEntriesData as MapEntry[];

export function getAllEntries(): MapEntry[] {
  return MAP_ENTRIES;
}

export function getEntriesByIds(ids: string[] | undefined): MapEntry[] {
  if (!ids || !Array.isArray(ids)) return [];
  return MAP_ENTRIES.filter((entry) => ids.includes(entry.id));
}

export function filterMapEntries(options: {
  city?: string;
  country?: string;
  types?: MapEntryType[];
  minRating?: number;
  tags?: string[];
}) {
  const { city, country, types, minRating, tags } = options;
  return MAP_ENTRIES.filter((entry) => {
    const cityOk = city ? entry.city === city : true;
    const countryOk = country ? entry.country === country : true;
    const typeOk = types ? types.includes(entry.type) : true;
    const ratingOk =
      typeof minRating === "number"
        ? typeof entry.rating === "number" && entry.rating >= minRating
        : true;
    const tagsOk =
      tags && tags.length
        ? (entry.tags ?? []).some((t) => tags.includes(t))
        : true;
    return cityOk && countryOk && typeOk && ratingOk && tagsOk;
  });
}
