2026-07-06
- Optimized `SimulationLoop.ts` SSA performance by replacing `speciesDependents` Map with a pre-allocated array of arrays `number[][]`. This avoids hashing overhead during simulation setup phase.
- Optimized `NetworkGenerator.ts` array allocations by directly using `parseInt` with `slice` instead of `split` where possible.
- Avoided redundant `Set` instantiations for `_explicitUnboundComponents` and `_explicitBondedComponents` in `applyTransformation`.
- Moved `sourceKeys` mapping inside the debug logging block for deduplication to avoid creating it dynamically when debug logging is disabled in `applyTransformation`.
