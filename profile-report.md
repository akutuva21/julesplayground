
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 cvode.wasm present: yes   sim methods: ode, ssa
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa   heapMB
-------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.8       3.2      6.2      1.7      0.4
binding_AB (bimolecular)                        3       2      6.6       1.6      2.7      1.9      0.3
multisite_5 (2^5 species, combinatorial)       32     160     18.3     105.6     11.4    102.1      3.1
multisite_7 (2^7 species, combinatorial)      128     896     13.4     128.5     49.7     93.6      7.4

(all times in ms)

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.3      9%        20     13.99
  applyTransformation          0.3      8%         8     31.85
  speciesDedup                 0.0      1%         9      4.87
  canonicalize                 0.0      1%        10      1.88
  matchComponents              0.0      0%         5      1.29
  (instrumented sections account for 19% of gen wall; 635.7 µs/species, 794.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     12%        11     17.59
  applyTransformation          0.1      9%         3     47.31
  speciesDedup                 0.0      2%         6      5.14
  canonicalize                 0.0      1%         6      2.05
  matchComponents              0.0      0%         6      0.59
  (instrumented sections account for 24% of gen wall; 540.8 µs/species, 811.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 105.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         54.6     52%       320    170.68
  findAllMaps                 28.6     27%       320     89.27
  matchComponents             16.8     16%       176     95.41
  speciesDedup                 1.2      1%       161      7.74
  canonicalize                 0.4      0%        64      6.61
  (instrumented sections account for 96% of gen wall; 3300.6 µs/species, 660.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 128.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         40.6     32%      1792     22.68
  findAllMaps                 34.2     27%      1792     19.07
  matchComponents              8.0      6%       960      8.32
  speciesDedup                 7.1      6%       897      7.90
  canonicalize                 1.1      1%       256      4.46
  (instrumented sections account for 71% of gen wall; 1003.7 µs/species, 143.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       6.2       3.2      1.9x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       2.7       3.7      0.7x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32      11.4       7.6      1.5x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      49.7      31.7      1.6x      1.8e-6      2.7e-9  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.9x.
     => Sparse is correct and faster: routing large mass-action models to cvode_sparse
        is a safe selection change (SimulationLoop.ts ~2636 / ~2618).
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen           238.9  43%
   ssa           199.3  36%
   ode            70.0  13%
   parse          47.2  8%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        95.7  40% of gen
   findAllMaps                63.2  26% of gen
   matchComponents            24.8  10% of gen
   speciesDedup                8.4  4% of gen
   canonicalize                1.6  1% of gen

 >>> Biggest phase overall: gen (238.9 ms).
 >>> Biggest generation sink: applyTransformation (40% of generation).
==============================================================================
