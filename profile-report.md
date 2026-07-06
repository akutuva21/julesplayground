
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 cvode.wasm present: yes   sim methods: ode, ssa
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa   heapMB
-------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      9.9       3.8      8.7      1.6    -12.1
binding_AB (bimolecular)                        3       2      8.5       1.7      4.6      5.2      0.3
multisite_5 (2^5 species, combinatorial)       32     160     20.9      74.6     13.0    146.8      3.1
multisite_7 (2^7 species, combinatorial)      128     896     21.8     145.8     62.0     87.7     -8.0

(all times in ms)

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  4.7    124%        20    236.79
  applyTransformation          0.3      9%         8     43.70
  speciesDedup                 0.1      2%         9      6.47
  canonicalize                 0.0      1%        10      2.13
  matchComponents              0.0      0%         5      1.66
  (instrumented sections account for 135% of gen wall; 764.6 µs/species, 955.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     12%         3     69.38
  findAllMaps                  0.1      7%        11     11.02
  speciesDedup                 0.0      2%         6      5.69
  canonicalize                 0.0      1%         6      2.25
  matchComponents              0.0      0%         6      0.44
  (instrumented sections account for 23% of gen wall; 557.8 µs/species, 836.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 74.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         35.6     48%       320    111.26
  findAllMaps                 17.0     23%       320     53.13
  matchComponents              1.9      3%       176     10.71
  speciesDedup                 1.3      2%       161      7.93
  canonicalize                 0.7      1%        64     11.24
  (instrumented sections account for 76% of gen wall; 2331.3 µs/species, 466.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 145.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         50.8     35%      1792     28.36
  findAllMaps                 27.0     18%      1792     15.04
  speciesDedup                 8.1      6%       897      8.99
  matchComponents              7.9      5%       960      8.25
  canonicalize                 3.5      2%       256     13.78
  (instrumented sections account for 67% of gen wall; 1138.9 µs/species, 162.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       8.7       8.9      1.0x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       4.6       3.5      1.3x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32      13.0       8.8      1.5x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      62.0      30.4      2.0x      1.8e-6      2.7e-9  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 2.0x.
     => Sparse is correct and faster: routing large mass-action models to cvode_sparse
        is a safe selection change (SimulationLoop.ts ~2636 / ~2618).
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           241.2  39%
   gen           225.9  37%
   ode            88.3  14%
   parse          61.1  10%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        87.0  39% of gen
   findAllMaps                48.8  22% of gen
   matchComponents             9.8  4% of gen
   speciesDedup                9.4  4% of gen
   canonicalize                4.3  2% of gen

 >>> Biggest phase overall: ssa (241.2 ms).
 >>> Biggest generation sink: applyTransformation (39% of generation).
==============================================================================
