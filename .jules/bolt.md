## 2025-04-02 - Object.entries in simulation loops
**Learning:** Using `Object.entries().forEach()` inside tight numerical simulation loops (like aggregating results across hundreds of iterations and thousands of time points) causes massive array allocations and function closures that kill performance in the V8 engine.
**Action:** Always pre-compute header/key arrays outside the loop and use standard nested `for` loops for data aggregation in performance-critical code paths to minimize GC pressure and improve execution speed.
