# Content Editing Guide

This travel blog is **fully editable** before publishing. All text, titles, dates, locations, images, and map markers come from structured content files.

## Quick Reference

| What to edit | Where |
|--------------|-------|
| Site name, nav, metadata | `content/site.json` |
| Home page | `content/home.json` |
| Rome page & blog posts | `content/rome/*.json` |
| Food page | `content/food/page.json` |
| Restaurants | `content/restaurants.json` |
| Map markers | `content/map-entries.json` |
| Weekend trips overview | `content/weekend-trips/overview.json` |
| Weekend trip entries | `data/tripPages.ts` |

## Reusable Components

- **MomentBox (ContentBox):** Title, date/location, text, optional image slideshow. Faded grey background, adjustable sizing.
- **ImageGallery / Slideshow:** Multiple images with captions. Grid or slideshow layout.
- **MapComponent (InteractiveMap):** Shared across all pages. Zoomable, clickable markers. Click → detail panel or navigates to entry.
- **EntryPage:** Layout combining MomentBoxes, slideshow, galleries, and map. Used for Rome and Weekend Trip detail pages.

## Editor Workflow

1. Edit JSON files in `content/` or `data/tripPages.ts`
2. Run `npm run dev` to preview
3. Run `npm run build` before deploying

## Theming (Global)

- **Colors:** `tailwind.config.ts` – `box-bg`, `text-primary`, etc.
- **Typography:** System fonts (sans, serif) in `globals.css`
- **Spacing:** `section`, `box-padding` in Tailwind theme

See `content/README.md` for JSON schema examples.
