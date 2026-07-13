
## 2024-03-20 - Eliminate chained array methods in hot paths
**Learning:** In highly recursive or looping execution paths (like `NetworkGenerator.ts` where we attempt thousands of pattern matching and bonding tests), chained array methods like `.filter(...).length > 1` create massive intermediate array allocations and GC pressure, crippling JS performance.
**Action:** Replace `arr.filter(p).length > 1` with a dedicated loop helper or inline `.some()` style loop to early exit and prevent temporary arrays.
