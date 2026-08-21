
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 cvode.wasm present: yes   sim methods: ode, ssa
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa   heapMB
-------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     18.1       7.9      6.8      3.1      0.4
binding_AB (bimolecular)                        3       2      9.2       3.4      4.6      3.8      0.3
multisite_5 (2^5 species, combinatorial)       32     160     22.4      97.0     17.6    151.0      2.5
multisite_7 (2^7 species, combinatorial)      128     896     18.4     229.9     52.0     88.8      7.1

(all times in ms)

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 7.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.8     10%         8     98.67
  findAllMaps                  0.6      7%        20     27.61
  speciesDedup                 0.2      2%         9     17.12
  canonicalize                 0.1      1%        10      7.27
  matchComponents              0.0      0%         5      2.18
  (instrumented sections account for 20% of gen wall; 1586.1 µs/species, 1982.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 3.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.4     12%         3    132.44
  findAllMaps                  0.2      6%        11     19.78
  speciesDedup                 0.1      3%         6     15.08
  canonicalize                 0.0      1%         6      5.15
  matchComponents              0.0      0%         6      0.88
  (instrumented sections account for 22% of gen wall; 1122.3 µs/species, 1683.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 97.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         34.9     36%       320    108.94
  findAllMaps                 18.4     19%       320     57.65
  matchComponents              2.9      3%       176     16.46
  speciesDedup                 2.6      3%       161     16.43
  canonicalize                 0.6      1%        64      9.45
  (instrumented sections account for 61% of gen wall; 3031.1 µs/species, 606.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 229.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         65.6     29%      1792     36.63
  findAllMaps                 41.8     18%      1792     23.33
  matchComponents             11.0      5%       960     11.49
  speciesDedup                10.1      4%       897     11.29
  canonicalize                 1.9      1%       256      7.49
  (instrumented sections account for 57% of gen wall; 1795.8 µs/species, 256.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       6.8       5.2      1.3x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       4.6       5.2      0.9x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32      17.6      13.2      1.3x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      52.0      28.9      1.8x      1.8e-6      2.7e-9  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.8x.
     => Sparse is correct and faster: routing large mass-action models to cvode_sparse
        is a safe selection change (SimulationLoop.ts ~2636 / ~2618).
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen           338.2  46%
   ssa           246.6  34%
   ode            81.0  11%
   parse          68.0  9%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation       101.7  30% of gen
   findAllMaps                61.0  18% of gen
   matchComponents            13.9  4% of gen
   speciesDedup               13.0  4% of gen
   canonicalize                2.6  1% of gen

 >>> Biggest phase overall: gen (338.2 ms).
 >>> Biggest generation sink: applyTransformation (30% of generation).
==============================================================================
