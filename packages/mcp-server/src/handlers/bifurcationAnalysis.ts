import { runBifurcationAnalysis } from '@bngplayground/engine';
import { ToolArgs, ToolResult } from '../types/index.js';
import { createToolResult, parseModelOrThrow, expandModel } from '../services/engine.js';
import { structureError } from '../services/errors.js';
import { z } from 'zod';

const bifurcationAnalysisArgsSchema = z.object({
  code: z.string().optional().describe('BNGL model code'),
  parameter: z.string().optional().describe('The parameter name to vary'),
  max_steps: z.number().int().positive().optional().describe('Maximum number of continuation steps (default 500)'),
  start_value: z.number().optional().describe('Continuation parameter start value (default 0)'),
  end_value: z.number().optional().describe('Continuation parameter end value (default 1)'),
}).strict();

export async function handleBifurcationAnalysis(args: ToolArgs): Promise<ToolResult<any>> {
  try {
    const parsedArgs = bifurcationAnalysisArgsSchema.parse(args ?? {});

    if (!parsedArgs.parameter) {
      throw new Error('Bifurcation analysis requires a parameter name.');
    }

    const model = parseModelOrThrow(parsedArgs.code ?? '');
    const expandedModel = await expandModel(model);

    const result = runBifurcationAnalysis(model, expandedModel, {
      parameter: parsedArgs.parameter,
      max_steps: parsedArgs.max_steps,
      start_value: parsedArgs.start_value,
      end_value: parsedArgs.end_value,
    });

    return createToolResult(result);
  } catch (error: any) {
    return createToolResult(structureError(error instanceof Error ? error : new Error(String(error), { cause: error })));
  }
}
