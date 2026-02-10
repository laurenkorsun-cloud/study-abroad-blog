import weatherData from "../content/weekend-trips/weather.json";

export interface TripWeatherDay {
  label: string; // e.g. "Fri", "Sat", "Sun"
  high: number; // high temperature in °F
  low: number; // low temperature in °F
  summary: string; // short description like "Sunny and warm"
  icon?: string; // optional emoji like ☀️, ☁️, ❄️
}

export interface TripWeather {
  slug: string; // matches TripPage.slug
  location: string; // e.g. "Zurich, Switzerland"
  dateRange: string; // e.g. "Jan 23 – 25, 2026"
  days: TripWeatherDay[];
}

const TRIP_WEATHER: TripWeather[] = Array.isArray(weatherData?.trips) ? (weatherData.trips as TripWeather[]) : [];

export function getWeatherForTrip(slug: string): TripWeather | null {
  if (!slug) return null;
  const lower = slug.toLowerCase();
  return TRIP_WEATHER.find((trip) => trip.slug.toLowerCase() === lower) ?? null;
}

