## 2025-04-08 - Clear search button missing aria-label
**Learning:** Found a pattern where icon-only buttons (specifically clear search) were relying on `title` attributes instead of proper `aria-label`s. Screen readers might not consistently announce `title` attributes on interactive elements, making it difficult for users relying on assistive technologies to understand the button's purpose.
**Action:** Always ensure icon-only interactive elements like buttons have an explicit `aria-label` even if a `title` is present. I will check for this pattern in future components.
