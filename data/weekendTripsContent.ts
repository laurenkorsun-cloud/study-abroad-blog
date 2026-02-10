// ═══════════════════════════════════════════════════════════════════════════
// WEEKEND TRIPS CONTENT - Edit content/weekend-trips/overview.json
// Trip entries: edit data/tripPages.ts (or add content/weekend-trips/trips.json)
// ═══════════════════════════════════════════════════════════════════════════

import overviewData from "../content/weekend-trips/overview.json";

export const weekendTripsOverview = {
  label: overviewData.label,
  title: overviewData.title,
  description: overviewData.description,
  cardLabel: overviewData.cardLabel,
  yearSuffix: overviewData.yearSuffix,
  defaultCoverImage: overviewData.defaultCoverImage
};

export const weekendTripDetail = overviewData.detail as {
  pageLabel: string;
  entriesTitle: string;
  weatherTitle: string;
  accommodationLinkLabel: string;
  sidebarSummaryTitle: string;
  sidebarSummaryTemplate: string;
  mapTitle: string;
  mapDescription: string;
  notFoundLabel: string;
  notFoundTitle: string;
  notFoundDescription: string;
  notFoundButton: string;
};
