/** URL ?cover=… options for the home page layout experiments */

export type HomeCoverVariant =
  | "minimal"
  | "bold"
  | "editorial"
  | "startup"
  | "classic"
  | "fluid"
  | "warm"
  | "journal";

export const COVER_VARIANTS: Array<{ id: HomeCoverVariant; label: string }> = [
  { id: "classic", label: "Classic" },
  { id: "minimal", label: "Minimal" },
  { id: "bold", label: "Bold" },
  { id: "editorial", label: "Editorial" },
  { id: "startup", label: "Startup" },
  { id: "fluid", label: "Fluid" },
  { id: "warm", label: "Warm" },
  { id: "journal", label: "Journal" }
];

export const NEW_LAYOUT_IDS: HomeCoverVariant[] = ["fluid", "warm", "journal"];

export function parseCoverVariant(searchParams: URLSearchParams | null): HomeCoverVariant {
  if (!searchParams) return "classic";
  const raw = searchParams.get("cover") ?? "";
  const v = raw.toLowerCase();
  const match = COVER_VARIANTS.find((c) => c.id === v);
  return match ? match.id : "classic";
}
