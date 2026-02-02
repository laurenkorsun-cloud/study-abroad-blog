// ═══════════════════════════════════════════════════════════════════════════
// RESTAURANTS - Edit content/restaurants.json to add/remove/edit restaurants
// ═══════════════════════════════════════════════════════════════════════════

import restaurantsData from "../content/restaurants.json";

export type Restaurant = {
  id: string;
  name: string;
  city: string;
  country: string;
  neighborhood?: string;
  lat: number;
  lng: number;
  rating: number;
  notes: string;
  highlight: string;
  imageUrls: string[];
  relatedTripSlugs?: string[];
};

export const RESTAURANTS = restaurantsData as Restaurant[];

export function getAllRestaurants(): Restaurant[] {
  return RESTAURANTS;
}

export function getRestaurantsByCity(city: string): Restaurant[] {
  return RESTAURANTS.filter(
    (r) => r.city.toLowerCase() === city.toLowerCase()
  );
}

export function getRestaurantsByTripSlug(slug: string): Restaurant[] {
  return RESTAURANTS.filter((r) => r.relatedTripSlugs?.includes(slug));
}
