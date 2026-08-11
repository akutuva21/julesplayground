import { BNGLModel } from '../../types';
import { analyzeModelStiffness, getOptimalCVODEConfig } from '../simulation/cvodeStiffConfig';

export interface ModelDiagnosticsResult {
    stiffness: {
        category: string;
        ratio: number;
        rationale: string;
    };
    complexity: {
        seeds: number;
        rules: number;
        parameters: number;
        potentialComplexity: 'very_high' | 'high' | 'normal';
    };
}

/**
 * Perform static diagnostic analysis on a BNGL model, including numerical stiffness
 * analysis, optimal solver configuration recommendations, and model complexity estimation.
 *
 * @param model - The parsed BNGLModel.
 * @returns Standard diagnostic results containing stiffness and complexity estimations.
 */
export function diagnoseModel(model: BNGLModel): ModelDiagnosticsResult {
    const ruleRates = (model.reactionRules ?? []).map(r => {
        if (r.isFunctionalRate) return NaN;
        const val = model.parameters[r.rate];
        if (val !== undefined) return val;
        const num = Number(r.rate);
        return isFinite(num) ? num : NaN;
    }).filter(v => !isNaN(v));

    const rateConstants = [
        ...(model.reactions?.map(r => r.rateConstant) ?? []),
        ...ruleRates
    ];

    const stiffness = analyzeModelStiffness(rateConstants, {
        hasFunctionalRates: model.reactions?.some(r => r.isFunctionalRate) || model.reactionRules?.some(r => r.isFunctionalRate),
        systemSize: model.species.length
    });
    const recommendedConfig = getOptimalCVODEConfig(stiffness);

    const totalFactor = (model.reactionRules?.length ?? 0) * model.species.length;
    const potentialComplexity = totalFactor > 50000 ? 'very_high' : totalFactor > 5000 ? 'high' : 'normal';

    return {
        stiffness: {
            category: stiffness.category,
            ratio: stiffness.rateRatio,
            rationale: recommendedConfig.rationale
        },
        complexity: {
            seeds: model.species.length,
            rules: model.reactionRules?.length ?? 0,
            parameters: Object.keys(model.parameters).length,
            potentialComplexity
        }
    };
}
