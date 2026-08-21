
import { BNGLParser } from '../src/services/graph/core/BNGLParser';
import { GraphMatcher as Matcher, clearMatchCache } from '../src/services/graph/core/Matcher';
import { describe, it } from 'vitest';

describe('Matcher Strict Unbound Checks', () => {
    it('should NOT match A(b) to A(b!1) when using strict unbound semantics', () => {
        // Pattern: A(b) - implicitly A(b!0) aka unbound
        const pattern = BNGLParser.parseSpeciesGraph('A(b)');
        
        // Target: A(b!1).B(a!1) - b is bound
        const target = BNGLParser.parseSpeciesGraph('A(b!1).B(a!1)');
        
        // Should NOT match
        const maps = Matcher.findAllMaps(pattern, target);
        if (maps.length > 0) {
             throw new Error(`Strict matching failed: Found ${maps.length} matches for A(b) in A(b!1). Expected 0.`);
        }
    });

    it('should match A(b!?) to A(b!1)', () => {
        const pattern = BNGLParser.parseSpeciesGraph('A(b!?)');
        const target = BNGLParser.parseSpeciesGraph('A(b!1).B(a!1)');
        
        const maps = Matcher.findAllMaps(pattern, target);
        if (maps.length === 0) {
            throw new Error('Wildcard matching failed: Expected A(b!?) to match A(b!1)');
        }
    });

    it('should match A(b!+) to A(b!1)', () => {
        const pattern = BNGLParser.parseSpeciesGraph('A(b!+)');
        const target = BNGLParser.parseSpeciesGraph('A(b!1).B(a!1)');
        
        const maps = Matcher.findAllMaps(pattern, target);
        if (maps.length === 0) {
            throw new Error('Wildcard + matching failed: Expected A(b!+) to match A(b!1)');
        }
    });

    it('should match A(b) to A(b)', () => {
        const pattern = BNGLParser.parseSpeciesGraph('A(b)');
        const target = BNGLParser.parseSpeciesGraph('A(b)');
        
        const maps = Matcher.findAllMaps(pattern, target);
        if (maps.length === 0) {
            throw new Error('Identity matching failed: Expected A(b) to match A(b)');
        }
    });

    it('should correctly handle graph mutation after caching', () => {
        const pattern = BNGLParser.parseSpeciesGraph('A(b)');
        const target = BNGLParser.parseSpeciesGraph('A(b)');

        // First match populates any internal property caches on target (e.g. molTypeCounts, typeBonds)
        const initialMaps = Matcher.findAllMaps(pattern, target);
        if (initialMaps.length === 0) {
            throw new Error('Initial match expected to succeed.');
        }

        // Mutate target graph by adding a bond A(b!1).B(a!1)
        const molB = BNGLParser.parseSpeciesGraph('B(a)').molecules[0];
        target.molecules.push(molB);
        target.addBond(0, 0, 1, 0, 1);

        // Clear matcher cache as done between network generation steps/rounds
        clearMatchCache();

        // Subsequent match should see mutated molecule counts/bonds and NOT match A(b) (since A.b is now bound)
        const mutatedMaps = Matcher.findAllMaps(pattern, target);
        if (mutatedMaps.length !== 0) {
            throw new Error(`Expected 0 matches after mutating target graph, but got ${mutatedMaps.length}`);
        }
    });
});
