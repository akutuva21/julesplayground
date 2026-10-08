import { afterEach, describe, expect, it, vi } from 'vitest';
import { CVODESolver, type CVodeModule } from '../src/services/simulation/solvers/CVODESolver';

describe('CVODESolver native rate updates', () => {
  afterEach(() => {
    CVODESolver.module = null;
    CVODESolver.initPromise = null;
  });

  it('updates the loaded native network and frees temporary WASM memory', () => {
    const freed: number[] = [];
    const update = vi.fn();
    CVODESolver.module = {
      _malloc: vi.fn(() => 8),
      _free: vi.fn((ptr) => freed.push(ptr)),
      _cvode_update_rate_constants: update,
      HEAPF64: new Float64Array(8),
    } as unknown as CVodeModule;
    const solver = new CVODESolver(1, () => {}, {} as never);
    (solver as unknown as { networkHandle: number }).networkHandle = 41;

    expect(solver.updateRateConstants(new Float64Array([2, 3]))).toBe(true);
    expect(update).toHaveBeenCalledWith(41, 8, 2);
    expect(CVODESolver.module?.HEAPF64.slice(1, 3)).toEqual(new Float64Array([2, 3]));
    expect(freed).toEqual([8]);
  });

  it('bridges native solver statistics and frees temporary WASM memory', () => {
    const freed: number[] = [];
    const heap32 = new Int32Array(16);
    const getStats = vi.fn((_mem: number, nsteps: number, nfevals: number, nlinsetups: number, netfails: number) => {
      heap32[nsteps >> 2] = 12;
      heap32[nfevals >> 2] = 34;
      heap32[nlinsetups >> 2] = 5;
      heap32[netfails >> 2] = 2;
    });
    CVODESolver.module = {
      _malloc: vi.fn(() => 8),
      _free: vi.fn((ptr) => freed.push(ptr)),
      _get_solver_stats: getStats,
      HEAPF64: new Float64Array(heap32.buffer),
      HEAP32: heap32,
    } as unknown as CVodeModule;
    const solver = new CVODESolver(1, () => {}, {} as never);
    const internalSolver = solver as unknown as { solverMem: number };
    internalSolver.solverMem = 71;

    expect(solver.getSolverStats()).toEqual({
      nsteps: 12,
      nfevals: 34,
      nlinsetups: 5,
      netfails: 2,
    });
    expect(getStats).toHaveBeenCalledWith(71, 8, 12, 16, 20);
    expect(freed).toEqual([8]);
  });

  it('reports when native rate updates are unavailable so callers can rebuild', () => {
    CVODESolver.module = { _malloc: vi.fn(() => 8), _free: vi.fn(), HEAPF64: new Float64Array(8) } as unknown as CVodeModule;
    const solver = new CVODESolver(1, () => {}, {} as never);
    (solver as unknown as { networkHandle: number }).networkHandle = 41;
    expect(solver.updateRateConstants(new Float64Array([2]))).toBe(false);
  });
});
