import { describe, expect, it } from 'vitest';
import { handleParameterScan } from '../src/handlers/parameterScan.js';

const VALID_BNGL_MODEL = `begin model
begin parameters
  k_prod 1.0
  k_deg 0.1
end parameters
begin molecule types
  A()
end molecule types
begin seed species
  A() 0.0
end seed species
begin observables
  Molecules A_total A()
end observables
begin reaction rules
  0 -> A() k_prod
  A() -> 0 k_deg
end reaction rules
end model
`;

const NO_OBSERVABLES_MODEL = `begin model
begin parameters
  k1 1.0
end parameters
begin molecule types
  A()
end molecule types
begin seed species
  A() 10.0
end seed species
begin reaction rules
  A() -> 0 k1
end reaction rules
end model
`;

describe('handleParameterScan — valid scans', () => {
  it('executes a 1D linear parameter scan correctly', async () => {
    const result = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'k_prod',
      start: 0.1,
      end: 2.0,
      steps: 5,
    });

    expect(result.content).toBeDefined();
    const body = JSON.parse(result.content[0].text);
    expect(body.mode).toBe('1d');
    expect(body.parameter).toBe('k_prod');
    expect(body.xValues).toHaveLength(5);
    expect(body.observables).toBeDefined();
    expect(body.observables.A_total).toHaveLength(5);
  }, 30000);

  it('executes a 2D linear parameter scan correctly', async () => {
    const result = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'k_prod',
      start: 0.5,
      end: 1.5,
      steps: 3,
      parameter2: 'k_deg',
      start2: 0.05,
      end2: 0.2,
      steps2: 3,
    });

    expect(result.content).toBeDefined();
    const body = JSON.parse(result.content[0].text);
    expect(body.mode).toBe('2d');
    expect(body.parameter).toBe('k_prod');
    expect(body.parameter2).toBe('k_deg');
    expect(body.xValues).toHaveLength(3);
    expect(body.yValues).toHaveLength(3);
    expect(body.observables.A_total).toHaveLength(3); // 3 rows
    expect(body.observables.A_total[0]).toHaveLength(3); // 3 cols
  }, 30000);

  it('executes a 1D logarithmic scan with positive bounds', async () => {
    const result = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'k_prod',
      start: 0.1,
      end: 10.0,
      steps: 3,
      logarithmic: true,
    });

    const body = JSON.parse(result.content[0].text);
    expect(body.mode).toBe('1d');
    expect(body.xValues[0]).toBeCloseTo(0.1, 5);
    expect(body.xValues[1]).toBeCloseTo(1.0, 5);
    expect(body.xValues[2]).toBeCloseTo(10.0, 5);
  }, 30000);
});

