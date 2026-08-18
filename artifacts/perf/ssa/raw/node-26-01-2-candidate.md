
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.3       3.5        -        1.8      0.5
binding_AB (bimolecular)                        3       2      5.2       1.7        -       22.5      0.0
multisite_4 (2^4 species, combinatorial)       16      64      9.0      19.4        -      171.1      4.9
multisite_5 (2^5 species, combinatorial)       32     160      6.4      20.1        -      330.7    -20.0
multisite_7 (2^7 species, combinatorial)      128     896      7.2      87.4        -      639.7     10.6

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.247 min=2.247 max=2.247
   samples_ms=[2.247] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.762 min=1.762 max=1.762
   samples_ms=[1.762] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.780 min=1.780 max=1.780
   samples_ms=[1.780] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=22.481 min=22.481 max=22.481
   samples_ms=[22.481] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.336 min=4.336 max=4.336
   samples_ms=[4.336] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=171.132 min=171.132 max=171.132
   samples_ms=[171.132] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.449 min=14.449 max=14.449
   samples_ms=[14.449] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=330.679 min=330.679 max=330.679
   samples_ms=[330.679] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.900 min=15.900 max=15.900
   samples_ms=[15.900] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=639.678 min=639.678 max=639.678
   samples_ms=[639.678] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.6     16%         4    144.57
  applyTransformation          0.5     14%         4    127.25
  speciesDedup                 0.2      4%         9     17.38
  canonicalize                 0.0      1%         5      4.05
  matchComponents              0.0      0%         5      1.44
  (instrumented sections account for 36% of gen wall; 702.2 µs/species, 877.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     61.15
  findAllMaps                  0.1      6%         5     21.34
  speciesDedup                 0.0      2%         6      6.97
  canonicalize                 0.0      1%         3      3.40
  matchComponents              0.0      1%         6      1.53
  (instrumented sections account for 17% of gen wall; 581.8 µs/species, 872.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 19.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.1     26%        64     80.18
  findAllMaps                  3.3     17%        64     52.04
  speciesDedup                 0.8      4%        65     12.58
  matchComponents              0.8      4%        72     11.12
  canonicalize                 0.1      1%        16      9.15
  (instrumented sections account for 53% of gen wall; 1213.0 µs/species, 303.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 20.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          4.0     20%       160     24.84
  findAllMaps                  3.7     18%       160     22.87
  speciesDedup                 1.1      6%       161      7.12
  matchComponents              0.7      4%       176      4.13
  canonicalize                 0.2      1%        32      7.07
  (instrumented sections account for 49% of gen wall; 627.1 µs/species, 125.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 87.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 23.1     26%       896     25.75
  applyTransformation         22.3     26%       896     24.87
  matchComponents             11.3     13%       960     11.73
  speciesDedup                 4.9      6%       897      5.50
  canonicalize                 0.8      1%       128      5.91
  (instrumented sections account for 71% of gen wall; 682.5 µs/species, 97.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1165.7  87%
   gen           132.1  10%
   parse          36.0  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        32.0  24% of gen
   findAllMaps                30.7  23% of gen
   matchComponents            12.8  10% of gen
   speciesDedup                7.1  5% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (1165.7 ms).
 >>> Biggest generation sink: applyTransformation (24% of generation).
==============================================================================
