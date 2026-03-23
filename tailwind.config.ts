import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "system-ui", "Segoe UI", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        "mono-kicker": ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"]
      },
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // GLOBAL THEME COLORS - Edit these to change the entire site
        // ═══════════════════════════════════════════════════════════════

        // Journal / paper surfaces
        "journal-paper": "#fafaf9", // stone-50 — main page background
        "journal-accent": "#115e59", // teal-800 — links, labels, emphasis

        // Content box background (soft, faded)
        "box-bg": "#f5f5f4",        // stone-100 — journal card tone
        // Alternative options:
        // "box-bg": "#f1f5f9",     // slate-100 - slightly darker grey
        // "box-bg": "#eff6ff",     // blue-50 - cool light blue
        // "box-bg": "#faf5ff",     // violet-50 - soft lavender
        // "box-bg": "#f0fdfa",     // teal-50 - cool mint

        // Text colors
        "text-primary": "#0f172a",   // slate-900 - main text
        "text-secondary": "#475569", // slate-600 - secondary text
        "text-muted": "#94a3b8",     // slate-400 - muted/labels

        // Accent colors (journal: teal buttons; tweak in one place)
        "accent-primary": "#115e59", // teal-800
        "accent-hover": "#134e4a",   // teal-900

        // Map marker colors
        "marker-restaurant": "#0ea5e9", // sky-500
        "marker-experience": "#22c55e", // green-500
        "marker-landmark": "#f97316"    // orange-500
      },
      spacing: {
        // Consistent section spacing
        "section": "2.5rem",      // 40px - between sections
        "section-lg": "3rem",     // 48px - larger gaps
        "box-padding": "1.5rem",  // 24px - inside content boxes
        "box-padding-lg": "2rem"  // 32px - larger box padding
      },
      borderRadius: {
        "box": "1rem",     // 16px - content boxes
        "box-lg": "1.5rem" // 24px - larger boxes like maps
      }
    }
  },
  plugins: []
};

export default config;

