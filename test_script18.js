const testCases = [
  { id: 1, generatedAt: "1", perModel: { "myModel": { history: [], latest: {} } } },
  { id: 2, generatedAt: "2", perModel: { "perModel": { history: [], latest: {} } } },
  { id: 3, generatedAt: "3", perModel: { perModel: { "myModel": { history: [], latest: {} } } } },
  { id: 4, generatedAt: "4", perModel: { perModel: { "perModel": { history: [], latest: {} } } } },
  { id: 5, generatedAt: "5", perModel: { perModel: { perModel: { "perModel": { history: [], latest: {} } } } } },
  { id: 6, generatedAt: "6", perModel: { "history": { history: [], latest: {} } } },
  { id: 7, generatedAt: "7", perModel: { perModel: { "history": { history: [], latest: {} } } } },
  { id: 8, generatedAt: "8", perModel: {} },
  { id: 9, generatedAt: "9", perModel: { perModel: {} } },
  { id: 10, generatedAt: "10", perModel: { "perModel": { history: null, latest: {} } } },
  { id: 11, generatedAt: "11", perModel: { "perModel": { error: "failed" } } } // if the data object doesn't have history or latest
];

function trace(parsed) {
  let current = parsed;
  // If we just check `!('history' in current.perModel) && !('latest' in current.perModel)`,
  // it might incorrectly descend if the model is named "history".
  // Let's go back to checking if the VALUES of `current.perModel` are Data objects.
  while (current && current.perModel) {
    // If current.perModel is the record, its values are data objects.
    // If current.perModel is the buggy wrapper, its values are `{ perModel: ... }`.
    // Let's check the first value of current.perModel
    const keys = Object.keys(current.perModel);
    if (keys.length === 0) {
      // Empty object, we can just take it.
      current = current.perModel;
      break;
    }

    // We check if current.perModel has the key 'perModel' AND it doesn't have other keys.
    // Wait, the bug just wrapped the entire record in `{ perModel: { ... } }`.
    // So the buggy wrapper has EXACTLY ONE key, which is 'perModel'.
    // BUT what if the actual RECORD has EXACTLY ONE key, which is 'perModel'?
    // That happens if there is only one model, and it's named 'perModel'.
    // Then `keys` is `['perModel']`.
    // So both the buggy wrapper and the valid 1-model record have `keys === ['perModel']`.

    // To distinguish them:
    // Buggy wrapper: `current.perModel['perModel']` is the RECORD object.
    // Valid 1-model record: `current.perModel['perModel']` is the DATA object.
    // The DATA object must have 'history' or 'latest' or 'durationMs' or 'status'.
    // Let's check for properties of `RunSummary` or the `{ history: ... }` wrapper.
    // The record wrapper is `{ history: RunSummary[], latest?: RunSummary }`.

    const isDataObj = (obj) => obj && typeof obj === 'object' && ('history' in obj || 'latest' in obj || 'error' in obj);

    // If the values of `current.perModel` are Data objects, then `current.perModel` is the Record.
    const values = Object.values(current.perModel);
    const hasDataValues = values.some(isDataObj);

    if (hasDataValues) {
      // It's the Record!
      current = current.perModel;
      break;
    } else {
      // It's a buggy wrapper, so we keep descending.
      current = current.perModel;
    }
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(trace(tc)));
}
