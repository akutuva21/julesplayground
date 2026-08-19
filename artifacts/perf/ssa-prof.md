
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 runtime: v22.22.1   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.1       2.7        -        1.6      0.3
binding_AB (bimolecular)                        3       2      4.8       1.7        -        9.9      0.2
multisite_4 (2^4 species, combinatorial)       16      64      8.7      10.5        -      264.8      3.2
multisite_5 (2^5 species, combinatorial)       32     160      6.5      20.2        -      403.3      7.3
multisite_7 (2^7 species, combinatorial)      128     896      6.3      69.1        -      577.7     10.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.445 min=1.692 max=3.662
   samples_ms=[1.692, 2.445, 3.662] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.558 min=1.505 max=1.836
   samples_ms=[1.836, 1.505, 1.558] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.090 min=1.082 max=1.334
   samples_ms=[1.334, 1.082, 1.090] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=9.921 min=9.352 max=11.225
   samples_ms=[9.352, 9.921, 11.225] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=7.795 min=7.377 max=9.134
   samples_ms=[7.795, 7.377, 9.134] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=264.835 min=260.160 max=268.488
   samples_ms=[264.835, 268.488, 260.160] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.208 min=14.205 max=16.648
   samples_ms=[14.205, 14.208, 16.648] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=403.265 min=275.501 max=408.474
   samples_ms=[403.265, 408.474, 275.501] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=19.235 min=17.514 max=19.392
   samples_ms=[19.235, 17.514, 19.392] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=577.664 min=573.873 max=583.281
   samples_ms=[577.664, 573.873, 583.281] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 2.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2      9%         4     60.65
  findAllMaps                  0.2      6%         4     42.20
  speciesDedup                 0.0      1%         9      4.17
  matchComponents              0.0      0%         5      1.29
  canonicalize                 0.0      0%         5      0.89
  (instrumented sections account for 17% of gen wall; 544.7 µs/species, 680.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     67.63
  findAllMaps                  0.1      6%         5     20.92
  speciesDedup                 0.0      2%         6      4.81
  canonicalize                 0.0      0%         3      1.35
  matchComponents              0.0      0%         6      0.51
  (instrumented sections account for 16% of gen wall; 557.9 µs/species, 836.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.8     26%        64     43.37
  applyTransformation          0.9      9%        64     14.12
  matchComponents              0.8      7%        72     10.80
  speciesDedup                 0.6      5%        65      8.53
  canonicalize                 0.1      1%        16      5.83
  (instrumented sections account for 48% of gen wall; 659.2 µs/species, 164.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 20.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.6     18%       160     22.79
  applyTransformation          1.3      7%       160      8.42
  speciesDedup                 1.1      6%       161      6.95
  matchComponents              0.6      3%       176      3.19
  canonicalize                 0.3      2%        32     10.29
  (instrumented sections account for 35% of gen wall; 631.3 µs/species, 126.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 69.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 17.8     26%       896     19.83
  applyTransformation          7.0     10%       896      7.81
  matchComponents              5.9      9%       960      6.15
  speciesDedup                 5.5      8%       897      6.18
  canonicalize                 1.0      1%       128      7.58
  (instrumented sections account for 54% of gen wall; 539.9 µs/species, 77.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1257.2  90%
   gen           104.3  7%
   parse          34.4  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                24.5  23% of gen
   applyTransformation         9.6  9% of gen
   speciesDedup                7.3  7% of gen
   matchComponents             7.2  7% of gen
   canonicalize                1.4  1% of gen

 >>> Biggest phase overall: ssa (1257.2 ms).
 >>> Biggest generation sink: findAllMaps (23% of generation).
==============================================================================
