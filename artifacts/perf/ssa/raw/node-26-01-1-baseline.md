
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.4       3.1        -        1.5      0.5
binding_AB (bimolecular)                        3       2      4.8       1.5        -       23.5     -0.1
multisite_4 (2^4 species, combinatorial)       16      64      9.0      16.6        -      156.9      3.4
multisite_5 (2^5 species, combinatorial)       32     160      6.5      14.3        -      340.3      8.8
multisite_7 (2^7 species, combinatorial)      128     896      7.1      61.2        -      632.4     -9.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.748 min=1.748 max=1.748
   samples_ms=[1.748] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.475 min=1.475 max=1.475
   samples_ms=[1.475] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.409 min=1.409 max=1.409
   samples_ms=[1.409] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=23.474 min=23.474 max=23.474
   samples_ms=[23.474] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=3.875 min=3.875 max=3.875
   samples_ms=[3.875] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=156.928 min=156.928 max=156.928
   samples_ms=[156.928] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.905 min=16.905 max=16.905
   samples_ms=[16.905] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=340.342 min=340.342 max=340.342
   samples_ms=[340.342] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.084 min=15.084 max=15.084
   samples_ms=[15.084] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=632.440 min=632.440 max=632.440
   samples_ms=[632.440] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.5     16%         4    121.63
  applyTransformation          0.5     16%         4    120.10
  speciesDedup                 0.2      6%         9     20.97
  canonicalize                 0.0      0%         5      2.21
  matchComponents              0.0      0%         5      1.28
  (instrumented sections account for 38% of gen wall; 619.3 µs/species, 774.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     12%         2     85.28
  findAllMaps                  0.1      7%         5     20.07
  speciesDedup                 0.0      2%         6      4.44
  matchComponents              0.0      0%         6      1.07
  canonicalize                 0.0      0%         3      0.98
  (instrumented sections account for 21% of gen wall; 485.3 µs/species, 728.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 16.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.5     21%        64     54.10
  applyTransformation          1.2      7%        64     19.15
  speciesDedup                 0.8      5%        65     12.40
  matchComponents              0.7      4%        72      9.96
  canonicalize                 0.2      1%        16     13.72
  (instrumented sections account for 39% of gen wall; 1036.2 µs/species, 259.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 14.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.6     25%       160     22.63
  applyTransformation          1.3      9%       160      8.10
  speciesDedup                 1.1      7%       161      6.53
  matchComponents              0.8      6%       176      4.69
  canonicalize                 0.2      1%        32      6.08
  (instrumented sections account for 49% of gen wall; 445.3 µs/species, 89.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 61.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 18.4     30%       896     20.50
  matchComponents              5.0      8%       960      5.24
  speciesDedup                 4.5      7%       897      5.02
  applyTransformation          4.2      7%       896      4.73
  canonicalize                 0.7      1%       128      5.51
  (instrumented sections account for 54% of gen wall; 478.4 µs/species, 68.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1154.7  90%
   gen            96.6  8%
   parse          34.8  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                26.0  27% of gen
   applyTransformation         7.4  8% of gen
   matchComponents             6.6  7% of gen
   speciesDedup                6.6  7% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1154.7 ms).
 >>> Biggest generation sink: findAllMaps (27% of generation).
==============================================================================
