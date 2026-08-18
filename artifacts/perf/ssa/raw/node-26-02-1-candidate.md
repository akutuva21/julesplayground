
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.1       3.4        -        1.9      0.5
binding_AB (bimolecular)                        3       2      4.8       1.7        -       21.8      0.3
multisite_4 (2^4 species, combinatorial)       16      64      8.8      19.5        -      165.3      4.9
multisite_5 (2^5 species, combinatorial)       32     160      6.1      18.6        -      315.6     11.3
multisite_7 (2^7 species, combinatorial)      128     896      7.2      90.2        -      895.7    -19.6

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.063 min=2.063 max=2.063
   samples_ms=[2.063] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.870 min=1.870 max=1.870
   samples_ms=[1.870] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.642 min=1.642 max=1.642
   samples_ms=[1.642] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=21.782 min=21.782 max=21.782
   samples_ms=[21.782] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=3.948 min=3.948 max=3.948
   samples_ms=[3.948] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=165.334 min=165.334 max=165.334
   samples_ms=[165.334] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=26.024 min=26.024 max=26.024
   samples_ms=[26.024] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=315.624 min=315.624 max=315.624
   samples_ms=[315.624] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.477 min=15.477 max=15.477
   samples_ms=[15.477] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=895.685 min=895.685 max=895.685
   samples_ms=[895.685] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.5     16%         4    132.88
  applyTransformation          0.5     15%         4    122.29
  speciesDedup                 0.2      5%         9     16.92
  canonicalize                 0.1      2%         5     11.39
  matchComponents              0.0      0%         5      1.34
  (instrumented sections account for 37% of gen wall; 671.7 µs/species, 839.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     10%         2     85.34
  findAllMaps                  0.1      6%         5     19.91
  speciesDedup                 0.0      3%         6      7.09
  canonicalize                 0.0      1%         3      4.68
  matchComponents              0.0      0%         6      1.03
  (instrumented sections account for 20% of gen wall; 560.9 µs/species, 841.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 19.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.3     27%        64     82.88
  findAllMaps                  3.3     17%        64     52.29
  matchComponents              0.8      4%        72     11.47
  speciesDedup                 0.8      4%        65     12.03
  canonicalize                 0.2      1%        16      9.49
  (instrumented sections account for 54% of gen wall; 1216.0 µs/species, 304.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 18.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  4.1     22%       160     25.54
  applyTransformation          3.9     21%       160     24.10
  speciesDedup                 1.2      7%       161      7.57
  matchComponents              0.8      4%       176      4.62
  canonicalize                 0.3      1%        32      8.50
  (instrumented sections account for 55% of gen wall; 582.1 µs/species, 116.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 90.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         23.4     26%       896     26.07
  findAllMaps                 20.6     23%       896     23.00
  matchComponents              5.9      7%       960      6.18
  speciesDedup                 5.3      6%       897      5.94
  canonicalize                 0.7      1%       128      5.77
  (instrumented sections account for 62% of gen wall; 704.5 µs/species, 100.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1400.3  89%
   gen           133.3  8%
   parse          35.0  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        33.2  25% of gen
   findAllMaps                28.7  22% of gen
   matchComponents             7.6  6% of gen
   speciesDedup                7.5  6% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (1400.3 ms).
 >>> Biggest generation sink: applyTransformation (25% of generation).
==============================================================================
