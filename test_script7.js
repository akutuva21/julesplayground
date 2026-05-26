const testCases = [
  // Normal file, model named "myModel"
  {
    generatedAt: "2023",
    perModel: {
      "myModel": { history: [], latest: {} }
    }
  },
  // Buggy file, model named "myModel"
  {
    generatedAt: "2023",
    perModel: {
      perModel: {
        "myModel": { history: [], latest: {} }
      }
    }
  },
  // Normal file, model named "perModel"
  {
    generatedAt: "2023",
    perModel: {
      "perModel": { history: [], latest: {} }
    }
  },
  // Buggy file, model named "perModel"
  {
    generatedAt: "2023",
    perModel: {
      perModel: {
        "perModel": { history: [], latest: {} }
      }
    }
  },
  // Buggy file, model named "perModel", but only latest, no history
  {
    generatedAt: "2023",
    perModel: {
      perModel: {
        "perModel": { latest: {} }
      }
    }
  }
];

function findDeepest(parsed) {
  let current = parsed;
  // Let's use duck typing to find if current.perModel is actually the data object for a model named "perModel".
  // A data object would have `history` or `latest`.
  // Wait, if current.perModel has `.history` or `.latest`, then current is the RECORD of models.
  // And we shouldn't descend into `current.perModel`.
  // Wait, if `current.perModel` is the RECORD of models, then `current.perModel` is an object where keys are modelNames, and values are data objects.
  // BUT what if there is a model named "history"? Then `current.perModel.history` is a data object!
  // If there is a model named "history", then `current.perModel.history` evaluates to truthy!
  // Then `!current.perModel.history` is false, and it won't descend!
  // Wait! If `current.perModel` is the RECORD of models, it DOES NOT have `.history` UNLESS there is a model named "history".
  // Ah! `current.perModel.history` is checking if there is a model named "history"!
  // BUT the data object has `{ history: [...], latest: {...} }`.
  // If `current.perModel` is the DATA object, then it DOES have `.history`.

  // Let's trace it carefully.
  // If `current` is the wrapper `{ generatedAt, perModel: {...} }`
  // `current.perModel` is the RECORD.
  // `current.perModel.history` is accessing the model named "history".
  // If there's no model named "history", `!current.perModel.history` is TRUE.
  // So it WILL descend! `current = current.perModel`.
  // Now `current` is the RECORD.
  // In the next iteration, `current.perModel` accesses the model named "perModel".
  // IF there is a model named "perModel", `current.perModel` is its DATA object.
  // Then `current.perModel.history` accesses the `history` array of that model.
  // Since it exists, `!current.perModel.history` is FALSE.
  // Loop breaks! `current` is the RECORD! This works perfectly...

  // UNLESS there is NO model named "perModel".
  // In that case, `current.perModel` is undefined.
  // Loop breaks! `current` is the RECORD!

  // UNLESS there IS a model named "perModel", but it only has `.latest` and no `.history`.
  // In that case, `current.perModel` is the DATA object.
  // `current.perModel.history` is undefined.
  // `!current.perModel.history` is TRUE.
  // It DESCENDS! `current = current.perModel` (the DATA object).
  // Next iteration: `current` is the DATA object.
  // `current.perModel` is undefined.
  // Loop breaks!
  // BUT NOW `current` is the DATA object, NOT the RECORD.
  // This is a bug!

  while (current && current.perModel && !(current.perModel.history || current.perModel.latest)) {
    current = current.perModel;
  }
  return current;
}

for (const tc of testCases) {
  console.log(findDeepest(tc));
}
