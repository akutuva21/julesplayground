## 2024-10-24 - Zero-allocation string scanning is significantly faster than .split() for parsing files
**Learning:** In hot loops parsing CSV or code files, methods like `.split('\n').map(v => v.trim()).filter(v => v)` incur massive array allocation overhead and memory pressure, creating significant performance bottlenecks in both execution time and garbage collection.
**Action:** Replace these chains with a fast, zero-allocation `while` loop index scan that relies on `indexOf('\n', start)` and extracts substring only when necessary.
