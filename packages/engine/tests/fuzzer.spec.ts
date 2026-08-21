import { describe, it, expect, beforeAll } from 'vitest';
import { SeededRandom, generateModel, testPipeline, initializeNFsimHeadless } from '../../../scripts/testing/bngl_fuzzer';
import { parseBNGLStrict } from '../src/index';

describe('BNGL Fuzzing Regression Suite', () => {
  beforeAll(async () => {
    await initializeNFsimHeadless();
  });

  it('should successfully run randomly generated valid models across seeds 42 and 2026 through the full pipeline', async () => {
    for (const seed of [42, 2026]) {
      const rng = new SeededRandom(seed);
      for (let i = 1; i <= 10; i++) {
        const { bngl } = generateModel(rng);
        await expect(testPipeline(bngl)).resolves.not.toThrow();
      }
    }
  });

  it('should correctly parse and preserve new BNGL constructs (rule labels, math functions, and MatchOnce modifier)', () => {
    const rng = new SeededRandom(2026);
    const { bngl } = generateModel(rng);

    const parsed = parseBNGLStrict(bngl);

    // 1. Rule Labels assertion
    const hasLabeledRules = parsed.reactionRules.some(
      (rule) => rule.name && (rule.name.startsWith('R_') || rule.name.length > 0)
    );
    expect(hasLabeledRules).toBe(true);

    // 2. Math functions assertion (f_nl containing exp/min/max)
    const fnlFunc = parsed.functions.find((f) => f.name === 'f_nl');
    expect(fnlFunc).toBeDefined();
    expect(fnlFunc?.expression).toContain('min');
    expect(fnlFunc?.expression).toContain('exp');

    // 3. Rule modifier assertion (MatchOnce)
    const hasMatchOnce = parsed.reactionRules.some(
      (rule) => rule.matchOnce === true || (Array.isArray(rule.modifiers) && rule.modifiers.includes('MatchOnce'))
    );
    expect(hasMatchOnce).toBe(true);
  });
});