describe('handleParameterScan — edge cases and error handling', () => {
  it('handles malformed inputs and wrong types via schema validation', async () => {
    const resultNumericCode = await handleParameterScan({
      code: 12345 as unknown as string,
      parameter: 'k_prod',
      start: 0,
      end: 10,
      steps: 5,
    });
    const bodyNumericCode = JSON.parse(resultNumericCode.content[0].text);
    expect(bodyNumericCode.error ?? bodyNumericCode.message ?? JSON.stringify(bodyNumericCode))
      .toMatch(/Expected string|invalid/i);

    const resultBoolParam = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: true as unknown as string,
      start: 0,
      end: 10,
      steps: 5,
    });
    const bodyBoolParam = JSON.parse(resultBoolParam.content[0].text);
    expect(bodyBoolParam.error ?? bodyBoolParam.message ?? JSON.stringify(bodyBoolParam))
      .toMatch(/Expected string|invalid/i);
  });

  it('rejects empty or whitespace-only model code', async () => {
    const resultEmpty = await handleParameterScan({
      code: '',
      parameter: 'k_prod',
      start: 0,
      end: 10,
      steps: 5,
    });
    const bodyEmpty = JSON.parse(resultEmpty.content[0].text);
    expect(bodyEmpty.error ?? bodyEmpty.message ?? JSON.stringify(bodyEmpty))
      .toMatch(/Model code must be a non-empty string/i);

    const resultBlank = await handleParameterScan({
      code: '   \n  \t ',
      parameter: 'k_prod',
      start: 0,
      end: 10,
      steps: 5,
    });
    const bodyBlank = JSON.parse(resultBlank.content[0].text);
    expect(bodyBlank.error ?? bodyBlank.message ?? JSON.stringify(bodyBlank))
      .toMatch(/Model code must be a non-empty string/i);
  });

  it('rejects empty or whitespace-only parameter names', async () => {
    const resultBlankParam = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: '   ',
      start: 0,
      end: 10,
      steps: 5,
    });
    const bodyBlankParam = JSON.parse(resultBlankParam.content[0].text);
    expect(bodyBlankParam.error ?? bodyBlankParam.message ?? JSON.stringify(bodyBlankParam))
      .toMatch(/Parameter name must be a non-empty string/i);
  });

  it('rejects unknown parameter name', async () => {
    const resultUnknownParam = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'non_existent_param',
      start: 0,
      end: 10,
      steps: 5,
    });
    const bodyUnknownParam = JSON.parse(resultUnknownParam.content[0].text);
    expect(bodyUnknownParam.error ?? bodyUnknownParam.message ?? JSON.stringify(bodyUnknownParam))
      .toMatch(/Unknown parameter/i);
  });

  it('rejects 2D scan with missing 2D settings or identical parameter names', async () => {
    const resultMissingSettings = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'k_prod',
      start: 0.1,
      end: 1.0,
      steps: 5,
      parameter2: 'k_deg',
    });
    const bodyMissing = JSON.parse(resultMissingSettings.content[0].text);
    expect(bodyMissing.error ?? bodyMissing.message ?? JSON.stringify(bodyMissing))
      .toMatch(/parameter_scan requires start2, end2, and steps2/i);

    const resultIdenticalParams = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'k_prod',
      start: 0.1,
      end: 1.0,
      steps: 5,
      parameter2: 'k_prod',
      start2: 0.1,
      end2: 1.0,
      steps2: 5,
    });
    const bodyIdentical = JSON.parse(resultIdenticalParams.content[0].text);
    expect(bodyIdentical.error ?? bodyIdentical.message ?? JSON.stringify(bodyIdentical))
      .toMatch(/two distinct parameters/i);
  });

  it('rejects non-positive start or end values in logarithmic mode', async () => {
    const resultZeroStart = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'k_prod',
      start: 0,
      end: 10,
      steps: 5,
      logarithmic: true,
    });
    const bodyZeroStart = JSON.parse(resultZeroStart.content[0].text);
    expect(bodyZeroStart.error ?? bodyZeroStart.message ?? JSON.stringify(bodyZeroStart))
      .toMatch(/Logarithmic parameter scan requires positive start and end bounds/i);

    const resultNegEnd2D = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'k_prod',
      start: 0.1,
      end: 10,
      steps: 5,
      parameter2: 'k_deg',
      start2: 0.1,
      end2: -1.0,
      steps2: 5,
      logarithmic: true,
    });
    const bodyNegEnd2D = JSON.parse(resultNegEnd2D.content[0].text);
    expect(bodyNegEnd2D.error ?? bodyNegEnd2D.message ?? JSON.stringify(bodyNegEnd2D))
      .toMatch(/Logarithmic parameter scan requires positive start2 and end2 bounds/i);
  });

  it('rejects models without observables', async () => {
    const resultNoObs = await handleParameterScan({
      code: NO_OBSERVABLES_MODEL,
      parameter: 'k1',
      start: 0.1,
      end: 1.0,
      steps: 5,
    });
    const bodyNoObs = JSON.parse(resultNoObs.content[0].text);
    expect(bodyNoObs.error ?? bodyNoObs.message ?? JSON.stringify(bodyNoObs))
      .toMatch(/Model must define at least one observable/i);
  });

  it('rejects scans exceeding maximum combination threshold (400 points)', async () => {
    const resultExcessive = await handleParameterScan({
      code: VALID_BNGL_MODEL,
      parameter: 'k_prod',
      start: 0.1,
      end: 1.0,
      steps: 25,
      parameter2: 'k_deg',
      start2: 0.01,
      end2: 0.1,
      steps2: 20, // 25 * 20 = 500 > 400
    });
    const bodyExcessive = JSON.parse(resultExcessive.content[0].text);
    expect(bodyExcessive.error ?? bodyExcessive.message ?? JSON.stringify(bodyExcessive))
      .toMatch(/at most 400 simulation combinations/i);
  });
});
