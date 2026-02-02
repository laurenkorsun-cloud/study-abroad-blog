// ═══════════════════════════════════════════════════════════════════════════
// SITE CONTENT - Edit content/site.json to change these values
// ═══════════════════════════════════════════════════════════════════════════

import siteData from "../content/site.json";

export const siteMeta = siteData.meta as {
  title: string;
  description: string;
  siteName: string;
};

export const navItems = siteData.nav as Array<{ href: string; label: string }>;

export const uiStrings = siteData.ui as {
  loadingMap: string;
  explorePrefix: string;
  viewDetails: string;
  close: string;
  comingSoon: string;
  moreOnMap: string;
};

export const mapLegend = siteData.mapLegend as {
  food: string;
  experience: string;
  landmark: string;
  previewDescription: string;
  instructions: string;
};
