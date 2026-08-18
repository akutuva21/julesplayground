
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 cvode.wasm present: yes   sim methods: ode, ssa
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa   heapMB
-------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.5       3.0      3.7      1.7      0.4
binding_AB (bimolecular)                        3       2      4.8       1.4      2.5      1.9      0.3
multisite_5 (2^5 species, combinatorial)       32     160      9.9      37.9      9.3     87.4     -3.2
multisite_7 (2^7 species, combinatorial)      128     896      7.7     111.0     33.7     71.5      5.9

(all times in ms)

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2      6%         4     47.04
  findAllMaps                  0.2      6%         4     44.34
  speciesDedup                 0.1      2%         9      6.17
  canonicalize                 0.0      1%         5      4.68
  matchComponents              0.0      0%         5      1.16
  (instrumented sections account for 15% of gen wall; 590.1 µs/species, 737.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     11%         5     31.63
  applyTransformation          0.1      8%         2     54.79
  speciesDedup                 0.0      2%         6      4.98
  canonicalize                 0.0      1%         3      3.11
  matchComponents              0.0      0%         6      0.57
  (instrumented sections account for 22% of gen wall; 476.6 µs/species, 714.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 37.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         12.2     32%       160     76.07
  findAllMaps                  6.2     16%       160     38.74
  matchComponents              1.5      4%       176      8.49
  speciesDedup                 1.3      3%       161      7.95
  canonicalize                 0.2      1%        32      6.40
  (instrumented sections account for 56% of gen wall; 1184.3 µs/species, 236.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 111.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         20.8     19%       896     23.17
  findAllMaps                 17.9     16%       896     19.99
  matchComponents              7.6      7%       960      7.89
  speciesDedup                 5.3      5%       897      5.94
  canonicalize                 1.0      1%       128      7.51
  (instrumented sections account for 47% of gen wall; 867.1 µs/species, 123.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       3.7       3.0      1.2x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       2.5       2.9      0.9x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32       9.3       8.9      1.0x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      33.7      27.7      1.2x      0.0e+0      0.0e+0  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.2x.
     => Sparse matches dense but is not clearly faster at these sizes; scale up
        (larger PROFILE_MULTISITE) before deciding.
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           162.5  41%
   gen           153.3  39%
   ode            49.2  12%
   parse          30.8  8%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        33.2  22% of gen
   findAllMaps                24.4  16% of gen
   matchComponents             9.1  6% of gen
   speciesDedup                6.7  4% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (162.5 ms).
 >>> Biggest generation sink: applyTransformation (22% of generation).
==============================================================================
