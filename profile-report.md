
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 runtime: v22.22.1   platform: linux/x64
 cvode.wasm present: yes   sim methods: ode, ssa
 SSA cases: t_end=1, t_end=100
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.9       2.7      3.8        2.6      0.3
binding_AB (bimolecular)                        3       2      5.0       1.9      3.0        9.7    -10.2
multisite_5 (2^5 species, combinatorial)       32     160     21.8      31.7     10.1      414.8      7.7
multisite_7 (2^7 species, combinatorial)      128     896     11.4     119.9     43.0      586.7     -2.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ode:t_end=10 | median=3.808 min=3.735 max=14.062
   samples_ms=[14.062, 3.808, 3.735] trajectory_hash=ab99f4cd77c76067f364a93b5c1c7e21d0b35d529803e4624531f645ec4382a8
 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.184 min=1.163 max=1.374
   samples_ms=[1.374, 1.184, 1.163] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.637 min=1.615 max=2.674
   samples_ms=[1.615, 2.637, 2.674] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ode:t_end=10 | median=3.044 min=2.355 max=3.185
   samples_ms=[3.185, 3.044, 2.355] trajectory_hash=9694b1d7be826498f9509398054c237c6000336de1695905211381cb6a104af3
 binding_AB (bimolecular) | ssa:t_end=1 | median=0.793 min=0.768 max=3.768
   samples_ms=[3.768, 0.793, 0.768] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=9.687 min=9.552 max=12.117
   samples_ms=[9.552, 12.117, 9.687] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_5 (2^5 species, combinatorial) | ode:t_end=10 | median=10.054 min=8.896 max=11.138
   samples_ms=[10.054, 11.138, 8.896] trajectory_hash=b496ceb3cdddb01b64436cd059d33d5abd578abccdf0cb471bd4e66c65b372b1
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=25.181 min=18.398 max=27.794
   samples_ms=[27.794, 18.398, 25.181] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=414.825 min=411.701 max=429.609
   samples_ms=[411.701, 414.825, 429.609] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ode:t_end=10 | median=43.020 min=36.871 max=49.125
   samples_ms=[49.125, 36.871, 43.020] trajectory_hash=4a8fbefc57c9df370072671aa8745967e5340c85779785f6870b0c5ac584a52d
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=18.963 min=18.941 max=35.167
   samples_ms=[18.963, 18.941, 35.167] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=586.724 min=584.694 max=627.233
   samples_ms=[586.724, 627.233, 584.694] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 2.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.3     12%         4     79.59
  applyTransformation          0.3     10%         4     65.39
  speciesDedup                 0.0      1%         9      4.45
  matchComponents              0.0      0%         5      1.41
  canonicalize                 0.0      0%         5      1.16
  (instrumented sections account for 23% of gen wall; 546.0 µs/species, 682.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     68.64
  findAllMaps                  0.1      6%         5     23.01
  speciesDedup                 0.0      2%         6      4.81
  canonicalize                 0.0      0%         3      1.28
  matchComponents              0.0      0%         6      0.49
  (instrumented sections account for 15% of gen wall; 620.6 µs/species, 930.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 31.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  8.3     26%       160     51.78
  matchComponents              4.6     14%       176     25.91
  applyTransformation          4.3     14%       160     27.00
  speciesDedup                 1.1      3%       161      6.56
  canonicalize                 0.2      1%        32      7.42
  (instrumented sections account for 58% of gen wall; 989.3 µs/species, 197.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 119.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 56.8     47%       896     63.38
  matchComponents             10.6      9%       960     11.07
  applyTransformation          9.9      8%       896     11.03
  speciesDedup                 5.3      4%       897      5.91
  canonicalize                 0.9      1%       128      7.10
  (instrumented sections account for 70% of gen wall; 936.5 µs/species, 133.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       3.8       6.1      0.6x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       3.0       2.9      1.1x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32      10.1       8.7      1.2x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      43.0      31.1      1.4x      0.0e+0      0.0e+0  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.4x.
     => Sparse matches dense but is not clearly faster at these sizes; scale up
        (larger PROFILE_MULTISITE) before deciding.
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1013.9  79%
   gen           156.1  12%
   ode            59.9  5%
   parse          47.1  4%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                65.5  42% of gen
   matchComponents            15.2  10% of gen
   applyTransformation        14.6  9% of gen
   speciesDedup                6.4  4% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (1013.9 ms).
 >>> Biggest generation sink: findAllMaps (42% of generation).
==============================================================================
