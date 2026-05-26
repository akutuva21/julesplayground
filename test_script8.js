const testCases = [
  // Normal file, model named "history"
  {
    generatedAt: "2023",
    perModel: {
      "history": { history: [], latest: {} }
    }
  },
  // Normal file, model named "latest"
  {
    generatedAt: "2023",
    perModel: {
      "latest": { history: [], latest: {} }
    }
  },
  // Buggy file, model named "history"
  {
    generatedAt: "2023",
    perModel: {
      perModel: {
        "history": { history: [], latest: {} }
      }
    }
  }
];

function findDeepest(parsed) {
  let current = parsed;
  // If we just check `!(current.perModel.history || current.perModel.latest)`,
  // what if there is a model named "history"?
  // Then `current.perModel.history` evaluates to truthy!
  // And it WILL NOT descend!
  // Wait, if current is the wrapper, `current.perModel` is the RECORD.
  // `current.perModel.history` is the data object for the model named "history".
  // Which is truthy!
  // So it WILL NOT descend!
  // So `current` remains the wrapper `{ generatedAt, perModel: {...} }`
  // But wait, we want `current` to become `current.perModel` (the RECORD).
  // But it didn't descend even once!
  // So `current` is the wrapper!
  // And `perModelStore = current || {}` sets `perModelStore` to the wrapper!
  // But `perModelStore` is expected to be the RECORD itself!

  // Wait... in the FIRST iteration:
  // `current = parsed`
  // `current.perModel` is the RECORD.
  // `current.perModel.history` evaluates to the DATA object for "history".
  // Since it's truthy, the loop BREAKS immediately.
  // So `current = parsed`.
  // Wait, if it breaks immediately, `current = parsed`.
  // Then `perModelStore = current`.
  // But `perModelStore` is expected to be the RECORD, not `parsed`!
  // Wait, the previous code in the original script:
  // let current = parsed;
  // while (current && current.perModel && !current.perModel.history) {
  //   current = current.perModel;
  // }
  // perModelStore = current || {};
  //
  // If `parsed` is `{ generatedAt, perModel: { "myModel": {...} } }`:
  // Iteration 1:
  // current = parsed
  // current.perModel = { "myModel": {...} }
  // current.perModel.history = undefined
  // So `!current.perModel.history` is TRUE.
  // It DESCENDS!
  // current = { "myModel": {...} }
  // Next iteration:
  // current.perModel = undefined.
  // Loop BREAKS!
  // current is { "myModel": {...} }!
  // This is CORRECT! `perModelStore = current` sets it to the RECORD!

  while (current && current.perModel && !(current.perModel.history || current.perModel.latest)) {
    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(findDeepest(tc));
}
