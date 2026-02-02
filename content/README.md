# Content Folder – Editable Content

All user-facing content is stored here as JSON. **Edit these files to update the site** — no component code changes needed.

## Folder Structure

```
content/
├── site.json           # Site metadata, nav, UI strings, map legend
├── home.json           # Home page hero, sections, map preview
├── rome/
│   ├── page.json       # Rome page header, sidebar, section labels
│   ├── entries.json    # Rome blog posts (daily life entries)
│   └── galleries.json  # Roma + apartment image galleries
├── food/
│   └── page.json       # Food page header and section labels
├── weekend-trips/
│   ├── overview.json   # Weekend trips overview page + detail labels
│   └── trips.json      # (Optional) Full trip data – or edit data/tripPages.ts
├── restaurants.json    # All restaurant entries (Food page + map)
└── map-entries.json    # Map markers (appear on all maps)
```

## Editor Workflow

1. **Edit** the JSON files in `content/` with any text editor.
2. **Run** `npm run dev` to preview changes locally.
3. **Build** with `npm run build` before publishing.

## What to Edit Where

| Content | File |
|---------|------|
| Site title, nav links | `site.json` |
| Home hero, section cards | `home.json` |
| Rome blog posts | `rome/entries.json` |
| Rome galleries | `rome/galleries.json` |
| Rome page copy | `rome/page.json` |
| Food page copy | `food/page.json` |
| Restaurants | `restaurants.json` |
| Map markers | `map-entries.json` |
| Weekend trip entries | `data/tripPages.ts` (or add `trips.json`) |

## Map System

- **Single source of truth:** `map-entries.json`
- Markers appear on Home, Rome, Weekend Trip, and Food maps.
- Restaurant markers are also derived from `restaurants.json` on the Food page.
- Add or edit a marker in `map-entries.json` — it updates everywhere.

## JSON Schema Examples

### Blog entry (Rome)
```json
{
  "id": "first-morning",
  "title": "First Morning: Market Coffee and Cobblestones",
  "date": "Sept 2, 2026",
  "label": "Daily Life · Trastevere",
  "description": "Your text here..."
}
```

### Map entry
```json
{
  "id": "unique-id",
  "title": "Place Name",
  "type": "restaurant",
  "latitude": 41.889,
  "longitude": 12.4705,
  "city": "Rome",
  "country": "Italy",
  "pageSlug": "/food",
  "notes": "Optional notes",
  "rating": 4.8,
  "images": ["https://..."],
  "tags": ["cacio-e-pepe", "pasta"]
}
```

### Restaurant
```json
{
  "id": "unique-id",
  "name": "Restaurant Name",
  "city": "Rome",
  "country": "Italy",
  "lat": 41.889,
  "lng": 12.4705,
  "rating": 4.8,
  "highlight": "One-line highlight",
  "notes": "Full notes",
  "imageUrls": ["https://..."],
  "relatedTripSlugs": ["florence-first-weekend"]
}
```
