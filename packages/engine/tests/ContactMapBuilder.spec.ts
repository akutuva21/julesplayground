import { describe, expect, it } from 'vitest';
import { buildContactMap } from '../src/services/verification/ContactMapBuilder';
import type { BNGLMoleculeType, ReactionRule } from '../src/types';

describe('ContactMapBuilder', () => {
  it('handles adversarial names with underscores without key collisions', () => {
    // Model with underscored molecule and component names:
    // Molecule "A_B" with component "c", and Molecule "A" with component "B_c"
    const moleculeTypes: BNGLMoleculeType[] = [
      { name: 'A_B', components: ['c~u~p'] },
      { name: 'A', components: ['B_c~u~p'] },
    ];

    const rules: ReactionRule[] = [
      {
        name: 'R1',
        reactants: ['A_B(c!1)', 'A(B_c!1)'],
        products: ['A_B(c!1).A(B_c!1)'],
        rate: 'k1',
        isBidirectional: false,
      },
    ];

    const contactMap = buildContactMap(rules, moleculeTypes);

    // Verify nodes
    const molABNode = contactMap.nodes.find((n) => n.label === 'A_B' && n.type === 'molecule');
    const molANode = contactMap.nodes.find((n) => n.label === 'A' && n.type === 'molecule');
    expect(molABNode).toBeDefined();
    expect(molANode).toBeDefined();

    const compCNode = contactMap.nodes.find((n) => n.label === 'c' && n.parent === molABNode?.id);
    const compBcNode = contactMap.nodes.find((n) => n.label === 'B_c' && n.parent === molANode?.id);
    expect(compCNode).toBeDefined();
    expect(compBcNode).toBeDefined();

    // Verify edges connect the distinct components properly (canonicalized endpoints)
    expect(contactMap.edges.length).toBe(1);
    const edge = contactMap.edges[0];
    expect([edge.from, edge.to].sort()).toEqual([compCNode?.id, compBcNode?.id].sort());
    expect(edge.ruleIds).toContain('R1');
  });

  it('correctly constructs edges for binding reactions between components', () => {
    const moleculeTypes: BNGLMoleculeType[] = [
      { name: 'Egf', components: ['r'] },
      { name: 'Egfr', components: ['l', 'CR1'] },
    ];

    const rules: ReactionRule[] = [
      {
        name: 'bind_egf',
        reactants: ['Egf(r)', 'Egfr(l)'],
        products: ['Egf(r!1).Egfr(l!1)'],
        rate: 'kp1',
        isBidirectional: false,
      },
    ];

    const contactMap = buildContactMap(rules, moleculeTypes);

    expect(contactMap.nodes.some((n) => n.label === 'Egf')).toBe(true);
    expect(contactMap.nodes.some((n) => n.label === 'Egfr')).toBe(true);
    expect(contactMap.edges.length).toBe(1);
    expect(contactMap.edges[0].ruleLabels).toContain('bind_egf');
  });

  it('aggregates rules with reversed reactant/product order into a single edge', () => {
    const moleculeTypes: BNGLMoleculeType[] = [
      { name: 'A', components: ['x'] },
      { name: 'B', components: ['y'] },
    ];

    const rules: ReactionRule[] = [
      {
        name: 'R_forward',
        reactants: ['A(x)', 'B(y)'],
        products: ['A(x!1).B(y!1)'],
        rate: 'k1',
        isBidirectional: false,
      },
      {
        name: 'R_reversed',
        reactants: ['B(y)', 'A(x)'],
        products: ['B(y!1).A(x!1)'],
        rate: 'k2',
        isBidirectional: false,
      },
    ];

    const contactMap = buildContactMap(rules, moleculeTypes);

    // Both rules write the exact same bond (A.x - B.y), but in opposite reactant order.
    // They must aggregate into a single edge containing both rule IDs.
    expect(contactMap.edges.length).toBe(1);
    const edge = contactMap.edges[0];
    expect(edge.ruleIds).toContain('R_forward');
    expect(edge.ruleIds).toContain('R_reversed');
    expect(edge.ruleLabels).toContain('R_forward');
    expect(edge.ruleLabels).toContain('R_reversed');
  });
});
