/**
 * Apply parameter overrides to a cached model.
 *
 * A cached model has its reaction network already expanded and its seed-species
 * initial amounts baked to numbers. When a caller re-simulates with parameter
 * overrides (FIM finite differences, robustness sweeps, what-if runs), two
 * things must update:
 *
 *   1. Reaction rate constants — reactions re-read their rate from the merged
 *      parameter table.
 *   2. Seed-species initial amounts — a parameter such as `A0` sets an initial
 *      amount through the species' `initialExpression` (e.g. "A0"), NOT through
 *      the species name. The previous code only refreshed an initial amount when
 *      the override key matched a species name, so overriding an initial-value
 *      parameter did nothing: the baked initialConcentration stayed put and the
 *      parameter looked completely insensitive (zero Fisher information — the
 *      blank A0/B0 rows in the correlation heatmap).
 *
 * The refreshed amount is the original baked value scaled by the ratio of the
 * initial expression evaluated at the new vs. original parameters. Scaling
 * (rather than taking the raw re-evaluated number) preserves any unit
 * normalization that was applied when the model was first built.
 */

import type { BNGLModel } from '../../types';
import { BNGLParser, reevaluateParameterExpressions } from '@bngplayground/engine';

/** Whole-token check: does `expr` reference any of the given identifier names? */
export function expressionReferencesAny(expr: string, names: Set<string>): boolean {
  if (names.size === 0) return false;
  const tokens = expr.match(/[A-Za-z_][A-Za-z0-9_]*/g);
  if (!tokens) return false;
  for (const t of tokens) {
    if (names.has(t)) return true;
  }
  return false;
}

/** True when changed parameters can alter seed state or compartment volume baked at expansion. */
export function canReuseExpandedNetworkForOverrides(
  model: BNGLModel,
  overrides: Record<string, number>,
): boolean {
  const affected = new Set(Object.keys(overrides));
  const parameterExpressions = model.paramExpressions ?? {};
  for (let pass = 0; pass <= Object.keys(parameterExpressions).length; pass++) {
    let changed = false;
    for (const [name, expression] of Object.entries(parameterExpressions)) {
      if (!affected.has(name) && expressionReferencesAny(expression, affected)) {
        affected.add(name);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const functions = new Map((model.functions ?? []).map((fn) => [fn.name, fn.expression]));
  const seedUsesAffectedParameter = (expression: string, visited = new Set<string>()): boolean => {
    if (expressionReferencesAny(expression, affected)) return true;
    for (const name of expression.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? []) {
      const body = functions.get(name);
      if (body && !visited.has(name)) {
        visited.add(name);
        if (seedUsesAffectedParameter(body, visited)) return true;
      }
    }
    return false;
  };
  if ((model.species ?? []).some((species) =>
    typeof species.initialExpression === 'string' && seedUsesAffectedParameter(species.initialExpression))) {
    return false;
  }

  // Compartment volume/scaling expressions affect numerical preparation and
  // remain on the conservative expansion path until those values are refreshed.
  for (const [name, expression] of Object.entries(parameterExpressions)) {
    if (name.startsWith('__compartment_') && affected.has(name)) return false;
    if (name.startsWith('__compartment_') && expressionReferencesAny(expression, affected)) return false;
  }
  if ([...affected].some((name) => name.startsWith('__compartment_'))) return false;
  return true;
}

export function applyParameterOverrides(
  cached: BNGLModel,
  overrides: Record<string, number>,
): BNGLModel {
  if (!overrides || Object.keys(overrides).length === 0) {
    return cached;
  }

  const updatedModel = { ...cached, parameters: { ...(cached.parameters || {}) } };
  reevaluateParameterExpressions(updatedModel, overrides);
  const mergedParams = updatedModel.parameters;
  const overriddenNames = new Set(Object.keys(overrides));
  const origParamMap = new Map<string, number>(Object.entries(cached.parameters || {}));
  const mergedParamMap = new Map<string, number>(Object.entries(mergedParams));
  const funcMap = new Map(
    (cached.functions || []).map((f) => [f.name, { args: f.args, expr: f.expression } as any]),
  );

  const species = (cached.species || []).map((s) => {
    // Direct override of a species amount by species name (kept as-is).
    if (overrides[s.name] !== undefined) {
      return { ...s, initialConcentration: overrides[s.name] };
    }

    // Initial-value parameters live in the species' initialExpression.
    const expr = typeof s.initialExpression === 'string' ? s.initialExpression.trim() : '';
    if (expr && expressionReferencesAny(expr, overriddenNames)) {
      try {
        const origVal = BNGLParser.evaluateExpression(expr, origParamMap, new Set(), funcMap);
        const newVal = BNGLParser.evaluateExpression(expr, mergedParamMap, new Set(), funcMap);
        if (Number.isFinite(newVal)) {
          const baseC = typeof s.initialConcentration === 'number' ? s.initialConcentration : origVal;
          const nextC = (Number.isFinite(origVal) && origVal !== 0)
            ? baseC * (newVal / origVal)
            : newVal;
          if (Number.isFinite(nextC)) {
            return { ...s, initialConcentration: nextC };
          }
        }
      } catch {
        // Leave the species unchanged if the expression can't be evaluated.
      }
    }
    return s;
  });

  const reactions = (cached.reactions || []).map((r) => {
    if (r.isFunctionalRate) return r;
    try {
      const rateConst = BNGLParser.evaluateExpression(r.rate, mergedParamMap, new Set(), funcMap);
      return Number.isFinite(rateConst) ? { ...r, rateConstant: rateConst } : r;
    } catch {
      return r;
    }
  });

  return {
    ...updatedModel,
    parameters: mergedParams,
    species,
    reactions,
  } as BNGLModel;
}
