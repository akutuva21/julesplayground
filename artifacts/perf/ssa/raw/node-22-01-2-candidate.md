
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.8       7.7        -        1.7     -9.9
binding_AB (bimolecular)                        3       2      5.9       1.6        -       14.0      0.2
multisite_4 (2^4 species, combinatorial)       16      64      9.9       9.9        -      275.0      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.3      22.6        -      281.3     -7.1
multisite_7 (2^7 species, combinatorial)      128     896      9.4      79.6        -      580.9     -2.0

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.601 min=1.601 max=1.601
   samples_ms=[1.601] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.741 min=1.741 max=1.741
   samples_ms=[1.741] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.286 min=1.286 max=1.286
   samples_ms=[1.286] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=13.970 min=13.970 max=13.970
   samples_ms=[13.970] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=9.806 min=9.806 max=9.806
   samples_ms=[9.806] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=274.958 min=274.958 max=274.958
   samples_ms=[274.958] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.560 min=16.560 max=16.560
   samples_ms=[16.560] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=281.278 min=281.278 max=281.278
   samples_ms=[281.278] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=18.827 min=18.827 max=18.827
   samples_ms=[18.827] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=580.870 min=580.870 max=580.870
   samples_ms=[580.870] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 7.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     11%         4    206.37
  applyTransformation          0.4      6%         4    107.14
  speciesDedup                 0.2      3%         9     23.42
  matchComponents              0.0      0%         5      1.41
  canonicalize                 0.0      0%         5      1.21
  (instrumented sections account for 19% of gen wall; 1531.7 µs/species, 1914.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     56.67
  findAllMaps                  0.1      6%         5     20.76
  speciesDedup                 0.0      1%         6      3.84
  matchComponents              0.0      0%         6      1.15
  canonicalize                 0.0      0%         3      1.12
  (instrumented sections account for 15% of gen wall; 546.7 µs/species, 820.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 9.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.4     24%        64     36.97
  matchComponents              0.7      7%        72      9.71
  applyTransformation          0.7      7%        64     10.27
  speciesDedup                 0.6      6%        65      8.98
  canonicalize                 0.2      2%        16     11.48
  (instrumented sections account for 45% of gen wall; 620.4 µs/species, 155.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 22.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  7.0     31%       160     43.86
  applyTransformation          1.8      8%       160     10.98
  matchComponents              1.4      6%       176      8.10
  speciesDedup                 1.2      5%       161      7.71
  canonicalize                 0.2      1%        32      5.86
  (instrumented sections account for 51% of gen wall; 706.9 µs/species, 141.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 79.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 24.5     31%       896     27.37
  matchComponents              9.5     12%       960      9.88
  applyTransformation          6.9      9%       896      7.74
  speciesDedup                 5.4      7%       897      6.03
  canonicalize                 1.0      1%       128      8.09
  (instrumented sections account for 60% of gen wall; 621.6 µs/species, 88.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1152.8  88%
   gen           121.4  9%
   parse          42.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                34.8  29% of gen
   matchComponents            11.6  10% of gen
   applyTransformation         9.9  8% of gen
   speciesDedup                7.5  6% of gen
   canonicalize                1.4  1% of gen

 >>> Biggest phase overall: ssa (1152.8 ms).
 >>> Biggest generation sink: findAllMaps (29% of generation).
==============================================================================
