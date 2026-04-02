import { SafeExpressionEvaluator } from '../../../utils/safeExpressionEvaluator';
import { ExpressionTranslator } from './ExpressionTranslator';

export function evaluateExpression(expr: string, parameters: Map<string, number>): number {
  let evaluable = expr;

  const entities = new Map<string, number>();
  for (const [name, value] of parameters.entries()) entities.set(name, value);

  const sortedEntities = Array.from(entities.entries()).sort((a, b) => b[0].length - a[0].length);

  for (const [name, value] of sortedEntities) {
    const valueStr = (value < 0 || isNaN(value)) ? `(${value})` : value.toString();
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const isSimpleName = /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
    const regex = isSimpleName
      ? new RegExp(`\\b${escapedName}\\b`, 'g')
      : new RegExp(escapedName, 'g');
    evaluable = evaluable.replace(regex, valueStr);
  }

  console.log("after replacements:", evaluable);
  evaluable = ExpressionTranslator.translate(evaluable);
  console.log("after translate:", evaluable);
  evaluable = evaluable.replace(/Math\./g, '');
  console.log("after Math. remove:", evaluable);

  try {
    const evaluateFn = SafeExpressionEvaluator.compile(evaluable, []);
    const result = evaluateFn({});
    console.log("compile result:", result);
    return typeof result === 'number' && !isNaN(result) ? result : NaN;
  } catch (compileErr: any) {
    console.log("compile error:", compileErr);
    if (compileErr.message && compileErr.message.includes('unknown variables')) {
      throw new ReferenceError(compileErr.message);
    }
    throw compileErr;
  }
}
