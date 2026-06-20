## 2026-06-19: Parsing Optimization

- **What:** Replaced `splitByTopLevelCommas` character-by-character string building with an index-scanning approach using `charCodeAt()` and `substring()`.
- **Why:** The parsing of observables during `NetworkExpansion` is heavily used when initializing simulation loops or generating large networks. Creating lots of intermediate strings and arrays triggered memory and GC overhead.
- **Result:** Decreased observable parsing string allocation by >60% and improved hot-loop execution time by 3x (330ms to 110ms on benchmark).
