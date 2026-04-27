// ---------------------------------------------------------------------------
// MultiscaleSimulation.ts – Orchestrator: intracellular ODE + cell decisions
// + extracellular PDE
// ---------------------------------------------------------------------------

import {
  CellState,
  CellTypeDefinition,
  CellAction,
  SimpleRNG,
  createCell,
  evaluateCondition,
  divideCell,
  moveCell,
} from './CellAgent';
import { ExtracellularGrid, ExtracellularGridConfig } from './ExtracellularGrid';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface MultiscaleConfig {
  cellTypes: CellTypeDefinition[];
  initialCells: Array<{
    cellType: string;
    position: [number, number, number];
    count?: number;
  }>;
  extracellularSpecies: Array<{
    name: string;
    diffusionConstant: number;
    initialConcentration: number;
    degradationRate?: number;
  }>;
  domain: {
    dimensions: 2 | 3;
    size: [number, number, number];
    boundaryCondition: 'reflective' | 'periodic' | 'absorbing';
  };
  tEnd: number;
  dtIntracellular: number;
  dtExtracellular: number;
  dtDecision: number;
  nOutput: number;
  maxCells?: number;
  seed?: number;
}

export interface MultiscaleSnapshot {
  time: number;
  cells: CellState[];
  populationCounts: Record<string, number>;
  meanObservables: Record<string, Record<string, number>>;
}

export interface MultiscaleResult {
  snapshots: MultiscaleSnapshot[];
  cellLineage: Array<{
    cellId: number;
    parentId: number | null;
    cellType: string;
    birthTime: number;
    deathTime: number | null;
    divisionTimes: number[];
  }>;
  populationTimeSeries: {
    time: number[];
    counts: Record<string, number[]>;
  };
}

const UNSAFE_OBJECT_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const SAFE_OBJECT_KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;

function isSafeObjectKey(key: string): boolean {
  return SAFE_OBJECT_KEY_PATTERN.test(key) && !UNSAFE_OBJECT_KEYS.has(key);
}

