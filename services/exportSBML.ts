import { generateSBML } from '../src/lib/atomizer';

import type { BNGLModel } from '../types';

/**
 * Robust SBML export using atomizer-ts (libsbmljs)
 */
export const exportToSBML = async (model: BNGLModel): Promise<string> => {
  try {
    return await generateSBML(model);
  } catch (error) {
    console.error('SBML Export failed:', error);
    // Fallback or rethrow
    throw error;
  }
};

export default exportToSBML;
