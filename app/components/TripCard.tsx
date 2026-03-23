"use client";

import Link from "next/link";
import { LightboxableImage } from "./shared/ImageLightbox";

type TripCardTrip = {
  slug: string;
  title: string;
  location: string;
  country: string;
  dateRange?: string;
  slideshow?: { imageUrl: string }[];
};

export function TripCard({
  trip,
  yearSuffix,
  defaultCoverImage
}: {
  trip: TripCardTrip;
  yearSuffix: string;
  defaultCoverImage: string;
}) {
  const coverImage = trip.slideshow?.[0]?.imageUrl || defaultCoverImage;
  const rawDate = trip.dateRange ?? "";
  const dateRange = rawDate ? rawDate.replace(`, ${yearSuffix}`, "").trim() || rawDate : rawDate;

  return (
    <div className="flex min-w-0 w-full flex-col overflow-hidden rounded-sm border border-slate-200/80 bg-white/90 shadow-sm transition hover:shadow-md">
      <LightboxableImage
        src={coverImage}
        className="h-36 w-full shrink-0 cursor-default md:h-40"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(17,94,89,0.35), transparent), url(${coverImage})`
        }}
        ariaLabel={`View cover full size: ${trip.title}`}
      />
      <Link
        href={`/weekend-trips/${trip.slug}`}
        className="flex flex-1 flex-col justify-between gap-1.5 px-4 py-3 font-inter no-underline text-inherit transition hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-800/20"
      >
        <div className="space-y-0.5">
          <p className="font-title text-sm font-semibold text-slate-900">{trip.title}</p>
          <p className="text-xs text-slate-500">
            {trip.location}, {trip.country}
          </p>
        </div>
        <p className="text-xs text-slate-600">{dateRange}</p>
      </Link>
    </div>
  );
}
