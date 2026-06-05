const fs = require('fs');
let content = fs.readFileSync('packages/engine/src/services/analysis/DoseResponse.ts', 'utf-8');
content = content.replace(
  "  // Build stoichiometry matrix (constant across doses).",
  `  if (config.method === 'simulate') {
    const tEnd = config.t_end ?? 1e4;
    const simulated = await computeDoseResponseBySimulation(
        model,
        inputParameter,
        observables,
        inputRange.min,
        inputRange.max,
        nPoints,
        logScale,
        tEnd,
    );
    return {
        inputParameter,
        methodUsed: 'simulate',
        failedDoses: simulated.failedDoses,
        summary: {
            nCurves: simulated.curves.length,
            nFailed: simulated.failedDoses.length,
            nFitted: 0,
            nBifurcationPoints: 0,
        },
        curves: simulated.curves,
    } as DoseResponseResult;
  }
  // Build stoichiometry matrix (constant across doses).`
);
content = content.replace(
  "  return {\n    inputParameter,\n    curves,\n    failedDoses,\n  };\n}",
  `  const totalRootfindPoints = curves.reduce((acc, curve) => acc + curve.responses.length, 0);
  if (totalRootfindPoints === 0 && config.method !== 'simulate') {
      const simulated = await computeDoseResponseBySimulation(
          model,
          inputParameter,
          observables,
          inputRange.min,
          inputRange.max,
          nPoints,
          logScale,
          config.t_end ?? 1e4,
      );

      return {
          inputParameter,
          methodUsed: 'simulate',
          fallbackUsed: 'rootfind_to_simulate',
          warning: 'Root-finding produced no curve points; returned simulation-based fallback curves instead.',
          failedDoses: simulated.failedDoses,
          summary: {
              nCurves: simulated.curves.length,
              nFailed: simulated.failedDoses.length,
              nFitted: 0,
              nBifurcationPoints: 0,
          },
          curves: simulated.curves,
      } as DoseResponseResult;
  }

  return {
    inputParameter,
    methodUsed: 'rootfind',
    summary: {
        nCurves: curves.length,
        nFailed: failedDoses.length,
        nFitted: curves.filter((c) => c.hillFit !== undefined).length,
        nBifurcationPoints: curves.reduce(
            (acc, c) => acc + (c.bifurcationPoints?.length ?? 0),
            0,
        ),
    },
    curves,
    failedDoses,
  } as DoseResponseResult;
}`
);
fs.writeFileSync('packages/engine/src/services/analysis/DoseResponse.ts', content);
