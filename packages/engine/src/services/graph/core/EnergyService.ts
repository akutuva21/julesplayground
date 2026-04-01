import { BNGLParser } from './BNGLParser.ts';
import { GraphMatcher } from './Matcher.ts';
import { SpeciesGraph } from './SpeciesGraph.ts';

import type { BNGLEnergyPattern } from '../../../types.ts';

/**
 * EnergyService handles calculation of species energies by matching
 * them against defined energy patterns.
 */
export class EnergyService {
    private patterns: { graph: SpeciesGraph; value: number; symmetry: number }[] = [];

    constructor(energyPatterns: BNGLEnergyPattern[]) {
        for (const ep of energyPatterns) {
            if (!ep.pattern || ep.value === undefined || isNaN(ep.value)) continue;
            try {
                const graph = BNGLParser.parseSpeciesGraph(ep.pattern);
                const symmetry = this.calculateSymmetryFactor(graph);
                this.patterns.push({ graph, value: ep.value, symmetry });
            } catch (e) {
                console.warn(`[EnergyService] Failed to parse pattern "${ep.pattern}":`, e);
            }
        }
    }

    /**
     * Calculate the total energy of a species graph based on energy patterns.
     */
    public calculateEnergy(species: SpeciesGraph): number {
        let totalEnergy = 0;
        for (const p of this.patterns) {
            const matches = GraphMatcher.findAllMaps(p.graph, species, { symmetryBreaking: false });
            if (matches.length > 0) {
                // Contribution = (n_embeddings / n_automorphisms) * energy_per_embedding
                totalEnergy += (matches.length / p.symmetry) * p.value;
            }
        }
        return totalEnergy;
    }

    /**
     * Calculate Delta G of a reaction (Sum G_products - Sum G_reactants)
     */
    public calculateDeltaG(reactants: SpeciesGraph | SpeciesGraph[], products: SpeciesGraph[]): number {
        const reactantList = Array.isArray(reactants) ? reactants : [reactants];
        // BNG2 parity (EnergyPattern::getStoich / getDeltaEnergy):
        // deltaG = sum_over_patterns( (stoich_products - stoich_reactants) * G_pattern )
        // where stoichiometric weight of a species for a pattern is
        // (#subgraph matches) / (pattern automorphisms).
        let deltaG = 0;
        for (const p of this.patterns) {
            let stoich = 0;
            for (const reactant of reactantList) {
                const matches = GraphMatcher.findAllMaps(p.graph, reactant, { symmetryBreaking: false });
                if (matches.length > 0) {
                    stoich -= matches.length / p.symmetry;
                }
            }
            for (const product of products) {
                const matches = GraphMatcher.findAllMaps(p.graph, product, { symmetryBreaking: false });
                if (matches.length > 0) {
                    stoich += matches.length / p.symmetry;
                }
            }
            if (stoich !== 0) {
                deltaG += stoich * p.value;
            }
        }
        return deltaG;
    }

    /**
     * Calculate the symmetry factor (number of automorphisms) of a graph.
     */
    private calculateSymmetryFactor(graph: SpeciesGraph): number {
        const selfMatches = GraphMatcher.findAllMaps(graph, graph, { symmetryBreaking: false });
        return selfMatches.length || 1;
    }
}
