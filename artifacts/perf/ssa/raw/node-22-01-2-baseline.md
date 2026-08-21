
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.2       8.8        -        1.8     -9.8
binding_AB (bimolecular)                        3       2      6.6       1.8        -       15.4      0.2
multisite_4 (2^4 species, combinatorial)       16      64     10.9      10.5        -      271.4      3.2
multisite_5 (2^5 species, combinatorial)       32     160     10.2      23.3        -      286.6      8.0
multisite_7 (2^7 species, combinatorial)      128     896     10.4      80.2        -      587.7     -2.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.820 min=1.820 max=1.820
   samples_ms=[1.820] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.773 min=1.773 max=1.773
   samples_ms=[1.773] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.272 min=1.272 max=1.272
   samples_ms=[1.272] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.357 min=15.357 max=15.357
   samples_ms=[15.357] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.038 min=8.038 max=8.038
   samples_ms=[8.038] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=271.361 min=271.361 max=271.361
   samples_ms=[271.361] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.657 min=14.657 max=14.657
   samples_ms=[14.657] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=286.557 min=286.557 max=286.557
   samples_ms=[286.557] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=36.411 min=36.411 max=36.411
   samples_ms=[36.411] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=587.694 min=587.694 max=587.694
   samples_ms=[587.694] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 8.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8      9%         4    194.41
  applyTransformation          0.4      5%         4    106.17
  speciesDedup                 0.2      2%         9     23.75
  matchComponents              0.0      0%         5      5.11
  canonicalize                 0.0      0%         5      1.27
  (instrumented sections account for 16% of gen wall; 1761.4 µs/species, 2201.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     68.02
  findAllMaps                  0.1      7%         5     23.09
  speciesDedup                 0.0      2%         6      4.74
  matchComponents              0.0      0%         6      1.21
  canonicalize                 0.0      0%         3      1.00
  (instrumented sections account for 16% of gen wall; 588.6 µs/species, 882.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.3     22%        64     36.35
  applyTransformation          0.7      7%        64     11.45
  matchComponents              0.7      6%        72      9.09
  speciesDedup                 0.6      6%        65      9.10
  canonicalize                 0.2      2%        16     11.62
  (instrumented sections account for 43% of gen wall; 655.8 µs/species, 163.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 23.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.4     27%       160     39.83
  applyTransformation          1.8      8%       160     11.17
  matchComponents              1.8      8%       176     10.12
  speciesDedup                 1.3      6%       161      8.37
  canonicalize                 0.2      1%        32      6.25
  (instrumented sections account for 49% of gen wall; 728.9 µs/species, 145.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 80.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 22.1     28%       896     24.71
  matchComponents              8.6     11%       960      8.95
  applyTransformation          7.6     10%       896      8.53
  speciesDedup                 5.6      7%       897      6.26
  canonicalize                 1.3      2%       128     10.01
  (instrumented sections account for 56% of gen wall; 626.8 µs/species, 89.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1162.7  87%
   gen           124.6  9%
   parse          46.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                31.7  25% of gen
   matchComponents            11.1  9% of gen
   applyTransformation        10.7  9% of gen
   speciesDedup                7.8  6% of gen
   canonicalize                1.7  1% of gen

 >>> Biggest phase overall: ssa (1162.7 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
