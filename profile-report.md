
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 cvode.wasm present: yes   sim methods: ode, ssa
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa   heapMB
-------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.0       2.3      6.5      2.1      0.4
binding_AB (bimolecular)                        3       2      5.3       1.9      3.1      2.7      0.3
multisite_5 (2^5 species, combinatorial)       32     160     10.8      59.0     12.9    109.5      3.0
multisite_7 (2^7 species, combinatorial)      128     896     12.4     137.4     49.6     85.5      6.4

(all times in ms)

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 2.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.3     12%         8     34.06
  findAllMaps                  0.2      9%        20     10.74
  speciesDedup                 0.0      2%         9      5.09
  canonicalize                 0.0      1%        10      2.01
  matchComponents              0.0      0%         5      1.29
  (instrumented sections account for 24% of gen wall; 458.5 µs/species, 573.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.3     14%         3     91.63
  findAllMaps                  0.2      8%        11     13.85
  speciesDedup                 0.0      2%         6      6.76
  canonicalize                 0.0      1%         6      2.67
  matchComponents              0.0      0%         6      0.49
  (instrumented sections account for 26% of gen wall; 635.6 µs/species, 953.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 59.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         22.6     38%       320     70.47
  findAllMaps                  9.5     16%       320     29.76
  matchComponents              1.7      3%       176      9.51
  speciesDedup                 1.2      2%       161      7.61
  canonicalize                 0.3      1%        64      4.88
  (instrumented sections account for 60% of gen wall; 1844.0 µs/species, 368.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 137.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         39.5     29%      1792     22.02
  findAllMaps                 28.4     21%      1792     15.82
  matchComponents              9.8      7%       960     10.26
  speciesDedup                 5.3      4%       897      5.90
  canonicalize                 1.1      1%       256      4.18
  (instrumented sections account for 61% of gen wall; 1073.1 µs/species, 153.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       6.5       7.7      0.8x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       3.1       3.6      0.9x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32      12.9       9.2      1.4x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      49.6      27.6      1.8x      1.8e-6      2.7e-9  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.8x.
     => Sparse is correct and faster: routing large mass-action models to cvode_sparse
        is a safe selection change (SimulationLoop.ts ~2636 / ~2618).
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen           200.6  39%
   ssa           199.8  39%
   ode            72.1  14%
   parse          36.4  7%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        62.6  31% of gen
   findAllMaps                38.2  19% of gen
   matchComponents            11.5  6% of gen
   speciesDedup                6.6  3% of gen
   canonicalize                1.4  1% of gen

 >>> Biggest phase overall: gen (200.6 ms).
 >>> Biggest generation sink: applyTransformation (31% of generation).
==============================================================================
