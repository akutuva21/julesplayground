const testCases = [
  // Normal file, model named "perModel"
  {
    generatedAt: "2023",
    perModel: {
      "perModel": { history: [], latest: {} }
    }
  }
];

let current = testCases[0];
while (current && current.perModel && !current.perModel.history) {
  current = current.perModel;
}
console.log(current);
