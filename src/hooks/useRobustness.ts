
import { useState, useCallback, useRef } from 'react';

import { bnglService } from '../../services/bnglService';
import { BNGLModel, SimulationOptions } from '../../types';
import { perturbParameterOverrides } from '../utils/bnglManipulation';

export interface RobustnessAnalysisResult {
    time: number[];
    speciesData: Record<string, {
        mean: number[];
        stdDev: number[];
        min: number[];
        max: number[];
    }>;
    iterations: number;
}

export interface RobustnessOptions {
    iterations: number;
    variationPercent: number;
}

export function useRobustness() {
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0); // 0 to 100
    const [result, setResult] = useState<RobustnessAnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const runRobustness = useCallback(async (
        model: BNGLModel,
        simOptions: SimulationOptions,
        robustnessOptions: RobustnessOptions
    ) => {
        setIsRunning(true);
        setProgress(0);
        setError(null);
        setResult(null);

        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
            // 1. Prepare (Cache) the model
            const modelId = await bnglService.prepareModel(model, { signal, description: 'Prepare Robustness Model' });

            // Initialize Accumulators
            let timePoints: number[] = [];
            const sums: Record<string, number[]> = {};
            const sumSqs: Record<string, number[]> = {};
            const mins: Record<string, number[]> = {};
            const maxs: Record<string, number[]> = {};

            // Loop
            const { iterations, variationPercent } = robustnessOptions;

            for (let i = 0; i < iterations; i++) {
                if (signal.aborted) throw new Error('Simulation aborted');

                // Perturb
                const overrides = perturbParameterOverrides(model.parameters, variationPercent);

                // Run Simulation (Using cached model)
                // Note: simulateCached requires modelId.
                const runResult = await bnglService.simulateCached(
                    modelId,
                    overrides,
                    simOptions,
                    { signal, description: `Robustness Run ${i + 1}/${iterations}` }
                );

                // Initialize structures on first run
                if (i === 0) {
                    // Extract time points
                    timePoints = runResult.data.map(d => d.time);

                    runResult.headers.forEach(h => {
                        if (h === 'time') return;
                        sums[h] = new Array(timePoints.length).fill(0);
                        sumSqs[h] = new Array(timePoints.length).fill(0);
                        mins[h] = new Array(timePoints.length).fill(Infinity);
                        maxs[h] = new Array(timePoints.length).fill(-Infinity);
                    });
                }

                // Aggregate Data
                runResult.data.forEach((row, timeIdx) => {
                    Object.entries(row).forEach(([key, val]) => {
                        if (key === 'time') return;
                        if (!sums[key]) return; // Should allow headers stability

                        const value = val as number;
                        sums[key][timeIdx] += value;
                        sumSqs[key][timeIdx] += value * value;
                        if (value < mins[key][timeIdx]) mins[key][timeIdx] = value;
                        if (value > maxs[key][timeIdx]) maxs[key][timeIdx] = value;
                    });
                });

                setProgress(Math.round(((i + 1) / iterations) * 100));
            }

            // Cleanup
            await bnglService.releaseModel(modelId);

            // Calculate Stats (Mean, SD)
            const finalSpeciesData: Record<string, { mean: number[], stdDev: number[], min: number[], max: number[] }> = {};

            Object.keys(sums).forEach(key => {
                const meanArr = sums[key].map(sum => sum / iterations);
                const stdDevArr = sumSqs[key].map((sumSq, idx) => {
                    const variance = (sumSq / iterations) - (meanArr[idx] * meanArr[idx]);
                    return Math.sqrt(Math.max(0, variance)); // clamp 0
                });

                finalSpeciesData[key] = {
                    mean: meanArr,
                    stdDev: stdDevArr,
                    min: mins[key],
                    max: maxs[key]
                };
            });

            setResult({
                time: timePoints,
                speciesData: finalSpeciesData,
                iterations
            });

        } catch (err: any) {
            if (err.name === 'AbortError') {
                console.log('Robustness analysis cancelled');
            } else {
                console.error(err);
                setError(err.message || 'Robustness Analysis Failed');
            }
        } finally {
            setIsRunning(false);
            abortControllerRef.current = null;
        }
    }, []);

    const cancelRobustness = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }, []);

    return {
        runRobustness,
        cancelRobustness,
        isRunning,
        progress,
        result,
        error
    };
}