function setSafeNumberField(target: Record<string, number>, key: string, value: number): void {
  if (!isSafeObjectKey(key)) return;
  Object.defineProperty(target, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

function setSafeNumberArrayField(target: Record<string, number[]>, key: string, value: number[]): void {
  if (!isSafeObjectKey(key)) return;
  Object.defineProperty(target, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

// ---------------------------------------------------------------------------
// RK4 stepper – generic 4th-order Runge-Kutta
// ---------------------------------------------------------------------------

export function rk4Step(
  rhsFn: (t: number, y: Float64Array, dydt: Float64Array) => void,
  t: number,
  y: Float64Array,
  dt: number,
): void {
  const n = y.length;
  const k1 = new Float64Array(n);
  const k2 = new Float64Array(n);
  const k3 = new Float64Array(n);
  const k4 = new Float64Array(n);
  const ytmp = new Float64Array(n);

  // k1
  rhsFn(t, y, k1);

  // k2
  for (let i = 0; i < n; i++) ytmp[i] = y[i] + 0.5 * dt * k1[i];
  rhsFn(t + 0.5 * dt, ytmp, k2);

  // k3
  for (let i = 0; i < n; i++) ytmp[i] = y[i] + 0.5 * dt * k2[i];
  rhsFn(t + 0.5 * dt, ytmp, k3);

  // k4
  for (let i = 0; i < n; i++) ytmp[i] = y[i] + dt * k3[i];
  rhsFn(t + dt, ytmp, k4);

  // combine
  for (let i = 0; i < n; i++) {
    y[i] += (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
  }
}

// ---------------------------------------------------------------------------
// Simple mass-action RHS evaluator
//
// The intracellular state is a Float64Array where each element is the
// concentration of one "observable" species.  For cells whose bnglModel
// string encodes simple first-order decay / production we use a generic
// linear RHS:  dy_i/dt = production_i - degradation_i * y_i
//
// Production and degradation rates are stored per cell type in a compact
// format.  When the full JIT-compiled BNG network is unavailable this
// provides a workable placeholder that still exercises the RK4 integrator.
// ---------------------------------------------------------------------------

export interface MassActionRates {
  production: Float64Array;
  degradation: Float64Array;
}

function massActionRHS(
  rates: MassActionRates,
): (t: number, y: Float64Array, dydt: Float64Array) => void {
  return (_t: number, y: Float64Array, dydt: Float64Array) => {
    for (let i = 0; i < y.length; i++) {
      dydt[i] = rates.production[i] - rates.degradation[i] * y[i];
    }
  };
}

// ---------------------------------------------------------------------------
// Initialization Helpers
// ---------------------------------------------------------------------------

function initializeGrid(config: MultiscaleConfig): ExtracellularGrid {
  const gridRes: [number, number, number] = [20, 20, 20]; // default resolution
  const gridConfig: ExtracellularGridConfig = {
    domainSize: config.domain.size,
    resolution: gridRes,
    species: config.extracellularSpecies.map((s) => ({
      name: s.name,
      diffusionConstant: s.diffusionConstant,
      degradationRate: s.degradationRate ?? 0,
      initialConcentration: s.initialConcentration,
    })),
    boundaryCondition:
      config.domain.boundaryCondition === 'periodic' ? 'periodic'
        : config.domain.boundaryCondition === 'absorbing' ? 'dirichlet'
        : 'neumann',
  };
  return new ExtracellularGrid(gridConfig);
}

function initializeCells(
  config: MultiscaleConfig,
  cellTypeDefs: Map<string, CellTypeDefinition>,
  rng: SimpleRNG,
): { cells: CellState[]; lineage: MultiscaleResult['cellLineage']; nextCellId: number } {
  let nextCellId = 0;
  const cells: CellState[] = [];
  const lineage: MultiscaleResult['cellLineage'] = [];

  for (const init of config.initialCells) {
    const typeDef = cellTypeDefs.get(init.cellType);
    if (!typeDef) continue;
    const count = init.count ?? 1;
    for (let c = 0; c < count; c++) {
      const pos: [number, number, number] = [
        init.position[0] + (rng.next() - 0.5) * 1e-3,
        init.position[1] + (rng.next() - 0.5) * 1e-3,
        init.position[2] + (rng.next() - 0.5) * 1e-3,
      ];
      const cell = createCell(nextCellId, typeDef, pos);
      cells.push(cell);
      lineage.push({
        cellId: nextCellId,
        parentId: null,
        cellType: typeDef.name,
        birthTime: 0,
        deathTime: null,
        divisionTimes: [],
      });
      nextCellId++;
    }
  }

  return { cells, lineage, nextCellId };
}

function stepIntracellular(
  cells: CellState[],
  cellTypeRates: Map<string, MassActionRates>,
  dtStep: number,
  dtIntracellular: number,
  t: number,
): void {
  for (const cell of cells) {
    if (cell.phase === 'dead') continue;
    const rates = cellTypeRates.get(cell.cellType);
    if (!rates || cell.intracellularState.length === 0) continue;
    const rhs = massActionRHS(rates);
    const nSubSteps = Math.max(1, Math.ceil(dtStep / dtIntracellular));
    const subDt = dtStep / nSubSteps;
    let tLocal = t - dtStep;
    for (let s = 0; s < nSubSteps; s++) {
      rk4Step(rhs, tLocal, cell.intracellularState, subDt);
      tLocal += subDt;
    }
    cell.age += dtStep;
  }
}

function evaluateDecisions(
  cells: CellState[],
  cellTypeDefs: Map<string, CellTypeDefinition>,
  rng: SimpleRNG,
): Array<{ cell: CellState; action: CellAction }> {
  const actions: Array<{ cell: CellState; action: CellAction }> = [];
  for (const cell of cells) {
    if (cell.phase === 'dead') continue;
    const typeDef = cellTypeDefs.get(cell.cellType);
    if (!typeDef) continue;
    for (const rule of typeDef.decisionRules) {
      if (evaluateCondition(cell, rule.condition)) {
        const prob = rule.probability ?? 1;
        if (rng.next() < prob) {
          actions.push({ cell, action: rule.action });
          break; // first matching rule wins
        }
      }
    }
  }
  return actions;
}

function executeActions(
  cells: CellState[],
  actions: Array<{ cell: CellState; action: CellAction }>,
  lineage: MultiscaleResult['cellLineage'],
  cellTypeDefs: Map<string, CellTypeDefinition>,
  grid: ExtracellularGrid,
  rng: SimpleRNG,
  dtStep: number,
  t: number,
  maxCells: number,
  nextCellIdRef: { value: number },
): void {
  const newCells: CellState[] = [];
  for (const { cell, action } of actions) {
    switch (action.type) {
      case 'divide': {
        if (cells.filter((c) => c.phase !== 'dead').length >= maxCells) break;
        cell.phase = 'dividing';
        const daughter = divideCell(cell, nextCellIdRef.value, rng);
        cell.phase = 'active';
        daughter.phase = 'active';
        newCells.push(daughter);

        lineage.push({
          cellId: nextCellIdRef.value,
          parentId: cell.id,
          cellType: cell.cellType,
          birthTime: t,
          deathTime: null,
          divisionTimes: [],
        });
        const parentLin = lineage.find((l) => l.cellId === cell.id);
        if (parentLin) parentLin.divisionTimes.push(t);
        nextCellIdRef.value++;
        break;
      }
      case 'die': {
        cell.phase = 'dead';
        const lin = lineage.find((l) => l.cellId === cell.id);
        if (lin) lin.deathTime = t;
        break;
      }
      case 'migrate': {
        const speed = action.speed * dtStep;
        if (action.direction === 'chemotaxis' && action.chemotaxisTarget) {
          const grad = grid.getGradient(cell.position, action.chemotaxisTarget);
          moveCell(cell, 'chemotaxis', speed, grad);
        } else {
          moveCell(cell, 'random', speed);
        }
        break;
      }
      case 'secrete': {
        setSafeNumberField(cell.secretionRates, action.species, action.rate);
        break;
      }
      case 'stop_secrete': {
        if (isSafeObjectKey(action.species)) {
          delete cell.secretionRates[action.species];
        }
        break;
      }
      case 'change_type': {
        cell.cellType = action.newType;
        break;
      }
      case 'set_parameter': {
        setSafeNumberField(cell.observables, action.parameter, action.value);
        break;
      }
    }
  }
  cells.push(...newCells);

  for (const cell of cells) {
    if (cell.phase === 'dead') continue;
    const typeDef = cellTypeDefs.get(cell.cellType);
    if (typeDef && typeDef.motility > 0) {
      moveCell(cell, 'random', typeDef.motility * dtStep);
    }
  }
}

function stepExtracellular(
  grid: ExtracellularGrid,
  cells: CellState[],
  dtStep: number,
): void {
  grid.clearSourcesSinks();
  for (const cell of cells) {
    if (cell.phase === 'dead') continue;
    for (const [species, rate] of Object.entries(cell.secretionRates)) {
      if (rate > 0) grid.addSource(cell.position, species, rate);
    }
    for (const [species, rate] of Object.entries(cell.uptakeRates)) {
      if (rate > 0) grid.addSink(cell.position, species, rate);
    }
  }
  grid.step(dtStep);
}

function coupleCells(
  cells: CellState[],
  cellTypeDefs: Map<string, CellTypeDefinition>,
  grid: ExtracellularGrid,
): void {
  for (const cell of cells) {
    if (cell.phase === 'dead') continue;
    const typeDef = cellTypeDefs.get(cell.cellType);
    if (!typeDef) continue;

    if (typeDef.uptake) {
      for (const u of typeDef.uptake) {
        const conc = grid.getConcentration(cell.position, u.species);
        setSafeNumberField(cell.observables, u.intracellularParameter, conc * u.scalingFactor);
      }
    }

    if (typeDef.secretion) {
      for (const s of typeDef.secretion) {
        const obsVal = cell.observables[s.intracellularObservable] ?? 0;
        setSafeNumberField(cell.secretionRates, s.species, obsVal * s.scalingFactor);
      }
    }
  }
}

function takeSimulationSnapshot(
  time: number,
  config: MultiscaleConfig,
  cells: CellState[],
  snapshots: MultiscaleSnapshot[],
  popTs: MultiscaleResult['populationTimeSeries'],
): void {
  const popCounts: Record<string, number> = Object.create(null) as Record<string, number>;
  const obsAccum: Record<string, Record<string, number>> = Object.create(null) as Record<string, Record<string, number>>;
  const obsCounts: Record<string, number> = Object.create(null) as Record<string, number>;

  for (const ct of config.cellTypes) {
    if (!isSafeObjectKey(ct.name)) continue;
    setSafeNumberField(popCounts, ct.name, 0);
    Object.defineProperty(obsAccum, ct.name, {
      value: Object.create(null) as Record<string, number>,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    setSafeNumberField(obsCounts, ct.name, 0);
  }

  for (const cell of cells) {
    if (cell.phase === 'dead') continue;
    if (!isSafeObjectKey(cell.cellType)) continue;
    setSafeNumberField(popCounts, cell.cellType, (popCounts[cell.cellType] ?? 0) + 1);
    setSafeNumberField(obsCounts, cell.cellType, (obsCounts[cell.cellType] ?? 0) + 1);
    if (!obsAccum[cell.cellType]) obsAccum[cell.cellType] = Object.create(null) as Record<string, number>;
    for (const [key, val] of Object.entries(cell.observables)) {
      if (!isSafeObjectKey(key)) continue;
      setSafeNumberField(obsAccum[cell.cellType], key, (obsAccum[cell.cellType][key] ?? 0) + val);
    }
  }

  const meanObs: Record<string, Record<string, number>> = Object.create(null) as Record<string, Record<string, number>>;
  for (const [ct, accum] of Object.entries(obsAccum)) {
    meanObs[ct] = Object.create(null) as Record<string, number>;
    const n = obsCounts[ct] || 1;
    for (const [key, sum] of Object.entries(accum)) {
      setSafeNumberField(meanObs[ct], key, sum / n);
    }
  }

  snapshots.push({
    time,
    cells: cells
      .filter((c) => c.phase !== 'dead')
      .map((c) => ({ ...c, position: [...c.position] as [number, number, number] })),
    populationCounts: popCounts,
    meanObservables: meanObs,
  });

  popTs.time.push(time);
  for (const ct of config.cellTypes) {
    if (ct.name === '__proto__' || ct.name === 'constructor' || ct.name === 'prototype') continue;
    popTs.counts[ct.name].push(popCounts[ct.name] ?? 0);
  }
}

// ---------------------------------------------------------------------------
// multiscaleSimulation – main entry point
// ---------------------------------------------------------------------------

export function multiscaleSimulation(
  config: MultiscaleConfig,
  onProgress?: (fraction: number) => void,
): MultiscaleResult {
  const rng = new SimpleRNG(config.seed ?? 42);

  // ---- Build cell-type lookup ----
  const cellTypeDefs = new Map<string, CellTypeDefinition>();
  const cellTypeRates = new Map<string, MassActionRates>();

  for (const ct of config.cellTypes) {
    cellTypeDefs.set(ct.name, ct);
    // Default: zero production, zero degradation (can be overridden later)
    cellTypeRates.set(ct.name, {
      production: new Float64Array(0),
      degradation: new Float64Array(0),
    });
  }

  // ---- Extracellular grid ----
  const grid = initializeGrid(config);

  // ---- Initialise cells ----
  const initResult = initializeCells(config, cellTypeDefs, rng);
  let cells = initResult.cells;
  const lineage = initResult.lineage;
  const nextCellId = initResult.nextCellId;

  // ---- Output bookkeeping ----
  const snapshots: MultiscaleSnapshot[] = [];
  const outputInterval = config.tEnd / Math.max(1, config.nOutput);
  let nextOutputTime = 0;
  const popTs: MultiscaleResult['populationTimeSeries'] = {
    time: [],
    counts: Object.create(null) as Record<string, number[]>,
  };
  for (const ct of config.cellTypes) {
    setSafeNumberArrayField(popTs.counts, ct.name, []);
  }

  // Initial snapshot
  takeSimulationSnapshot(0, config, cells, snapshots, popTs);
  nextOutputTime += outputInterval;

  // ---- Main simulation loop ----
  const maxCells = config.maxCells ?? 100000;
  let t = 0;
  // Use a ref object for nextCellId so it can be mutated by executeActions
  const nextCellIdRef = { value: nextCellId };

  while (t < config.tEnd - 1e-12) {
    const dtStep = Math.min(config.dtDecision, config.tEnd - t);
    t += dtStep;

    // 1. INTRACELLULAR
    stepIntracellular(cells, cellTypeRates, dtStep, config.dtIntracellular, t);

    // 2. DECISIONS
    const actions = evaluateDecisions(cells, cellTypeDefs, rng);

    // 3. EXECUTE ACTIONS
    executeActions(
      cells,
      actions,
      lineage,
      cellTypeDefs,
      grid,
      rng,
      dtStep,
      t,
      maxCells,
      nextCellIdRef,
    );

    // 4. EXTRACELLULAR
    stepExtracellular(grid, cells, dtStep);

    // 5. COUPLE
    coupleCells(cells, cellTypeDefs, grid);

    // 6. RECORD snapshot
    if (t >= nextOutputTime - 1e-12) {
      takeSimulationSnapshot(t, config, cells, snapshots, popTs);
      nextOutputTime += outputInterval;
    }

    // Progress callback
    if (onProgress) {
      onProgress(t / config.tEnd);
    }

    // Prune dead cells periodically to avoid memory bloat
    if (cells.length > maxCells * 1.5) {
      cells = cells.filter((c) => c.phase !== 'dead');
    }
  }

  // Ensure final snapshot
  if (snapshots.length === 0 || snapshots[snapshots.length - 1].time < config.tEnd - 1e-6) {
    takeSimulationSnapshot(config.tEnd, config, cells, snapshots, popTs);
  }

  return {
    snapshots,
    cellLineage: lineage,
    populationTimeSeries: popTs,
  };
}
