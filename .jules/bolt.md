# ⚡ Bolt Learnings
2026-06-19: Optimized `getReactionKey` array joining logic to avoid string allocation for arrays length <= 3. Replaced `Object.entries` iteration with `for...in` inside simulation loops to minimize object GC pressure.
