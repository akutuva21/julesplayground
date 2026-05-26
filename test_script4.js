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
  while (current && current.perModel && !current.perModel.history && !current.perModel.latest) {
    current = current.perModel;
  }
  console.log("Result:", JSON.stringify(current));
}
