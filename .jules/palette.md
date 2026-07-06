## 2025-02-28 - Added focus rings to UI Tab Components
**Learning:** Custom tab implementations often omit default browser focus rings. Explicitly adding keyboard focus states (e.g., `focus-visible:ring-2`) to tab buttons is critical for keyboard accessibility, ensuring users know which tab is active when navigating via the Tab key.
**Action:** Always verify that interactive custom elements (like `role="tab"`) have explicit `focus-visible` styles if standard HTML buttons have them overridden by class resets.
