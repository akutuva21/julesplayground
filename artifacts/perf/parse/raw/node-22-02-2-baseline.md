
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ode, ssa
 SSA cases: t_end=1, t_end=100
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      3.9       4.0      3.3        1.4      0.5
binding_AB (bimolecular)                        3       2      3.3       1.4      2.3       11.6      0.2
multisite_5 (2^5 species, combinatorial)       32     160      7.3      28.7      8.9      393.2     -6.6
multisite_7 (2^7 species, combinatorial)      128     896      6.6      72.1     32.0      571.8     11.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ode:t_end=10 | median=3.317 min=3.317 max=3.317
   samples_ms=[3.317] trajectory_hash=ab99f4cd77c76067f364a93b5c1c7e21d0b35d529803e4624531f645ec4382a8
 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.136 min=1.136 max=1.136
   samples_ms=[1.136] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.358 min=1.358 max=1.358
   samples_ms=[1.358] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ode:t_end=10 | median=2.333 min=2.333 max=2.333
   samples_ms=[2.333] trajectory_hash=9694b1d7be826498f9509398054c237c6000336de1695905211381cb6a104af3
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.006 min=1.006 max=1.006
   samples_ms=[1.006] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.564 min=11.564 max=11.564
   samples_ms=[11.564] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_5 (2^5 species, combinatorial) | ode:t_end=10 | median=8.946 min=8.946 max=8.946
   samples_ms=[8.946] trajectory_hash=b496ceb3cdddb01b64436cd059d33d5abd578abccdf0cb471bd4e66c65b372b1
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.238 min=14.238 max=14.238
   samples_ms=[14.238] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=393.152 min=393.152 max=393.152
   samples_ms=[393.152] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ode:t_end=10 | median=32.017 min=32.017 max=32.017
   samples_ms=[32.017] trajectory_hash=4a8fbefc57c9df370072671aa8745967e5340c85779785f6870b0c5ac584a52d
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=33.695 min=33.695 max=33.695
   samples_ms=[33.695] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=571.776 min=571.776 max=571.776
   samples_ms=[571.776] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.6     16%         4    159.69
  applyTransformation          0.5     11%         4    113.51
  speciesDedup                 0.2      5%         9     22.69
  matchComponents              0.0      0%         5      1.36
  canonicalize                 0.0      0%         5      1.35
  (instrumented sections account for 32% of gen wall; 808.5 µs/species, 1010.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     12%         5     33.81
  applyTransformation          0.1      7%         2     46.28
  speciesDedup                 0.0      1%         6      3.35
  matchComponents              0.0      0%         6      1.12
  canonicalize                 0.0      0%         3      0.97
  (instrumented sections account for 21% of gen wall; 462.2 µs/species, 693.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 28.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  8.8     31%       160     54.70
  applyTransformation          2.1      7%       160     13.21
  speciesDedup                 2.1      7%       161     13.04
  matchComponents              2.0      7%       176     11.49
  canonicalize                 0.8      3%        32     23.86
  (instrumented sections account for 55% of gen wall; 896.7 µs/species, 179.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 72.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 23.3     32%       896     26.03
  matchComponents              7.8     11%       960      8.14
  applyTransformation          7.5     10%       896      8.40
  speciesDedup                 5.3      7%       897      5.94
  canonicalize                 1.1      2%       128      8.72
  (instrumented sections account for 63% of gen wall; 563.1 µs/species, 80.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       3.3       2.6      1.3x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       2.3       3.0      0.8x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32       8.9       7.7      1.2x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      32.0      27.0      1.2x      0.0e+0      0.0e+0  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.3x.
     => Sparse matches dense but is not clearly faster at these sizes; scale up
        (larger PROFILE_MULTISITE) before deciding.
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           977.9  85%
   gen           106.2  9%
   ode            46.6  4%
   parse          21.1  2%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                32.9  31% of gen
   applyTransformation        10.2  10% of gen
   matchComponents             9.9  9% of gen
   speciesDedup                7.7  7% of gen
   canonicalize                1.9  2% of gen

 >>> Biggest phase overall: ssa (977.9 ms).
 >>> Biggest generation sink: findAllMaps (31% of generation).
==============================================================================
