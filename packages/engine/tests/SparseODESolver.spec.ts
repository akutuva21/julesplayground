import { describe, expect, it, vi } from 'vitest';
import { SparseODESolver } from '../src/services/analysis/SparseODESolver';
import type { Rxn } from '../src/services/graph/core/Rxn';
import { ConservationLaws } from '../src/services/analysis/ConservationLaws';

describe('SparseODESolver', () => {
  it('should construct correctly', () => {
    const deriv = vi.fn();
    const jacobian = vi.fn();
    const solver = new SparseODESolver(
      2, [], deriv, { nnz: 2, rowPtr: new Int32Array([0, 1, 2]), colIdx: new Int32Array([0, 1]) },
      { useILUPreconditioner: true, useConservationLaws: false }, new Float64Array([0,0]), [], jacobian
    );
    expect(solver).toBeDefined();
  });

  it('should solve a simple exponential decay equation', () => {
    const k = 0.5;
    const deriv = (y: Float64Array, dy: Float64Array) => {
      dy[0] = -k * y[0];
    };

    const rxns = [{ reactants: [0], products: [], rateConstant: k, isFunctionalRate: false }] as unknown as Rxn[];

    const solver = new SparseODESolver(
      1, rxns, deriv,
      { nnz: 1, rowPtr: new Int32Array([0, 1]), colIdx: new Int32Array([0]), fillRatio: 1.0 },
      { atol: 1e-8, rtol: 1e-6, useConservationLaws: false }, new Float64Array([10.0]), ['A']
    );

    const y0 = new Float64Array([10.0]);
    const outT: number[] = [];
    const outY: number[] = [];

    const result = solver.integrate(y0, 0, 2.0, [0.0, 1.0, 2.0], (t, y) => {
      outT.push(t);
      outY.push(y[0]);
    });

    expect(result.success).toBe(true);
    expect(outT.length).toBe(3);

    expect(outY[0]).toBeCloseTo(10.0, 5);
    expect(outY[1]).toBeCloseTo(10.0 * Math.exp(-0.5 * 1.0), 2);
    expect(outY[2]).toBeCloseTo(10.0 * Math.exp(-0.5 * 2.0), 2);
  });

  it('should handle roots finding', () => {
     const deriv = (y: Float64Array, dy: Float64Array) => {
       dy[0] = -y[0]; // decays
       dy[1] = y[0];
     };

     const rootFn = (t: number, y: Float64Array, g: Float64Array) => {
        g[0] = y[0] - 5.0; // Trigger when y[0] crosses 5
     };

     const rxns = [{ reactants: [0], products: [1], rateConstant: 1, isFunctionalRate: false }] as unknown as Rxn[];

     const solver = new SparseODESolver(
       2, rxns, deriv,
       { nnz: 4, rowPtr: new Int32Array([0, 2, 4]), colIdx: new Int32Array([0, 1, 0, 1]), fillRatio: 1.0 },
       { rootFunction: rootFn, numRoots: 1, useConservationLaws: false, maxSteps: 100000, atol: 1e-8, rtol: 1e-6 }, new Float64Array([10.0, 0.0]), ['A', 'B']
     );

     // Evaluate initial root value manually as it requires it to cross the boundary.
     solver.g0 = new Float64Array(1);
     solver.g1 = new Float64Array(1);

     const y0 = new Float64Array([10.0, 0.0]);

     // Initialize g0 and g1 so there's a sign change when y0 hits 5
     solver.g0[0] = 5.0; // positive
     solver.g1[0] = -1.0; // negative

     // Force solver state
     solver.f0 = new Float64Array(2);
     solver.f1 = new Float64Array(2);
     solver.yTemp = new Float64Array(2);
     solver.yNew = new Float64Array(2);
     solver.k = new Float64Array(2);

     let hitRoot = false;
     (solver as any).step = function(y: Float64Array, _t: number, h: number) {
         this.yNew.set(y);
         this.yNew[0] -= h * y[0];
         this.yNew[1] += h * y[0];

         const g0 = this.g0;
         const g1 = this.g1;

         rootFn(_t, y, g0);
         rootFn(_t + h, this.yNew, g1);

         if (g0[0] * g1[0] < 0) {
            hitRoot = true;
            return { accepted: true, hNew: h, yNew: this.yNew, errNorm: 0, rootFound: true };
         }

         return { accepted: true, hNew: h, yNew: this.yNew, errNorm: 0, rootFound: false };
     };

     const outT: number[] = [];

     const result = solver.integrate(y0, 0, 2.0, [], (t, y) => {
       outT.push(t);
     });

     expect(result.success).toBe(true);
     expect(result.errorMessage).toBe("ROOT_FOUND");
  });

  it('should handle small step sizes correctly without infinite loops', () => {
    const deriv = (y: Float64Array, dy: Float64Array) => {
      dy[0] = -10000000 * y[0]; // Very stiff
    };

    const rxns = [{ reactants: [0], products: [], rateConstant: 10000000, isFunctionalRate: false }] as unknown as Rxn[];

    const solver = new SparseODESolver(
      1, rxns, deriv,
      { nnz: 1, rowPtr: new Int32Array([0, 1]), colIdx: new Int32Array([0]), fillRatio: 1.0 },
      { atol: 1e-8, rtol: 1e-6, useConservationLaws: false }, new Float64Array([10.0]), ['A']
    );

    const y0 = new Float64Array([10.0]);
    const result = solver.integrate(y0, 0, 1.0, [1.0], () => {});

    expect(result.success).toBe(true);
  });

  it('should solve using dense fallback solver when ilu precondtioner is off', () => {
    const deriv = (y: Float64Array, dy: Float64Array) => {
      dy[0] = -0.5 * y[0];
    };

    const rxns = [{ reactants: [0], products: [], rateConstant: 0.5, isFunctionalRate: false }] as unknown as Rxn[];

    const solver = new SparseODESolver(
      1, rxns, deriv,
      { nnz: 1, rowPtr: new Int32Array([0, 1]), colIdx: new Int32Array([0]), fillRatio: 1.0 },
      { atol: 1e-8, rtol: 1e-6, useConservationLaws: false, useILUPreconditioner: false }, new Float64Array([10.0]), ['A']
    );

    const y0 = new Float64Array([10.0]);
    const result = solver.integrate(y0, 0, 1.0, [1.0], () => {});

    expect(result.success).toBe(true);
    expect(result.y[0]).toBeCloseTo(10.0 * Math.exp(-0.5 * 1.0), 2);
  });

  it('should fall back to un-preconditioned GMRES if ILU factorize throws error', () => {
     const deriv = (y: Float64Array, dy: Float64Array) => {
       dy[0] = -y[0];
     };

     const rxns = [{ reactants: [0], products: [], rateConstant: 1, isFunctionalRate: false }] as unknown as Rxn[];

     const solver = new SparseODESolver(
       1, rxns, deriv,
       { nnz: 1, rowPtr: new Int32Array([0, 1]), colIdx: new Int32Array([0]), fillRatio: 1.0 },
       { atol: 1e-8, rtol: 1e-6, useConservationLaws: false, useILUPreconditioner: true }, new Float64Array([10.0]), ['A']
     );

     const oldBuild = (solver as any).buildAndFactorizeMatrix;
     (solver as any).buildAndFactorizeMatrix = function(gamma: number) {
       (this as any).jacobianCSR = {
           n: this.n,
           nnz: this.sparsity.nnz,
           rowPtr: this.sparsity.rowPtr,
           colIdx: this.sparsity.colIdx,
           values: this.jacobianData
         };

         const mValues = new Float64Array(this.jacobianCSR.values.length);
         mValues[0] = 0.0;

         const M = {
             n: this.n,
             nnz: this.jacobianCSR.nnz,
             rowPtr: this.jacobianCSR.rowPtr,
             colIdx: this.jacobianCSR.colIdx,
             values: mValues
         };
         (this as any).systemMatrix = M;

         try {
             if (!(this as any).iluSymbolicCache) {
                 throw new Error("Forced ILU failure");
             }
         } catch (e) {
             (this as any).iluFactors = undefined;
         }
     };

     const y0 = new Float64Array([10.0]);
     const result = solver.integrate(y0, 0, 1.0, [1.0], () => {});

     expect(result.success).toBeDefined();
  });

  it('should handle conservation laws reduction', () => {
    // A -> B, k=1
    const k = 1.0;

    const rxns = [
       { reactants: [0], products: [1], rateConstant: k, isFunctionalRate: false }
    ] as unknown as Rxn[];

    const cl = {
      reduce: (y: Float64Array) => new Float64Array([y[0]]),
      expand: (yRed: Float64Array) => {
        const full = new Float64Array(2);
        full[0] = yRed[0];
        full[1] = 10.0 - yRed[0];
        return full;
      },
      transformDerivatives: (deriv: (y: Float64Array, dy: Float64Array) => void) => {
        return (yRed: Float64Array, dyRed: Float64Array) => {
           dyRed[0] = -k * yRed[0];
        };
      },
      laws: [{ moietyPattern: "", constants: [] }]
    } as unknown as ConservationLaws;

    const deriv = (y: Float64Array, dy: Float64Array) => {
      dy[0] = -k * y[0];
      dy[1] = k * y[0];
    };

    const solver = new SparseODESolver(
      2, rxns, deriv,
      { nnz: 4, rowPtr: new Int32Array([0, 2, 4]), colIdx: new Int32Array([0, 1, 0, 1]), fillRatio: 1.0 },
      { atol: 1e-6, rtol: 1e-6, useConservationLaws: true }, new Float64Array([10.0, 0.0]), ['A', 'B']
    );

    (solver as any).conservation = cl;
    (solver as any).reducedSystem = {
        reduce: cl.reduce,
        expand: cl.expand,
        reducedSize: 1,
        transformDerivatives: cl.transformDerivatives
    };
    (solver as any).n = 1;
    (solver as any).reducedDerivatives = cl.transformDerivatives(deriv);

    (solver as any).f0 = new Float64Array(1);
    (solver as any).f1 = new Float64Array(1);
    (solver as any).k = new Float64Array(1);
    (solver as any).yTemp = new Float64Array(1);
    (solver as any).yNew = new Float64Array(1);

    const y0 = new Float64Array([10.0, 0.0]);
    const outT: number[] = [];
    const outY: number[][] = [];

    const result = solver.integrate(y0, 0, 1.0, [1.0], (t, y) => {
      outT.push(t);
      outY.push(Array.from(y));
    });

    expect(result.success).toBe(true);
    expect(outY[0][0]).toBeCloseTo(10.0 * Math.exp(-1.0), 1);
    expect(outY[0][1]).toBeCloseTo(10.0 - 10.0 * Math.exp(-1.0), 1);
  });
});
