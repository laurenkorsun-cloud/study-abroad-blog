import { FoodMap } from "./FoodMap";

export default function FoodPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Food & Coffee
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          A map of everything I tasted along the way.
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          From tiny Roman trattorias to seaside lemon pastries and Paris
          bakeries, this map collects the restaurants and cafés that quietly
          defined the semester abroad.
        </p>
      </section>

      <FoodMap />
    </div>
  );
}

