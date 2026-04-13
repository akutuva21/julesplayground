## 2024-04-13 - [Dropdown Accessibility]
**Learning:** When improving accessibility for wrapper components (like `Dropdown` triggers) that accept an inner React node, placing ARIA attributes on a generic container `<div>` causes screen readers to miss them when the child element receives focus.
**Action:** Use `React.cloneElement` to inject required ARIA attributes (e.g., `aria-expanded`, `aria-haspopup`) directly onto the semantic child element.
