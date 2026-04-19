import { describe, it, expect } from 'vitest';
import { setCachedCode, isModelCached } from '../../services/modelLoader';

describe('modelLoader caching logic', () => {
  it('should cache model code and report it as cached', () => {
    const testId = 'test-model-1';
    const testCode = 'model {}';

    // initially not cached
    expect(isModelCached(testId)).toBe(false);

    // cache it
    setCachedCode(testId, testCode);

    // should now be cached
    expect(isModelCached(testId)).toBe(true);
  });

  it('should report false for uncached models', () => {
    expect(isModelCached('non-existent-model')).toBe(false);
  });
});
