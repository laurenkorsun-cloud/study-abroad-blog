import {
  homeHero,
  homeSections,
  homeMapPreview
} from "../data/homeContent";
import { getAllEntries } from "../data/mapEntries";
import { HomeCover } from "./components/home/HomeCoverVariants";

// ═══════════════════════════════════════════════════════════════════════════
// HOME PAGE — journal-themed layout (see globals.css + tailwind journal-*)
// ═══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const entries = getAllEntries();

  return (
    <HomeCover hero={homeHero} sections={homeSections} mapPreview={homeMapPreview} entries={entries} />
  );
}
