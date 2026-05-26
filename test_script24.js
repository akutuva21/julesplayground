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
  { id: 10, generatedAt: "10", perModel: { "perModel": { history: null, latest: {} } } }
];

function trace(parsed) {
  let current = parsed;
  // Based on the memory:
  // "When recursively traversing parsed JSON structures (e.g., nested report artifacts) where structural keys might overlap with legitimate data keys (like a model named 'perModel'), use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."

  while (current && current.perModel) {
    // Determine if `current.perModel` is a data object (a model's data).
    // A data object MUST have `history` or `latest` (not as nested objects, but as the array/object itself).
    if (Array.isArray(current.perModel.history) || (current.perModel.latest && typeof current.perModel.latest === 'object' && !Array.isArray(current.perModel.latest))) {
      break;
    }
    // Alternatively, to match EXACTLY what the memory says "e.g., `!current.perModel.history`" but handle arrays.

    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(trace(tc)));
}
