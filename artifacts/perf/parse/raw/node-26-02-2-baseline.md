
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ode, ssa
 SSA cases: t_end=1, t_end=100
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.4       3.1      5.9        1.7      0.5
binding_AB (bimolecular)                        3       2      3.0       1.8      2.6       29.8      0.2
multisite_5 (2^5 species, combinatorial)       32     160      5.8      26.3      9.1      322.0      8.3
multisite_7 (2^7 species, combinatorial)      128     896      4.1      60.1     23.0      595.7     -9.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ode:t_end=10 | median=5.899 min=5.899 max=5.899
   samples_ms=[5.899] trajectory_hash=ab99f4cd77c76067f364a93b5c1c7e21d0b35d529803e4624531f645ec4382a8
 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.341 min=1.341 max=1.341
   samples_ms=[1.341] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.674 min=1.674 max=1.674
   samples_ms=[1.674] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ode:t_end=10 | median=2.610 min=2.610 max=2.610
   samples_ms=[2.610] trajectory_hash=9694b1d7be826498f9509398054c237c6000336de1695905211381cb6a104af3
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.066 min=1.066 max=1.066
   samples_ms=[1.066] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=29.846 min=29.846 max=29.846
   samples_ms=[29.846] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_5 (2^5 species, combinatorial) | ode:t_end=10 | median=9.071 min=9.071 max=9.071
   samples_ms=[9.071] trajectory_hash=b496ceb3cdddb01b64436cd059d33d5abd578abccdf0cb471bd4e66c65b372b1
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.521 min=15.521 max=15.521
   samples_ms=[15.521] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=322.017 min=322.017 max=322.017
   samples_ms=[322.017] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ode:t_end=10 | median=23.013 min=23.013 max=23.013
   samples_ms=[23.013] trajectory_hash=4a8fbefc57c9df370072671aa8745967e5340c85779785f6870b0c5ac584a52d
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=17.188 min=17.188 max=17.188
   samples_ms=[17.188] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=595.675 min=595.675 max=595.675
   samples_ms=[595.675] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     19%         4    142.34
  findAllMaps                  0.4     14%         4    109.30
  speciesDedup                 0.2      6%         9     19.15
  matchComponents              0.0      0%         5      1.39
  canonicalize                 0.0      0%         5      1.37
  (instrumented sections account for 39% of gen wall; 612.1 µs/species, 765.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2      9%         2     81.47
  findAllMaps                  0.1      8%         5     27.46
  speciesDedup                 0.0      1%         6      3.86
  matchComponents              0.0      0%         6      1.21
  canonicalize                 0.0      0%         3      0.98
  (instrumented sections account for 19% of gen wall; 588.0 µs/species, 882.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 26.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.3     24%       160     39.52
  applyTransformation          2.5      9%       160     15.49
  speciesDedup                 1.7      7%       161     10.83
  matchComponents              1.3      5%       176      7.56
  canonicalize                 0.4      2%        32     13.20
  (instrumented sections account for 47% of gen wall; 821.7 µs/species, 164.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 60.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 18.9     31%       896     21.09
  matchComponents              8.4     14%       960      8.76
  applyTransformation          4.5      8%       896      5.06
  speciesDedup                 4.4      7%       897      4.86
  canonicalize                 0.6      1%       128      4.86
  (instrumented sections account for 61% of gen wall; 469.3 µs/species, 67.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       5.9       4.1      1.4x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       2.6       8.1      0.3x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32       9.1       7.8      1.2x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      23.0      23.1      1.0x      0.0e+0      0.0e+0  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.4x.
     => Sparse matches dense but is not clearly faster at these sizes; scale up
        (larger PROFILE_MULTISITE) before deciding.
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           949.2  86%
   gen            91.2  8%
   ode            40.6  4%
   parse          17.3  2%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                25.8  28% of gen
   matchComponents             9.8  11% of gen
   applyTransformation         7.7  8% of gen
   speciesDedup                6.3  7% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (949.2 ms).
 >>> Biggest generation sink: findAllMaps (28% of generation).
==============================================================================
