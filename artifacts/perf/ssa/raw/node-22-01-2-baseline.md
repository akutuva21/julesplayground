
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.7       4.0        -        2.2      0.5
binding_AB (bimolecular)                        3       2      6.3       1.8        -       11.0      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.2      14.6        -      268.5      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.5      34.7        -      287.5     -3.7
multisite_7 (2^7 species, combinatorial)      128     896     10.0     137.0        -      599.5      2.0

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.870 min=1.870 max=1.870
   samples_ms=[1.870] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.188 min=2.188 max=2.188
   samples_ms=[2.188] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=4.295 min=4.295 max=4.295
   samples_ms=[4.295] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.046 min=11.046 max=11.046
   samples_ms=[11.046] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.179 min=8.179 max=8.179
   samples_ms=[8.179] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=268.490 min=268.490 max=268.490
   samples_ms=[268.490] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=13.320 min=13.320 max=13.320
   samples_ms=[13.320] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=287.535 min=287.535 max=287.535
   samples_ms=[287.535] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=35.225 min=35.225 max=35.225
   samples_ms=[35.225] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=599.529 min=599.529 max=599.529
   samples_ms=[599.529] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     19%         4    185.42
  applyTransformation          0.3      8%         4     82.37
  speciesDedup                 0.1      2%         9     10.74
  canonicalize                 0.0      0%         5      3.36
  matchComponents              0.0      0%         5      1.51
  (instrumented sections account for 30% of gen wall; 794.3 µs/species, 992.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     60.64
  findAllMaps                  0.1      6%         5     22.18
  speciesDedup                 0.0      2%         6      5.84
  canonicalize                 0.0      1%         3      3.57
  matchComponents              0.0      0%         6      1.05
  (instrumented sections account for 16% of gen wall; 604.6 µs/species, 906.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.5     24%        64     54.38
  findAllMaps                  2.7     19%        64     42.20
  matchComponents              0.7      5%        72      9.64
  speciesDedup                 0.6      4%        65      8.66
  canonicalize                 0.1      1%        16      6.54
  (instrumented sections account for 52% of gen wall; 910.2 µs/species, 227.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 34.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.7     28%       160     60.66
  findAllMaps                  6.5     19%       160     40.64
  matchComponents              1.6      5%       176      9.02
  speciesDedup                 1.4      4%       161      8.73
  canonicalize                 0.2      1%        32      6.35
  (instrumented sections account for 56% of gen wall; 1083.3 µs/species, 216.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 137.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         51.3     37%       896     57.31
  findAllMaps                 27.8     20%       896     31.06
  matchComponents              6.4      5%       960      6.66
  speciesDedup                 6.4      5%       897      7.12
  canonicalize                 1.1      1%       128      8.74
  (instrumented sections account for 68% of gen wall; 1070.6 µs/species, 152.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1168.8  83%
   gen           192.1  14%
   parse          43.6  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        65.0  34% of gen
   findAllMaps                37.9  20% of gen
   matchComponents             8.7  5% of gen
   speciesDedup                8.5  4% of gen
   canonicalize                1.5  1% of gen

 >>> Biggest phase overall: ssa (1168.8 ms).
 >>> Biggest generation sink: applyTransformation (34% of generation).
==============================================================================
