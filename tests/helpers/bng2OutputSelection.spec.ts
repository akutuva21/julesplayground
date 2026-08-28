import { describe, expect, it } from 'vitest';
import { selectPrimaryGdat } from './bng2OutputSelection';

describe('selectPrimaryGdat', () => {
  it('returns the only output without requiring a naming convention', () => {
    expect(selectPrimaryGdat(['model_ode.gdat'], 'model.bngl')).toBe('model_ode.gdat');
  });

  it('prefers the canonical model output when several files exist', () => {
    expect(selectPrimaryGdat(['model_equil.gdat', 'model.gdat'], 'model.bngl')).toBe('model.gdat');
  });

  it('returns null for ambiguous non-canonical outputs instead of guessing', () => {
    expect(selectPrimaryGdat(['model_ode.gdat', 'model_ssa.gdat'], 'model.bngl')).toBeNull();
  });

  it('matches canonical output names case-insensitively', () => {
    expect(selectPrimaryGdat(['MODEL.GDAT', 'model_equil.gdat'], 'model.bngl')).toBe('MODEL.GDAT');
  });
});
