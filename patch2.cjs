const fs = require('fs');
let content = fs.readFileSync('packages/engine/src/services/analysis/DoseResponse.ts', 'utf-8');
content = content.replace(
  "export function computeDoseResponse(",
  `import { simulate } from "../simulation/SimulationLoop";
import { evaluateFunctionalRate, clearAllEvaluatorCaches } from "../simulation/ExpressionEvaluator";

function cloneExpandedModel(model: BNGLModel): BNGLModel {
    return structuredClone(model);
}

function updateMassActionRates(model: BNGLModel): void {
    const context = model.parameters ?? {};
    for (const reaction of model.reactions ?? []) {
        if (!reaction.isFunctionalRate && reaction.rate && typeof reaction.rate === 'string') {
            try {
                const updatedRate = evaluateFunctionalRate(reaction.rate, context, {}, model.functions);
                if (Number.isFinite(updatedRate)) {
                    reaction.rateConstant = updatedRate;
                }
            } catch {
                // Keep the existing concrete rate when a symbolic update fails.
            }
        }
    }
    clearAllEvaluatorCaches();
}

async function computeDoseResponseBySimulation(
    expandedModel: any,
    inputParameter: string,
    observables: string[],
    inputMin: number,
    inputMax: number,
    nPoints: number,
    logScale: boolean,
    tEnd: number,
): Promise<{ curves: Array<{ observable: string; doses: number[]; responses: number[] }>; failedDoses: number[] }> {
    const doses = generateDosePoints(inputMin, inputMax, nPoints, logScale);
    const failedDoses: number[] = [];
    const responsesByObservable = new Map<string, number[]>();
    const successfulDoses: number[] = [];

    observables.forEach((obs) => {
        responsesByObservable.set(obs, []);
    });

    const simOptions = {
        method: 'ode',
        t_end: tEnd,
        n_steps: 200,
        solver: 'auto',
    } as any;

    for (const dose of doses) {
        try {
            const runModel = cloneExpandedModel(expandedModel);
            runModel.parameters[inputParameter] = dose;
            updateMassActionRates(runModel);

            const simResult = await simulate(0, runModel, simOptions, {
                checkCancelled: () => { },
                postMessage: () => { },
            });

            const finalRow = simResult.data?.[simResult.data.length - 1];
            if (!finalRow) {
                failedDoses.push(dose);
                continue;
            }

            const values = observables.map((obs) => Number(finalRow[obs]));
            if (values.some((value) => !Number.isFinite(value))) {
                failedDoses.push(dose);
                continue;
            }

            successfulDoses.push(dose);
            observables.forEach((obs, index) => {
                responsesByObservable.get(obs)!.push(values[index]);
            });
        } catch {
            failedDoses.push(dose);
        }
    }

    return {
        curves: observables.map((obs) => ({
            observable: obs,
            doses: successfulDoses,
            responses: responsesByObservable.get(obs) ?? [],
        })),
        failedDoses,
    };
}

export async function computeDoseResponse(`
);
fs.writeFileSync('packages/engine/src/services/analysis/DoseResponse.ts', content);
