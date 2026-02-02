# Design System Guide

## Typography Options

### Option 1: **Modern Minimal** (Recommended)
- **Navigation/Buttons**: `Inter` (clean, geometric sans-serif)
- **Headings**: `Playfair Display` (elegant serif for contrast)
- **Body**: `Inter` (same as navigation for consistency)

**Preview:**
- Navigation: `HOME FOOD ROME WEEKEND TRIPS` (Inter, uppercase, tracking-wide)
- Heading: `Florence – First Weekend Away` (Playfair Display, serif)
- Body: `We stepped off the train into warm air...` (Inter, regular)

**Why it works:** Inter is highly readable and modern. Playfair adds elegance without being too formal.

---

### Option 2: **Classic Editorial**
- **Navigation/Buttons**: `Crimson Pro` (serif with character)
- **Headings**: `Crimson Pro` (same family, different weights)
- **Body**: `Source Sans Pro` (clean, readable sans)

**Preview:**
- Navigation: `HOME FOOD ROME WEEKEND TRIPS` (Crimson Pro, uppercase)
- Heading: `Florence – First Weekend Away` (Crimson Pro, bold)
- Body: `We stepped off the train into warm air...` (Source Sans Pro)

**Why it works:** Classic editorial feel, serif navigation adds sophistication.

---

### Option 3: **Clean & Contemporary**
- **Navigation/Buttons**: `Work Sans` (geometric, friendly)
- **Headings**: `Lora` (readable serif)
- **Body**: `Work Sans` (consistent with navigation)

**Preview:**
- Navigation: `HOME FOOD ROME WEEKEND TRIPS` (Work Sans, uppercase)
- Heading: `Florence – First Weekend Away` (Lora, serif)
- Body: `We stepped off the train into warm air...` (Work Sans)

**Why it works:** Work Sans is friendly and modern. Lora is a readable serif that pairs well.

---

### Option 4: **Sophisticated Sans**
- **Navigation/Buttons**: `Montserrat` (geometric, bold)
- **Headings**: `Merriweather` (classic serif)
- **Body**: `Montserrat` (light weight for readability)

**Preview:**
- Navigation: `HOME FOOD ROME WEEKEND TRIPS` (Montserrat, uppercase, bold)
- Heading: `Florence – First Weekend Away` (Merriweather, serif)
- Body: `We stepped off the train into warm air...` (Montserrat, light)

**Why it works:** Montserrat is strong for navigation. Merriweather is excellent for long-form reading.

---

### Option 5: **Elegant & Refined**
- **Navigation/Buttons**: `Raleway` (elegant sans-serif)
- **Headings**: `Cormorant Garamond` (refined serif)
- **Body**: `Raleway` (light weight)

**Preview:**
- Navigation: `HOME FOOD ROME WEEKEND TRIPS` (Raleway, uppercase)
- Heading: `Florence – First Weekend Away` (Cormorant Garamond, serif)
- Body: `We stepped off the train into warm air...` (Raleway, light)

**Why it works:** Both fonts are elegant and refined, perfect for a travel blog aesthetic.

---

## Background Color Options

### Option 1: **Soft Warm Grey** (Recommended)
- **Box Background**: `bg-slate-50` (very light grey, warm undertone)
- **Text Color**: `text-slate-900` (dark for contrast)
- **Border**: None (clean, modern)

**Preview:**
```
┌─────────────────────────────┐
│  Soft grey background       │
│  Dark text, easy to read    │
│  No borders, clean look     │
└─────────────────────────────┘
```

---

### Option 2: **Cool Light Blue**
- **Box Background**: `bg-blue-50` (very light blue)
- **Text Color**: `text-slate-900`
- **Border**: None

**Preview:**
```
┌─────────────────────────────┐
│  Light blue background      │
│  Fresh, airy feeling        │
│  Great for travel content   │
└─────────────────────────────┘
```

---

### Option 3: **Warm Cream**
- **Box Background**: `bg-amber-50` (very light cream)
- **Text Color**: `text-slate-900`
- **Border**: None

**Preview:**
```
┌─────────────────────────────┐
│  Warm cream background      │
│  Cozy, inviting feel        │
│  Perfect for memories       │
└─────────────────────────────┘
```

---

### Option 4: **Neutral Stone**
- **Box Background**: `bg-stone-50` (very light stone)
- **Text Color**: `text-slate-900`
- **Border**: None

**Preview:**
```
┌─────────────────────────────┐
│  Stone background           │
│  Natural, earthy tone       │
│  Subtle and sophisticated   │
└─────────────────────────────┘
```

---

### Option 5: **Cool Mint**
- **Box Background**: `bg-teal-50` (very light mint)
- **Text Color**: `text-slate-900`
- **Border**: None

**Preview:**
```
┌─────────────────────────────┐
│  Mint background            │
│  Fresh, modern feel          │
│  Unique but readable         │
└─────────────────────────────┘
```

---

## How to Apply

All options are configured in `tailwind.config.ts` and `app/globals.css`. 
Simply change the font names or color values in those files to switch between options.
