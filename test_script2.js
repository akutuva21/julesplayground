const tests = [
  { generatedAt: "...", perModel: { "myModel": { history: [1] } } },
  { generatedAt: "...", perModel: { perModel: { "myModel": { history: [1] } } } },
  { generatedAt: "...", perModel: { "perModel": { history: [1] } } },
  { generatedAt: "...", perModel: { perModel: { "perModel": { history: [1] } } } },
  { generatedAt: "...", perModel: { "perModel": { history: [1] }, "other": { history: [1] } } },
  { generatedAt: "...", perModel: { perModel: { "perModel": { history: [1] }, "other": { history: [1] } } } }
];

for (const parsed of tests) {
  let current = parsed;
  while (current && current.perModel) {
    let isDataNode = false;
    for (const val of Object.values(current.perModel)) {
      if (val && typeof val === 'object' && ('history' in val || 'latest' in val)) {
        isDataNode = true;
        break;
      }
    }

    // Also, if perModel contains ANY key that actually has a history object, we shouldn't dive into it, UNLESS the key is 'perModel' itself and it only has a history.
    // Let's rely on a simpler duck-typing to verify presence of expected data properties.
    // The memory states:
    // "When recursively traversing parsed JSON structures (e.g., nested report artifacts) where structural keys might overlap with legitimate data keys (like a model named 'perModel'), use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."
    // But wait... what if the model is named "perModel", then `current.perModel` is the object holding models, so `current.perModel.perModel` is the data for the model named "perModel".
    // Wait, the structure is:
    // parsed = { generatedAt: "...", perModel: { "modelName": { history: [...] } } }

    // If current = parsed:
    // current.perModel is the record of models.
    // If there is a bug, the file is nested:
    // parsed = { generatedAt: "...", perModel: { perModel: { "modelName": { history: [...] } } } }
    // We want to find the object that is `Record<string, { history: ... }>`
  }
}
