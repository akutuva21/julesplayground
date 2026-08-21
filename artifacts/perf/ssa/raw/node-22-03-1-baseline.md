
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.3       7.3        -        1.8    -10.0
binding_AB (bimolecular)                        3       2      6.5       1.8        -       15.0      0.2
multisite_4 (2^4 species, combinatorial)       16      64     13.3      10.5        -      262.0      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.0      22.5        -      274.6      8.1
multisite_7 (2^7 species, combinatorial)      128     896      9.6      75.3        -      573.5     -1.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.626 min=1.626 max=1.626
   samples_ms=[1.626] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.798 min=1.798 max=1.798
   samples_ms=[1.798] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.350 min=1.350 max=1.350
   samples_ms=[1.350] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.039 min=15.039 max=15.039
   samples_ms=[15.039] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=7.965 min=7.965 max=7.965
   samples_ms=[7.965] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=261.952 min=261.952 max=261.952
   samples_ms=[261.952] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.189 min=14.189 max=14.189
   samples_ms=[14.189] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=274.618 min=274.618 max=274.618
   samples_ms=[274.618] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=31.845 min=31.845 max=31.845
   samples_ms=[31.845] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=573.485 min=573.485 max=573.485
   samples_ms=[573.485] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 7.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     11%         4    206.80
  applyTransformation          0.5      6%         4    114.34
  speciesDedup                 0.2      3%         9     23.18
  matchComponents              0.0      0%         5      1.43
  canonicalize                 0.0      0%         5      1.33
  (instrumented sections account for 21% of gen wall; 1464.0 µs/species, 1830.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     68.87
  findAllMaps                  0.1      6%         5     22.82
  speciesDedup                 0.0      2%         6      4.54
  matchComponents              0.0      0%         6      1.19
  canonicalize                 0.0      0%         3      1.36
  (instrumented sections account for 16% of gen wall; 602.2 µs/species, 903.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.4     23%        64     38.07
  applyTransformation          0.7      7%        64     11.69
  matchComponents              0.7      6%        72      9.43
  speciesDedup                 0.6      6%        65      9.57
  canonicalize                 0.2      2%        16      9.98
  (instrumented sections account for 44% of gen wall; 658.2 µs/species, 164.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 22.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.7     25%       160     35.47
  applyTransformation          2.0      9%       160     12.27
  matchComponents              1.5      7%       176      8.44
  speciesDedup                 1.2      6%       161      7.70
  canonicalize                 0.2      1%        32      5.67
  (instrumented sections account for 47% of gen wall; 701.7 µs/species, 140.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 75.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 21.1     28%       896     23.51
  matchComponents              8.0     11%       960      8.36
  applyTransformation          7.1      9%       896      7.96
  speciesDedup                 5.3      7%       897      5.86
  canonicalize                 1.1      1%       128      8.36
  (instrumented sections account for 56% of gen wall; 588.6 µs/species, 84.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1126.9  87%
   gen           117.5  9%
   parse          46.6  4%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                30.1  26% of gen
   applyTransformation        10.4  9% of gen
   matchComponents            10.2  9% of gen
   speciesDedup                7.4  6% of gen
   canonicalize                1.4  1% of gen

 >>> Biggest phase overall: ssa (1126.9 ms).
 >>> Biggest generation sink: findAllMaps (26% of generation).
==============================================================================
