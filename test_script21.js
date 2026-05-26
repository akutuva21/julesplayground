const tc11 = { id: 11, generatedAt: "11", perModel: { "perModel": { error: "failed" } } };

function trace(parsed) {
  let current = parsed;
  while (current && current.perModel) {
    const isDataObj = (
      Array.isArray(current.perModel.history) ||
      (current.perModel.latest && typeof current.perModel.latest === 'object' && !Array.isArray(current.perModel.latest))
    );
    if (isDataObj) {
      break;
    }
    current = current.perModel;
  }
  return current;
}

console.log(Object.keys(trace(tc11)));
