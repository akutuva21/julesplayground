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

    // Verify edges connect the distinct components properly
    expect(contactMap.edges.length).toBe(1);
    const edge = contactMap.edges[0];
    expect(edge.from).toBe(compCNode?.id);
    expect(edge.to).toBe(compBcNode?.id);
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
});
