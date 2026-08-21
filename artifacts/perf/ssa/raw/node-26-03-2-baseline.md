
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.9       3.4        -        1.6      0.5
binding_AB (bimolecular)                        3       2      5.1       1.7        -       23.8      0.2
multisite_4 (2^4 species, combinatorial)       16      64     10.5      15.4        -      161.6      3.7
multisite_5 (2^5 species, combinatorial)       32     160      6.6      14.4        -      322.5      8.8
multisite_7 (2^7 species, combinatorial)      128     896      7.1      55.8        -      630.4     19.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.974 min=1.974 max=1.974
   samples_ms=[1.974] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.563 min=1.563 max=1.563
   samples_ms=[1.563] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.384 min=1.384 max=1.384
   samples_ms=[1.384] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=23.824 min=23.824 max=23.824
   samples_ms=[23.824] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.185 min=4.185 max=4.185
   samples_ms=[4.185] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=161.603 min=161.603 max=161.603
   samples_ms=[161.603] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.707 min=15.707 max=15.707
   samples_ms=[15.707] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=322.510 min=322.510 max=322.510
   samples_ms=[322.510] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.077 min=15.077 max=15.077
   samples_ms=[15.077] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=630.385 min=630.385 max=630.385
   samples_ms=[630.385] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     16%         4    137.67
  findAllMaps                  0.5     14%         4    115.89
  speciesDedup                 0.1      4%         9     14.52
  canonicalize                 0.0      0%         5      2.39
  matchComponents              0.0      0%         5      1.29
  (instrumented sections account for 34% of gen wall; 679.8 µs/species, 849.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     71.26
  findAllMaps                  0.1      8%         5     26.37
  speciesDedup                 0.0      1%         6      3.62
  matchComponents              0.0      0%         6      1.05
  canonicalize                 0.0      0%         3      1.09
  (instrumented sections account for 18% of gen wall; 577.6 µs/species, 866.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 15.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.5     23%        64     55.16
  applyTransformation          1.3      8%        64     20.11
  speciesDedup                 0.9      6%        65     13.83
  matchComponents              0.8      5%        72     11.67
  canonicalize                 0.3      2%        16     15.88
  (instrumented sections account for 44% of gen wall; 964.7 µs/species, 241.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 14.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.7     26%       160     23.22
  applyTransformation          1.3      9%       160      8.42
  speciesDedup                 1.1      7%       161      6.52
  matchComponents              0.8      6%       176      4.62
  canonicalize                 0.1      1%        32      4.38
  (instrumented sections account for 49% of gen wall; 449.2 µs/species, 89.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 55.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 17.5     31%       896     19.55
  matchComponents              7.5     13%       960      7.85
  speciesDedup                 4.7      8%       897      5.25
  applyTransformation          4.0      7%       896      4.49
  canonicalize                 0.7      1%       128      5.42
  (instrumented sections account for 62% of gen wall; 436.2 µs/species, 62.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1139.9  90%
   gen            90.8  7%
   parse          38.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                25.4  28% of gen
   matchComponents             9.2  10% of gen
   applyTransformation         7.4  8% of gen
   speciesDedup                6.8  8% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1139.9 ms).
 >>> Biggest generation sink: findAllMaps (28% of generation).
==============================================================================
