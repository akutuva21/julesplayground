## 2026-07-02 - Array allocations in hot path

**Learning:** Destructuring strings with `.split('.')` into a one-element array inside highly nested hot loops like `abstractlyReachable` and `enumerateReachableComplexes` generated high GC pressure due to excessive array allocations. In hot iterations, string splitting should be replaced with simple `indexOf` lookups when only checking properties or substrings up to a delimiter.

**Action:** Whenever iterating over strings formatted as dot-separated property paths (or similar simple patterns), prefer manual character scanning (`indexOf` or `lastIndexOf`) combined with `substring` instead of naive splitting and destructuring to eliminate intermediate garbage accumulation.
