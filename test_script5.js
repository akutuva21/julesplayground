const tests = [
  { generatedAt: "...", perModel: { "myModel": { history: [1] } } },
  { generatedAt: "...", perModel: { perModel: { "myModel": { history: [1] } } } },
  { generatedAt: "...", perModel: { "perModel": { history: [1] } } },
  { generatedAt: "...", perModel: { perModel: { "perModel": { history: [1] } } } },
  { generatedAt: "...", perModel: { "perModel": { history: [1] }, "other": { history: [1] } } },
  { generatedAt: "...", perModel: { perModel: { "perModel": { history: [1] }, "other": { history: [1] } } } },
  // Wait, what if there's a model named perModel AND it failed to parse or doesn't have history directly?
  // What if the structure has a model named "perModel" but NO history? (e.g. { error: "..." })
  // A run summary looks like { history: RunSummary[], latest?: RunSummary }
];

for (const parsed of tests) {
  let current = parsed;
  // Duck typing for "is this a mapping of modelKey -> { history: ... } or { latest: ... }"
  // The mapping object itselt DOES NOT have a .history or .latest.
  // The mapping object has values that HAVE .history or .latest.
  // BUT the current loop says: `!current.perModel.history`

  // Actually, wait! The task description:
  // "When recursively traversing parsed JSON structures (e.g., nested report artifacts) where structural keys might overlap with legitimate data keys (like a model named 'perModel'), use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."

  // Wait, if current.perModel is the object `{ history: [...] }`, then `current.perModel.history` is truthy.
  // Then the loop stops, and `current` is the object containing `{ "perModel": { history: [...] } }`.
  // Wait, what if `current.perModel` is the object `{ latest: {...} }` and DOES NOT have `history`?
  // Then the loop would KEEP GOING and try to do `current = current.perModel`, which would set current to `{ latest: {...} }`.
  // And then `current.perModel` is undefined. The loop terminates.
  // But wait! If it sets `current` to `{ latest: {...} }`, then the final value of `current` is NOT the mapping object!
  // It would be the data object for the "perModel" model.
  // This is a bug if `history` is missing but `latest` is present.

  // Actually, the previous bug was that nested objects kept getting wrapped in `perModel: { perModel: { ... } }`.
  // So to find the actual map, we should check if `current.perModel` has any nested `perModel` and if so... wait.
  // "use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."

  while (current && current.perModel && !current.perModel.history && !current.perModel.latest) {
    current = current.perModel;
  }
  console.log("Result:", JSON.stringify(current));
}
