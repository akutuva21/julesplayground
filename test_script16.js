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

function findRecordDuckTyping(parsed) {
  let current = parsed;
  while (current && current.perModel) {
    // A mapping object maps strings to Data objects.
    // Let's see if current.perModel is a Data object itself.
    // A Data object is defined as having 'history' or 'latest' keys at its root.
    // AND it must not be a mapping object containing a model named 'history' or 'latest'.
    // BUT wait! If it's a mapping object containing a model named 'history', then it has a 'history' key!
    // How to distinguish between a mapping object containing a model named 'history' and a Data object?
    // A Data object's 'history' is an Array.
    // A mapping object's 'history' is a Data object (which is not an Array).
    // Or, what if the model is named 'history' AND its data object is an Array? No, data objects are always { history: ... }

    // Actually, memory says: "use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."
    // Notice it uses `!current.perModel.history` as an EXAMPLE (`e.g.,`).
    // If I just check `if (current.perModel.history && Array.isArray(current.perModel.history))`?
    // What if I check `!('history' in current.perModel && Array.isArray(current.perModel.history))`?

    // But what if it's `{ latest: {...} }` and no `history`?
    // Data objects always have either `history` (Array) or `latest` (Object).
    // If we want to check if `current.perModel` is a DATA object, we can check if it has `.history` as an array or `.latest` as an object.

    const isDataObj = (
      (Array.isArray(current.perModel.history)) ||
      (current.perModel.latest && typeof current.perModel.latest === 'object' && !Array.isArray(current.perModel.latest))
    );

    // If `current.perModel` is a Data object, we MUST NOT descend!
    if (isDataObj) {
      break;
    }

    // If it's NOT a Data object, it could be the Record object, or a wrapper.
    // Wait, if it's the Record object, it doesn't have `.history` as an array, so we DESCEND.
    // Which is CORRECT!
    // `current = current.perModel`.
    // Then in the next iteration, `current.perModel` might be `undefined`, so the loop breaks!
    // And `current` is the Record object!

    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(findRecordDuckTyping(tc)));
}
