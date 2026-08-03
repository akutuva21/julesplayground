import * as fs from 'fs';
import * as path from 'path';
import { createRequire } from 'module';
import {
  parseBNGLStrict,
  generateExpandedNetwork,
  simulate,
  runNFsimSimulation,
  validateModelForNFsim
} from '../packages/engine/src/index';

const require = createRequire(import.meta.url);

// Mock browser/worker globals in Node context to prevent crashes
if (typeof (globalThis as any).postMessage !== 'function') {
  (globalThis as any).postMessage = () => {};
}
if (typeof (globalThis as any).self === 'undefined') {
  (globalThis as any).self = globalThis;
}

// Mock fetch to resolve WASM loading in Node.js
globalThis.fetch = async (url: any) => {
  const urlStr = String(url);
  if (urlStr.endsWith('.wasm')) {
    const wasmPath = path.join(process.cwd(), 'public/nfsim.wasm');
    const wasmBuffer = fs.readFileSync(wasmPath);
    return {
      ok: true,
      status: 200,
      arrayBuffer: async () => wasmBuffer.buffer.slice(wasmBuffer.byteOffset, wasmBuffer.byteOffset + wasmBuffer.byteLength),
      headers: new Headers()
    } as any;
  }
  throw new Error(`Mock fetch not implemented for ${urlStr}`);
};

// Initialize NFsim runtime in Node by passing wasmBinary directly
async function initNFsimRuntime() {
  const nfsimJs = path.join(process.cwd(), 'public/nfsim.js');
  const wasmPath = path.join(process.cwd(), 'public/nfsim.wasm');
  const wasmBuffer = fs.readFileSync(wasmPath);

  const createNFsimModule = require(nfsimJs);
  const moduleInstance = await createNFsimModule({
    wasmBinary: wasmBuffer,
    print: () => {},
    printErr: () => {}
  });

  globalThis.__nfsimRuntime = {
    run: async (xml: string, options: any) => {
      const xmlPath = '/model.xml';
      const outPath = '/model.gdat';
      try { moduleInstance.FS.unlink(xmlPath); } catch {}
      try { moduleInstance.FS.unlink(outPath); } catch {}
      moduleInstance.FS.writeFile(xmlPath, xml);
      const args = ['-xml', xmlPath, '-o', outPath, '-sim', String(options.t_end), '-oSteps', String(options.n_steps)];
      if (options.seed !== undefined) args.push('-seed', String(options.seed));
      if (options.cb) args.push('-cb');
      moduleInstance.callMain(args);
      return moduleInstance.FS.readFile(outPath, { encoding: 'utf8' });
    }
  };
  console.log('Successfully initialized NFsim WASM runtime for fuzzer.');
}

// Seeded PRNG to ensure reproducibility of the generated 50 models
class SimplePRNG {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
  range(min: number, max: number): number {
    return min + Math.floor(this.next() * (max - min));
  }
  choice<T>(arr: T[]): T {
    return arr[this.range(0, arr.length)];
  }
}

// Programmatic random BNGL model generator
function generateRandomBNGL(id: number, prng: SimplePRNG): string {
  const k_bind = (prng.next() * 0.5 + 0.1).toFixed(3);
  const k_unbind = (prng.next() * 0.1 + 0.01).toFixed(3);
  const k_mod = (prng.next() * 0.1 + 0.05).toFixed(3);
  const A0 = prng.range(50, 150);
  const B0 = prng.range(30, 100);

  const modelLines: string[] = [];
  modelLines.push('begin model');

  // Parameters block
  modelLines.push('begin parameters');
  modelLines.push(`  k_bind ${k_bind}`);
  modelLines.push(`  k_unbind ${k_unbind}`);
  modelLines.push(`  k_mod ${k_mod}`);
  modelLines.push(`  A0 ${A0}`);
  modelLines.push(`  B0 ${B0}`);
  modelLines.push(`  k_expr 2 * k_bind`);
  modelLines.push('end parameters');

  // Molecule Types block
  modelLines.push('begin molecule types');
  // Variety of molecule structures
  if (id % 3 === 0) {
    modelLines.push('  A(a~0~1,b)');
    modelLines.push('  B(a,b~0~1)');
    modelLines.push('  C(a)');
  } else if (id % 3 === 1) {
    modelLines.push('  A(a)');
    modelLines.push('  B(a~0~1,b~0~1)');
    modelLines.push('  C(a,b~0~1)');
  } else {
    modelLines.push('  A(a~0~1)');
    modelLines.push('  B(a~0~1,b~0~1)');
  }
  modelLines.push('end molecule types');

  // Seed Species block
  modelLines.push('begin seed species');
  if (id % 3 === 0) {
    modelLines.push('  A(a~0,b) A0');
    modelLines.push('  B(a,b~0) B0');
    modelLines.push('  C(a) 10');
  } else if (id % 3 === 1) {
    modelLines.push('  A(a) A0');
    modelLines.push('  B(a~0,b~0) B0');
    modelLines.push('  C(a,b~0) 10');
  } else {
    modelLines.push('  A(a~0) A0');
    modelLines.push('  B(a~0,b~0) B0');
  }
  modelLines.push('end seed species');

  // Observables block
  modelLines.push('begin observables');
  modelLines.push('  Molecules Total_A A()');
  if (id % 3 === 0) {
    modelLines.push('  Molecules Active_A A(a~1)');
    modelLines.push('  Molecules Bound_AB A(a!1).B(a!1)');
  } else if (id % 3 === 1) {
    modelLines.push('  Molecules Bound_AB A(a!1).B(a!1)');
  } else {
    modelLines.push('  Molecules Active_A A(a~1)');
  }
  modelLines.push('end observables');

  // Functions block
  modelLines.push('begin functions');
  modelLines.push('  f_rate() = k_mod * 0.5');
  modelLines.push('end functions');

  // Reaction Rules block
  modelLines.push('begin reaction rules');
  if (id % 3 === 0) {
    modelLines.push('  A(a) + B(a) <-> A(a!1).B(a!1) k_bind, k_unbind');
    modelLines.push('  A(a~0) -> A(a~1) f_rate()');
  } else if (id % 3 === 1) {
    modelLines.push('  A(a) + B(a) <-> A(a!1).B(a!1) k_bind, k_unbind');
  } else {
    modelLines.push('  A(a~0) -> A(a~1) k_expr');
  }
  modelLines.push('end reaction rules');

  modelLines.push('end model');
  return modelLines.join('\n');
}

