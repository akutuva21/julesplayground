import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  parseBNGLStrict,
  generateExpandedNetwork,
  simulate,
  runNFsimSimulation,
  validateModelForNFsim,
} from '../../packages/engine/src/index.js';

// Resolve directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Seeded pseudo-random number generator for reproducibility
export class SeededRandom {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  choose<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)];
  }
}

interface NFsimRuntimeOptions {
  t_end?: number;
  n_steps?: number;
  seed?: number;
  cb?: boolean;
}

// Initializing NFsim runtime in Node.js headless environment
export async function initializeNFsimHeadless() {
  const nfsimJsPath = path.resolve('public/nfsim.js');
  const nfsimWasmPath = path.resolve('public/nfsim.wasm');

  if (!fs.existsSync(nfsimJsPath) || !fs.existsSync(nfsimWasmPath)) {
    console.warn('[NFsim Fuzzer Init] public/nfsim.js or public/nfsim.wasm not found. Skipping NFsim headless setup.');
    return;
  }

  // Polyfills & mocks for headless WASM
  (globalThis as unknown as { postMessage: (msg: unknown) => void }).postMessage = () => {};
  (globalThis as unknown as { self: unknown }).self = globalThis;

  const wasmBinary = fs.readFileSync(nfsimWasmPath);
  const jsCode = fs.readFileSync(nfsimJsPath, 'utf8');

  // Evaluate Emscripten JS globally
  (0, eval)(jsCode);

  const createNFsimModule = (globalThis as unknown as { createNFsimModule?: (args: Record<string, unknown>) => Promise<unknown> }).createNFsimModule;
  if (typeof createNFsimModule !== 'function') {
    console.warn('[NFsim Fuzzer Init] createNFsimModule not defined on globalThis.');
    return;
  }

  // Keep logs buffered so we can print them only on actual failures
  let lastLogs: string[] = [];
  const moduleArg = {
    wasmBinary,
    print: (txt: string) => { lastLogs.push(txt); },
    printErr: (txt: string) => { lastLogs.push('ERROR: ' + txt); },
  };
  const nfsimModule = await createNFsimModule(moduleArg) as {
    FS: {
      unlink: (path: string) => void;
      writeFile: (path: string, data: string) => void;
      readFile: (path: string, options: { encoding: string }) => string;
    };
    ABORT: boolean;
    EXITSTATUS: number;
    callMain: (args: string[]) => void;
    reset?: () => void;
  };

  // Assign global __nfsimRuntime so NFsimLoader picks it up
  (globalThis as unknown as { __nfsimRuntime: unknown }).__nfsimRuntime = {
    run: async (xml: string, options: NFsimRuntimeOptions) => {
      lastLogs = [];
      const fsFS = nfsimModule.FS;
      const xmlPath = '/model.xml';
      const outPath = '/model.gdat';

      try {
        fsFS.unlink(xmlPath);
      } catch {
        /* ignore */
      }
      try {
        fsFS.unlink(outPath);
      } catch {
        /* ignore */
      }

      fsFS.writeFile(xmlPath, xml);

      const args = ['-xml', xmlPath, '-o', outPath];
      if (options.t_end !== undefined) args.push('-sim', String(options.t_end));
      if (options.n_steps !== undefined) args.push('-oSteps', String(options.n_steps));
      if (options.seed !== undefined) args.push('-seed', String(options.seed));
      if (options.cb) args.push('-cb');

      nfsimModule.ABORT = false;
      nfsimModule.EXITSTATUS = 0;

      let callMainError: Error | null = null;
      try {
        nfsimModule.callMain(args);
      } catch (e: unknown) {
        const isExitStatus = e != null && typeof e === 'object' && 'status' in e && typeof (e as { status: unknown }).status === 'number';
        if (isExitStatus) {
          const exitCode = (e as { status: number }).status;
          if (exitCode !== 0) {
            callMainError = new Error(`NFsim exited with code ${exitCode}`);
          }
        } else {
          callMainError = e instanceof Error ? e : new Error(String(e));
        }
      }

      if (callMainError) {
        console.error('--- NFsim Execution Logs (Failure context) ---');
        console.error(lastLogs.join('\n'));
        console.error('----------------------------------------------');
        throw callMainError;
      }

      const output = fsFS.readFile(outPath, { encoding: 'utf8' });
      return String(output);
    },
    reset: () => {
      if (typeof nfsimModule.reset === 'function') {
        nfsimModule.reset();
      }
    }
  };
}

