
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 cvode.wasm present: yes   sim methods: ode, ssa
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa   heapMB
-------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.5       4.3      5.2      2.1      0.4
binding_AB (bimolecular)                        3       2      4.5       1.9      2.5      2.5      0.3
multisite_5 (2^5 species, combinatorial)       32     160     15.3      74.5     11.1    143.8      2.8
multisite_7 (2^7 species, combinatorial)      128     896     17.0     151.5     76.4    197.6      6.3

(all times in ms)

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.4      9%         8     47.60
  findAllMaps                  0.3      6%        20     13.69
  speciesDedup                 0.1      1%         9      5.65
  canonicalize                 0.0      1%        10      2.90
  matchComponents              0.0      0%         5      1.29
  (instrumented sections account for 17% of gen wall; 862.7 µs/species, 1078.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         3     44.14
  findAllMaps                  0.1      6%        11      9.75
  speciesDedup                 0.0      2%         6      5.16
  canonicalize                 0.0      1%         6      2.22
  matchComponents              0.0      0%         6      0.46
  (instrumented sections account for 15% of gen wall; 618.0 µs/species, 926.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 74.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         34.3     46%       320    107.11
  findAllMaps                 16.1     22%       320     50.26
  matchComponents              5.6      8%       176     32.00
  canonicalize                 5.2      7%        64     80.83
  speciesDedup                 1.3      2%       161      8.32
  (instrumented sections account for 84% of gen wall; 2327.3 µs/species, 465.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 151.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         54.6     36%      1792     30.48
  findAllMaps                 34.3     23%      1792     19.13
  matchComponents              8.5      6%       960      8.81
  speciesDedup                 6.0      4%       897      6.73
  canonicalize                 1.2      1%       256      4.59
  (instrumented sections account for 69% of gen wall; 1183.9 µs/species, 169.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       5.2      10.5      0.5x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       2.5       3.6      0.7x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32      11.1       9.3      1.2x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      76.4      36.4      2.1x      1.8e-6      2.7e-9  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 2.1x.
     => Sparse is correct and faster: routing large mass-action models to cvode_sparse
        is a safe selection change (SimulationLoop.ts ~2636 / ~2618).
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           346.0  48%
   gen           232.2  32%
   ode            95.2  13%
   parse          45.4  6%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        89.4  39% of gen
   findAllMaps                50.7  22% of gen
   matchComponents            14.1  6% of gen
   speciesDedup                7.5  3% of gen
   canonicalize                6.4  3% of gen

 >>> Biggest phase overall: ssa (346.0 ms).
 >>> Biggest generation sink: applyTransformation (39% of generation).
==============================================================================
