import { suggestFixArgsSchema } from '../schemas/index.js';
import { createToolResult, parseArgs } from '../services/engine.js';
import { structureError } from '../services/errors.js';
import { suggestModelFixes } from '../services/intelligence.js';
import { ToolArgs, ToolResult } from '../types/index.js';

export async function handleSuggestFix(args: ToolArgs): Promise<ToolResult<any>> {
    try {
        const parsedArgs = parseArgs('suggest_fix', suggestFixArgsSchema, args);
        const suggestions = suggestModelFixes(parsedArgs.code, parsedArgs.include_auto_corrected_code ?? false);
        return createToolResult(suggestions);
    } catch (error) {
        const structured = structureError(error instanceof Error ? error : new Error(String(error)));
        return createToolResult(structured);
    }
}
