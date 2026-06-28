## 2024-06-28 - Optimize array destructuring from .split() in hot loops
**Learning:** Using `.split('.')` or `.split('|')` followed by array destructuring inside hot graph traversal loops introduces intermediate array allocations that add up significantly over large models. Replacing it with `.indexOf()` and `.substring()` drastically reduces garbage collection pressure.
**Action:** In graph/network-heavy loops, avoid string `.split()` for extracting fixed pairs of items.
