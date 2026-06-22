## 2024-06-22 - [Optimization Search]
**Learning:** Checking for standard optimizations like `split()` array allocations in hot paths like graph processing.
**Action:** Replace `split()` calls with `indexOf` and loops where applicable.
## 2024-06-22 - [Optimization BNGLParser]
**Learning:** String parsing hot loops (like in `splitMolecules` and `parseEntityList`) can be optimized by using `charCodeAt` and tracking indices and then doing a `substring` slice at the end, rather than building intermediate strings character by character.
**Action:** Use this technique for large string processing tasks to reduce memory allocation.
