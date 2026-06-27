## 2026-06-27 - Optimize hot loops parsing in BNGXMLWriter
**Learning:** Array destructuring and `.split()` methods cause measurable memory allocation overhead in hot loop parsing, contributing to GC pressure and slowing down generation.
**Action:** Use `.indexOf()` with `.substring()` to extract string sections rather than allocating new arrays via `.split()`.
