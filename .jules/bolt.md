## 2026-07-29 - Avoid intermediate array allocations in hot loops
**Learning:** Replacing `.split('=>')` with `.indexOf('=>')` and `.substring()` in hot loops prevents intermediate array allocations, reducing garbage collection overhead.
**Action:** Use string search and substring extraction for simple 2-part string splits in hot paths.
