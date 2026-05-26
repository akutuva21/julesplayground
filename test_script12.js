const testCases = [
  // Correct wrapper, no model named perModel
  { generatedAt: "1", perModel: { "myModel": { history: [] } } },
  // Correct wrapper, model named perModel
  { generatedAt: "2", perModel: { "perModel": { history: [] } } },
  // Buggy wrapper, no model named perModel
  { generatedAt: "3", perModel: { perModel: { "myModel": { history: [] } } } },
  // Buggy wrapper, model named perModel
  { generatedAt: "4", perModel: { perModel: { "perModel": { history: [] } } } },
  // 3-level Buggy wrapper, model named perModel
  { generatedAt: "5", perModel: { perModel: { perModel: { "perModel": { history: [] } } } } },
  // Model named "history"
  { generatedAt: "6", perModel: { "history": { history: [] } } }
];

for (const parsed of testCases) {
  let current = parsed;
  // If we just check `current.perModel.perModel`, will it work?
  // Let's trace case 1:
  // current = { generatedAt: 1, perModel: { myModel: { history: [] } } }
  // current.perModel = { myModel: { history: [] } }
  // current.perModel.perModel = undefined
  // So it DOES NOT DIVE.
  // Result: current is the top wrapper!
  // BUT we want current to be the dictionary!
  // perModelStore = current || {};
  // If current is the top wrapper, perModelStore will have `.generatedAt`!
  // But wait, the original code:
  // `while (current && current.perModel && !current.perModel.history)`
  // In case 1:
  // current.perModel.history is undefined.
  // It DIVES. current becomes the dictionary.
  // Next iter: current.perModel is undefined. breaks.
  // Result: current is the dictionary!
}
