const parsed = { generatedAt: "...", perModel: { "history": { history: [] } } };
let current = parsed;
while (current && current.perModel && !current.perModel.history) {
  current = current.perModel;
}
let perModelStore = current || {};
console.log("perModelStore keys:", Object.keys(perModelStore));
