import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Model Loader Error Paths', () => {
  let modelLoader: typeof import('../../services/modelLoader');

  beforeEach(async () => {
    vi.resetModules();
    vi.unstubAllGlobals();
    // Dynamic import to get a fresh instance of the module cache
    modelLoader = await import('../../services/modelLoader');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error when all manifest fetch candidates return non-ok responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(modelLoader.getManifest()).rejects.toThrow(/Manifest fetch failed for all candidates/);
    await expect(modelLoader.getManifest()).rejects.toThrow(/404/);
    expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it('should throw an error when all manifest fetch candidates reject with a network error', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('Network failure'));
    vi.stubGlobal('fetch', fetchMock);

    await expect(modelLoader.getManifest()).rejects.toThrow(/Manifest fetch failed for all candidates/);
    await expect(modelLoader.getManifest()).rejects.toThrow(/Network failure/);
  });

  it('should succeed if the first candidate fails but the second succeeds', async () => {
    const validManifest = { models: [], totalModels: 0, generated: '2023-01-01' };
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 500
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => validManifest
      });
    vi.stubGlobal('fetch', fetchMock);

    const manifest = await modelLoader.getManifest();
    expect(manifest).toEqual(validManifest);
    expect(fetchMock.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it('should throw an error if the manifest payload is invalid', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ unexpected: 'format' })
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(modelLoader.getManifest()).rejects.toThrow(/Invalid model manifest payload/);
  });
});

describe('preloadModel', () => {
  let modelLoader: typeof import('../../services/modelLoader');

  beforeEach(async () => {
    vi.resetModules();
    vi.unstubAllGlobals();
    // Dynamic import to get a fresh instance of the module cache
    modelLoader = await import('../../services/modelLoader');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call loadModelCode and fetch when not cached and not pending', async () => {
    // Mock getManifest and fetch
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => 'test code'
    });
    vi.stubGlobal('fetch', fetchMock);

    // Mock manifest resolution so findModel works
    const mockManifest = {
      models: [{ id: 'model1', rawUrl: 'http://test.com/model1.bngl' }],
      totalModels: 1,
      generated: '2023-01-01'
    };

    // We need to setup getManifest to return our mock, but getManifest uses fetch
    // so let's make our fetch mock handle the manifest fetch too
    fetchMock.mockImplementation((url: string) => {
      if (url.includes('manifest.json')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockManifest
        });
      }
      return Promise.resolve({
        ok: true,
        text: async () => 'test code'
      });
    });

    modelLoader.preloadModel('model1');

    // Wait for macro-task queue to clear so any async promises process
    await new Promise(resolve => setTimeout(resolve, 0));

    // fetch should be called (first for manifest, then for model code)
    expect(fetchMock).toHaveBeenCalled();
    const calls = fetchMock.mock.calls.map(call => call[0]);
    expect(calls).toContain('http://test.com/model1.bngl');
  });

  it('should not initiate a load if the model is already in codeCache', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    modelLoader.setCachedCode('model1', 'cached code');
    modelLoader.preloadModel('model1');

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should not initiate a load if the model is already in pendingFetches', async () => {
    const mockManifest = {
      models: [{ id: 'model1', rawUrl: 'http://test.com/model1.bngl' }],
      totalModels: 1,
      generated: '2023-01-01'
    };

    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('manifest.json')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockManifest
        });
      }
      // Hangs forever for the model code fetch
      return new Promise(() => {});
    });
    vi.stubGlobal('fetch', fetchMock);

    // Initial fetch starts here and enters pendingFetches
    modelLoader.loadModelCode('model1').catch(() => {});

    // wait for synchronous execution and manifest load
    await new Promise(resolve => setTimeout(resolve, 10));

    // Clear mock calls to verify preloadModel doesn't add more calls
    fetchMock.mockClear();

    modelLoader.preloadModel('model1');

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should safely catch and suppress errors if loadModelCode throws/rejects', async () => {
    const mockManifest = {
      models: [{ id: 'model_fail', rawUrl: 'http://test.com/fail.bngl' }],
      totalModels: 1,
      generated: '2023-01-01'
    };

    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (url.includes('manifest.json')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockManifest
        });
      }
      return Promise.reject(new Error('Network Error'));
    });
    vi.stubGlobal('fetch', fetchMock);

    // Call preloadModel - if it doesn't catch, Vitest will fail with unhandled rejection
    modelLoader.preloadModel('model_fail');

    // Wait for the chain to complete to ensure rejection is handled internally
    await new Promise(resolve => setTimeout(resolve, 50));

    // Test passes if we reach here without unhandled rejection
    expect(fetchMock).toHaveBeenCalled();
  });
});
