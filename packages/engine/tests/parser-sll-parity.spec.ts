import { describe, it, expect } from 'vitest';
import { parseBNGLWithANTLR } from '../src/parser/BNGLParserWrapper';
import { getExpressionDependencies } from '../src/parser/ExpressionDependencies';

describe('BNGL Parser SLL/LL Parity & Diagnostics', () => {
  it('parses valid BioNetGen models with 100% parity', () => {
    const validModel = `
begin parameters
  kon 1.0
  koff 0.5
end parameters
begin species
  A 100
  B 100
  C 0
end species
begin observables
  Molecules C_obs C()
end observables
begin reaction rules
  A + B <-> C kon, koff
end reaction rules
`;
    const result = parseBNGLWithANTLR(validModel);
    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.model).toBeDefined();
    expect(result.model?.parameters.kon).toBe(1.0);
    expect(result.model?.species).toHaveLength(3);
    expect(result.model?.reactionRules).toHaveLength(1);
  });

  it('correctly captures malformed input syntax errors with line/column diagnostics via LL fallback', () => {
    const malformedModel = `begin parameters
  kon == 1.0
end parameters`;
    const result = parseBNGLWithANTLR(malformedModel);
    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    const err = result.errors[0];
    expect(err.line).toBe(2);
    expect(err.column).toBeGreaterThan(0);
    expect(err.message).toContain("mismatched input '=='");
  });

  it('handles missing closing parentheses in species pattern with exact error location', () => {
    const malformedSpecies = `begin species
  A(s~1 100
end species`;
    const result = parseBNGLWithANTLR(malformedSpecies);
    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    const err = result.errors[0];
    expect(err.line).toBe(2);
    expect(err.message).toContain("missing ')'");
  });

  it('extracts expression dependencies consistently across math expressions', () => {
    const deps = getExpressionDependencies('k1 * A(b~1) + exp(-k2 * t)');
    expect(deps.has('k1')).toBe(true);
    expect(deps.has('k2')).toBe(true);
    expect(deps.has('t')).toBe(true);
  });
});
