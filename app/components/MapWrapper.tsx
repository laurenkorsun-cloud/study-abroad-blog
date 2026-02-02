"use client";

import dynamic from "next/dynamic";
import type { MapEntry } from "../../data/mapEntries";
import { uiStrings } from "../../data/siteContent";

// ═══════════════════════════════════════════════════════════════════════════
// MAP WRAPPER COMPONENTS
// These wrap the Leaflet-based maps and handle dynamic loading
// Use these in server components (pages) to avoid SSR issues
// ═══════════════════════════════════════════════════════════════════════════

function MapLoading({ height = "60vh" }: { height?: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-box-lg border border-slate-200 bg-slate-100 text-text-muted"
      style={{ height, minHeight: "300px" }}
    >
      {uiStrings.loadingMap}
    </div>
  );
}

// Dynamic import of InteractiveMap
const InteractiveMapInner = dynamic(
  () => import("./shared/InteractiveMap").then((m) => m.InteractiveMap),
  { ssr: false, loading: () => <MapLoading /> }
);

// Dynamic import of HomeMapPreview
const HomeMapPreviewInner = dynamic(
  () => import("./HomeMapPreview").then((m) => m.HomeMapPreview),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full overflow-hidden rounded-box-lg border border-slate-200 bg-slate-100 md:h-72 flex items-center justify-center text-text-muted">
        {uiStrings.loadingMap}
      </div>
    )
  }
);

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTED WRAPPER COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

interface InteractiveMapProps {
  entries: MapEntry[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showDetailPanel?: boolean;
  className?: string;
}

export function InteractiveMap(props: InteractiveMapProps) {
  return <InteractiveMapInner {...props} />;
}

export function HomeMapPreview() {
  return <HomeMapPreviewInner />;
}
