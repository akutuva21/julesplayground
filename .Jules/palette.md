## 2025-06-20 - Add ARIA labels to dynamically generated group buttons
**Learning:** Found that when iterating through options to create buttons (e.g., simulation methods), it's easy to miss `aria-label`s, especially when the button text isn't fully descriptive on its own or is an acronym. It's important to provide context like "Select [Method] method".
**Action:** Ensure dynamic lists of buttons have explicit, descriptive `aria-label`s, beyond just `aria-pressed`.
