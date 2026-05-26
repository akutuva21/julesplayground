const testCases = [
  { id: 1, generatedAt: "1", perModel: { "myModel": { history: [], latest: {} } } },
  { id: 2, generatedAt: "2", perModel: { "perModel": { history: [], latest: {} } } },
  { id: 3, generatedAt: "3", perModel: { perModel: { "myModel": { history: [], latest: {} } } } },
  { id: 4, generatedAt: "4", perModel: { perModel: { "perModel": { history: [], latest: {} } } } },
  { id: 5, generatedAt: "5", perModel: { perModel: { perModel: { "perModel": { history: [], latest: {} } } } } },
  { id: 6, generatedAt: "6", perModel: { "history": { history: [], latest: {} } } },
  { id: 7, generatedAt: "7", perModel: { perModel: { "history": { history: [], latest: {} } } } },
  { id: 8, generatedAt: "8", perModel: {} },
  { id: 9, generatedAt: "9", perModel: { perModel: {} } }
];

function findRecordMemory(parsed) {
  let current = parsed;
  // Based on the memory:
  // "When recursively traversing parsed JSON structures (e.g., nested report artifacts) where structural keys might overlap with legitimate data keys (like a model named 'perModel'), use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."

  // What if I just change `!current.perModel.history` to `!('history' in current.perModel) && !('latest' in current.perModel)`?
  // Wait, `current.perModel` is the RECORD object!
  // If `current.perModel` is `{ myModel: { history: [] } }`, it does NOT have 'history' or 'latest'.
  // So `!('history' in current.perModel)` is TRUE!
  // Then the loop CONTINUES!
  // It does `current = current.perModel`.
  // Then in the next iteration, `current` is `{ myModel: { history: [] } }`.
  // `current.perModel` is undefined.
  // The loop TERMINATES!
  // This works beautifully for normal keys!

  // BUT what if the model is named `history`?
  // `current.perModel` is `{ history: { history: [] } }`.
  // `current.perModel` HAS a key `history`!
  // So `!('history' in current.perModel)` is FALSE!
  // The loop TERMINATES PREMATURELY!
  // `current` is the WRAPPER.
  // And we return the WRAPPER.
  // This is the bug with `!current.perModel.history`.

  // Is that really the issue?
  // Let's trace `while (current && current.perModel && !current.perModel.history && !current.perModel.latest)`
  // Wait, if the model is named `latest`, it also terminates prematurely.
  // If the model is named `perModel`, `current.perModel` is `{ perModel: { history: [] } }`.
  // `current.perModel.history` is undefined.
  // It CONTINUES!
  // `current` becomes `{ perModel: { history: [] } }`.
  // Next iteration: `current.perModel` is `{ history: [] }` (the data object!).
  // `current.perModel.history` is `[]`.
  // So `!current.perModel.history` is FALSE!
  // The loop TERMINATES!
  // `current` is the RECORD.
  // This is the exact logic the memory mentions!

  // Let's try it:
  while (current && current.perModel && !current.perModel.history && !current.perModel.latest) {
    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(findRecordMemory(tc)));
}
