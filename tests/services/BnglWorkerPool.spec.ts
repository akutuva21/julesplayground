import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
    createSharedEnsembleResults,
    getSharedEnsembleFeatureVector,
    materializeSharedSimulationResult,
    writeSimulationResultsToShared,
    isSharedEnsembleResultsHandle,
    canUseSharedArrayBuffer,
    generateSecureMessageId,
    SharedEnsembleResultsHandle,
} from '../../services/BnglWorkerPool';
import { mergeSimulationOptionsWithModelActionDefaults } from '../../services/bnglWorker';

describe('BnglWorkerPool shared ensemble helpers', () => {
    describe('isSharedEnsembleResultsHandle', () => {
        it('returns true for valid handle', () => {
            const handle: SharedEnsembleResultsHandle = {
                kind: 'shared',
                headers: [],
                runCount: 0,
                rowCount: 0,
                columnCount: 0,
                values: new Float64Array(),
                completion: new Int32Array()
            };
            expect(isSharedEnsembleResultsHandle(handle)).toBe(true);
        });

        it('returns false for invalid handle or array', () => {
            expect(isSharedEnsembleResultsHandle([])).toBe(false);
            expect(isSharedEnsembleResultsHandle(null)).toBe(false);
            expect(isSharedEnsembleResultsHandle(undefined)).toBe(false);
            expect(isSharedEnsembleResultsHandle({ kind: 'other' } as any)).toBe(false);
        });
    });

    describe('canUseSharedArrayBuffer', () => {
        let originalSharedArrayBuffer: any;

        beforeEach(() => {
            originalSharedArrayBuffer = global.SharedArrayBuffer;
        });

        afterEach(() => {
            global.SharedArrayBuffer = originalSharedArrayBuffer;
        });

        it('returns true if SharedArrayBuffer is available', () => {
            // Assuming it is available in Node/Vitest by default
            expect(canUseSharedArrayBuffer()).toBe(true);
        });

        it('returns false if SharedArrayBuffer is not available', () => {
            global.SharedArrayBuffer = undefined as any;
            expect(canUseSharedArrayBuffer()).toBe(false);
        });
    });

    describe('generateSecureMessageId', () => {
        it('generates a secure message ID', () => {
            const id = generateSecureMessageId();
            expect(typeof id).toBe('number');
        });
    });

    describe('Error handling', () => {
        it('writeSimulationResultsToShared throws out of range', () => {
            const shared = createSharedEnsembleResults(2, ['time', 'A'], 2);
            expect(() => writeSimulationResultsToShared(shared, 2, { headers: [], data: [] }))
                .toThrow('Shared ensemble index out of range: 2');
            expect(() => writeSimulationResultsToShared(shared, -1, { headers: [], data: [] }))
                .toThrow('Shared ensemble index out of range: -1');
        });

        it('writeSimulationResultsToShared throws row count mismatch', () => {
            const shared = createSharedEnsembleResults(2, ['time', 'A'], 2);
            expect(() => writeSimulationResultsToShared(shared, 0, { headers: ['time', 'A'], data: [] }))
                .toThrow('Expected 2 rows, received 0');
        });

        it('writeSimulationResultsToShared throws col count mismatch', () => {
            const shared = createSharedEnsembleResults(2, ['time', 'A'], 2);
            expect(() => writeSimulationResultsToShared(shared, 0, { headers: ['time'], data: [{}, {}] }))
                .toThrow('Expected 2 columns, received 1');
        });

        it('materializeSharedSimulationResult throws if not complete', () => {
            const shared = createSharedEnsembleResults(2, ['time', 'A'], 2);
            expect(() => materializeSharedSimulationResult(shared, 0))
                .toThrow('Shared ensemble slot 0 is not complete');
        });

        it('getSharedEnsembleFeatureVector throws if not complete', () => {
            const shared = createSharedEnsembleResults(2, ['time', 'A'], 2);
            expect(() => getSharedEnsembleFeatureVector(shared, 0))
                .toThrow('Shared ensemble slot 0 is not complete');
        });
    });

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
