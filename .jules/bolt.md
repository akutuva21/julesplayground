# Bolt (Performance) Learning Journal

## 2026-07-19 - Network Generator Matching Optimization
Optimized hot matching paths in `NetworkGenerator.ts` by replacing intermediate `.filter()` array allocations with inline `for` loops.
For `isMatchOnce` or single-match-limited cases, the loops exit early (`break`) as soon as the first constraint-satisfying match is found, saving significant redundant evaluations of `matchRespectsExplicitComponentBondCounts` and `matchRespectsProductImpliedFreeConstraints`.
