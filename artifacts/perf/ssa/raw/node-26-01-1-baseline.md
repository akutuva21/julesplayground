
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.8       3.6        -        1.8      0.5
binding_AB (bimolecular)                        3       2      5.2       1.8        -       21.8      0.3
multisite_4 (2^4 species, combinatorial)       16      64      9.4      20.4        -      166.8      5.0
multisite_5 (2^5 species, combinatorial)       32     160      6.2      19.8        -      302.8    -20.0
multisite_7 (2^7 species, combinatorial)      128     896      7.4      87.5        -      610.6     10.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.289 min=2.289 max=2.289
   samples_ms=[2.289] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.756 min=1.756 max=1.756
   samples_ms=[1.756] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.716 min=1.716 max=1.716
   samples_ms=[1.716] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=21.751 min=21.751 max=21.751
   samples_ms=[21.751] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.474 min=4.474 max=4.474
   samples_ms=[4.474] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=166.788 min=166.788 max=166.788
   samples_ms=[166.788] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.790 min=14.790 max=14.790
   samples_ms=[14.790] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=302.753 min=302.753 max=302.753
   samples_ms=[302.753] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=33.665 min=33.665 max=33.665
   samples_ms=[33.665] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=610.598 min=610.598 max=610.598
   samples_ms=[610.598] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     16%         4    145.33
  findAllMaps                  0.5     13%         4    114.49
  speciesDedup                 0.2      5%         9     20.00
  canonicalize                 0.0      1%         5      6.98
  matchComponents              0.0      0%         5      1.25
  (instrumented sections account for 35% of gen wall; 713.5 µs/species, 891.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     10%         2     88.93
  findAllMaps                  0.1      7%         5     24.27
  speciesDedup                 0.0      2%         6      6.54
  canonicalize                 0.0      1%         3      4.52
  matchComponents              0.0      0%         6      1.01
  (instrumented sections account for 20% of gen wall; 604.0 µs/species, 905.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 20.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.4     27%        64     84.81
  findAllMaps                  3.3     16%        64     51.93
  speciesDedup                 1.0      5%        65     15.89
  matchComponents              0.8      4%        72     11.01
  canonicalize                 0.2      1%        16     13.02
  (instrumented sections account for 53% of gen wall; 1277.2 µs/species, 319.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 19.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          4.3     22%       160     26.83
  findAllMaps                  3.9     20%       160     24.65
  speciesDedup                 0.9      5%       161      5.75
  matchComponents              0.9      4%       176      4.86
  canonicalize                 0.2      1%        32      5.78
  (instrumented sections account for 51% of gen wall; 620.2 µs/species, 124.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 87.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         22.6     26%       896     25.18
  findAllMaps                 20.7     24%       896     23.12
  matchComponents              6.0      7%       960      6.27
  speciesDedup                 5.0      6%       897      5.60
  canonicalize                 0.7      1%       128      5.36
  (instrumented sections account for 63% of gen wall; 683.5 µs/species, 97.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1103.6  87%
   gen           133.1  10%
   parse          37.1  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        33.0  25% of gen
   findAllMaps                28.6  21% of gen
   matchComponents             7.7  6% of gen
   speciesDedup                7.2  5% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1103.6 ms).
 >>> Biggest generation sink: applyTransformation (25% of generation).
==============================================================================
