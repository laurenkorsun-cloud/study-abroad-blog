import { ContentBox } from "../shared/ContentBox";
import type { TripActivity } from "../../../data/tripPages";

/** Same compact line as the old hashtag (e.g. France·Paris), without a leading #. */
function labelToCompactLine(label?: string): string {
  if (!label?.trim()) return "";
  const t = label.trim().replace(/^#/, "");
  return t.replace(/\s+/g, "");
}

export type WeekendSocialPostProps = {
  tripTitle: string;
  activity: TripActivity;
  linkLabel?: string;
  className?: string;
};

/** Feed-style post: trip avatar header + ContentBox body (nested with `bare`). */
export function WeekendSocialPost({
  tripTitle,
  activity,
  linkLabel,
  className = ""
}: WeekendSocialPostProps) {
  const letter = tripTitle.trim().charAt(0).toUpperCase() || "·";
  const locationLabel = labelToCompactLine(activity.label);

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md transition-shadow hover:shadow-lg ${className}`}
    >
      <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-slate-700 text-sm font-bold text-white shadow-inner"
          aria-hidden="true"
        >
          {letter}
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate font-title text-sm font-semibold text-slate-900">{tripTitle}</p>
          <p className="font-inter text-xs text-slate-500">
            {locationLabel ? (
              <>
                <span className="text-journal-accent">{locationLabel}</span>
                {activity.date ? <span> · {activity.date}</span> : null}
              </>
            ) : (
              (activity.date ?? null)
            )}
          </p>
        </div>
      </header>

      <ContentBox
        bare
        className="!shadow-none"
        title={activity.title}
        description={activity.description}
        images={activity.images}
        rating={activity.rating}
        link={activity.link}
        linkLabel={linkLabel}
      />
    </article>
  );
}
