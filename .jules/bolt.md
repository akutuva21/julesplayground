## 2024-07-25 - [Graph Matcher Hot Path Allocation]
**Learning:** In hot graph matching paths inside Matcher.ts, avoid intermediate array/map allocations inside the constructor of VF2State (which is instantiated heavily during search). Replacing .map((_, idx) => idx) with manual loops that populate pre-allocated standard arrays significantly reduces V8 garbage collection overhead under heavy simulation rules.
**Action:** Replace .map() calls in VF2State constructor with manual for loops.

## 2026-07-25 - [SBML Parameterized Functions and Units Assertions]
**Learning:** Parameterized standalone SBML functionDefinitions are skipped in the generated BNGL output by default since BNG2's `run_network` cannot evaluate functions with formal arguments. However, for unit testing purposes, they should be preservable via a testing override flag (`keepParameterized`). Additionally, mapping SBML to BNGL IDs translates observations and concentration functions to their standardized SBML IDs rather than mapped consolidated IDs.
**Action:** Add `keepParameterized` parameter to `writeFunctions`, pass it in tests, and update expected mapped ID assertions.
