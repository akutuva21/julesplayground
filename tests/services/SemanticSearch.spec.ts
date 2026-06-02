
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cosineSimilarity, semanticSearch, isSemanticSearchReady, resetSemanticSearchState, _internalState, preloadEmbeddingModel, getAllModels } from '../../services/semanticSearch';

// Mock fetching the index
const mockIndex = {
    version: 1,
    model: 'all-MiniLM-L6-v2',
    dimensions: 3,
    count: 2,
    generated: '2023-01-01',
    models: [
        {
            id: 'm1',
            filename: 'model1.bngl',
            path: '/path/m1',
            category: 'test',
            preview: 'preview1',
            embedding: [1, 0, 0] // Unit X
        },
        {
            id: 'm2',
            filename: 'model2.bngl',
            path: '/path/m2',
            category: 'test',
            preview: 'preview2',
            embedding: [0, 1, 0] // Unit Y
        }
    ]
};

// Mock pipeline
const mockPipeline = vi.fn();

// In the browser branch we load the UMD bundle which exposes a global
// `transformers.pipeline`. For the tests we emulate that global.
beforeEach(() => {
    (global as any).transformers = { pipeline: (...args: any[]) => mockPipeline(...args) };
});

// Also mock the Node import path (used when `window` is undefined in tests)
vi.mock('@xenova/transformers', () => ({
    pipeline: (...args: any[]) => mockPipeline(...args)
}));

export const mockLoadTransformersPipeline = vi.fn();
vi.mock('@/src/utils/transformersLoader', () => ({
    loadTransformersPipeline: () => mockLoadTransformersPipeline()
}));

