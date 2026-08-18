
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     20.9       6.9        -        4.5      0.5
binding_AB (bimolecular)                        3       2     11.0       4.4        -       34.0     -0.0
multisite_4 (2^4 species, combinatorial)       16      64     18.7      49.3        -      258.5      4.7
multisite_5 (2^5 species, combinatorial)       32     160     15.0      45.5        -      341.5     11.6
multisite_7 (2^7 species, combinatorial)      128     896      7.2      88.7        -      586.4     10.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=5.594 min=5.594 max=5.594
   samples_ms=[5.594] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=4.478 min=4.478 max=4.478
   samples_ms=[4.478] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=4.031 min=4.031 max=4.031
   samples_ms=[4.031] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=33.958 min=33.958 max=33.958
   samples_ms=[33.958] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=9.984 min=9.984 max=9.984
   samples_ms=[9.984] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=258.458 min=258.458 max=258.458
   samples_ms=[258.458] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=29.071 min=29.071 max=29.071
   samples_ms=[29.071] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=341.527 min=341.527 max=341.527
   samples_ms=[341.527] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=19.418 min=19.418 max=19.418
   samples_ms=[19.418] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=586.401 min=586.401 max=586.401
   samples_ms=[586.401] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 6.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  1.1     16%         4    282.45
  applyTransformation          0.8     12%         4    209.10
  speciesDedup                 0.3      5%         9     35.49
  canonicalize                 0.1      1%         5     12.07
  matchComponents              0.0      0%         5      2.60
  (instrumented sections account for 34% of gen wall; 1378.5 µs/species, 1723.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 4.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.4      9%         5     79.77
  applyTransformation          0.3      8%         2    172.66
  speciesDedup                 0.1      3%         6     22.27
  canonicalize                 0.0      1%         3     16.39
  matchComponents              0.0      1%         6      5.03
  (instrumented sections account for 22% of gen wall; 1452.2 µs/species, 2178.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 49.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         13.0     26%        64    202.76
  findAllMaps                  8.5     17%        64    132.57
  speciesDedup                 2.3      5%        65     35.02
  matchComponents              1.8      4%        72     25.44
  canonicalize                 0.6      1%        16     34.40
  (instrumented sections account for 53% of gen wall; 3081.1 µs/species, 770.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 45.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         14.7     32%       160     91.71
  findAllMaps                  8.9     19%       160     55.41
  speciesDedup                 2.4      5%       161     14.60
  matchComponents              1.5      3%       176      8.73
  canonicalize                 0.6      1%        32     17.58
  (instrumented sections account for 62% of gen wall; 1421.4 µs/species, 284.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 88.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 25.8     29%       896     28.78
  applyTransformation         22.2     25%       896     24.83
  matchComponents              5.6      6%       960      5.79
  speciesDedup                 5.2      6%       897      5.80
  canonicalize                 0.7      1%       128      5.46
  (instrumented sections account for 67% of gen wall; 692.7 µs/species, 99.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1224.8  82%
   gen           194.7  13%
   parse          72.7  5%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        51.1  26% of gen
   findAllMaps                44.7  23% of gen
   speciesDedup               10.3  5% of gen
   matchComponents             9.0  5% of gen
   canonicalize                1.9  1% of gen

 >>> Biggest phase overall: ssa (1224.8 ms).
 >>> Biggest generation sink: applyTransformation (26% of generation).
==============================================================================
