import weatherData from "../content/weekend-trips/weather.json";

export interface TripWeatherDay {
  label: string; // e.g. "Fri", "Sat", "Sun"
  high: number; // high temperature (°C or °F - your choice)
  low: number; // low temperature
  summary: string; // short description like "Sunny and warm"
}

export interface TripWeather {
  slug: string; // matches TripPage.slug
  location: string; // e.g. "Zurich, Switzerland"
  dateRange: string; // e.g. "Jan 23 – 25, 2026"
  days: TripWeatherDay[];
}

const TRIP_WEATHER: TripWeather[] = weatherData.trips as TripWeather[];

export function getWeatherForTrip(slug: string): TripWeather | null {
  return TRIP_WEATHER.find((trip) => trip.slug === slug) ?? null;
}

