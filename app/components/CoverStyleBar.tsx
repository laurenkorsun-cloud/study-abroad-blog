"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  COVER_VARIANTS,
  NEW_LAYOUT_IDS,
  parseCoverVariant,
  type HomeCoverVariant
} from "../../lib/coverVariants";

function PillLink({
  id,
  label,
  active
}: {
  id: HomeCoverVariant;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={`/?cover=${id}`}
      className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-medium transition md:px-3 md:text-xs ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  );
}

/**
 * Sticky bar for switching home cover layouts. Shown from the site header on `/`
 * so it’s always visible (not lost under the hero).
 */
export function CoverStyleBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = parseCoverVariant(searchParams);

  const coreItems = COVER_VARIANTS.filter((i) => !NEW_LAYOUT_IDS.includes(i.id));
  const newItems = COVER_VARIANTS.filter((i) => NEW_LAYOUT_IDS.includes(i.id));

  return (
    <div className="border-t border-slate-200/90 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto w-full max-w-6xl space-y-3 px-4 py-3 md:px-8 md:py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-left">
            Home cover style
          </p>
          <label className="mx-auto flex w-full max-w-xs items-center gap-2 sm:mx-0 sm:max-w-none">
            <span className="sr-only">Choose a cover layout</span>
            <select
              value={current}
              onChange={(e) => {
                const v = e.target.value as HomeCoverVariant;
                router.push(`/?cover=${v}`, { scroll: false });
              }}
              className="w-full rounded-lg border-2 border-violet-300 bg-white px-3 py-2.5 text-sm font-semibold text-slate-900 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200 sm:w-auto sm:min-w-[220px]"
            >
              {COVER_VARIANTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/95 px-2 py-2 shadow-sm md:justify-start">
            {coreItems.map((item) => (
              <PillLink key={item.id} id={item.id} label={item.label} active={current === item.id} />
            ))}
          </div>

          <div className="rounded-xl border-2 border-violet-300 bg-violet-50 px-2 py-2.5 shadow-sm">
            <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-violet-900 md:text-left">
              New layouts — Fluid · Warm · Journal
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 md:justify-start">
              {newItems.map((item) => (
                <PillLink key={item.id} id={item.id} label={item.label} active={current === item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
