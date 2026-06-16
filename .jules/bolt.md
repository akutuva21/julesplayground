## 2025-03-01 - Optimizing String Parsing Loops
**Learning:** Avoid using `content.split('\n')` on large file contents like `.net` outputs. Intermediate array allocations cause GC pressure and are significantly slower than scanning index positions with `content.indexOf('\n', start)`.
**Action:** Replace `split('\n')` with zero-allocation `while` loops that scan strings using `indexOf('\n')` and use `charCodeAt()` to skip whitespace characters instead of `.trim()` when processing huge amounts of data on hot paths.
