import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Body and navigation - clean system fonts
        sans: ["-apple-system", "BlinkMacSystemFont", "system-ui", "Segoe UI", "sans-serif"],
        // Headings - elegant serif
        serif: ["Georgia", "Times New Roman", "serif"]
      },
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // GLOBAL THEME COLORS - Edit these to change the entire site
        // ═══════════════════════════════════════════════════════════════

        // Content box background (soft, faded)
        "box-bg": "#f8fafc",        // slate-50 - soft warm grey
        // Alternative options:
        // "box-bg": "#f1f5f9",     // slate-100 - slightly darker grey
        // "box-bg": "#eff6ff",     // blue-50 - cool light blue
        // "box-bg": "#faf5ff",     // violet-50 - soft lavender
        // "box-bg": "#f0fdfa",     // teal-50 - cool mint

        // Text colors
        "text-primary": "#0f172a",   // slate-900 - main text
        "text-secondary": "#475569", // slate-600 - secondary text
        "text-muted": "#94a3b8",     // slate-400 - muted/labels

        // Accent colors
        "accent-primary": "#0f172a", // slate-900 - buttons, links
        "accent-hover": "#334155",   // slate-700 - button hover

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

