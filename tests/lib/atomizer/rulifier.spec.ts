import { describe, it, expect } from 'vitest';
import { buildStateTransitionDiagram } from '../../../src/lib/atomizer/rulifier/rulifier';
import { Rule, Action, Species, Molecule, Component } from '../../../src/lib/atomizer/core/structures';

describe('rulifier', () => {
  describe('buildStateTransitionDiagram', () => {

    // Helper to create a rule with a state change
    const createRule = (
      molName: string,
      compName: string,
      compIdx: string,
      stateFrom: string,
      stateTo: string,
      actionType: string = 'StateChange',
      rate: string = '1'
    ) => {
      const rule = new Rule('test_rule');
      rule.addRate(rate);

      // Reactant
      const reactantSpec = new Species();
      const reactantMol = new Molecule(molName, 'mol_idx_1');
      const reactantComp = new Component(compName, compIdx);
      reactantComp.activeState = stateFrom;
      reactantMol.addComponent(reactantComp);
      reactantSpec.addMolecule(reactantMol);
      rule.addReactant(reactantSpec);

      // Product
      const productSpec = new Species();
      const productMol = new Molecule(molName, 'mol_idx_2');
      const productComp = new Component(compName, compIdx); // Using same compIdx to mimic structure logic if needed, but the findComponentState ignores it
      productComp.activeState = stateTo;
      productMol.addComponent(productComp);
      productSpec.addMolecule(productMol);
      rule.addProduct(productSpec);

      // Action
      const action = new Action();
      action.setAction(actionType, compIdx);
      rule.addActionList([action]);

      return rule;
    };

    it('should return an empty diagram if no rules match the target molecule and component', () => {
      const rule = createRule('MolA', 'CompA', 'comp_idx_1', 'U', 'P');
      const diagram = buildStateTransitionDiagram([rule], 'MolB', 'CompA');

      expect(diagram.states.size).toBe(0);
      expect(diagram.transitions.length).toBe(0);
      expect(diagram.initialState).toBe('0');
    });

    it('should ignore actions that are not StateChange', () => {
      const rule = createRule('MolA', 'CompA', 'comp_idx_1', 'U', 'P', 'AddBond');
      const diagram = buildStateTransitionDiagram([rule], 'MolA', 'CompA');

      expect(diagram.states.size).toBe(0);
      expect(diagram.transitions.length).toBe(0);
    });

    it('should correctly find state changes for the target molecule and component', () => {
      const rule = createRule('MolA', 'CompA', 'comp_idx_1', 'U', 'P', 'StateChange', 'k_forward');
      const diagram = buildStateTransitionDiagram([rule], 'MolA', 'CompA');

      expect(diagram.states.size).toBe(2);
      expect(diagram.states.has('U')).toBe(true);
      expect(diagram.states.has('P')).toBe(true);

      expect(diagram.transitions.length).toBe(1);
      expect(diagram.transitions[0]).toEqual({
        from: 'U',
        to: 'P',
        molecule: 'MolA',
        component: 'CompA',
        rate: 'k_forward',
        rule: rule
      });
    });

    it('should correctly determine initialState (0 > U > first added)', () => {
      // Case: has '0'
      const rule0 = createRule('MolA', 'CompA', 'comp_idx_1', '0', '1');
      let diagram = buildStateTransitionDiagram([rule0], 'MolA', 'CompA');
      expect(diagram.initialState).toBe('0');

      // Case: has 'U'
      const ruleU = createRule('MolA', 'CompA', 'comp_idx_1', 'U', 'P');
      diagram = buildStateTransitionDiagram([ruleU], 'MolA', 'CompA');
      expect(diagram.initialState).toBe('U');

      // Case: neither '0' nor 'U', so uses first state
      const ruleOther = createRule('MolA', 'CompA', 'comp_idx_1', 'Inactive', 'Active');
      diagram = buildStateTransitionDiagram([ruleOther], 'MolA', 'CompA');
      expect(diagram.initialState).toBe('Inactive'); // Inactive is added first as reactantState
    });

    it('should ignore StateChange actions if reactantState or productState is not found or they are the same', () => {
      // Same states
      const ruleSame = createRule('MolA', 'CompA', 'comp_idx_1', 'P', 'P');
      let diagram = buildStateTransitionDiagram([ruleSame], 'MolA', 'CompA');
      expect(diagram.states.size).toBe(0);

      // Missing states - manually constructing rule to simulate missing state
      const ruleMissing = new Rule('test_missing');
      ruleMissing.addRate('1');

      const reactantSpec = new Species();
      const reactantMol = new Molecule('MolA', 'mol_idx_1');
      const reactantComp = new Component('CompA', 'comp_idx_1');
      // Intentionally not setting activeState or adding a component that will not be found as state
      reactantMol.addComponent(reactantComp);
      reactantSpec.addMolecule(reactantMol);
      ruleMissing.addReactant(reactantSpec);

      const productSpec = new Species();
      const productMol = new Molecule('MolA', 'mol_idx_2');
      const productComp = new Component('CompA', 'comp_idx_1');
      productComp.activeState = 'P';
      productMol.addComponent(productComp);
      productSpec.addMolecule(productMol);
      ruleMissing.addProduct(productSpec);

      const action = new Action();
      action.setAction('StateChange', 'comp_idx_1');
      ruleMissing.addActionList([action]);

      diagram = buildStateTransitionDiagram([ruleMissing], 'MolA', 'CompA');
      expect(diagram.states.size).toBe(0);
    });
  });
});
