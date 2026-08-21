
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.0       4.3        -        1.7      0.5
binding_AB (bimolecular)                        3       2      6.3       1.7        -       14.2      0.2
multisite_4 (2^4 species, combinatorial)       16      64      9.9      10.0        -      262.3      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.1      21.3        -      276.7      8.0
multisite_7 (2^7 species, combinatorial)      128     896      9.2      72.7        -      569.6     11.7

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.733 min=1.733 max=1.733
   samples_ms=[1.733] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.743 min=1.743 max=1.743
   samples_ms=[1.743] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.386 min=1.386 max=1.386
   samples_ms=[1.386] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=14.230 min=14.230 max=14.230
   samples_ms=[14.230] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=7.777 min=7.777 max=7.777
   samples_ms=[7.777] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=262.272 min=262.272 max=262.272
   samples_ms=[262.272] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.202 min=14.202 max=14.202
   samples_ms=[14.202] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=276.749 min=276.749 max=276.749
   samples_ms=[276.749] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=34.560 min=34.560 max=34.560
   samples_ms=[34.560] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=569.551 min=569.551 max=569.551
   samples_ms=[569.551] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     17%         4    180.17
  applyTransformation          0.4      9%         4     98.29
  speciesDedup                 0.3      7%         9     33.30
  canonicalize                 0.0      0%         5      1.59
  matchComponents              0.0      0%         5      1.36
  (instrumented sections account for 33% of gen wall; 862.0 µs/species, 1077.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     64.30
  findAllMaps                  0.1      6%         5     19.40
  speciesDedup                 0.0      1%         6      3.52
  matchComponents              0.0      0%         6      1.22
  canonicalize                 0.0      0%         3      1.23
  (instrumented sections account for 16% of gen wall; 550.7 µs/species, 826.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.4     24%        64     37.61
  applyTransformation          0.6      6%        64      9.92
  matchComponents              0.6      6%        72      8.61
  speciesDedup                 0.6      6%        65      8.67
  canonicalize                 0.1      1%        16      9.09
  (instrumented sections account for 44% of gen wall; 623.4 µs/species, 155.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 21.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.6     26%       160     35.15
  applyTransformation          1.8      8%       160     11.27
  matchComponents              1.5      7%       176      8.46
  speciesDedup                 1.2      6%       161      7.63
  canonicalize                 0.2      1%        32      7.00
  (instrumented sections account for 49% of gen wall; 666.6 µs/species, 133.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 72.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 21.3     29%       896     23.75
  matchComponents              8.6     12%       960      8.92
  applyTransformation          7.1     10%       896      7.95
  speciesDedup                 5.4      7%       897      5.98
  canonicalize                 1.1      2%       128      8.79
  (instrumented sections account for 60% of gen wall; 567.8 µs/species, 81.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1124.5  88%
   gen           109.9  9%
   parse          42.5  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                30.1  27% of gen
   matchComponents            10.7  10% of gen
   applyTransformation        10.1  9% of gen
   speciesDedup                7.5  7% of gen
   canonicalize                1.5  1% of gen

 >>> Biggest phase overall: ssa (1124.5 ms).
 >>> Biggest generation sink: findAllMaps (27% of generation).
==============================================================================
