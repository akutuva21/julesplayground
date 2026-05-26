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
    current = current.perModel;
  }
  console.log("Result:", JSON.stringify(current));
}
