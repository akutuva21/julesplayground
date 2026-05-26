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

  // A robust check for whether `current.perModel` is a Data object
  // A Data object in this context is the value inside the `perModel` Record map.
  // Wait, if it has an error, it might not have history/latest. But a RunSummary has `status`.
  // Let's check `RunSummary` properties!
  // RunSummary properties: `timestamp`, `durationMs`, `status`, `reason`, `options`, `logs`, `refGdatPath`, `issues`
  // But wait, the Data object is NOT a RunSummary.
  // The Data object is `{ history: RunSummary[], latest?: RunSummary }`.
  // Yes! `masterReport` is `Record<string, { history: RunSummary[]; latest?: RunSummary }>`
  // So a Data object ONLY has `history` and `latest`! It does NOT have `error`!
  // Wait, so if a test fails, does it create `{ error: "failed" }`? NO!
  // It creates a `RunSummary` with `status: 'failed'`.
  // And that `RunSummary` is INSIDE `history`!
  // So the Data object ALWAYS has `history`!
  // In `regression_full.spec.ts`:
  // `if (!perModelStore[modelKey]) perModelStore[modelKey] = { history: [] };`
  // It ALWAYS initializes it with `history: []`.
  // So the Data object ALWAYS has a `history` property!

  // So we just need to verify that `history` is an Array.
  // Or even better: `!('history' in current.perModel)`.
  // Wait, we already established that if the model is named `history`, `current.perModel.history` EXISTS!
  // But if the model is named `history`, `current.perModel` is the RECORD object.
  // And `current.perModel.history` is `{ history: [...], latest: {...} }`.
  // Which is NOT an array!

  while (current && current.perModel) {
    // Check if current.perModel is the Data object.
    // The Data object always has a `history` property that is an Array.
    // If current.perModel has a `history` property, and it's an array, it's the Data object!
    if (Array.isArray(current.perModel.history)) {
      break;
    }

    // What if `history` is missing for some reason, but `latest` is present?
    // We can also check if `latest` is present. `latest` is an object, not an array.
    if (current.perModel.latest && typeof current.perModel.latest === 'object' && !Array.isArray(current.perModel.latest)) {
      break;
    }

    // If it's the RECORD object, and there is a model named 'history',
    // then `current.perModel.history` is the Data object for the 'history' model.
    // That Data object is an Object, NOT an Array.
    // So `Array.isArray(current.perModel.history)` is FALSE.
    // Which is correct! We DESCEND into the Record object!

    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(trace(tc)));
}
