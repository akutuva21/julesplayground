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
  { id: 11, generatedAt: "11", perModel: { "perModel": { error: "failed" } } },
  { id: 12, generatedAt: "12", perModel: { perModel: { perModel: { "myModel": { history: [], latest: {} } } } } }
];

function trace(parsed) {
  let current = parsed;
  // According to the memory:
  // "When recursively traversing parsed JSON structures (e.g., nested report artifacts) where structural keys might overlap with legitimate data keys (like a model named 'perModel'), use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."

  while (current && current.perModel && !('history' in current.perModel) && !('latest' in current.perModel)) {
    // Wait, if the model is named "history", then 'history' IS IN current.perModel!
    // So the loop breaks! Which leaves `current` as the wrapper.
    // If the loop breaks, we do `current = current.perModel` after the loop? No, the loop breaks so we don't.
    // But `current.perModel` is the RECORD object!
    // So we would need `current = current.perModel` after the loop?
    // Let's trace it carefully.

    // In the ORIGINAL code:
    // let current = parsed;
    // while (current && current.perModel && !current.perModel.history) {
    //   current = current.perModel;
    // }
    // perModelStore = current || {};

    // So `current` ENDS UP BEING the record object.

    // If we use duck-typing to check if `current.perModel` is a Data object:
    // A Data object has `history` or `latest`.
    // But wait! If `current.perModel` is the RECORD object, it DOES NOT have `history` or `latest` UNLESS there is a model named `history` or `latest`.
    // So if we check `!current.perModel.history`, it works UNLESS the model is named `history`.
    // What if we duck-type verify that `current.perModel.history` is an ARRAY (since Data object's history is an array)?

    if (Array.isArray(current.perModel.history)) {
      break;
    }
    if (current.perModel.latest && !Array.isArray(current.perModel.latest)) {
      break;
    }

    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(trace(tc)));
}
