
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.2       3.3        -        1.5      0.5
binding_AB (bimolecular)                        3       2      5.7       1.6        -       25.9      0.2
multisite_4 (2^4 species, combinatorial)       16      64     10.2      16.4        -      179.5      3.5
multisite_5 (2^5 species, combinatorial)       32     160      6.8      14.8        -      339.5      8.8
multisite_7 (2^7 species, combinatorial)      128     896      7.4      60.6        -      625.6     19.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.996 min=1.996 max=1.996
   samples_ms=[1.996] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.524 min=1.524 max=1.524
   samples_ms=[1.524] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.339 min=1.339 max=1.339
   samples_ms=[1.339] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=25.895 min=25.895 max=25.895
   samples_ms=[25.895] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.598 min=4.598 max=4.598
   samples_ms=[4.598] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=179.496 min=179.496 max=179.496
   samples_ms=[179.496] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.703 min=15.703 max=15.703
   samples_ms=[15.703] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=339.472 min=339.472 max=339.472
   samples_ms=[339.472] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.275 min=15.275 max=15.275
   samples_ms=[15.275] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=625.554 min=625.554 max=625.554
   samples_ms=[625.554] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     16%         4    132.51
  findAllMaps                  0.5     15%         4    125.66
  speciesDedup                 0.1      4%         9     15.38
  matchComponents              0.0      0%         5      1.54
  canonicalize                 0.0      0%         5      1.52
  (instrumented sections account for 36% of gen wall; 662.5 µs/species, 828.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     10%         5     31.81
  applyTransformation          0.1      8%         2     63.45
  speciesDedup                 0.0      1%         6      4.05
  matchComponents              0.0      1%         6      1.58
  canonicalize                 0.0      0%         3      1.04
  (instrumented sections account for 20% of gen wall; 549.8 µs/species, 824.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 16.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  4.1     25%        64     64.71
  applyTransformation          1.2      7%        64     18.86
  matchComponents              0.8      5%        72     11.53
  speciesDedup                 0.8      5%        65     12.09
  canonicalize                 0.2      1%        16     13.87
  (instrumented sections account for 44% of gen wall; 1024.2 µs/species, 256.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 14.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.9     27%       160     24.59
  applyTransformation          1.5     10%       160      9.16
  speciesDedup                 0.9      6%       161      5.52
  matchComponents              0.7      5%       176      4.16
  canonicalize                 0.1      1%        32      4.51
  (instrumented sections account for 49% of gen wall; 461.4 µs/species, 92.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 60.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.7     26%       896     17.54
  matchComponents              5.3      9%       960      5.51
  speciesDedup                 4.6      8%       897      5.14
  applyTransformation          4.3      7%       896      4.79
  canonicalize                 0.7      1%       128      5.57
  (instrumented sections account for 51% of gen wall; 473.4 µs/species, 67.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1171.9  90%
   gen            96.7  7%
   parse          38.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                24.5  25% of gen
   applyTransformation         7.6  8% of gen
   matchComponents             6.9  7% of gen
   speciesDedup                6.4  7% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1171.9 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
