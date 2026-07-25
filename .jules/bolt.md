## 2024-07-25 - [Graph Matcher Hot Path Allocation]
**Learning:** In hot graph matching paths inside Matcher.ts, avoid intermediate array/map allocations inside the constructor of VF2State (which is instantiated heavily during search). Replacing .map((_, idx) => idx) with manual loops that populate pre-allocated standard arrays significantly reduces V8 garbage collection overhead under heavy simulation rules.
**Action:** Replace .map() calls in VF2State constructor with manual for loops.
