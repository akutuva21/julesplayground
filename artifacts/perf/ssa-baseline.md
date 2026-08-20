
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 runtime: v22.22.1   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.1       2.6        -        1.7      0.3
binding_AB (bimolecular)                        3       2      5.0       1.8        -        9.5      0.2
multisite_4 (2^4 species, combinatorial)       16      64      7.6      10.4        -      278.0      3.2
multisite_5 (2^5 species, combinatorial)       32     160      7.5      19.3        -      419.9     -7.8
multisite_7 (2^7 species, combinatorial)      128     896      6.6      91.5        -      586.3     -1.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.588 min=1.289 max=1.678
   samples_ms=[1.678, 1.588, 1.289] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.662 min=1.554 max=1.704
   samples_ms=[1.704, 1.662, 1.554] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.220 min=1.126 max=6.052
   samples_ms=[1.220, 1.126, 6.052] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=9.532 min=9.524 max=12.047
   samples_ms=[9.532, 9.524, 12.047] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=7.728 min=7.368 max=12.382
   samples_ms=[7.728, 7.368, 12.382] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=277.997 min=270.876 max=278.733
   samples_ms=[270.876, 277.997, 278.733] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.202 min=14.150 max=16.371
   samples_ms=[14.202, 16.371, 14.150] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=419.852 min=278.664 max=436.757
   samples_ms=[436.757, 419.852, 278.664] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=19.172 min=17.639 max=20.969
   samples_ms=[19.172, 20.969, 17.639] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=586.333 min=583.732 max=600.775
   samples_ms=[583.732, 586.333, 600.775] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 2.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2      8%         4     54.94
  findAllMaps                  0.2      6%         4     41.10
  speciesDedup                 0.0      1%         9      4.21
  matchComponents              0.0      0%         5      1.17
  canonicalize                 0.0      0%         5      0.81
  (instrumented sections account for 16% of gen wall; 528.1 µs/species, 660.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.3     16%         2    141.49
  findAllMaps                  0.2     12%         5     42.74
  speciesDedup                 0.1      3%         6     10.00
  canonicalize                 0.0      0%         3      1.48
  matchComponents              0.0      0%         6      0.58
  (instrumented sections account for 32% of gen wall; 587.4 µs/species, 881.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.5     24%        64     38.97
  matchComponents              0.8      7%        72     10.59
  applyTransformation          0.7      6%        64     10.37
  speciesDedup                 0.5      5%        65      8.29
  canonicalize                 0.1      1%        16      5.27
  (instrumented sections account for 44% of gen wall; 647.4 µs/species, 161.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 19.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  4.0     20%       160     24.70
  applyTransformation          1.5      8%       160      9.37
  speciesDedup                 1.0      5%       161      6.23
  matchComponents              0.6      3%       176      3.38
  canonicalize                 0.2      1%        32      5.87
  (instrumented sections account for 38% of gen wall; 602.8 µs/species, 120.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 91.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 34.2     37%       896     38.14
  matchComponents             14.3     16%       960     14.85
  speciesDedup                 6.1      7%       897      6.80
  applyTransformation          6.1      7%       896      6.77
  canonicalize                 0.9      1%       128      6.86
  (instrumented sections account for 67% of gen wall; 714.5 µs/species, 102.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1295.4  89%
   gen           125.5  9%
   parse          34.8  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                41.0  33% of gen
   matchComponents            15.6  12% of gen
   applyTransformation         8.7  7% of gen
   speciesDedup                7.7  6% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (1295.4 ms).
 >>> Biggest generation sink: findAllMaps (33% of generation).
==============================================================================
