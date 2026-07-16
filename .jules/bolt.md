## 2025-02-18 - Avoid array allocations in solver hot loops
**Learning:** Using `.filter(condition).length` inside ODE solver loops (like `Rosenbrock23Solver` or `StiffnessDetector`) creates unnecessary intermediate array allocations, adding GC pressure.
**Action:** Replace chaining like `.filter(Boolean).length` with pre-allocated arrays or inline `for` loops with early exit/counters to eliminate allocation overhead in hot simulation paths.
