"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { getTripPageBySlug } from "../../../data/tripPages";
import { getEntriesByIds } from "../../../data/mapEntries";
import { ContentBox } from "../../components/shared";
import { weekendTripDetail } from "../../../data/weekendTripsContent";

const TripMap = dynamic(
  () => import("../../components/TripMap").then((mod) => ({ default: mod.TripMap })),
  { ssr: false }
);

type SlideshowProps = {
  slides: Array<{ imageUrl: string; caption?: string }>;
};

function Slideshow({ slides }: SlideshowProps) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden border-t border-b border-slate-200 bg-slate-50">
      <div className="relative h-[60vh] w-full md:h-[70vh]">
        {slides.map((slide, idx) => (
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
        {slides.map((_, idx) => (
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

  const mapEntries = getEntriesByIds(trip.mapEntryIds);
  const cityCenter: [number, number] =
    trip.location === "Florence"
      ? [11.255, 43.77]
      : trip.location.includes("Amalfi")
        ? [14.602, 40.634]
        : [12.496, 41.902];

  return (
    <div className="flex flex-col">
      {/* Title box - matches Rome page header structure */}
      <section className="section-container border-b border-slate-100">
        <div className="page-header">
          <p className="page-label">{weekendTripDetail.pageLabel}</p>
          <h1 className="page-title">{trip.title}</h1>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="tag">{trip.dateRange}</span>
            <span className="tag">
              {trip.location}, {trip.country}
            </span>
          </div>
        </div>
      </section>

      {/* Slideshow */}
      <Slideshow slides={trip.slideshow} />

      {/* Chronological timeline of moments */}
      <section className="section-container bg-white">
        <div className="mx-auto max-w-3xl space-y-4">
          <h2 className="box-title">{weekendTripDetail.entriesTitle}</h2>

          <div className="relative mt-6 space-y-6 border-l border-slate-200 pl-6">
            {trip.activities.map((activity) => (
              <div key={activity.id} className="relative">
                {/* Timeline dot */}
                <span className="absolute -left-[7px] top-4 h-3 w-3 rounded-full border-2 border-white bg-accent-primary shadow" />

                <ContentBox
                  title={activity.title}
                  label={activity.label}
                  date={activity.date}
                  description={activity.description}
                  images={activity.images}
                  isActive={Boolean(
                    activity.mapEntryId &&
                      activeMarkerId &&
                      activity.mapEntryId === activeMarkerId
                  )}
                  onClick={() =>
                    activity.mapEntryId
                      ? setActiveMarkerId(activity.mapEntryId)
                      : undefined
                  }
                  className="ml-4"
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
