import { describe, it, expect } from 'vitest';
import {
  parseSpeciesString,
  speciesMatchesPattern,
} from '../../src/services/verification/PatternMatcher.js';

describe('PatternMatcher', () => {
  describe('speciesMatchesPattern', () => {
    it('matches exact same species', () => {
      const species = parseSpeciesString('A(b!1,s~u).B(a!1)');
      const pattern = parseSpeciesString('A(b!1,s~u).B(a!1)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });

    it('matches when pattern has missing component state (meaning any state)', () => {
      const species = parseSpeciesString('A(s~p)');
      const pattern = parseSpeciesString('A(s)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });

    it('does not match when pattern has mismatched component state', () => {
      const species = parseSpeciesString('A(s~u)');
      const pattern = parseSpeciesString('A(s~p)');
      expect(speciesMatchesPattern(species, pattern)).toBe(false);
    });

    it('matches wildcard bond + (must be bonded) when species is bonded', () => {
      const species = parseSpeciesString('A(b!1).B(a!1)');
      const pattern = parseSpeciesString('A(b!+)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });

    it('does not match wildcard bond + when species is unbound', () => {
      const species = parseSpeciesString('A(b)');
      const pattern = parseSpeciesString('A(b!+)');
      expect(speciesMatchesPattern(species, pattern)).toBe(false);
    });

    it('does not match wildcard bond + when species explicitly has unbound mark', () => {
      // In BNGL semantics sometimes '-' means explicitly unbound
      const species = parseSpeciesString('A(b!-)');
      const pattern = parseSpeciesString('A(b!+)');
      expect(speciesMatchesPattern(species, pattern)).toBe(false);
    });

    it('matches wildcard bond - (must be unbound) when species is unbound', () => {
      const species = parseSpeciesString('A(b)');
      const pattern = parseSpeciesString('A(b!-)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });

    it('does not match wildcard bond - when species is bonded', () => {
      const species = parseSpeciesString('A(b!1).B(a!1)');
      const pattern = parseSpeciesString('A(b!-)');
      expect(speciesMatchesPattern(species, pattern)).toBe(false);
    });

    it('matches specific numeric bond labels enforcing correct topology', () => {
      const species = parseSpeciesString('A(b!1,c!2).B(a!1).C(x!2)');
      const pattern = parseSpeciesString('A(b!1,c!2).B(a!1).C(x!2)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });

    it('does not match mismatched bond topologies', () => {
      // Pattern wants A bonded to C, but Species has A bonded to B
      const species = parseSpeciesString('A(b!1,c).B(a!1).C(x)');
      const pattern = parseSpeciesString('A(b,c!1).B(a).C(x!1)');
      expect(speciesMatchesPattern(species, pattern)).toBe(false);
    });

    it('matches when pattern omits components implicitly present in species', () => {
      // Species has components b and s, pattern only mentions b
      const species = parseSpeciesString('A(b,s~u)');
      const pattern = parseSpeciesString('A(b)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });

    it('requires backtracking: matching a complex with multiple identical molecules', () => {
      // Species: A(a) . A(a!1) . B(b!1)
      // Pattern: A(a!1) . A(a) . B(b!1)
      // If we greedily match the first A(a!1) from pattern, we might try to match it with A(a) in species.
      // That fails because species A(a) is missing a bond.
      // Then it should backtrack and match pattern A(a!1) with species A(a!1).
      const species = parseSpeciesString('A(a).A(a!1).B(b!1)');
      const pattern = parseSpeciesString('A(a!1).A(a).B(b!1)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });

    it('requires backtracking: deeper topology check', () => {
      // Species: 3 molecules of A
      // A1 bonded to A2
      // A3 is unbound
      const species = parseSpeciesString('A(a,b!1).A(a!1,b).A(a,b)');
      // Pattern: wants two A's bonded together
      const pattern = parseSpeciesString('A(b!1).A(a!1)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });

    it('does not match when pattern has more molecules than species', () => {
      const species = parseSpeciesString('A(a)');
      const pattern = parseSpeciesString('A(a).A(a)');
      expect(speciesMatchesPattern(species, pattern)).toBe(false);
    });

    it('does not match when specific molecule requested in pattern is missing', () => {
      const species = parseSpeciesString('A(a)');
      const pattern = parseSpeciesString('B(b)');
      expect(speciesMatchesPattern(species, pattern)).toBe(false);
    });

    it('matches when pattern has missing bond in pattern (meaning any bond state)', () => {
      const species = parseSpeciesString('A(b!1).B(a!1)');
      const pattern = parseSpeciesString('A(b)');
      expect(speciesMatchesPattern(species, pattern)).toBe(true);
    });
  });
});
