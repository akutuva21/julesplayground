## 2026-04-04 - XSS Vulnerability in Non-React HTML Files
**Vulnerability:** Unescaped model metadata (e.g., categories, display names, tags, observables) was being injected directly into the DOM using `innerHTML` in `public/umap.html`.
**Learning:** Even though the core application uses React (which auto-escapes string content), raw HTML files serving specific visualization tools (like the Model Explorer iframe) bypass these protections. User-supplied or external JSON metadata rendered via `innerHTML` creates a severe Cross-Site Scripting (XSS) risk if not explicitly sanitized.
**Prevention:** Always create and use an `escapeHTML` utility function when manipulating raw HTML in vanilla JavaScript/HTML files, ensuring all dynamic data is escaped before being concatenated into `innerHTML`.
