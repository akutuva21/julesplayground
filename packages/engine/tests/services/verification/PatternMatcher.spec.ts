import { describe, it, expect } from 'vitest';
import { canonicalizeSpecies } from '../../../src/services/verification/PatternMatcher';

describe('PatternMatcher - canonicalizeSpecies', () => {
  it('should canonicalize a single molecule with no components', () => {
    const molecules = [{ name: 'A', components: [] }];
    expect(canonicalizeSpecies(molecules)).toBe('A()');
  });

  it('should sort components alphabetically', () => {
    const molecules = [
      {
        name: 'A',
        components: [
          { name: 'b' },
          { name: 'a' }
        ]
      }
    ];
    expect(canonicalizeSpecies(molecules)).toBe('A(a,b)');
  });

  it('should include component states', () => {
    const molecules = [
      {
        name: 'A',
        components: [
          { name: 'b', state: 'u' },
          { name: 'a', state: 'p' }
        ]
      }
    ];
    expect(canonicalizeSpecies(molecules)).toBe('A(a~p,b~u)');
  });

  it('should format non-numeric bond labels correctly', () => {
    const molecules = [
      {
        name: 'A',
        components: [
          { name: 'a', bondLabel: '+' }
        ]
      }
    ];
    expect(canonicalizeSpecies(molecules)).toBe('A(a!+)');
  });

  it('should canonicalize numeric bond labels across molecules', () => {
    const molecules = [
      {
        name: 'A',
        components: [
          { name: 'b', bondLabel: '2' }
        ]
      },
      {
        name: 'B',
        components: [
          { name: 'a', bondLabel: '2' }
        ]
      }
    ];
    // A should come before B.
    // The bond '2' is the first bond encountered, so it becomes '1'.
    expect(canonicalizeSpecies(molecules)).toBe('A(b!1).B(a!1)');
  });

  it('should sort multiple molecules by name, then by component signature', () => {
    const molecules = [
      {
        name: 'B',
        components: []
      },
      {
        name: 'A',
        components: [{ name: 'y' }]
      },
      {
        name: 'A',
        components: [{ name: 'x' }]
      }
    ];
    // Expected order: A(x), A(y), B()
    expect(canonicalizeSpecies(molecules)).toBe('A(x).A(y).B()');
  });

  it('should properly renumber complex bonds', () => {
    // A(x!3).B(y!3, z!5).C(w!5) => expected A(x!1).B(y!1, z!2).C(w!2)
    // Actually, sorting gives: A(x!3), B(y!3,z!5), C(w!5)
    // First bond encountered: x!3 -> 1
    // Second bond: y!3 (already 1), z!5 -> 2
    // Third bond: w!5 (already 2)
    const molecules = [
      {
        name: 'C',
        components: [
          { name: 'w', bondLabel: '5' }
        ]
      },
      {
        name: 'A',
        components: [
          { name: 'x', bondLabel: '3' }
        ]
      },
      {
        name: 'B',
        components: [
          { name: 'z', bondLabel: '5' },
          { name: 'y', bondLabel: '3' }
        ]
      }
    ];
    // Molecules sort to: A, B, C
    // A's components: x -> bond 3 becomes 1
    // B's components: y -> bond 3 (is 1), z -> bond 5 becomes 2
    // C's components: w -> bond 5 (is 2)
    expect(canonicalizeSpecies(molecules)).toBe('A(x!1).B(y!1,z!2).C(w!2)');
  });
});
