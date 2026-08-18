
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 cvode.wasm present: yes   sim methods: ode, ssa
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa   heapMB
-------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      9.6       2.6      5.4      1.8      0.4
binding_AB (bimolecular)                        3       2      7.1       1.8      4.4      2.2      0.3
multisite_5 (2^5 species, combinatorial)       32     160     15.0      75.1      9.8    136.4      3.7
multisite_7 (2^7 species, combinatorial)      128     896     16.1     136.7     41.3     96.1      7.1

(all times in ms)

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 2.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.4     14%         8     44.50
  findAllMaps                  0.3     13%        20     17.25
  speciesDedup                 0.1      3%         9      7.39
  canonicalize                 0.0      1%        10      2.71
  matchComponents              0.0      0%         5      1.41
  (instrumented sections account for 31% of gen wall; 521.3 µs/species, 651.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         3     48.87
  findAllMaps                  0.1      7%        11     11.15
  speciesDedup                 0.1      5%         6     14.19
  canonicalize                 0.0      1%         6      2.89
  matchComponents              0.0      0%         6      0.48
  (instrumented sections account for 21% of gen wall; 607.1 µs/species, 910.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 75.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         31.4     42%       320     98.05
  findAllMaps                 27.8     37%       320     87.01
  matchComponents              2.4      3%       176     13.61
  speciesDedup                 1.5      2%       161      9.07
  canonicalize                 0.8      1%        64     12.95
  (instrumented sections account for 85% of gen wall; 2346.5 µs/species, 469.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 136.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         49.4     36%      1792     27.59
  findAllMaps                 29.2     21%      1792     16.31
  matchComponents             11.5      8%       960     11.99
  speciesDedup                 5.8      4%       897      6.46
  canonicalize                 1.4      1%       256      5.37
  (instrumented sections account for 71% of gen wall; 1067.7 µs/species, 152.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       5.4       7.6      0.7x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       4.4       2.9      1.5x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32       9.8      18.7      0.5x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      41.3      28.3      1.5x      0.0e+0      0.0e+0  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.5x.
     => Sparse matches dense but is not clearly faster at these sizes; scale up
        (larger PROFILE_MULTISITE) before deciding.
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           236.6  42%
   gen           216.2  39%
   ode            60.9  11%
   parse          47.8  9%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        81.3  38% of gen
   findAllMaps                57.5  27% of gen
   matchComponents            13.9  6% of gen
   speciesDedup                7.4  3% of gen
   canonicalize                2.2  1% of gen

 >>> Biggest phase overall: ssa (236.6 ms).
 >>> Biggest generation sink: applyTransformation (38% of generation).
==============================================================================
