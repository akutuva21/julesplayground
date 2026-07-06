## 2024-07-06 - [Avoid Object.keys on simulation loops hot paths]
**Learning:** [Using `Object.keys()` over `Record` inside hot paths like `SimulationLoop.ts` leads to intermediate array allocation overhead. We identified an issue where `Object.keys(nextParams)` was called for `updateParameters()` on each iteration step.
**Action:** [Use `for (const key in nextParams)` combined with `Object.prototype.hasOwnProperty.call(nextParams, key)` instead of `Object.keys(nextParams)` inside `updateParameters()` and other similar iteration loops in SimulationLoop.ts.
