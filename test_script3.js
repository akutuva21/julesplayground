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
  while (current && current.perModel && !current.perModel.history) {
    // Wait, the memory says: "use duck-typing to verify the presence of expected data properties (e.g., `!current.perModel.history`) to prevent the traversal loop from erroneously diving into the actual data objects."
    // BUT what if the model is NAMED 'perModel'?
    // Then current.perModel is the mapping object.
    // AND current.perModel.perModel is the data object for the 'perModel' model.
    // If we check `!current.perModel.history`, wait:
    // If current is the mapping object, then current is { "perModel": { history: [1] }, "other": { history: [1] } }
    // Then current.perModel is { history: [1] }
    // And current.perModel.history is [1]
    // If current.perModel.history is TRUE, then the loop breaks!
    // And current is kept as { "perModel": ... } which IS the mapping object.
    // Wait, let's trace it.

    // Iteration 1:
    // current = { generatedAt: "...", perModel: { "perModel": { history: [1] }, "other": { history: [1] } } }
    // current.perModel is { "perModel": { history: [1] }, "other": { history: [1] } }
    // current.perModel.history is undefined.
    // So !current.perModel.history is true.
    // So current becomes current.perModel = { "perModel": { history: [1] }, "other": { history: [1] } }

    // Iteration 2:
    // current = { "perModel": { history: [1] }, "other": { history: [1] } }
    // current.perModel is { history: [1] }
    // current.perModel.history is [1]
    // So !current.perModel.history is false!
    // The loop breaks!
    // And current is { "perModel": { history: [1] }, "other": { history: [1] } }.
    // THIS IS CORRECT! It works!

    // Wait, what if there's ONLY a model named 'perModel'?
    // parsed = { generatedAt: "...", perModel: { "perModel": { history: [1] } } }
    // Iter 1: current.perModel is { "perModel": { history: [1] } }
    // current.perModel.history is undefined.
    // current becomes { "perModel": { history: [1] } }
    // Iter 2: current.perModel is { history: [1] }
    // current.perModel.history is [1] (truthy).
    // Loop breaks! current is the mapping object. CORRECT.

    current = current.perModel;
  }
  console.log("Result:", JSON.stringify(current));
}
