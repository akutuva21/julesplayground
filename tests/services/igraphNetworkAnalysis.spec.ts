import { describe, it, expect } from 'vitest';
import { buildMolecularGraph } from '../../services/igraphNetworkAnalysis';
import { BNGLModel } from '@bngplayground/engine';

describe('igraphNetworkAnalysis - buildMolecularGraph', () => {
  const createMockModel = (options: Partial<BNGLModel> = {}): BNGLModel => {
    return {
      moleculeTypes: [],
      reactionRules: [],
      reactions: [],
      species: [],
      parameters: {},
      observables: [],
      ...options,
    } as BNGLModel;
  };

  it('should return 0 edges for a single molecule with no rules', () => {
    const model = createMockModel({
      moleculeTypes: [{ name: 'A', components: [] }]
    });
    const graph = buildMolecularGraph(model);
    expect(graph.nodeLabels).toEqual(['A']);
    expect(graph.edges).toHaveLength(0);
    expect(graph.directed).toBe(false);
    expect(graph.graphType).toBe('molecular');
  });

  it('should generate edges between multiple molecules appearing in the same pattern', () => {
    const model = createMockModel({
      moleculeTypes: [
        { name: 'A', components: [] },
        { name: 'B', components: [] },
      ],
      reactionRules: [
        {
          name: 'bind',
          reactants: ['A(b!1).B(a!1)'],
          products: [],
          isBidirectional: false,
          rate: 'k',
        } as unknown as import("@bngplayground/engine").ReactionRule
      ]
    });
    const graph = buildMolecularGraph(model);
    expect(graph.nodeLabels).toEqual(['A', 'B']);
    expect(graph.edges).toHaveLength(1);
    expect(graph.edges[0]).toEqual({ from: 0, to: 1 });
  });

  it('should deduplicate edges when multiple rules have the same molecule pair', () => {
    const model = createMockModel({
      moleculeTypes: [
        { name: 'A', components: [] },
        { name: 'B', components: [] },
      ],
      reactionRules: [
        { name: 'r1', reactants: ['A(b!1).B(a!1)'], products: [], isBidirectional: false, rate: 'k' } as unknown as import("@bngplayground/engine").ReactionRule,
        { name: 'r2', reactants: [], products: ['A(b!1).B(a!1)'], isBidirectional: false, rate: 'k' } as unknown as import("@bngplayground/engine").ReactionRule
      ]
    });
    const graph = buildMolecularGraph(model);
    expect(graph.edges).toHaveLength(1);
  });

  it('should process molecules from expanded reactions', () => {
    const model = createMockModel({
      moleculeTypes: [
        { name: 'A', components: [] },
        { name: 'B', components: [] },
      ],
      reactions: [
        { reactants: ['A(b!1).B(a!1)'], products: [], rate: 'k' } as unknown as import("@bngplayground/engine").ReactionRule
      ]
    });
    const graph = buildMolecularGraph(model);
    expect(graph.edges).toHaveLength(1);
    expect(graph.edges[0]).toEqual({ from: 0, to: 1 });
  });
});
