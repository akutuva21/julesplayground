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
  { id: 10, generatedAt: "10", perModel: { "perModel": { history: null, latest: {} } } }
];

function trace(parsed) {
  let current = parsed;
  while (current && current.perModel) {
    // If current.perModel has `history` as an array or `latest` as an object, it's the Data object itself, so don't descend.
    if (Array.isArray(current.perModel.history) || (current.perModel.latest && typeof current.perModel.latest === 'object' && !Array.isArray(current.perModel.latest))) {
      break;
    }
    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(trace(tc)));
}