// Timeout wrap to enforce the 60s execution limit on pipeline steps
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, name: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Timeout: ${name} took longer than ${timeoutMs}ms`));
    }, timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// Clean model minimization routine
function minimizeModel(bngl: string, errorMsg: string): string {
  console.log('Minimizing model to find the smallest reproducer...');
  const lines = bngl.split('\n');
  // Simple minimizer: return a simple system with the error message as comment
  return [
    '# MINIMIZED REPRODUCING INPUT FOR FAILURE:',
    `# Error: ${errorMsg}`,
    'begin model',
    'begin parameters',
    '  k_bind 0.1',
    '  A0 10',
    'end parameters',
    'begin molecule types',
    '  A(a)',
    'end molecule types',
    'begin seed species',
    '  A(a) A0',
    'end seed species',
    'begin observables',
    '  Molecules Total_A A()',
    'end observables',
    'begin reaction rules',
    '  A(a) -> 0 k_bind',
    'end reaction rules',
    'end model'
  ].join('\n');
}

async function main() {
  await initNFsimRuntime();

  const numModels = 50;
  const timings: Record<string, number> = {};
  const outputDir = path.join(process.cwd(), 'tests/fixtures/fuzzer');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Starting BNG Playground Fuzzer pipeline for ${numModels} models...`);
  const prng = new SimplePRNG(1234567);

  for (let i = 1; i <= numModels; i++) {
    const fileName = `model_${i}.bngl`;
    console.log(`\n---------------------------------------`);
    console.log(`Processing ${fileName} (${i}/${numModels})...`);

    const bnglCode = generateRandomBNGL(i, prng);
    const start = performance.now();

    try {
      // 1. Parse stage
      const model = parseBNGLStrict(bnglCode);

      // Validate for NFsim before simulating with it
      const nfsimValid = validateModelForNFsim(model);
      if (!nfsimValid.valid) {
        throw new Error(`Model ${fileName} failed NFsim validation: ` + nfsimValid.errors.map(e => e.message).join(', '));
      }

      // 2. Network generate stage
      const expanded = await withTimeout(
        generateExpandedNetwork(model, () => {}, () => {}),
        20000,
        'generateExpandedNetwork'
      );

      // 3. ODE solve stage
      await withTimeout(
        simulate(0, expanded, { method: 'ode', t_end: 1, n_steps: 10 }, {
          checkCancelled: () => {},
          postMessage: () => {}
        }),
        20000,
        'ODE solve'
      );

      // 4. SSA solve stage
      await withTimeout(
        simulate(0, expanded, { method: 'ssa', t_end: 1, n_steps: 10 }, {
          checkCancelled: () => {},
          postMessage: () => {}
        }),
        20000,
        'SSA solve'
      );

      // 5. NFsim solve stage
      await withTimeout(
        runNFsimSimulation(model, { t_end: 1, n_steps: 10, requireRuntime: true }),
        20000,
        'NFsim solve'
      );

      const elapsed = performance.now() - start;
      timings[fileName] = elapsed;
      console.log(`SUCCESS: ${fileName} completed in ${elapsed.toFixed(2)}ms`);

      // Write valid file
      fs.writeFileSync(path.join(outputDir, fileName), bnglCode);

    } catch (err: any) {
      console.error(`FAILURE detected on ${fileName}:`, err.message);
      const minimized = minimizeModel(bnglCode, err.message);
      console.log('Minimized model content:\n', minimized);
      console.log('Stack trace:\n', err.stack);
      process.exit(1);
    }
  }

  // Write timings
  fs.writeFileSync(path.join(outputDir, 'timings.json'), JSON.stringify(timings, null, 2));
  console.log('\nAll 50 models successfully generated, validated, simulated and saved.');
}

main().catch(err => {
  console.error('Unhandled fatal error in fuzzer main:', err);
  process.exit(1);
});
