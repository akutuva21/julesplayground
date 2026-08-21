
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     16.4       6.2        -        2.8      0.5
binding_AB (bimolecular)                        3       2     11.2       3.5        -       41.5     -0.1
multisite_4 (2^4 species, combinatorial)       16      64     19.9      31.9        -      228.5      3.4
multisite_5 (2^5 species, combinatorial)       32     160     13.5      33.4        -      336.8      8.5
multisite_7 (2^7 species, combinatorial)      128     896      6.8      60.1        -      623.3     -9.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=3.758 min=3.758 max=3.758
   samples_ms=[3.758] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.829 min=2.829 max=2.829
   samples_ms=[2.829] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.362 min=3.362 max=3.362
   samples_ms=[3.362] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=41.549 min=41.549 max=41.549
   samples_ms=[41.549] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=7.558 min=7.558 max=7.558
   samples_ms=[7.558] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=228.539 min=228.539 max=228.539
   samples_ms=[228.539] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=27.081 min=27.081 max=27.081
   samples_ms=[27.081] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=336.795 min=336.795 max=336.795
   samples_ms=[336.795] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.135 min=15.135 max=15.135
   samples_ms=[15.135] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=623.288 min=623.288 max=623.288
   samples_ms=[623.288] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 6.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          1.1     17%         4    271.66
  findAllMaps                  1.1     17%         4    264.27
  speciesDedup                 0.4      7%         9     46.56
  canonicalize                 0.0      0%         5      3.65
  matchComponents              0.0      0%         5      3.53
  (instrumented sections account for 42% of gen wall; 1249.1 µs/species, 1561.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 3.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.3      8%         5     58.19
  applyTransformation          0.3      8%         2    137.68
  speciesDedup                 0.1      2%         6     10.69
  matchComponents              0.0      1%         6      2.98
  canonicalize                 0.0      0%         3      1.36
  (instrumented sections account for 19% of gen wall; 1164.4 µs/species, 1746.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 31.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  7.3     23%        64    114.58
  applyTransformation          2.9      9%        64     45.83
  matchComponents              1.7      5%        72     23.22
  speciesDedup                 1.5      5%        65     23.39
  canonicalize                 0.4      1%        16     24.74
  (instrumented sections account for 43% of gen wall; 1995.5 µs/species, 498.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 33.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  8.9     27%       160     55.82
  applyTransformation          3.3     10%       160     20.36
  speciesDedup                 2.0      6%       161     12.37
  matchComponents              1.5      4%       176      8.51
  canonicalize                 0.4      1%        32     11.83
  (instrumented sections account for 48% of gen wall; 1043.0 µs/species, 208.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 60.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.6     26%       896     17.36
  matchComponents              5.5      9%       960      5.71
  speciesDedup                 4.4      7%       897      4.88
  applyTransformation          4.1      7%       896      4.62
  canonicalize                 0.6      1%       128      5.01
  (instrumented sections account for 50% of gen wall; 469.5 µs/species, 67.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1233.0  86%
   gen           135.1  9%
   parse          67.9  5%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                33.2  25% of gen
   applyTransformation        11.7  9% of gen
   matchComponents             8.7  6% of gen
   speciesDedup                8.4  6% of gen
   canonicalize                1.4  1% of gen

 >>> Biggest phase overall: ssa (1233.0 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
