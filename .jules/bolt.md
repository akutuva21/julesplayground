
## 2024-05-18 - String Manipulation in Hot Loops
**Learning:** In BNGL string parsing functions that run iteratively over thousands of permutations (like `PatternMatcher.ts` canonicalization and parsing), common JS array closures like `.split('.')`, `.map()`, and `.join()` cause significant GC pressure due to intermediate allocations.
**Action:** Replace `split()` logic with zero-allocation index scanning loops (`indexOf`) paired with explicit `substring()` extraction. Replace `map` over lists with standard `for` loops explicitly building up result strings.
