## $(date +%Y-%m-%d) - Object.entries in Hot Loops
**Learning:** Using Object.entries inside hot loops over large datasets (like thousands of NFsim output rows) creates massive intermediate array allocations, causing significant garbage collection pressure.
**Action:** Replace Object.entries() with standard for...in loops and Object.prototype.hasOwnProperty.call checks to achieve zero-allocation property iteration in hot paths.
