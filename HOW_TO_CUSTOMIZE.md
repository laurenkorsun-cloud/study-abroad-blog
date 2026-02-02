# How to Customize Fonts & Colors

## Quick Reference

All customization happens in **3 files**:
1. `app/layout.tsx` - Font imports
2. `tailwind.config.ts` - Font & color definitions
3. `app/globals.css` - Base styles

---

## Changing Fonts

### Step 1: Update `app/layout.tsx`

Replace the font imports at the top. Here are all 5 options:

#### Option 1: Modern Minimal (Current)
```tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});
```

#### Option 2: Classic Editorial
```tsx
import { Crimson_Pro, Source_Sans_Pro } from "next/font/google";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap"
});

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["400", "600"],
  display: "swap"
});
```

#### Option 3: Clean & Contemporary
```tsx
import { Work_Sans, Lora } from "next/font/google";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap"
});
```

#### Option 4: Sophisticated Sans
```tsx
import { Montserrat, Merriweather } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
  display: "swap"
});
```

#### Option 5: Elegant & Refined
```tsx
import { Raleway, Cormorant_Garamond } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
  display: "swap"
});
```

### Step 2: Update `tailwind.config.ts`

Change the `fontFamily` section to match your chosen fonts:

```ts
fontFamily: {
  sans: ["var(--font-inter)", "system-ui", "sans-serif"], // Change --font-inter to your font variable
  serif: ["var(--font-playfair)", "Georgia", "serif"],   // Change --font-playfair to your font variable
}
```

---

## Changing Box Background Colors

### Update `tailwind.config.ts`

Find the `colors` section and change `box-bg`:

#### Option 1: Soft Warm Grey (Current)
```ts
colors: {
  "box-bg": "#f8fafc", // slate-50
}
```

#### Option 2: Cool Light Blue
```ts
colors: {
  "box-bg": "#eff6ff", // blue-50
}
```

#### Option 3: Warm Cream
```ts
colors: {
  "box-bg": "#fffbeb", // amber-50
}
```

#### Option 4: Neutral Stone
```ts
colors: {
  "box-bg": "#fafaf9", // stone-50
}
```

#### Option 5: Cool Mint
```ts
colors: {
  "box-bg": "#f0fdfa", // teal-50
}
```

---

## Using the New Styles

### Content Boxes

Replace old dark-bordered boxes with:
```tsx
// Old (with dark border)
<div className="border border-slate-800 bg-slate-900/60">

// New (light background, no dark border)
<div className="bg-box-bg">
```

### Navigation Buttons

Your navigation buttons already use the correct font (`font-sans`). They'll automatically use the new font once you update the config.

### Headings

All `h1`, `h2`, `h3`, `h4` automatically use the serif font. No changes needed in components.

---

## Testing Your Changes

1. Save the files
2. Restart dev server: `npm run dev`
3. Check your pages - fonts and colors should update automatically

---

## Need Help?

See `DESIGN_SYSTEM.md` for detailed font and color previews.
