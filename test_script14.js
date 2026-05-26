const testCases = [
  // 1: Correct wrapper, no model named perModel
  { id: 1, generatedAt: "1", perModel: { "myModel": { history: [], latest: {} } } },
  // 2: Correct wrapper, model named perModel
  { id: 2, generatedAt: "2", perModel: { "perModel": { history: [], latest: {} } } },
  // 3: Buggy wrapper, no model named perModel
  { id: 3, generatedAt: "3", perModel: { perModel: { "myModel": { history: [], latest: {} } } } },
  // 4: Buggy wrapper, model named perModel
  { id: 4, generatedAt: "4", perModel: { perModel: { "perModel": { history: [], latest: {} } } } },
  // 5: 3-level Buggy wrapper, model named perModel
  { id: 5, generatedAt: "5", perModel: { perModel: { perModel: { "perModel": { history: [], latest: {} } } } } },
  // 6: Model named "history"
  { id: 6, generatedAt: "6", perModel: { "history": { history: [], latest: {} } } },
  // 7: Buggy wrapper, Model named "history"
  { id: 7, generatedAt: "7", perModel: { perModel: { "history": { history: [], latest: {} } } } },
  // 8: Empty record
  { id: 8, generatedAt: "8", perModel: {} },
  // 9: Buggy wrapper, Empty record
  { id: 9, generatedAt: "9", perModel: { perModel: {} } }
];

function findRecord(parsed) {
  let current = parsed;
  while (current && current.perModel) {
    const values = Object.values(current.perModel);

    // Check if the current.perModel is the RECORD object
    // A record object either is empty (0 values) OR contains values that are data objects.
    // However, if we just check if it's empty, we might stop at the first `{}` and never descend.
    // But wait, if `current.perModel` is `{}`, there is no `current.perModel.perModel`. So the loop will terminate anyway!
    // Ah, wait. If `current.perModel` is `{ perModel: {} }`, then `values` has 1 element: `{}`.
    // It's not a data object. So we will descend into `current.perModel`.

    const isRecord = values.every(val =>
      val && typeof val === 'object' && ('history' in val || 'latest' in val)
    ) && values.length > 0;

    if (isRecord) {
      current = current.perModel;
      break;
    } else if (values.length === 0) {
      // Empty record
      current = current.perModel;
      break;
    } else {
      // It's an intermediate wrapper (e.g. `{ perModel: { ... } }`)
      // Or maybe it has other keys, but we assume the bug just wraps it in `perModel`.
      current = current.perModel;
    }
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(findRecord(tc)));
}