// Generate a random valid BNGL model with rich features
export function generateModel(rng: SeededRandom): { bngl: string; hasCompartments: boolean } {
  // Compartments config: 3 possible compartment choices: none, simple, or complex nested
  const compartmentChoice = rng.nextInt(0, 2);
  const hasCompartments = compartmentChoice > 0;

  const bnglParts: string[] = [];

  // 1. Parameters Block
  bnglParts.push('begin parameters');
  bnglParts.push(`  k1 ${ (0.01 + rng.next() * 0.1).toFixed(4) }`);
  bnglParts.push(`  k2 ${ (0.01 + rng.next() * 0.05).toFixed(4) }`);
  // Derived / dependent parameters
  bnglParts.push(`  k2_derived k2 * ${ (1.0 + rng.next() * 2.0).toFixed(2) }`);
  bnglParts.push(`  kon ${ (0.05 + rng.next() * 0.2).toFixed(4) }`);
  bnglParts.push(`  koff ${ (0.01 + rng.next() * 0.1).toFixed(4) }`);
  bnglParts.push(`  kdeg ${ (0.01 + rng.next() * 0.05).toFixed(4) }`);
  bnglParts.push(`  ksynth ${ rng.nextInt(1, 10) }`);

  // Compartment volumes
  if (compartmentChoice === 1) {
    bnglParts.push('  V_EC 1.0');
    bnglParts.push('  V_PM 0.1');
    bnglParts.push('  V_CP 0.5');
  } else if (compartmentChoice === 2) {
    bnglParts.push('  V_NUC 0.2');
    bnglParts.push('  V_EC 2.0');
    bnglParts.push('  V_PM 0.05');
    bnglParts.push('  V_CP 0.8');
  }
  bnglParts.push('end parameters');

  // 2. Compartments Block (optional)
  if (compartmentChoice === 1) {
    bnglParts.push('begin compartments');
    bnglParts.push('  EC 3 V_EC');
    bnglParts.push('  PM 2 V_PM EC');
    bnglParts.push('  CP 3 V_CP PM');
    bnglParts.push('end compartments');
  } else if (compartmentChoice === 2) {
    bnglParts.push('begin compartments');
    bnglParts.push('  EC 3 V_EC');
    bnglParts.push('  PM 2 V_PM EC');
    bnglParts.push('  CP 3 V_CP PM');
    bnglParts.push('  NUC 3 V_NUC CP');
    bnglParts.push('end compartments');
  }

  // 3. Molecule Types Block
  bnglParts.push('begin molecule types');
  // Simple state & binding sites
  bnglParts.push('  A(b, s~0~1)');
  bnglParts.push('  B(a, y~U~P)');
  bnglParts.push('  C()');
  // A second species with more state states or components
  bnglParts.push('  D(x, z~A~B~C)');
  bnglParts.push('end molecule types');

  // 4. Seed Species Block
  bnglParts.push('begin seed species');
  if (compartmentChoice === 1) {
    bnglParts.push('  A(b, s~0)@CP 100');
    bnglParts.push('  B(a, y~U)@CP 50');
    bnglParts.push('  C()@EC 10');
    bnglParts.push('  D(x, z~A)@CP 5');
  } else if (compartmentChoice === 2) {
    bnglParts.push('  A(b, s~0)@CP 120');
    bnglParts.push('  B(a, y~U)@CP 60');
    bnglParts.push('  C()@EC 15');
    bnglParts.push('  D(x, z~B)@NUC 10');
  } else {
    bnglParts.push('  A(b, s~0) 100');
    bnglParts.push('  B(a, y~U) 50');
    bnglParts.push('  C() 10');
    bnglParts.push('  D(x, z~A) 5');
  }
  bnglParts.push('end seed species');

  // 5. Observables Block
  bnglParts.push('begin observables');
  bnglParts.push('  Molecules A_tot A()');
  bnglParts.push('  Molecules B_tot B()');
  bnglParts.push('  Molecules D_tot D()');
  if (hasCompartments) {
    bnglParts.push('  Species A_state0 A(s~0)@CP');
    bnglParts.push('  Species A_state1 A(s~1)@CP');
    bnglParts.push('  Species B_phos B(y~P)@CP');
  } else {
    bnglParts.push('  Species A_state0 A(s~0)');
    bnglParts.push('  Species A_state1 A(s~1)');
    bnglParts.push('  Species B_phos B(y~P)');
  }
  bnglParts.push('end observables');

  // 6. Functions Block (Mathematical expressions & Observables references)
  // Let's vary the functions block to exercise functions and various math operations
  bnglParts.push('begin functions');
  // Basic math function with observable
  bnglParts.push('  f_simple() = k2_derived * B_tot');
  // Trigonometric and non-linear mathematical operations wrapped in abs() to avoid negative propensities in stochastic solvers/NFsim
  bnglParts.push('  f_trig() = abs(sin(k1 * A_tot) + cos(k2 * B_tot))');
  // Logarithmic/square root math
  bnglParts.push('  f_log() = log10(1 + abs(A_state1)) + sqrt(1 + A_state0)');
  bnglParts.push('end functions');

  // 7. Reaction Rules Block
  bnglParts.push('begin reaction rules');

  // State change rule using simple parameter
  bnglParts.push('  A(s~0) -> A(s~1) k1');

  // Reversible binding/unbinding rules
  bnglParts.push('  A(b) + B(a) <-> A(b!1).B(a!1) kon, koff');

  // State modification of B triggered by phosphorylated or state change
  // Using user-defined function for rate
  bnglParts.push('  B(y~U) -> B(y~P) f_simple()');

  // Degradation of C() - no DeleteMolecules needed since it is degradation of a single molecule/species
  bnglParts.push('  C() -> 0 kdeg');
  bnglParts.push('  0 -> C() ksynth');

  // DeleteMolecules rule - deletes molecule A from a complex (fully supported by NFsim!)
  if (hasCompartments) {
    bnglParts.push('  A(b!1).B(a!1)@CP -> B(a)@CP kdeg DeleteMolecules');
  } else {
    bnglParts.push('  A(b!1).B(a!1) -> B(a) kdeg DeleteMolecules');
  }

  // D transition rule using complex function rate
  bnglParts.push('  D(z~A) -> D(z~B) f_trig()');
  bnglParts.push('  D(z~B) -> D(z~C) f_log() MatchOnce');

  bnglParts.push('end reaction rules');

  return { bngl: bnglParts.join('\n'), hasCompartments };
}