describe('Semantic Search Service', () => {

    beforeEach(() => {
        resetSemanticSearchState();
        vi.resetAllMocks(); // Clear call counts
    });

    afterEach(() => {
        vi.restoreAllMocks(); // Restore original implementations
    });

    describe('cosineSimilarity', () => {
        it('should compute 1 for identical vectors', () => {
            expect(cosineSimilarity([1, 0], [1, 0])).toBeCloseTo(1);
        });
        it('should compute 0 for orthogonal vectors', () => {
            expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
        });
        it('should compute -1 for opposite vectors', () => {
            expect(cosineSimilarity([1, 0], [-1, 0])).toBeCloseTo(-1);
        });
        it('should handle non-normalized vectors', () => {
            expect(cosineSimilarity([3, 0], [0, 4])).toBeCloseTo(0);
        });

        // Property-based testing for Cosine Similarity
        for (let i = 0; i < 40; i++) {
            it(`should be within [-1, 1] range for random vectors #${i}`, () => {
                const vecA = Array.from({ length: 5 }, () => Math.random() * 2 - 1);
                const vecB = Array.from({ length: 5 }, () => Math.random() * 2 - 1);
                if (vecA.every(v => v === 0) || vecB.every(v => v === 0)) return; // skip zero vectors
                const sim = cosineSimilarity(vecA, vecB);
                expect(sim).toBeGreaterThanOrEqual(-1.000001);
                expect(sim).toBeLessThanOrEqual(1.000001);
            });
        }
    });

    describe('semanticSearch', () => {
        let fetchSpy: any;

        beforeEach(() => {
            mockLoadTransformersPipeline.mockResolvedValue((...args: any[]) => mockPipeline(...args));

            // Setup default successful fetch for search tests
            fetchSpy = vi.spyOn(global, 'fetch');
            fetchSpy.mockResolvedValue({
                ok: true,
                json: async () => mockIndex
            } as Response);

            // Setup default successful pipeline
            mockPipeline.mockResolvedValue(async (query: string) => {
                let data;
                if (query === 'find X') data = [1, 0, 0];
                else if (query === 'find Y') data = [0, 1, 0];
                else data = [0, 0, 1]; // Z-axis
                return {
                    data: new Float32Array(data)
                };
            });
        });

        it('should return top results for exact match', async () => {
            const results = await semanticSearch('find X');
            expect(results.length).toBeGreaterThan(0);
            expect(results[0].id).toBe('m1');
            expect(results[0].score).toBeCloseTo(1);
        });

        it('should rank correctly', async () => {
            const results = await semanticSearch('find Y');
            expect(results[0].id).toBe('m2');
            expect(results[0].score).toBeCloseTo(1);
            expect(results[1].id).toBe('m1');
            expect(results[1].score).toBeCloseTo(0);
        });

        it('should handle empty query', async () => {
            const results = await semanticSearch('   ');
            expect(results).toEqual([]);
        });

        it('should throw an error if pipeline output is falsy', async () => {
            mockPipeline.mockResolvedValue(async () => null);
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            await expect(semanticSearch('test')).rejects.toThrow('Embedding pipeline returned unexpected output');
            expect(warnSpy).toHaveBeenCalledWith('[SemanticSearch][DEBUG] embed output is missing data:', null);
            warnSpy.mockRestore();
        });

        it('should throw an error if pipeline output has no data field', async () => {
            mockPipeline.mockResolvedValue(async () => ({}));
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            await expect(semanticSearch('test')).rejects.toThrow('Embedding pipeline returned unexpected output');
            expect(warnSpy).toHaveBeenCalledWith('[SemanticSearch][DEBUG] embed output is missing data:', {});
            warnSpy.mockRestore();
        });

        it('should log a warning if queryEmbedding length is 0', async () => {
            mockPipeline.mockResolvedValue(async () => ({
                data: []
            }));
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            await semanticSearch('test');
            expect(warnSpy).toHaveBeenCalledWith('[SemanticSearch][DEBUG] queryEmbedding length:', 0);
            warnSpy.mockRestore();
        });

        it('should handle concurrent requests waiting for the first one to finish loading', async () => {
            let resolveLoad: any;
            const loadPromise = new Promise(resolve => {
                resolveLoad = resolve;
            });
            mockLoadTransformersPipeline.mockImplementation(async () => {
                await loadPromise;
                return (...args: any[]) => mockPipeline(...args);
            });

            // Fire first request
            const firstRequest = semanticSearch('find X');
            // Give it time to set isLoading = true
            await new Promise(r => setTimeout(r, 50));
            // Fire second request, it should await the ongoing load
            const secondRequest = semanticSearch('find Y');

            // Resolve the load
            resolveLoad();

            const [res1, res2] = await Promise.all([firstRequest, secondRequest]);
            expect(res1[0].id).toBe('m1');
            expect(res2[0].id).toBe('m2');

            // Should only have been called once
            expect(mockLoadTransformersPipeline).toHaveBeenCalledTimes(1);
        });

        it('should handle concurrent requests where the first one throws', async () => {
            let resolveLoad: any;
            let rejectLoad: any;
            const loadPromise = new Promise((resolve, reject) => {
                resolveLoad = resolve;
                rejectLoad = reject;
            });
            mockLoadTransformersPipeline.mockImplementation(async () => {
                await loadPromise;
            });

            // Fire first request
            const firstRequest = semanticSearch('find X');
            // Give it time to set isLoading = true
            await new Promise(r => setTimeout(r, 50));
            // Fire second request, it should await the ongoing load and throw the cached error
            const secondRequest = semanticSearch('find Y');

            // Reject the load
            rejectLoad(new Error('Network failure'));

            await expect(firstRequest).rejects.toThrow('Network failure');
            await expect(secondRequest).rejects.toThrow('Network failure');
        });

        it('should handle fetch failure by throwing', async () => {
            // Override the default mock for this specific test
            fetchSpy.mockResolvedValue({
                ok: false,
                status: 404
            } as Response);

            await expect(semanticSearch('test')).rejects.toThrow('Failed to load embeddings index: 404');
        });

        it('should handle embedding model load failure by throwing and setting loadError', async () => {
            // Override the default mock to throw an error
            mockLoadTransformersPipeline.mockRejectedValue(new Error('Failed to load transformers'));

            await expect(semanticSearch('test')).rejects.toThrow('Failed to load transformers');

            // If the search failed, subsequent attempts to load embedder should immediately throw the cached loadError
            // Calling it again without waiting for fetch will trigger the cached error branch
            await expect(semanticSearch('test')).rejects.toThrow('Failed to load transformers');
        });
    });

    describe('isSemanticSearchReady', () => {
        it('should return true if index loads', async () => {
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => mockIndex
            } as Response);

            const ready = await isSemanticSearchReady();
            expect(ready).toBe(true);
        });

        it('should return false if index load fails', async () => {
            vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

            const ready = await isSemanticSearchReady();
            expect(ready).toBe(false);
        });

        it('should return false if index fetch is not ok', async () => {
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: false,
                status: 404
            } as Response);

            const ready = await isSemanticSearchReady();
            expect(ready).toBe(false);
        });
    });

    describe('preloadEmbeddingModel', () => {
        it('should start loading the model and catch any errors', async () => {
            mockLoadTransformersPipeline.mockRejectedValue(new Error('Preload failure'));
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            preloadEmbeddingModel();

            // Yield the event loop to allow the catch block to run
            await new Promise(r => setTimeout(r, 0));

            expect(warnSpy).toHaveBeenCalledWith('[SemanticSearch] Failed to preload model:', expect.any(Error));
            expect(warnSpy.mock.calls[0][1].message).toBe('Preload failure');

            warnSpy.mockRestore();
        });

        it('should succeed silently on successful preload', async () => {
            mockLoadTransformersPipeline.mockResolvedValue((...args: any[]) => mockPipeline(...args));
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            preloadEmbeddingModel();

            // Yield the event loop
            await new Promise(r => setTimeout(r, 0));

            expect(warnSpy).not.toHaveBeenCalled();
            expect(_internalState.embedder).not.toBeNull();

            warnSpy.mockRestore();
        });
    });

    describe('getAllModels', () => {
        it('should return all models from the index with a score of 1', async () => {
            vi.spyOn(global, 'fetch').mockResolvedValue({
                ok: true,
                json: async () => mockIndex
            } as Response);

            const models = await getAllModels();

            expect(models).toHaveLength(2);
            expect(models[0]).toEqual({
                id: 'm1',
                filename: 'model1.bngl',
                path: '/path/m1',
                category: 'test',
                preview: 'preview1',
                score: 1
            });
            expect(models[1].id).toBe('m2');
            expect(models[1].score).toBe(1);
        });
    });

    describe('resetSemanticSearchState', () => {
        it('should reset all internal state variables to defaults', () => {
            // Set internal state to dummy values
            _internalState.embedder = { dummy: true };
            _internalState.embeddingsIndex = { dummy: true } as any;
            _internalState.isLoading = true;
            _internalState.loadError = new Error('Test error');

            // Verify they were set
            expect(_internalState.embedder).not.toBeNull();
            expect(_internalState.embeddingsIndex).not.toBeNull();
            expect(_internalState.isLoading).toBe(true);
            expect(_internalState.loadError).not.toBeNull();

            // Call reset
            resetSemanticSearchState();

            // Verify they were reset
            expect(_internalState.embedder).toBeNull();
            expect(_internalState.embeddingsIndex).toBeNull();
            expect(_internalState.isLoading).toBe(false);
            expect(_internalState.loadError).toBeNull();
        });
    });
});
