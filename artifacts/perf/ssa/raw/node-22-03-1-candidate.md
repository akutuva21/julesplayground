
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.4       9.6        -        1.8    -10.1
binding_AB (bimolecular)                        3       2      7.0       1.7        -       15.3      0.2
multisite_4 (2^4 species, combinatorial)       16      64     10.8      10.1        -      133.5      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.7      21.9        -      277.3      8.0
multisite_7 (2^7 species, combinatorial)      128     896      9.7      76.7        -      570.2     -1.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.708 min=1.708 max=1.708
   samples_ms=[1.708] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.836 min=1.836 max=1.836
   samples_ms=[1.836] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.422 min=1.422 max=1.422
   samples_ms=[1.422] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.337 min=15.337 max=15.337
   samples_ms=[15.337] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=9.999 min=9.999 max=9.999
   samples_ms=[9.999] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=133.540 min=133.540 max=133.540
   samples_ms=[133.540] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.730 min=14.730 max=14.730
   samples_ms=[14.730] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=277.320 min=277.320 max=277.320
   samples_ms=[277.320] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=19.051 min=19.051 max=19.051
   samples_ms=[19.051] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=570.217 min=570.217 max=570.217
   samples_ms=[570.217] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 9.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.9      9%         4    223.28
  applyTransformation          0.4      4%         4    107.61
  speciesDedup                 0.3      3%         9     29.50
  matchComponents              0.0      0%         5      1.51
  canonicalize                 0.0      0%         5      1.38
  (instrumented sections account for 17% of gen wall; 1923.9 µs/species, 2404.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1      7%         5     22.92
  applyTransformation          0.1      6%         2     52.46
  speciesDedup                 0.0      2%         6      4.62
  matchComponents              0.0      0%         6      1.10
  canonicalize                 0.0      0%         3      1.47
  (instrumented sections account for 15% of gen wall; 557.4 µs/species, 836.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.5     24%        64     38.28
  applyTransformation          0.7      7%        64     10.70
  speciesDedup                 0.7      7%        65     10.39
  matchComponents              0.6      6%        72      8.75
  canonicalize                 0.2      2%        16     14.23
  (instrumented sections account for 46% of gen wall; 632.5 µs/species, 158.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 21.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.9     27%       160     36.94
  applyTransformation          1.8      8%       160     11.28
  matchComponents              1.5      7%       176      8.34
  speciesDedup                 1.3      6%       161      8.12
  canonicalize                 0.2      1%        32      5.48
  (instrumented sections account for 49% of gen wall; 684.3 µs/species, 136.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 76.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 18.1     24%       896     20.20
  applyTransformation         10.4     14%       896     11.61
  matchComponents              5.4      7%       960      5.67
  speciesDedup                 5.2      7%       897      5.82
  canonicalize                 1.1      1%       128      8.88
  (instrumented sections account for 53% of gen wall; 599.0 µs/species, 85.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           998.3  86%
   gen           120.0  10%
   parse          45.6  4%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                27.5  23% of gen
   applyTransformation        13.4  11% of gen
   matchComponents             7.6  6% of gen
   speciesDedup                7.5  6% of gen
   canonicalize                1.6  1% of gen

 >>> Biggest phase overall: ssa (998.3 ms).
 >>> Biggest generation sink: findAllMaps (23% of generation).
==============================================================================
