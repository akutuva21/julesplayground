## 2025-02-14 - Zero-Allocation Index Scanning for Hot Path String Parsing
**Learning:** In heavily used string parsing functions (like extracting molecule names), chained array methods (`.split`, `.map`, `.filter`) and Regex create significant intermediate array allocations and performance overhead.
**Action:** Replace these chains with manual, zero-allocation `while` loops using `indexOf` and char code checking.
