"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { getTripPageBySlug } from "../../../data/tripPages";
import { weekendTripDetail } from "../../../data/weekendTripsContent";
import { getWeatherForTrip } from "../../../data/tripWeather";
import { useImageLightbox } from "../../components/shared/ImageLightbox";
import { WeekendSocialPost } from "../../components/weekend/WeekendSocialPost";
import { getEntriesByIds } from "../../../data/mapEntries";

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
  const { open } = useImageLightbox();

  const next = () => setCurrent((c) => (c + 1) % safeSlides.length);
  const prev = () => setCurrent((c) => (c - 1 + safeSlides.length) % safeSlides.length);

  if (safeSlides.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-slate-50 md:rounded-2xl">
      <div className="relative min-h-[300px] h-[72vh] w-full md:min-h-[400px] md:h-[82vh]">
        {safeSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current
                ? "z-[1] opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <button
              type="button"
              className="h-full w-full cursor-default border-0 bg-cover bg-center bg-no-repeat p-0"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
              onClick={() => open(slide.imageUrl)}
              aria-label={slide.caption ? `View full image: ${slide.caption}` : "View full image"}
            />
            {slide.caption && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-6 py-6 md:px-10 md:py-8">
                <p className="max-w-2xl font-inter text-sm text-slate-100 md:text-base">
                  {slide.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
      >
        ←
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-900 shadow-lg transition hover:bg-white"
      >
        →
      </button>

      <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
        {safeSlides.map((_, idx) => (
          <button
            type="button"
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(idx);
            }}
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
      <section className="section-container border-b border-slate-200/70 bg-journal-paper py-section md:py-section-lg">
        <div className="page-header max-w-xl">
          <p className="page-label">{weekendTripDetail.notFoundLabel}</p>
          <h1 className="page-title">{weekendTripDetail.notFoundTitle}</h1>
          <p className="page-description">{weekendTripDetail.notFoundDescription}</p>
          <Link href="/weekend-trips" className="btn-primary mt-6 inline-flex w-max">
            {weekendTripDetail.notFoundButton}
          </Link>
        </div>
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
    <div className="flex flex-col bg-journal-paper">
      {/* Page label */}
      <section className="section-container border-b border-slate-200/70 bg-journal-paper pb-2 pt-section md:pb-3 md:pt-section-lg">
        <div className="mx-auto max-w-xl text-center">
          <p className="page-label">{weekendTripDetail.pageLabel}</p>
        </div>
      </section>

      {/* Slim profile bar */}
      <section className="section-container border-b border-slate-200/70 bg-journal-paper pb-section pt-2 md:pb-section-lg">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-title text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            {trip.title}
          </h1>
          <p className="mt-1.5 font-inter text-xs text-slate-500">{trip.dateRange}</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {trip.locationTags
              ? trip.locationTags.map((loc) => (
                  <span
                    key={loc}
                    className="rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-0.5 font-inter text-[11px] text-slate-600"
                  >
                    {loc}
                  </span>
                ))
              : (
                  <span className="rounded-full border border-slate-200/80 bg-white/80 px-2.5 py-0.5 font-inter text-[11px] text-slate-600">
                    {trip.location}, {trip.country}
                  </span>
                )}
          </div>
        </div>
      </section>

      <div className="section-container bg-journal-paper">
        <div className="mx-auto w-full max-w-xl">
        {/* Weather */}
        {weather && (
          <section className="border-t border-slate-200/80 bg-journal-paper py-6 md:py-8">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-md sm:p-5">
              <p className="text-center font-title text-sm font-semibold text-slate-900 md:text-base">
                {weekendTripDetail.weatherTitle}
              </p>
              <div className="mt-4 flex flex-row flex-nowrap items-stretch justify-between gap-0 sm:gap-1 md:gap-2">
                {weather.days.map((day) => (
                  <div
                    key={day.label}
                    className="min-w-0 flex-1 border-l border-slate-100 px-1 text-center first:border-l-0 first:pl-0 sm:px-2 md:px-3"
                  >
                    {day.icon && (
                      <div className="mb-0.5 text-lg sm:text-xl" aria-hidden="true">
                        {day.icon}
                      </div>
                    )}
                    <p className="text-[10px] font-semibold text-text-muted sm:text-xs">{day.label}</p>
                    <p className="text-[11px] font-semibold text-text-primary sm:text-sm">
                      {day.high}°F / {day.low}°F
                    </p>
                    <p className="mt-1 line-clamp-4 font-inter text-[10px] leading-snug text-text-secondary sm:text-xs md:line-clamp-3">
                      {day.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        </div>

        {trip.slideshow?.length ? (
          <section className="border-t border-slate-200/80 bg-journal-paper py-6 md:py-8">
            <div className="mx-auto w-full max-w-5xl overflow-hidden md:rounded-2xl md:border md:border-slate-200/80 md:shadow-md lg:max-w-6xl">
              <Slideshow slides={trip.slideshow} />
            </div>
          </section>
        ) : null}

        <div className="mx-auto w-full max-w-xl">
        {/* Feed */}
        <section className="border-t border-slate-200/80 bg-journal-paper py-6 md:py-8">
          <h2 className="box-title mb-6 text-center font-title">{weekendTripDetail.entriesTitle}</h2>
          <div className="space-y-6">
            {(trip.activities ?? []).map((activity) => (
              <WeekendSocialPost
                key={activity.id}
                activity={activity}
                linkLabel={
                  activity.linkLabel ??
                  (activity.entryType === "accommodation"
                    ? weekendTripDetail.accommodationLinkLabel
                    : undefined)
                }
              />
            ))}
          </div>
        </section>

        {/* Map */}
        <section className="border-t border-slate-200/80 bg-journal-paper py-6 pb-section md:py-8 md:pb-section-lg">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="box-title font-title">{weekendTripDetail.mapTitle}</h2>
            <p className="mx-auto max-w-2xl font-inter text-sm text-text-secondary md:mx-0 md:text-base">
              {weekendTripDetail.mapDescription}
            </p>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md">
            <TripMap
              entries={mapEntries}
              cityCenter={cityCenter}
              activeMarkerId={activeMarkerId}
              onMarkerSelect={(markerId) => setActiveMarkerId(markerId)}
            />
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
