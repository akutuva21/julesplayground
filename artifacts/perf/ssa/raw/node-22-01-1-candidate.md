
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     10.4      23.5        -        5.8     -9.9
binding_AB (bimolecular)                        3       2     12.8       3.7        -       42.2      0.3
multisite_4 (2^4 species, combinatorial)       16      64     11.2      16.6        -      128.9    -10.8
multisite_5 (2^5 species, combinatorial)       32     160      9.8      33.3        -      445.5     -3.8
multisite_7 (2^7 species, combinatorial)      128     896     14.0     158.2        -      562.2      5.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=5.507 min=5.507 max=5.507
   samples_ms=[5.507] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=5.757 min=5.757 max=5.757
   samples_ms=[5.757] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=4.583 min=4.583 max=4.583
   samples_ms=[4.583] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=42.210 min=42.210 max=42.210
   samples_ms=[42.210] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=10.348 min=10.348 max=10.348
   samples_ms=[10.348] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=128.934 min=128.934 max=128.934
   samples_ms=[128.934] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=19.099 min=19.099 max=19.099
   samples_ms=[19.099] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=445.526 min=445.526 max=445.526
   samples_ms=[445.526] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=32.806 min=32.806 max=32.806
   samples_ms=[32.806] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=562.167 min=562.167 max=562.167
   samples_ms=[562.167] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 23.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  1.5      7%         4    386.47
  applyTransformation          0.8      3%         4    199.70
  speciesDedup                 0.3      1%         9     30.18
  canonicalize                 0.1      1%         5     28.55
  matchComponents              0.0      0%         5      1.77
  (instrumented sections account for 12% of gen wall; 4698.4 µs/species, 5873.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 3.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.3      8%         5     56.90
  applyTransformation          0.1      3%         2     49.39
  speciesDedup                 0.1      2%         6     12.44
  canonicalize                 0.0      0%         3      5.43
  matchComponents              0.0      0%         6      1.38
  (instrumented sections account for 13% of gen wall; 1221.6 µs/species, 1832.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 16.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.4     20%        64     52.90
  findAllMaps                  2.6     16%        64     40.92
  matchComponents              0.8      5%        72     10.82
  speciesDedup                 0.6      4%        65      9.70
  canonicalize                 0.1      1%        16      7.07
  (instrumented sections account for 45% of gen wall; 1036.6 µs/species, 259.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 33.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         10.6     32%       160     66.52
  findAllMaps                  6.5     19%       160     40.51
  matchComponents              1.5      5%       176      8.76
  speciesDedup                 1.4      4%       161      8.45
  canonicalize                 0.2      1%        32      6.33
  (instrumented sections account for 61% of gen wall; 1040.4 µs/species, 208.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 158.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         57.2     36%       896     63.85
  findAllMaps                 30.8     19%       896     34.38
  speciesDedup                 9.9      6%       897     11.02
  matchComponents              8.8      6%       960      9.19
  canonicalize                 1.3      1%       128     10.46
  (instrumented sections account for 68% of gen wall; 1235.9 µs/species, 176.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1184.6  80%
   gen           235.2  16%
   parse          58.1  4%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        72.1  31% of gen
   findAllMaps                41.7  18% of gen
   speciesDedup               12.2  5% of gen
   matchComponents            11.2  5% of gen
   canonicalize                1.8  1% of gen

 >>> Biggest phase overall: ssa (1184.6 ms).
 >>> Biggest generation sink: applyTransformation (31% of generation).
==============================================================================
