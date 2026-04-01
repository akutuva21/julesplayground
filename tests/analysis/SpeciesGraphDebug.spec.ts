import { describe, it, expect } from 'vitest';

import { parseSpeciesGraphs } from '../../services/visualization/speciesGraphUtils';

// debug test for the IL6/IL6R complex parsing
describe('SpeciesGraph parsing weird cases', () => {
    it('should split multi-molecule pattern into separate molecules', async () => {
        const problematic = 'IL6(r!+).IL6R(l_bind!+,activity~I)';
        // also try the same pattern with explicit binding index notation
        const alt = 'IL6(r!1).IL6R(l_bind!1,activity~I)';
        const graphs = parseSpeciesGraphs([problematic, alt]);
        console.log('parsed graphs', JSON.stringify(graphs, null, 2));
        expect(graphs.length).toBe(2);

        // now inspect bond extraction
        const { extractBonds } = await import('../../services/visualization/speciesGraphUtils');
        const bonds = extractBonds(graphs);
        console.log('bonds map', Array.from(bonds.values()));

    });
});
