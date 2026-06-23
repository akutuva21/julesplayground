## $(date +%Y-%m-%d) - Zero-allocation parsing for large files
**Learning:** Mass string operations like `.split('\n').map(...).join('\n')` create massive intermediate array allocations and GC pressure when processing large blocks of BNGL code, significantly degrading performance.
**Action:** Use a zero-allocation `while` loop with `indexOf` and `substring` to scan lines and construct the resulting string manually in hot paths parsing large text.
