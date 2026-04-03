## 2025-04-03 - Added aria-label and title to Header icon buttons
**Learning:** Found an accessibility issue pattern specific to this app's components, where icon-only buttons in the UI lacked `aria-label` tags for screen readers, and tooltips (`title`) for visual users.
**Action:** Always add an `aria-label` to icon-only buttons, as they're not self-explanatory to assistive technologies. Also remember to add `title` for mouse hover context if it makes sense.
