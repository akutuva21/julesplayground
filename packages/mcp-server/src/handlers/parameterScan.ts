import { runParameterScan } from '@bngplayground/engine';
import { ToolArgs, ToolResult, ParameterScanResult, MCPErrorResult } from '../types/index.js';
import { parameterScanArgsSchema } from '../schemas/index.js';
import { createToolResult, parseArgs, applyNetworkOptions, parseModelOrThrow, buildSimulationOptions, expandModel, assertScannableParameter } from '../services/engine.js';
import { structureError } from '../services/errors.js';

export async function handleParameterScan(args: ToolArgs): Promise<ToolResult<ParameterScanResult | MCPErrorResult>> {
  try {
    const parsedArgs = parseArgs('parameter_scan', parameterScanArgsSchema, args);

    if (!parsedArgs.code || parsedArgs.code.trim().length === 0) {
      throw new Error('Model code must be a non-empty string.');
    }

    const paramName = parsedArgs.parameter.trim();
    if (paramName.length === 0) {
      throw new Error('Parameter name must be a non-empty string.');
    }

    if (parsedArgs.parameter2 !== undefined) {
      const param2Name = parsedArgs.parameter2.trim();
      if (param2Name.length === 0) {
        throw new Error('parameter2 name must be a non-empty string when provided.');
      }
      if (param2Name === paramName) {
        throw new Error('parameter_scan requires two distinct parameters for 2D scans.');
      }
      if (parsedArgs.start2 === undefined || parsedArgs.end2 === undefined || parsedArgs.steps2 === undefined) {
        throw new Error('parameter_scan requires start2, end2, and steps2 when parameter2 is provided.');
      }
    }

    if (parsedArgs.logarithmic === true) {
      if (parsedArgs.start <= 0 || parsedArgs.end <= 0) {
        throw new Error('Logarithmic parameter scan requires positive start and end bounds (start > 0, end > 0).');
      }
      if (
        parsedArgs.parameter2 !== undefined &&
        (parsedArgs.start2! <= 0 || parsedArgs.end2! <= 0)
      ) {
        throw new Error('Logarithmic parameter scan requires positive start2 and end2 bounds (start2 > 0, end2 > 0).');
      }
    }

    const baseModel = applyNetworkOptions(parseModelOrThrow(parsedArgs.code), parsedArgs);
    assertScannableParameter(baseModel, paramName);
    if (parsedArgs.parameter2 !== undefined) {
      assertScannableParameter(baseModel, parsedArgs.parameter2.trim());
    }

    const seedExpressions = new Map<string, string>();
    for (const species of baseModel.species ?? []) {
      if (typeof species.initialExpression === 'string' && species.initialExpression.trim().length > 0) {
        seedExpressions.set(species.name, species.initialExpression);
      }
    }

    const expandedModel = await expandModel(baseModel);

    if (!expandedModel.observables || expandedModel.observables.length === 0) {
      throw new Error('Model must define at least one observable for parameter_scan.');
    }

    const simulationOptions = buildSimulationOptions(parsedArgs);

    const scanResult = await runParameterScan(
      expandedModel,
      {
        parameter: paramName,
        start: parsedArgs.start,
        end: parsedArgs.end,
        steps: parsedArgs.steps,
        logarithmic: parsedArgs.logarithmic,
        parameter2: parsedArgs.parameter2 ? parsedArgs.parameter2.trim() : undefined,
        start2: parsedArgs.start2,
        end2: parsedArgs.end2,
        steps2: parsedArgs.steps2,
      },
      simulationOptions,
      seedExpressions
    );

    return createToolResult(scanResult as any);
  } catch (error) {
    const structured = structureError(error instanceof Error ? error : new Error(String(error), { cause: error }));
    return createToolResult(structured);
  }
}
