import { describe, it, expect } from 'vitest';
import { buildStateTransitionDiagram } from '../../../../src/lib/atomizer/rulifier/rulifier';
import { Rule, Action, Species, Molecule, Component } from '../../../../src/lib/atomizer/core/structures';

describe('buildStateTransitionDiagram', () => {
  // Helper to create a fully formed rule for state changes
  function createRuleWithStateChange(
    moleculeName: string,
    componentName: string,
    fromState: string,
    toState: string,
    siteId: string = 'site_1'
  ): Rule {
    const rule = new Rule('test_rule');
    rule.addRate('k1');

    // Reactant Species
    const reactantSpecies = new Species();
    const reactantMol = new Molecule(moleculeName);
    const reactantComp = new Component(componentName, siteId);
    reactantComp.activeState = fromState;
    reactantMol.addComponent(reactantComp);
    reactantSpecies.addMolecule(reactantMol);
    rule.addReactant(reactantSpecies);

    // Product Species
    const productSpecies = new Species();
    const productMol = new Molecule(moleculeName);
    const productComp = new Component(componentName, siteId);
    productComp.activeState = toState;
    productMol.addComponent(productComp);
    productSpecies.addMolecule(productMol);
    rule.addProduct(productSpecies);

    // Action
    const action = new Action();
    action.action = 'StateChange';
    action.site1 = siteId;
    rule.actions.push(action);

    return rule;
  }

  it('should build a state transition diagram for a valid state change', () => {
    const rule = createRuleWithStateChange('EGFR', 'Y1068', 'U', 'P', 'site_egfr_y1068');
    const result = buildStateTransitionDiagram([rule], 'EGFR', 'Y1068');

    expect(result.states.size).toBe(2);
    expect(result.states.has('U')).toBe(true);
    expect(result.states.has('P')).toBe(true);
    expect(result.initialState).toBe('U');

    expect(result.transitions.length).toBe(1);
    expect(result.transitions[0]).toEqual({
      from: 'U',
      to: 'P',
      molecule: 'EGFR',
      component: 'Y1068',
      rate: 'k1',
      rule: rule
    });
  });

  it('should return empty diagram if there are no StateChange actions', () => {
    const rule = new Rule('test_rule');
    const action = new Action();
    action.action = 'AddBond'; // Not a StateChange
    rule.actions.push(action);

    const result = buildStateTransitionDiagram([rule], 'EGFR', 'Y1068');

    expect(result.states.size).toBe(0);
    expect(result.transitions.length).toBe(0);
    expect(result.initialState).toBe('0');
  });

  it('should ignore state changes for non-matching molecules or components', () => {
    // Creating rule for EGFR Y1068, but we ask for EGFR Y1173
    const rule = createRuleWithStateChange('EGFR', 'Y1068', 'U', 'P', 'site_1');
    const result = buildStateTransitionDiagram([rule], 'EGFR', 'Y1173');

    expect(result.states.size).toBe(0);
    expect(result.transitions.length).toBe(0);
  });

  it('should collect multiple transitions and unique states across multiple rules', () => {
    const rule1 = createRuleWithStateChange('EGFR', 'Y1068', '0', 'P', 'site_1');
    const rule2 = createRuleWithStateChange('EGFR', 'Y1068', 'P', 'U', 'site_2');

    // An irrelevant rule for another component to make sure it is ignored
    const rule3 = createRuleWithStateChange('EGFR', 'Y1173', '0', 'P', 'site_3');

    const result = buildStateTransitionDiagram([rule1, rule2, rule3], 'EGFR', 'Y1068');

    expect(result.states.size).toBe(3);
    expect(result.states.has('0')).toBe(true);
    expect(result.states.has('P')).toBe(true);
    expect(result.states.has('U')).toBe(true);

    expect(result.transitions.length).toBe(2);
    expect(result.transitions.find(t => t.from === '0' && t.to === 'P')).toBeDefined();
    expect(result.transitions.find(t => t.from === 'P' && t.to === 'U')).toBeDefined();
  });

  it('should correctly select the initial state preferring 0 over U over others', () => {
    // States: A, B, C (No 0 or U)
    const rule1 = createRuleWithStateChange('M1', 'C1', 'A', 'B', 'site_1');
    const rule2 = createRuleWithStateChange('M1', 'C1', 'B', 'C', 'site_2');
    const result1 = buildStateTransitionDiagram([rule1, rule2], 'M1', 'C1');
    expect(result1.initialState).toBe('A'); // First added

    // States: U, B, C
    const rule3 = createRuleWithStateChange('M1', 'C1', 'B', 'U', 'site_3');
    const result2 = buildStateTransitionDiagram([rule2, rule3], 'M1', 'C1');
    expect(result2.initialState).toBe('U');

    // States: 0, U, B
    const rule4 = createRuleWithStateChange('M1', 'C1', '0', 'B', 'site_4');
    const result3 = buildStateTransitionDiagram([rule3, rule4], 'M1', 'C1');
    expect(result3.initialState).toBe('0');
  });

  it('should not add transition if reactant and product states are the same', () => {
    const rule = createRuleWithStateChange('EGFR', 'Y1068', 'P', 'P', 'site_1');
    const result = buildStateTransitionDiagram([rule], 'EGFR', 'Y1068');

    expect(result.states.size).toBe(0);
    expect(result.transitions.length).toBe(0);
  });
});
