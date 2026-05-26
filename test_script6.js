const tests = [
  { generatedAt: "...", perModel: { "perModel": { latest: { passed: true } } } },
  { generatedAt: "...", perModel: { perModel: { "perModel": { history: [1] } } } },
];

for (const parsed of tests) {
  let current = parsed;
  // Option 1
  while (current && current.perModel && !(current.perModel.history || current.perModel.latest)) {
    current = current.perModel;
  }
  console.log("Opt1:", JSON.stringify(current));

  // What if the memory is literally telling me to write `!current.perModel.history` as duck typing but maybe I need `!current.perModel.history && !current.perModel.latest` ?
}
