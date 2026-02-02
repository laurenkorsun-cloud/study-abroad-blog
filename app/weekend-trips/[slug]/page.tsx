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

      {/* Entries section - same vlog-style layout as Rome Recent Entries */}
      <section className="section-container bg-box-bg">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Main: chronological content blocks */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="box-title">{weekendTripDetail.entriesTitle}</h2>
            </div>
            <div className="space-y-4">
              {trip.activities.map((activity) => (
                <ContentBox
                  key={activity.id}
                  title={activity.title}
                  label={activity.label}
                  date={activity.date}
                  description={activity.description}
                  images={activity.images}
                />
              ))}
            </div>
          </div>

          {/* Sidebar - matches Rome layout */}
          <div className="space-y-4">
            {/* Hero image from slideshow */}
            <div className="image-card">
              <div
                className="h-44 bg-cover bg-center"
                style={
                  trip.slideshow[0]
                    ? {
                        backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.1), rgba(15,23,42,0.6)), url(${trip.slideshow[0].imageUrl})`
                      }
                    : undefined
                }
              />
              <div className="image-card-caption space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {trip.location}
                </p>
                <p className="text-sm text-text-secondary">
                  {trip.dateRange} · {trip.country}
                </p>
              </div>
            </div>

            {/* Trip summary card */}
            <div className="content-box space-y-3">
              <h2 className="text-sm font-semibold">{weekendTripDetail.sidebarSummaryTitle}</h2>
              <p className="text-sm text-text-secondary">
                {weekendTripDetail.sidebarSummaryTemplate
                  .replace("{location}", trip.location)
                  .replace("{count}", String(trip.activities.length))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive map */}
      <section className="section-container border-t border-slate-100 bg-white">
        <div className="space-y-2">
          <h2 className="box-title">{weekendTripDetail.mapTitle}</h2>
          <p className="max-w-2xl text-sm text-text-secondary md:text-base">
            {weekendTripDetail.mapDescription}
          </p>
        </div>
        <div className="mt-4">
          <TripMap entries={mapEntries} cityCenter={cityCenter} />
        </div>
      </section>
    </div>
  );
}
