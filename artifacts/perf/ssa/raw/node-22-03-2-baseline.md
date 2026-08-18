
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.0       3.9        -        1.9      0.5
binding_AB (bimolecular)                        3       2      6.2       1.8        -       11.6      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.3      14.9        -      267.2      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.8      32.0        -      277.5     11.3
multisite_7 (2^7 species, combinatorial)      128     896     10.6     139.9        -      591.2      1.7

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.767 min=1.767 max=1.767
   samples_ms=[1.767] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.937 min=1.937 max=1.937
   samples_ms=[1.937] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.650 min=1.650 max=1.650
   samples_ms=[1.650] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.604 min=11.604 max=11.604
   samples_ms=[11.604] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.227 min=8.227 max=8.227
   samples_ms=[8.227] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=267.195 min=267.195 max=267.195
   samples_ms=[267.195] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=13.383 min=13.383 max=13.383
   samples_ms=[13.383] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=277.515 min=277.515 max=277.515
   samples_ms=[277.515] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=30.749 min=30.749 max=30.749
   samples_ms=[30.749] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=591.163 min=591.163 max=591.163
   samples_ms=[591.163] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     17%         4    164.30
  applyTransformation          0.3      9%         4     86.95
  speciesDedup                 0.1      3%         9     12.42
  canonicalize                 0.0      0%         5      3.66
  matchComponents              0.0      0%         5      1.30
  (instrumented sections account for 29% of gen wall; 787.6 µs/species, 984.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     11%         2    100.67
  findAllMaps                  0.1      6%         5     21.10
  speciesDedup                 0.0      2%         6      6.06
  canonicalize                 0.0      1%         3      3.37
  matchComponents              0.0      0%         6      1.18
  (instrumented sections account for 20% of gen wall; 612.8 µs/species, 919.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.5     24%        64     54.81
  findAllMaps                  2.8     19%        64     43.02
  matchComponents              0.7      4%        72      9.17
  speciesDedup                 0.6      4%        65      9.05
  canonicalize                 0.1      1%        16      6.71
  (instrumented sections account for 51% of gen wall; 928.2 µs/species, 232.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 32.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.2     29%       160     57.67
  findAllMaps                  6.5     20%       160     40.90
  matchComponents              1.8      6%       176     10.07
  speciesDedup                 1.4      4%       161      8.56
  canonicalize                 0.2      1%        32      6.04
  (instrumented sections account for 60% of gen wall; 1000.4 µs/species, 200.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 139.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         46.9     34%       896     52.34
  findAllMaps                 25.3     18%       896     28.19
  speciesDedup                 6.5      5%       897      7.28
  matchComponents              6.3      5%       960      6.57
  canonicalize                 1.1      1%       128      8.87
  (instrumented sections account for 62% of gen wall; 1092.8 µs/species, 156.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1149.4  83%
   gen           192.5  14%
   parse          44.9  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        60.2  31% of gen
   findAllMaps                35.3  18% of gen
   matchComponents             8.8  5% of gen
   speciesDedup                8.6  4% of gen
   canonicalize                1.5  1% of gen

 >>> Biggest phase overall: ssa (1149.4 ms).
 >>> Biggest generation sink: applyTransformation (31% of generation).
==============================================================================
