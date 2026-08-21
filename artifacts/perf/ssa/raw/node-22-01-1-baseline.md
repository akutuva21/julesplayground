
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     12.9      13.3        -        5.0    -10.2
binding_AB (bimolecular)                        3       2      9.4       1.8        -       46.1      0.2
multisite_4 (2^4 species, combinatorial)       16      64     10.9      10.3        -      439.7      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.6      22.7        -      318.3     -7.2
multisite_7 (2^7 species, combinatorial)      128     896      9.4      74.7        -      575.9     11.6

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=4.340 min=4.340 max=4.340
   samples_ms=[4.340] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=4.963 min=4.963 max=4.963
   samples_ms=[4.963] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.786 min=3.786 max=3.786
   samples_ms=[3.786] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=46.113 min=46.113 max=46.113
   samples_ms=[46.113] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=11.412 min=11.412 max=11.412
   samples_ms=[11.412] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=439.726 min=439.726 max=439.726
   samples_ms=[439.726] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.296 min=16.296 max=16.296
   samples_ms=[16.296] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=318.321 min=318.321 max=318.321
   samples_ms=[318.321] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=34.877 min=34.877 max=34.877
   samples_ms=[34.877] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=575.892 min=575.892 max=575.892
   samples_ms=[575.892] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 13.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  1.0      7%         4    242.62
  speciesDedup                 0.4      3%         9     44.13
  applyTransformation          0.4      3%         4     90.50
  matchComponents              0.0      0%         5      1.62
  canonicalize                 0.0      0%         5      1.52
  (instrumented sections account for 13% of gen wall; 2653.6 µs/species, 3317.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      6%         2     50.63
  findAllMaps                  0.1      5%         5     16.85
  speciesDedup                 0.0      1%         6      3.72
  matchComponents              0.0      0%         6      1.16
  canonicalize                 0.0      0%         3      1.11
  (instrumented sections account for 12% of gen wall; 604.8 µs/species, 907.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.4     24%        64     38.20
  matchComponents              0.7      7%        72      9.63
  applyTransformation          0.7      7%        64     10.53
  speciesDedup                 0.5      5%        65      8.19
  canonicalize                 0.2      1%        16      9.54
  (instrumented sections account for 44% of gen wall; 641.9 µs/species, 160.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 22.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  7.0     31%       160     43.78
  matchComponents              2.8     12%       176     15.98
  applyTransformation          1.8      8%       160     11.24
  speciesDedup                 1.2      5%       161      7.35
  canonicalize                 0.2      1%        32      5.38
  (instrumented sections account for 57% of gen wall; 709.7 µs/species, 141.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 74.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 27.3     37%       896     30.49
  matchComponents              9.7     13%       960     10.14
  applyTransformation          7.2     10%       896      8.06
  speciesDedup                 5.1      7%       897      5.71
  canonicalize                 1.0      1%       128      8.17
  (instrumented sections account for 68% of gen wall; 583.5 µs/species, 83.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1385.0  89%
   gen           122.8  8%
   parse          52.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                37.8  31% of gen
   matchComponents            13.3  11% of gen
   applyTransformation        10.2  8% of gen
   speciesDedup                7.3  6% of gen
   canonicalize                1.4  1% of gen

 >>> Biggest phase overall: ssa (1385.0 ms).
 >>> Biggest generation sink: findAllMaps (31% of generation).
==============================================================================
