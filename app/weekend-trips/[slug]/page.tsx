"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { getTripPageBySlug } from "../../../data/tripPages";
import { getEntriesByIds } from "../../../data/mapEntries";
import { ContentBox } from "../../components/shared";
import { weekendTripDetail } from "../../../data/weekendTripsContent";
import { getWeatherForTrip } from "../../../data/tripWeather";

const TripMap = dynamic(
  () => import("../../components/TripMap").then((mod) => ({ default: mod.TripMap })),
  { ssr: false }
);

type SlideshowProps = {
  slides: Array<{ imageUrl: string; caption?: string }>;
};

function Slideshow({ slides }: SlideshowProps) {
  const safeSlides = Array.isArray(slides) && slides.length > 0 ? slides : [];
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % safeSlides.length);
  const prev = () => setCurrent((c) => (c - 1 + safeSlides.length) % safeSlides.length);

  if (safeSlides.length === 0) return null;

  return (
    <section className="relative overflow-hidden border-t border-b border-slate-200 bg-slate-50">
      <div className="relative h-[60vh] w-full md:h-[70vh]">
        {safeSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
            {slide.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-6 py-6 md:px-10 md:py-8">
                <p className="max-w-2xl text-sm text-slate-100 md:text-base">
                  {slide.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {safeSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 w-2 rounded-full transition ${
              idx === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default function WeekendTripDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug as string | undefined;
  const trip = slug ? getTripPageBySlug(slug) : null;
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  const weather = slug ? getWeatherForTrip(slug) : null;

  if (!trip) {
    return (
      <section className="space-y-4 px-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          {weekendTripDetail.notFoundLabel}
        </p>
        <h1 className="text-2xl font-semibold md:text-3xl">
          {weekendTripDetail.notFoundTitle}
        </h1>
        <p className="text-sm text-slate-600 md:text-base">
          {weekendTripDetail.notFoundDescription}
        </p>
        <Link
          href="/weekend-trips"
          className="inline-flex w-max items-center justify-center rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-800"
        >
          {weekendTripDetail.notFoundButton}
        </Link>
      </section>
    );
  }

  const mapEntries = getEntriesByIds(trip.mapEntryIds ?? []);
  const cityCenter: [number, number] =
    trip.location === "Florence"
      ? [11.255, 43.77]
      : trip.location.includes("Amalfi")
        ? [14.602, 40.634]
        : trip.location === "Zurich" || trip.country === "Switzerland"
          ? [8.5417, 47.3769]
          : trip.location === "Lisbon" || trip.country === "Portugal"
            ? [-9.1393, 38.7223]
            : trip.location === "Rome"
              ? [12.4964, 41.9028]
              : trip.location === "Prague" || trip.country === "Czech Republic"
                ? [14.4378, 50.0755]
                : trip.location === "Budapest" || trip.country === "Hungary"
                  ? [19.0402, 47.4979]
                  : trip.location === "Amsterdam" || trip.country === "Netherlands"
                    ? [4.9041, 52.3676]
                    : trip.location === "Dublin" || trip.country === "Ireland"
                      ? [-6.2603, 53.3498]
                      : trip.location === "Paris" || trip.country === "France"
                        ? [2.3522, 48.8566]
                        : trip.location === "Valletta" || trip.country === "Malta"
                          ? [14.5189, 35.9042]
                          : trip.location === "Milan" || (trip.country === "Italy" && trip.slug === "milan")
                            ? [9.19, 45.4642]
                            : [12.496, 41.902];

  return (
    <div className="flex flex-col">
      {/* Title box - matches Rome page header structure */}
      <section className="section-container">
        <div className="page-header">
          <p className="page-label">{weekendTripDetail.pageLabel}</p>
          <h1 className="page-title">{trip.title}</h1>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="tag">{trip.dateRange}</span>
            {trip.locationTags
              ? trip.locationTags.map((loc) => (
                  <span key={loc} className="tag">
                    {loc}
                  </span>
                ))
              : (
                  <span className="tag">
                    {trip.location}, {trip.country}
                  </span>
                )}
          </div>
        </div>
      </section>

      {/* Weather forecast for this weekend */}
      {weather && (
        <section className="section-container bg-white pt-0">
          <div className="mx-auto max-w-3xl">
            <div className="content-box flex flex-col items-center gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                {weekendTripDetail.weatherTitle}
              </p>
              <div className="flex gap-4">
                {weather.days.map((day) => (
                  <div key={day.label} className="min-w-[70px] text-center">
                    {day.icon && (
                      <div className="mb-1 text-xl" aria-hidden="true">
                        {day.icon}
                      </div>
                    )}
                    <p className="text-xs font-semibold text-text-muted">
                      {day.label}
                    </p>
                    <p className="text-sm font-semibold text-text-primary">
                      {day.high}°F / {day.low}°F
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {day.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Slideshow */}
      {trip.slideshow?.length ? <Slideshow slides={trip.slideshow} /> : null}

      {/* Chronological timeline of moments */}
      <section className="section-container bg-white">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="box-title">{weekendTripDetail.entriesTitle}</h2>

          <div className="relative mt-6 space-y-6 border-l border-slate-200 pl-6">
            {(trip.activities ?? []).map((activity) => (
              <div key={activity.id} className="relative">
                {/* Timeline dot */}
                <span className="absolute -left-[7px] top-4 h-3 w-3 rounded-full border-2 border-white bg-accent-primary shadow" />

                <ContentBox
                  title={activity.title}
                  label={activity.label}
                  date={activity.date}
                  description={activity.description}
                  images={activity.images}
                  link={activity.link}
                  linkLabel={activity.linkLabel ?? (activity.entryType === "accommodation" ? weekendTripDetail.accommodationLinkLabel : undefined)}
                  rating={activity.rating}
                  className="ml-4 hover:shadow-md transition-shadow"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive map at the bottom, stays consistent with other pages */}
      <section className="section-container border-t border-slate-100 bg-white">
        <div className="space-y-2">
          <h2 className="box-title">{weekendTripDetail.mapTitle}</h2>
          <p className="max-w-2xl text-sm text-text-secondary md:text-base">
            {weekendTripDetail.mapDescription}
          </p>
        </div>
        <div className="mt-4">
          <TripMap
            entries={mapEntries}
            cityCenter={cityCenter}
            activeMarkerId={activeMarkerId}
            onMarkerSelect={(markerId) => setActiveMarkerId(markerId)}
          />
        </div>
      </section>
    </div>
  );
}
