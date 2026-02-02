# How to Edit Moments / Activity Boxes

## Quick Guide

All moments are stored in `data/tripPages.ts` in the `activities` array for each trip.

---

## Basic Structure

Each moment box has this structure:

```ts
{
  id: "unique-id",           // Required: unique identifier
  title: "Box Title",        // Required: title at the top
  description: "Text here",  // Required: main content text
  images: [                  // Optional: array of images for slideshow
    {
      imageUrl: "url",
      caption: "Optional caption"
    }
  ],
  width: "1/2",              // Optional: box width (see options below)
  height: "auto"             // Optional: box height (see options below)
}
```

---

## Adding a New Moment Box

1. Open `data/tripPages.ts`
2. Find the trip you want to edit (e.g., `florence-first-weekend`)
3. Add a new object to the `activities` array:

```ts
activities: [
  // ... existing boxes ...
  {
    id: "my-new-moment",
    title: "My New Moment Title",
    description: "This is the text that will appear in the box. You can write as much as you want here.",
    images: [ // Optional: photo slideshow
      {
        imageUrl: "https://example.com/image1.jpg",
        caption: "Optional caption for this photo"
      },
      {
        imageUrl: "https://example.com/image2.jpg"
      }
    ]
  }
]
```

---

## Width Options

Control how wide each box is on desktop:

- **`width: "1/2"`** or **not specified** → Takes 1 column (default, 50% width)
- **`width: "full"`** → Takes full width (2 columns, 100% width)
- **`width: "1/3"`** → Takes 1 column (same as default)
- **`width: "2/3"`** → Takes 2 columns (full width)

**Example:**
```ts
{
  id: "wide-moment",
  title: "This box is full width",
  description: "It spans both columns on desktop.",
  width: "full"
}
```

---

## Height Options

Control the height of each box:

- **`height: "auto"`** or **not specified** → Auto height based on content (default)
- **`height: "tall"`** → Taller box (spans 2 rows in grid)
- **`height: "short"`** → Minimum height of 200px

**Example:**
```ts
{
  id: "tall-moment",
  title: "This box is taller",
  description: "It takes up more vertical space.",
  height: "tall"
}
```

---

## Photo Slideshows

Each moment box can have a **photo slideshow** with multiple images:

```ts
{
  id: "art-slow-down",
  title: "Letting the art slow us down",
  description: "Instead of racing through museums, we decided on one gallery a day...",
  images: [
    {
      imageUrl: "https://example.com/image1.jpg",
      caption: "Sketching in a quiet corner" // Optional caption
    },
    {
      imageUrl: "https://example.com/image2.jpg",
      caption: "Afternoon light on rooftops"
    },
    {
      imageUrl: "https://example.com/image3.jpg" // No caption needed
    }
  ]
}
```

**Features:**
- **Multiple photos**: Add as many images as you want
- **Optional captions**: Each image can have a caption
- **Navigation**: Arrow buttons and dots appear automatically when there's more than 1 image
- **Smooth transitions**: Fade between images

---

## Complete Example

Here's a full example with slideshows:

```ts
activities: [
  {
    id: "morning-coffee",
    title: "Morning Coffee Routine",
    description: "Every morning started the same way: walking to the corner bar, ordering a cappuccino in broken Italian, and watching the city wake up around me.",
    images: [
      {
        imageUrl: "https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg",
        caption: "Morning cappuccino at the corner bar"
      },
      {
        imageUrl: "https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg"
      }
    ]
  },
  {
    id: "full-width-story",
    title: "A Longer Reflection",
    description: "This box contains a longer story or reflection. Perfect for detailed memories or important moments.",
    // No images - just text
  },
  {
    id: "single-photo-moment",
    title: "Quick Note",
    description: "Just a brief thought with one photo.",
    images: [
      {
        imageUrl: "https://example.com/photo.jpg"
      }
    ]
  }
]
```

---

## Editing Existing Boxes

1. Open `data/tripPages.ts`
2. Find the box you want to edit by its `id`
3. Change `title`, `description`, `images`, `width`, or `height`
4. Save the file
5. The page will automatically update (no code changes needed!)

**To add more photos to a slideshow:**
- Add more objects to the `images` array
- Each photo can have its own `caption`

**To remove photos:**
- Remove objects from the `images` array
- Or delete the entire `images` property to remove the slideshow

---

## Removing a Box

Simply delete the entire object from the `activities` array:

```ts
activities: [
  {
    id: "keep-this",
    title: "Keep This",
    description: "..."
  },
  // Delete the entire object below:
  // {
  //   id: "remove-this",
  //   title: "Remove This",
  //   description: "..."
  // }
]
```

---

## Tips

- **No images?** Just omit the `images` property
- **Single photo?** Use an array with one image: `images: [{ imageUrl: "url" }]`
- **Multiple photos?** Add multiple objects to the `images` array for a slideshow
- **Captions:** Add optional `caption` to any image in the slideshow
- **Navigation:** Slideshow arrows and dots appear automatically when there are 2+ images
- **Mobile:** All boxes stack vertically on mobile regardless of width setting
- **Styling:** Boxes automatically have a soft light grey background with no dark borders

---

## Visual Preview

```
┌─────────────────────┬─────────────────────┐
│  Box 1 (1/2 width)  │  Box 2 (1/2 width)  │
│  Title              │  Title              │
│  Description...     │  Description...     │
└─────────────────────┴─────────────────────┘
┌───────────────────────────────────────────┐
│  Box 3 (full width)                        │
│  Title                                     │
│  Longer description that spans full width │
└───────────────────────────────────────────┘
```
