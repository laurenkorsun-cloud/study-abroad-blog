// ═══════════════════════════════════════════════════════════════════════════
// ROME PAGE CONTENT - Edit content/rome/*.json to change these values
// ═══════════════════════════════════════════════════════════════════════════

import romePageData from "../content/rome/page.json";
import romeEntriesData from "../content/rome/entries.json";
import romeGalleriesData from "../content/rome/galleries.json";

export type RomePageHeader = {
  kicker: string;
  watermark: string;
  title: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  label: string;
  description: string;
  /** Optional images attached directly to the Rome entry card. */
  images?: { imageUrl: string; caption?: string }[];
};

export type GalleryImage = {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  aspect?: "square" | "landscape" | "portrait";
};

export const romePageHeader = romePageData.header as RomePageHeader;
export const romeEntriesSection = romePageData.entriesSection;
export const romeSidebar = romePageData.sidebar;
export const romeGalleriesSection = romePageData.galleries;
export const romeMapSection = romePageData.mapSection;

export const romeDailyPosts = romeEntriesData as BlogPost[];

export const romeGalleryRoma = romeGalleriesData.roma as GalleryImage[];
export const romeGalleryApartment = romeGalleriesData.apartment as GalleryImage[];
