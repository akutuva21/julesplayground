## 2025-05-18 - Keyboard Selection in Read-Only Fields
**Learning:** Screen readers might not announce text changes like "Copied!" if the button doesn't have `aria-live="polite"`. Additionally, read-only text fields like share URLs require extra effort for keyboard users to select text if they only rely on `onClick`.
**Action:** Add `onFocus={(e) => e.target.select()}` to read-only inputs for instant keyboard selection, and use `aria-live="polite"` on buttons with dynamic state text.
