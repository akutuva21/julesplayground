/**
 * stoichiometry.ts — canonical stoichiometry-matrix construction.
 *
 * The stoichiometry matrix S is species (rows) by reaction (columns), with the
 * convention S[i][r] = (net change in species i produced by one firing of
 * reaction r): each reactant occurrence contributes -1 and each product
 * occurrence +1. This construction was duplicated across dose-response,
 * conserved-moiety, and LNA analyses; a stray sign flip or transpose in any one
 * copy would silently corrupt covariance/conservation results, so it lives here
 * once. Callers differ only in how a reactant/product entry maps to a species
 * row index (a name lookup, or an already-resolved index), supplied via
 * `indexOf`; entries that resolve to `undefined` are skipped.
 */

export function buildStoichiometryMatrix<T>(
    reactions: Array<{ reactants: T[]; products: T[] }>,
    numSpecies: number,
    indexOf: (entry: T) => number | undefined,
): number[][] {
    const S: number[][] = Array.from({ length: numSpecies }, () =>
        new Array<number>(reactions.length).fill(0),
    );

    for (let r = 0; r < reactions.length; r++) {
        const rxn = reactions[r];
        for (const entry of rxn.reactants) {
            const idx = indexOf(entry);
            if (idx !== undefined) S[idx][r] -= 1;
        }
        for (const entry of rxn.products) {
            const idx = indexOf(entry);
            if (idx !== undefined) S[idx][r] += 1;
        }
    }

    return S;
}
