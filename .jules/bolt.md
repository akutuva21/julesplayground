## 2024-05-14 - String Processing Overhead inside Hot Paths
**Learning:** In highly called loops, like `bnglWriter` string building and graph component processing, chained methods like `.split('~').map().filter()` or `.split().slice()` create considerable intermediate array allocations, causing heavy V8 garbage collection overhead.
**Action:** Replace `.split('~')` followed by iteration over tokens with manual loops and `.indexOf('~')` to extract substrings with `.substring()`, significantly reducing intermediate object allocations in hot simulation paths.
