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
    <div className="flex min-w-0 w-full flex-col overflow-hidden rounded-[1rem] border border-slate-200 bg-[#f8fafc] shadow-sm transition hover:shadow-md">
      <LightboxableImage
        src={coverImage}
        className="h-36 w-full shrink-0 cursor-default rounded-t-[1rem] md:h-40"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.55), transparent), url(${coverImage})`
        }}
        ariaLabel={`View cover full size: ${trip.title}`}
      />
      <Link
        href={`/weekend-trips/${trip.slug}`}
        className="flex flex-1 flex-col justify-between gap-1.5 px-4 py-3 no-underline text-inherit transition hover:bg-slate-50/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-300"
      >
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-slate-900">{trip.title}</p>
          <p className="text-xs text-slate-400">
            {trip.location}, {trip.country}
          </p>
        </div>
        <p className="text-xs text-slate-600">{dateRange}</p>
      </Link>
    </div>
  );
}
