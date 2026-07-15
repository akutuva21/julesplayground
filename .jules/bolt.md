## 2025-07-15 - Array allocations in simulation loops
**Learning:** The expression `array.filter(...).length` causes an unnecessary full intermediate array allocation. Inside the multiscale simulation loop, checking if active cell counts exceed max bounds via filter allocation becomes a bottleneck.
**Action:** In high-frequency hot paths, compute conditional lengths manually using an inline loop with an early exit (`break`) rather than chaining array methods.
