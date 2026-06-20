## 2025-06-20 - Eliminate Array Allocations in Multiline Block Parsing
**Learning:** For large multiline strings like BNGL seed species blocks, using `.split('\n')` creates massive intermediate array allocations and drives GC pressure.
**Action:** Replace `.split('\n')` and subsequent array operations with a zero-allocation `while` loop using `indexOf('\n')`, `charCodeAt` for manual trimming, and bounded string extraction using `.slice()`. This drops overhead significantly in hot paths without modifying underlying module state.
