2025-05-24
Removed unnecessary .filter() allocation in hot loops over molecules in atomizer, using inline continue conditions instead to avoid intermediate array instantiation.

## 2024-07-01 - Avoid Object.keys in hot mapping loops
**Learning:** Extracting `Object.keys()` calls out of map/loop operations (like in `SparseJacobian.ts`) prevents redundant intermediate array allocations. This is especially important for arrays related to reactions or observables that scale with model complexity.
**Action:** Always scan `.map` callbacks or `for` loops for static `Object.keys()` or `Object.entries()` extractions from constants/parameters and move them above the loop.
