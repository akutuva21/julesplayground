
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ode, ssa
 SSA cases: t_end=1, t_end=100
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      3.9       3.9      3.3        1.4      0.5
binding_AB (bimolecular)                        3       2      3.2       1.4      2.3       11.6      0.2
multisite_5 (2^5 species, combinatorial)       32     160      7.5      28.8      9.0      392.4     -6.7
multisite_7 (2^7 species, combinatorial)      128     896      7.2      78.8     31.7      611.5     -2.0

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ode:t_end=10 | median=3.320 min=3.320 max=3.320
   samples_ms=[3.320] trajectory_hash=ab99f4cd77c76067f364a93b5c1c7e21d0b35d529803e4624531f645ec4382a8
 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.117 min=1.117 max=1.117
   samples_ms=[1.117] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.352 min=1.352 max=1.352
   samples_ms=[1.352] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ode:t_end=10 | median=2.285 min=2.285 max=2.285
   samples_ms=[2.285] trajectory_hash=9694b1d7be826498f9509398054c237c6000336de1695905211381cb6a104af3
 binding_AB (bimolecular) | ssa:t_end=1 | median=0.961 min=0.961 max=0.961
   samples_ms=[0.961] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.623 min=11.623 max=11.623
   samples_ms=[11.623] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_5 (2^5 species, combinatorial) | ode:t_end=10 | median=8.998 min=8.998 max=8.998
   samples_ms=[8.998] trajectory_hash=b496ceb3cdddb01b64436cd059d33d5abd578abccdf0cb471bd4e66c65b372b1
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.332 min=14.332 max=14.332
   samples_ms=[14.332] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=392.354 min=392.354 max=392.354
   samples_ms=[392.354] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ode:t_end=10 | median=31.718 min=31.718 max=31.718
   samples_ms=[31.718] trajectory_hash=4a8fbefc57c9df370072671aa8745967e5340c85779785f6870b0c5ac584a52d
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=35.149 min=35.149 max=35.149
   samples_ms=[35.149] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=611.521 min=611.521 max=611.521
   samples_ms=[611.521] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.6     16%         4    157.52
  applyTransformation          0.4     10%         4     92.69
  speciesDedup                 0.3      7%         9     30.11
  canonicalize                 0.0      0%         5      1.42
  matchComponents              0.0      0%         5      1.37
  (instrumented sections account for 33% of gen wall; 780.4 µs/species, 975.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     11%         5     32.16
  applyTransformation          0.1      7%         2     51.43
  speciesDedup                 0.1      4%         6     10.07
  matchComponents              0.0      0%         6      1.12
  canonicalize                 0.0      0%         3      1.12
  (instrumented sections account for 23% of gen wall; 479.2 µs/species, 718.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 28.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  7.2     25%       160     44.94
  speciesDedup                 2.2      8%       161     13.78
  applyTransformation          2.2      8%       160     13.55
  matchComponents              2.1      7%       176     11.74
  canonicalize                 1.0      3%        32     29.93
  (instrumented sections account for 51% of gen wall; 898.7 µs/species, 179.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 78.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 20.5     26%       896     22.87
  applyTransformation          7.6     10%       896      8.43
  speciesDedup                 6.1      8%       897      6.82
  matchComponents              5.8      7%       960      6.01
  canonicalize                 1.4      2%       128     10.86
  (instrumented sections account for 52% of gen wall; 615.3 µs/species, 87.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       3.3       2.7      1.2x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       2.3       2.9      0.8x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32       9.0       7.3      1.2x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      31.7      27.9      1.1x      0.0e+0      0.0e+0  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.2x.
     => Sparse matches dense but is not clearly faster at these sizes; scale up
        (larger PROFILE_MULTISITE) before deciding.
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1016.8  85%
   gen           112.9  9%
   ode            46.3  4%
   parse          21.8  2%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                28.5  25% of gen
   applyTransformation        10.2  9% of gen
   speciesDedup                8.7  8% of gen
   matchComponents             7.8  7% of gen
   canonicalize                2.4  2% of gen

 >>> Biggest phase overall: ssa (1016.8 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
