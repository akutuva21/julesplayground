## 2024-05-24 - FigureBuilderModal Icon Buttons
**Learning:** Found several icon-only buttons for moving, removing panels, and selecting layouts/widths that lacked `aria-label` and `title` attributes.
**Action:** Added proper ARIA labels and titles to ensure they are accessible via screen readers and have informative tooltips on hover. Always explicitly check utility buttons (especially in modals/toolbars) for missing a11y attributes.
