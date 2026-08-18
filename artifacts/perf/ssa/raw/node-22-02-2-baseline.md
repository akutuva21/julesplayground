
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.9       3.9        -        2.1      0.5
binding_AB (bimolecular)                        3       2      6.3       1.8        -       10.9      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.6      14.3        -      272.4      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.5      33.2        -      282.1     -3.7
multisite_7 (2^7 species, combinatorial)      128     896      9.5     164.3        -      586.3      5.3

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.846 min=1.846 max=1.846
   samples_ms=[1.846] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.117 min=2.117 max=2.117
   samples_ms=[2.117] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.291 min=1.291 max=1.291
   samples_ms=[1.291] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=10.861 min=10.861 max=10.861
   samples_ms=[10.861] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.095 min=8.095 max=8.095
   samples_ms=[8.095] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=272.415 min=272.415 max=272.415
   samples_ms=[272.415] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=13.486 min=13.486 max=13.486
   samples_ms=[13.486] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=282.127 min=282.127 max=282.127
   samples_ms=[282.127] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=34.302 min=34.302 max=34.302
   samples_ms=[34.302] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=586.325 min=586.325 max=586.325
   samples_ms=[586.325] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     18%         4    176.03
  applyTransformation          0.4     10%         4     99.40
  speciesDedup                 0.2      4%         9     19.15
  canonicalize                 0.1      2%         5     14.31
  matchComponents              0.0      0%         5      1.33
  (instrumented sections account for 35% of gen wall; 782.5 µs/species, 978.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     59.64
  findAllMaps                  0.1      6%         5     20.50
  speciesDedup                 0.0      2%         6      6.50
  canonicalize                 0.0      1%         3      3.94
  matchComponents              0.0      0%         6      1.09
  (instrumented sections account for 16% of gen wall; 587.8 µs/species, 881.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.5     24%        64     54.31
  findAllMaps                  2.6     18%        64     40.98
  matchComponents              0.7      5%        72      9.76
  speciesDedup                 0.6      5%        65      9.88
  canonicalize                 0.1      1%        16      7.08
  (instrumented sections account for 53% of gen wall; 891.0 µs/species, 222.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 33.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.4     28%       160     58.51
  findAllMaps                  6.3     19%       160     39.68
  matchComponents              1.6      5%       176      9.34
  speciesDedup                 1.3      4%       161      8.37
  canonicalize                 0.2      1%        32      6.44
  (instrumented sections account for 57% of gen wall; 1038.0 µs/species, 207.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 164.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         66.9     41%       896     74.69
  findAllMaps                 34.0     21%       896     37.92
  matchComponents              8.3      5%       960      8.69
  speciesDedup                 6.8      4%       897      7.64
  canonicalize                 1.2      1%       128      9.71
  (instrumented sections account for 71% of gen wall; 1283.3 µs/species, 183.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1153.8  82%
   gen           217.4  15%
   parse          43.8  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        80.3  37% of gen
   findAllMaps                43.8  20% of gen
   matchComponents            10.7  5% of gen
   speciesDedup                9.0  4% of gen
   canonicalize                1.6  1% of gen

 >>> Biggest phase overall: ssa (1153.8 ms).
 >>> Biggest generation sink: applyTransformation (37% of generation).
==============================================================================
