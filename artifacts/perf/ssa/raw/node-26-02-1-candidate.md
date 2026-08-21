
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.4       3.2        -        1.5      0.5
binding_AB (bimolecular)                        3       2      5.0       1.6        -       15.7     -0.0
multisite_4 (2^4 species, combinatorial)       16      64      8.8      13.8        -      171.2      3.6
multisite_5 (2^5 species, combinatorial)       32     160      6.5      14.8        -      288.5      8.8
multisite_7 (2^7 species, combinatorial)      128     896      7.2      57.9        -      831.3     19.3

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.954 min=1.954 max=1.954
   samples_ms=[1.954] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.485 min=1.485 max=1.485
   samples_ms=[1.485] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.372 min=1.372 max=1.372
   samples_ms=[1.372] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.731 min=15.731 max=15.731
   samples_ms=[15.731] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.028 min=4.028 max=4.028
   samples_ms=[4.028] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=171.222 min=171.222 max=171.222
   samples_ms=[171.222] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.335 min=16.335 max=16.335
   samples_ms=[16.335] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=288.507 min=288.507 max=288.507
   samples_ms=[288.507] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=30.041 min=30.041 max=30.041
   samples_ms=[30.041] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=831.299 min=831.299 max=831.299
   samples_ms=[831.299] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     16%         4    124.53
  findAllMaps                  0.4     13%         4     99.80
  speciesDedup                 0.1      4%         9     14.36
  canonicalize                 0.0      0%         5      1.40
  matchComponents              0.0      0%         5      1.27
  (instrumented sections account for 33% of gen wall; 632.6 µs/species, 790.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     11%         2     84.63
  findAllMaps                  0.1      7%         5     20.74
  speciesDedup                 0.0      1%         6      3.93
  matchComponents              0.0      0%         6      1.08
  canonicalize                 0.0      0%         3      1.06
  (instrumented sections account for 19% of gen wall; 529.9 µs/species, 794.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 13.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.0     22%        64     46.85
  applyTransformation          1.1      8%        64     17.20
  speciesDedup                 0.9      6%        65     13.73
  matchComponents              0.7      5%        72      9.60
  canonicalize                 0.3      2%        16     16.18
  (instrumented sections account for 43% of gen wall; 862.2 µs/species, 215.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 14.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.9     26%       160     24.50
  applyTransformation          1.4     10%       160      8.93
  speciesDedup                 1.0      7%       161      6.19
  matchComponents              0.8      5%       176      4.35
  canonicalize                 0.1      1%        32      4.63
  (instrumented sections account for 49% of gen wall; 462.7 µs/species, 92.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 57.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.4     27%       896     17.20
  matchComponents              5.2      9%       960      5.41
  speciesDedup                 4.6      8%       897      5.14
  applyTransformation          4.5      8%       896      5.01
  canonicalize                 0.7      1%       128      5.72
  (instrumented sections account for 53% of gen wall; 452.3 µs/species, 64.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1308.2  91%
   gen            91.3  6%
   parse          35.9  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                22.8  25% of gen
   applyTransformation         7.7  8% of gen
   matchComponents             6.7  7% of gen
   speciesDedup                6.7  7% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1308.2 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
