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
  // If we just duck-type `current.perModel` to check if it's the RECORD object...
  // Wait, if it IS the RECORD object, we should DESCEND (so current becomes the RECORD object).
  // Because right now `current` is the wrapper (which has `.perModel`).
  // But wait! If it IS the RECORD object, we descend, AND THEN `current` becomes the RECORD object.
  // Then in the next iteration, `current` is the RECORD object.
  // So `current.perModel` is the data object for the model named "perModel"!
  // If `current.perModel` is a Data object, we MUST NOT DESCEND!
  // Otherwise, `current` becomes the Data object!

  // So the loop condition is:
  // while `current` has a `.perModel` AND `current.perModel` IS NOT a Data object.

  while (current && current.perModel) {
    // Check if current.perModel is a Data object.
    // A Data object has a `history` property that is an Array, or a `latest` property that is an Object.
    const isDataObj = (
      Array.isArray(current.perModel.history) ||
      (current.perModel.latest && typeof current.perModel.latest === 'object' && !Array.isArray(current.perModel.latest))
    );

    if (isDataObj) {
      break;
    }

    // Oh wait! What if the model is named `history`?
    // Then `current.perModel` (when current is the wrapper) is the RECORD object.
    // The RECORD object has a property `history` (the model data object).
    // `current.perModel.history` is `{ history: [], latest: {} }`.
    // Is `current.perModel.history` an Array? NO!
    // So `Array.isArray(...)` is FALSE!
    // Is `current.perModel.latest` an Object? `latest` is undefined. So FALSE!
    // So `isDataObj` is FALSE!
    // So we DESCEND!
    // `current = current.perModel` (the RECORD object).

    // Next iteration:
    // `current` is the RECORD object.
    // `current.perModel` is undefined (because there is no model named `perModel`).
    // So the loop breaks!
    // `current` is the RECORD object!
    // This is CORRECT!

    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(trace(tc)));
}
