const testCases = [
  // Normal file, model named "history"
  {
    generatedAt: "2023",
    perModel: {
      "history": { history: [], latest: {} }
    }
  },
  // Normal file, model named "latest"
  {
    generatedAt: "2023",
    perModel: {
      "latest": { history: [], latest: {} }
    }
  },
  // Buggy file, model named "history"
  {
    generatedAt: "2023",
    perModel: {
      perModel: {
        "history": { history: [], latest: {} }
      }
    }
  }
];

function findDeepestCorrected(parsed) {
  let current = parsed;
  // If current.perModel is the record, we should only NOT descend if it is the DATA object.
  // How to distinguish the RECORD from the DATA object?
  // The wrapper is `{ generatedAt, perModel }`.
  // The record is `{ [modelKey]: dataObject }`.
  // A dataObject is `{ history: [...], latest?: {...} }`.
  // And the bug nested it as `{ perModel: { perModel: { ... } } }`.

  // So we are looking for the RECORD object.
  // The RECORD object has values that are DATA objects.
  // A DATA object has a property `history` which is an Array, or `latest`.
  // If `current` has a `.perModel` property, `current` might be:
  // 1. The wrapper. (has `.generatedAt` and `.perModel`)
  // 2. An intermediate nested bug level. (has ONLY `.perModel`)
  // 3. The RECORD itself (if there is a model named `perModel`).
  // 4. A DATA object (if it somehow has a property named `perModel`, which shouldn't happen, but theoretically).

  // Actually, the simplest check is:
  // Is `current.perModel` a wrapper or intermediate bug level, OR is it the RECORD?
  // To check if `current.perModel` is the RECORD, look at its values.
  // Do its values look like DATA objects?

  while (current && current.perModel) {
    // Wait, the issue specifically says:
    // "use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."
    // Memory specifically mentions:
    // "use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."
    // Let me re-read the exact memory text:
    // "When recursively traversing parsed JSON structures (e.g., nested report artifacts) where structural keys might overlap with legitimate data keys (like a model named 'perModel'), use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."

    // Oh, wait! The memory says "use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."
    // BUT what I realized is that if I just do `!current.perModel.history`, it fails for models named `history`.
    // Wait, let's read the current code:
    // `while (current && current.perModel && !current.perModel.history)`
    // This is EXACTLY the code right now!
    // If the memory says "use duck-typing to verify the presence of expected data properties", maybe the CURRENT code is ALREADY the duck-typing!
    // But wait, the task says:
    // "Handle nested result from previous bug: find the deepest perModel."
    // The current code is:
    // ```typescript
    //     // Handle nested result from previous bug: find the deepest 'perModel'
    //     let current = parsed;
    //     while (current && current.perModel && !current.perModel.history) {
    //       current = current.perModel;
    //     }
    //     perModelStore = current || {};
    // ```
    // So WHAT is the bug in the CURRENT code?

    break;
  }
}
