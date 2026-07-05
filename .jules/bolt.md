## 2025-07-05 - Hoisting Object creation out of hot loops
**Learning:** In hot loops like reaction parsing (`concreteReactions`), redundant allocations like `new Set(...)` mapping over arrays create significant GC pressure and performance bottlenecks.
**Action:** Always hoist static object instantiations like `Set` or `Map` out of iteration blocks whenever possible.
