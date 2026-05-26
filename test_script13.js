const testCases = [
  // 1: Correct wrapper, no model named perModel
  { id: 1, generatedAt: "1", perModel: { "myModel": { history: [], latest: {} } } },
  // 2: Correct wrapper, model named perModel
  { id: 2, generatedAt: "2", perModel: { "perModel": { history: [], latest: {} } } },
  // 3: Buggy wrapper, no model named perModel
  { id: 3, generatedAt: "3", perModel: { perModel: { "myModel": { history: [], latest: {} } } } },
  // 4: Buggy wrapper, model named perModel
  { id: 4, generatedAt: "4", perModel: { perModel: { "perModel": { history: [], latest: {} } } } },
  // 5: 3-level Buggy wrapper, model named perModel
  { id: 5, generatedAt: "5", perModel: { perModel: { perModel: { "perModel": { history: [], latest: {} } } } } },
  // 6: Model named "history"
  { id: 6, generatedAt: "6", perModel: { "history": { history: [], latest: {} } } },
  // 7: Buggy wrapper, Model named "history"
  { id: 7, generatedAt: "7", perModel: { perModel: { "history": { history: [], latest: {} } } } }
];

function findRecord(parsed) {
  let current = parsed;
  // We want to find the RECORD object.
  // The RECORD object is a `Record<string, { history: ... }>`
  // While `current` has a `.perModel`, we should check if `current.perModel` is the RECORD object.
  // How to check if an object is the RECORD object?
  // Its values should look like DATA objects.
  // A DATA object has a `.history` or `.latest` property.

  while (current && current.perModel) {
    let isDataNode = false;
    // Actually, `current.perModel` could be the record object!
    // Let's check its values.
    const values = Object.values(current.perModel);
    if (values.length > 0) {
      // If ANY value has 'history' or 'latest', then `current.perModel` is the RECORD.
      const hasDataObjects = values.some(val => val && typeof val === 'object' && ('history' in val || 'latest' in val));
      if (hasDataObjects) {
        // `current.perModel` is the RECORD!
        current = current.perModel;
        break; // we found it, so stop descending
      } else {
        // Not a record, keep descending
        current = current.perModel;
      }
    } else {
      // Empty object? Let's just descend if it's empty, or wait:
      // If it's an empty object, it could be an empty record `{}`.
      // If it's an empty record, `current.perModel` is empty.
      // We can just break and use `current.perModel`.
      current = current.perModel;
      break;
    }
  }
  return current;
}

for (const tc of testCases) {
  console.log(`Case ${tc.id}:`, Object.keys(findRecord(tc)));
}
