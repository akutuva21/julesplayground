## 2026-06-15 - Interactive Chart Elements Require Explicit Focus Styles
**Learning:** Recharts components and custom chart controls (like `InteractiveLegend` toggles and scale buttons) often use custom styling that overrides or hides default browser focus outlines, making them inaccessible to keyboard users navigating through complex data visualizations.
**Action:** Always verify keyboard navigation for all interactive chart elements and explicitly add `focus-visible` styles (e.g., `focus-visible:ring-2`) to ensure they remain accessible without breaking mouse-click aesthetics.
