import unescoData from "../content/unesco-sights.json";

export type UnescoCategory = "Cultural" | "Natural" | "Mixed";
export type UnescoStatus = "visited" | "next-up" | "wishlist";

export interface UnescoStatusMeta {
  id: UnescoStatus;
  label: string;
  description: string;
}

export interface UnescoSight {
  id: string;
  name: string;
  city: string;
  country: string;
  unescoCategory: UnescoCategory;
  status: UnescoStatus;
  visitDate?: string;
  inscriptionYear?: number;
  memory?: string;
  notes?: string;
  lat: number;
  lng: number;
  imageUrls: string[];
  tags: string[];
}

export const unescoPageHeader = unescoData.pageHeader as {
  label: string;
  title: string;
  description: string;
};

export const unescoStatuses = unescoData.statuses as UnescoStatusMeta[];
export const unescoSights = unescoData.sights as UnescoSight[];

export function getAllUnescoSights(): UnescoSight[] {
  return unescoSights;
}
