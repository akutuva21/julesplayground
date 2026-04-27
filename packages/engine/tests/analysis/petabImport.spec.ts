import { describe, it, expect } from 'vitest';
import { parsePEtabCombined } from '../../src/services/analysis/petabImport';

describe('petabImport', () => {
  it('parses petab combined correctly', () => {
    const text = `
[parameters]
parameterId	parameterScale	lowerBound	upperBound	nominalValue	estimate
p1	lin	0.1	10	1	1
p2	log10	1e-3	1e3	0.1	0

[measurements]
observableId	simulationConditionId	time	measurement
obs1	cond1	0	1.5
obs1	cond1	10	2.5

[conditions]
conditionId	p2
cond1	0.5

[observables]
observableId	observableFormula
obs1	A + B
`;
    const problem = parsePEtabCombined(text);

    expect(problem.parameters.length).toBe(2);
    expect(problem.parameters[0].parameterId).toBe('p1');
    expect(problem.parameters[1].estimate).toBe(false);

    expect(problem.measurements.length).toBe(2);
    expect(problem.conditions.get('cond1')).toEqual({ p2: 0.5 });

    expect(problem.observables.length).toBe(1);
    expect(problem.observables[0].observableId).toBe('obs1');
    expect(problem.observables[0].observableFormula).toBe('A + B');
  });
});
