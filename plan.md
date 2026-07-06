1. **Add focus-visible classes to the Tab component buttons in `components/ui/Tabs.tsx`:**
    - The `Tab` component uses a `<button>` tag that currently lacks proper focus states. This makes keyboard navigation (using the Tab key) less clear, as there's no visual indication of which tab is currently focused.
    - I will update the `className` in the `<button>` within `Tab` to include `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50` (or similar standard focus ring classes used in the project, like `focus-visible:ring-primary-500`) to improve keyboard accessibility.

2. **Complete pre-commit steps:**
    - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.

3. **Submit the PR:**
    - Submit with a title like "🎨 Palette: Add focus states to UI tabs" and include before/after reasoning.