// Promise timeout helper for hang detection
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Execution timed out after ${timeoutMs}ms`)), timeoutMs)
    )
  ]);
}

// Full execution pipeline for a model
export async function testPipeline(bngl: string): Promise<void> {
  const model = parseBNGLStrict(bngl);

  // Network generation
  const expandedModel = await generateExpandedNetwork(
    model,
    () => {},
    () => {}
  );

  // ODE solver
  const odeResult = await simulate(
    1,
    expandedModel,
    { method: 'ode', t_end: 1, n_steps: 10 },
    { checkCancelled: () => {}, postMessage: () => {} }
  );
  if (!odeResult || !odeResult.data || odeResult.data.length === 0) {
    throw new Error('ODE solve produced empty output');
  }

  // SSA solver
  const ssaResult = await simulate(
    2,
    expandedModel,
    { method: 'ssa', t_end: 1, n_steps: 10 },
    { checkCancelled: () => {}, postMessage: () => {} }
  );
  if (!ssaResult || !ssaResult.data || ssaResult.data.length === 0) {
    throw new Error('SSA solve produced empty output');
  }

  // NFsim solver (if model is valid for NFsim)
  const nfValidation = validateModelForNFsim(model);
  const globalRuntimeObj = globalThis as unknown as { __nfsimRuntime: unknown };
  if (nfValidation.valid && globalRuntimeObj.__nfsimRuntime) {
    const nfsimResult = await runNFsimSimulation(
      model,
      { t_end: 1, n_steps: 10, requireRuntime: true }
    );
    if (!nfsimResult || !nfsimResult.data || nfsimResult.data.length === 0) {
      throw new Error('NFsim solve produced empty output');
    }
  }
}

// Minimize a failing BNGL model to the smallest reproducing input
export async function minimizeBNGL(bngl: string, expectedErrorMsg: string): Promise<string> {
  const lines = bngl.split('\n');
  let minimizedLines = [...lines];

  // Try to remove lines one by one (excluding block headers/footers and blank lines)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('begin ') || line.startsWith('end ') || line === '') {
      continue;
    }

    // Try removing this line
    const candidateLines = minimizedLines.filter((_, idx) => idx !== minimizedLines.indexOf(lines[i]));
    const candidateBngl = candidateLines.join('\n');

    try {
      // If we don't time out or throw the expected error, it didn't fail
      await withTimeout(testPipeline(candidateBngl), 5000);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes(expectedErrorMsg) || expectedErrorMsg === '') {
        // If it still fails with the same error, we can keep the line removed!
        minimizedLines = candidateLines;
      }
    }
  }

  return minimizedLines.join('\n');
}

// Standalone entry point
async function main() {
  console.log('--- Starting BNGL Monorepo Fuzzing Runner ---');
  await initializeNFsimHeadless();

  const baseSeed = 42;
  const rng = new SeededRandom(baseSeed);

  let successCount = 0;
  let failureCount = 0;

  for (let i = 1; i <= 50; i++) {
    const { bngl } = generateModel(rng);
    try {
      // 60 seconds (60000ms) hang detection as required by the objective
      await withTimeout(testPipeline(bngl), 60000);
      successCount++;
    } catch (err: unknown) {
      failureCount++;
      const errorMessage = err instanceof Error ? err.stack || err.message : String(err);
      console.error(`\n[Fuzzer Failure] Model #${i} failed:`);
      console.error('--- BNGL Input ---');
      console.error(bngl);
      console.error('------------------');
      console.error(errorMessage);

      // Trigger automatic model minimization
      console.log('\n[Fuzzer Minimizer] Minimizing model...');
      const expectedMsg = err instanceof Error ? err.message : '';
      try {
        const minimized = await minimizeBNGL(bngl, expectedMsg);
        console.log('--- Minimized Reproducing Model ---');
        console.log(minimized);
        console.log('-----------------------------------');
      } catch (minimizeErr) {
        console.error('[Fuzzer Minimizer] Minimizer failed:', minimizeErr);
      }
    }
  }

  console.log(`\nFuzzing completed: ${successCount} passed, ${failureCount} failed.`);
  if (failureCount > 0) {
    process.exit(1);
  }
}

// Run main if executed directly
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  main();
}
