// ═══════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS - Import these anywhere in the site
// ═══════════════════════════════════════════════════════════════════════════

export {
  ContentBox,
  type ContentBoxProps,
  type ContentBoxImage
} from "./ContentBox";
export {
  WeekendMomentCard,
  type WeekendMomentCardProps
} from "./WeekendMomentCard";
export { ImageGallery, type GalleryImage } from "./ImageGallery";
export {
  ImageLightboxProvider,
  LightboxableImage,
  useImageLightbox
} from "./ImageLightbox";
export { EntryPage, type EntryPageProps, type MomentEntry } from "./EntryPage";

// NOTE: InteractiveMap MUST be dynamically imported with ssr: false
// Example:
// const InteractiveMap = dynamic(
//   () => import("../components/shared/InteractiveMap").then((m) => m.InteractiveMap),
//   { ssr: false }
// );
