## 2026-06-12 - [Avoid chained array allocations in string parsing]
**Learning:** The pattern `str.split('x').map(s => s.trim()).filter(Boolean)` is an anti-pattern for performance as it creates intermediate arrays and does three passes over the data. In hot code paths, manual iteration provides a measurable ~1.5x speedup by parsing in a single pass.
**Action:** Use simple `for` loops pushing to an array for string splitting and filtering.
