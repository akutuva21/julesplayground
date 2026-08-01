# Bolt Performance Learnings

## 2026-08-01 - Network Generation and Graph Matching Optimization

- **String parsing vs Numerical keys in `applyRuleTransformation`:** Replacing string-based keys (`${r}:${m}`) with bitwise integer keys `(r << 16) | m` for molecule tracking Maps and Sets (`usedReactantMolsInReaction`, `matchedReactantKeys`, `survivorDeltas`, `anchors`) significantly reduces string allocation, hash computation, and V8 garbage collection overhead in hot network generation loops.
- **Lazy property caching on cloned objects:** Attaching direct numerical fields `_sourceR` and `_sourceM` on cloned molecule objects during structural duplication enables $O(1)$ zero-allocation lookups, entirely bypassing the need for string splits and parses on hot paths.
- **Avoiding getter call overhead in backtracking:** Accessing getter properties (such as `graph.neighborList`) inside nested backtrack loops introduces heavy function call overhead in JS/TS. Pre-fetching `neighborList` array references once in the `VF2State` constructor and reading them as properties yields considerable speedups during graph matching.
- **Optimized BFS traversal with precomputed adjacencies:** Directly leveraging precomputed `rg.neighborList` instead of manually traversing `rg.adjacency` Maps and parsing partner strings completely eliminates string parsing and map lookups in connected component traversals.
