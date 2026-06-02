import { describe, expect, it } from 'vitest';
import {
    createSharedEnsembleResults,
    getSharedEnsembleFeatureVector,
    materializeSharedSimulationResult,
    writeSimulationResultsToShared,
    isSharedEnsembleResultsHandle,
    canUseSharedArrayBuffer,
    generateSecureMessageId
} from '../../services/BnglWorkerPool';
import { mergeSimulationOptionsWithModelActionDefaults } from '../../services/bnglWorker';

describe('BnglWorkerPool shared ensemble helpers', () => {
    it('writes and materializes shared ensemble runs without copying per-read', () => {
        const shared = createSharedEnsembleResults(2, ['time', 'A', 'B'], 2);

        writeSimulationResultsToShared(shared, 0, {
            headers: ['time', 'A', 'B'],
            data: [
                { time: 0, A: 1, B: 2 },
                { time: 1, A: 3, B: 4 },
            ]
        });

        const run = materializeSharedSimulationResult(shared, 0);
        const featureVector = getSharedEnsembleFeatureVector(shared, 0);

        expect(run.headers).toEqual(['time', 'A', 'B']);
        expect(run.data).toEqual([
            { time: 0, A: 1, B: 2 },
            { time: 1, A: 3, B: 4 },
        ]);
        expect(featureVector).toEqual([0, 1, 2, 1, 3, 4]);
    });

    it('prefers explicit options t_end and n_steps over model action defaults', () => {
        const model = {
            actions: [
                { type: 'simulate_ode', args: { t_end: 50, n_steps: 42 } }
            ],
            simulationPhases: [],
        } as any;

        const explicitOptions = { method: 'ode', t_end: 100, n_steps: 200 } as any;
        const mergedExplicit = mergeSimulationOptionsWithModelActionDefaults(explicitOptions, model, 'ode');

        expect(mergedExplicit.t_end).toBe(100);
        expect(mergedExplicit.n_steps).toBe(200);

        const fallbackOptions = { method: 'ode' } as any;
        const mergedFallback = mergeSimulationOptionsWithModelActionDefaults(fallbackOptions, model, 'ode');

        expect(mergedFallback.t_end).toBe(50);
        expect(mergedFallback.n_steps).toBe(42);
    });

    it('ignores non-numeric optional action args and preserves explicit values', () => {
        const model = {
            actions: [
                { type: 'simulate_ode', args: { utl: 'auto', gml: 'oops', equilibrate: 'bad', eq: 'also_bad', seed: 'nan' } }
            ],
            simulationPhases: [],
        } as any;

        const merged = mergeSimulationOptionsWithModelActionDefaults({ method: 'ode' } as any, model, 'ode');
        expect(merged.utl).toBeUndefined();
        expect(merged.gml).toBeUndefined();
        expect(merged.equilibrate).toBeUndefined();
        expect(merged.seed).toBeUndefined();

        const explicit = mergeSimulationOptionsWithModelActionDefaults(
            { method: 'ode', utl: 3, gml: 4, equilibrate: 5, seed: 6 } as any,
            model,
            'ode'
        );
        expect(explicit.utl).toBe(3);
        expect(explicit.gml).toBe(4);
        expect(explicit.equilibrate).toBe(5);
        expect(explicit.seed).toBe(6);
    });
});
describe('BnglWorkerPool utils', () => {
    it('isSharedEnsembleResultsHandle correctly identifies shared handles', () => {
        expect(isSharedEnsembleResultsHandle({ kind: 'shared' } as any)).toBe(true);
        expect(isSharedEnsembleResultsHandle(null)).toBe(false);
        expect(isSharedEnsembleResultsHandle(undefined)).toBe(false);
        expect(isSharedEnsembleResultsHandle([])).toBe(false);
        expect(isSharedEnsembleResultsHandle([{} as any])).toBe(false);
    });

    it('canUseSharedArrayBuffer handles availability and exceptions', () => {
        const originalSAB = globalThis.SharedArrayBuffer;

        // Mock valid
        if (typeof SharedArrayBuffer === 'undefined') {
            globalThis.SharedArrayBuffer = class SharedArrayBuffer {
                byteLength: number;
                constructor(length: number) { this.byteLength = length; }
            } as any;
        }
        expect(canUseSharedArrayBuffer()).toBe(true);

        // Mock throw
        globalThis.SharedArrayBuffer = function() {
            throw new Error('Not allowed');
        } as any;
        expect(canUseSharedArrayBuffer()).toBe(false);

        // Mock undefined
        Object.defineProperty(globalThis, 'SharedArrayBuffer', {
            value: undefined,
            writable: true,
            configurable: true,
        });
        expect(canUseSharedArrayBuffer()).toBe(false);

        // Restore
        Object.defineProperty(globalThis, 'SharedArrayBuffer', {
            value: originalSAB,
            writable: true,
            configurable: true,
        });
    });

    it('generateSecureMessageId generates random ID or throws if missing crypto', () => {
        const originalCrypto = globalThis.crypto;

        // Mock valid crypto
        Object.defineProperty(globalThis, 'crypto', {
            value: {
                getRandomValues: (arr: Uint32Array) => {
                    arr[0] = 12345;
                    return arr;
                }
            },
            writable: true,
            configurable: true,
        });


        expect(generateSecureMessageId()).toBe(12345);

        // Mock missing crypto
        Object.defineProperty(globalThis, 'crypto', {
            value: undefined,
            writable: true,
            configurable: true,
        });

        expect(() => generateSecureMessageId()).toThrow('Secure random generation is not supported');

        // Restore
        Object.defineProperty(globalThis, 'crypto', {
            value: originalCrypto,
            writable: true,
            configurable: true,
        });
    });
});
