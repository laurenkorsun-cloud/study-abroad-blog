/**
 * Inlined in <head> so basic layout still works if /_next/static/css/... fails
 * (e.g. stale dev server, proxy, or blocked static assets). Full design comes from globals.css + Tailwind.
 */
export const CRITICAL_FALLBACK_CSS = `
html {
  -webkit-text-size-adjust: 100%;
}
body {
  margin: 0;
  min-height: 100vh;
  background: #fafaf9;
  color: #0f172a;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  background: rgba(250, 250, 249, 0.95);
}
header > div {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
}
@media (min-width: 768px) {
  header > div {
    padding: 1.5rem 2rem;
  }
}
header nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
}
header a {
  color: inherit;
  text-decoration: none;
}
/* Trip / journal pages: match sans hierarchy when Tailwind is unavailable */
main h1 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #0f172a;
}
main h2 {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
}
main .page-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #115e59;
}
`.trim();
