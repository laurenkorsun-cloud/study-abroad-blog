import { ContentBox } from "../shared/ContentBox";
import type { TripActivity } from "../../../data/tripPages";

export type WeekendSocialPostProps = {
  activity: TripActivity;
  linkLabel?: string;
  className?: string;
};

/** Feed-style post: optional date line + ContentBox body (nested with `bare`). */
export function WeekendSocialPost({
  activity,
  linkLabel,
  className = ""
}: WeekendSocialPostProps) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md transition-shadow hover:shadow-lg ${className}`}
    >
      {activity.date ? (
        <div className="px-4 pb-2 pt-4">
          <p className="font-inter text-xs text-slate-500">{activity.date}</p>
        </div>
      ) : null}

      <ContentBox
        bare
        bareImagePlaceholder
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
