## 2026-04-15 - Adding ARIA labels to icon-only triggers
**Learning:** Components that wrap interactive elements (like Dropdown using a `<button>` trigger) often rely on generic `title` attributes. Screen readers rely heavily on `aria-label` for accurate identification of icon-only elements.
**Action:** Always inspect wrapper components like Modal triggers, Dropdowns, and Share buttons for icon-only implementations and ensure `aria-label` is explicitly passed to the semantic child element.
