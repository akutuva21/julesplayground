import { editModelArgsSchema } from '../schemas/index.js';
import { createToolResult, parseArgs } from '../services/engine.js';
import { structureError } from '../services/errors.js';
import { applyModelEdits } from '../services/intelligence.js';
import { ToolArgs, ToolResult } from '../types/index.js';

export async function handleEditModel(args: ToolArgs): Promise<ToolResult<any>> {
    try {
        const parsedArgs = parseArgs('edit_model', editModelArgsSchema, args);
        const result = applyModelEdits(parsedArgs.code, parsedArgs.operations as unknown as Array<Record<string, unknown>>);
        return createToolResult(result);
    } catch (error) {
        const structured = structureError(error instanceof Error ? error : new Error(String(error)));
        return createToolResult(structured);
    }
}
