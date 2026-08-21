
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.3       7.7        -        1.7     -9.8
binding_AB (bimolecular)                        3       2      5.8       1.6        -       13.6      0.2
multisite_4 (2^4 species, combinatorial)       16      64      9.7       9.8        -      266.3      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.1      21.3        -      276.4      8.0
multisite_7 (2^7 species, combinatorial)      128     896      9.4      72.4        -      575.7     11.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.625 min=1.625 max=1.625
   samples_ms=[1.625] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.707 min=1.707 max=1.707
   samples_ms=[1.707] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.277 min=1.277 max=1.277
   samples_ms=[1.277] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=13.621 min=13.621 max=13.621
   samples_ms=[13.621] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=9.718 min=9.718 max=9.718
   samples_ms=[9.718] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=266.288 min=266.288 max=266.288
   samples_ms=[266.288] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.157 min=14.157 max=14.157
   samples_ms=[14.157] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=276.433 min=276.433 max=276.433
   samples_ms=[276.433] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=18.435 min=18.435 max=18.435
   samples_ms=[18.435] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=575.660 min=575.660 max=575.660
   samples_ms=[575.660] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 7.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.9     12%         4    224.16
  applyTransformation          0.4      5%         4    104.40
  speciesDedup                 0.2      3%         9     23.30
  matchComponents              0.0      0%         5      1.82
  canonicalize                 0.0      0%         5      1.46
  (instrumented sections account for 20% of gen wall; 1533.3 µs/species, 1916.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      9%         2     69.77
  findAllMaps                  0.1      6%         5     20.20
  speciesDedup                 0.0      1%         6      3.88
  matchComponents              0.0      0%         6      1.18
  canonicalize                 0.0      0%         3      0.96
  (instrumented sections account for 17% of gen wall; 531.1 µs/species, 796.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 9.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.4     24%        64     36.94
  matchComponents              0.7      7%        72      9.72
  applyTransformation          0.6      6%        64      9.83
  speciesDedup                 0.6      6%        65      8.88
  canonicalize                 0.1      1%        16      9.03
  (instrumented sections account for 45% of gen wall; 615.3 µs/species, 153.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 21.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.7     27%       160     35.32
  applyTransformation          1.9      9%       160     11.97
  matchComponents              1.6      8%       176      9.10
  speciesDedup                 1.2      6%       161      7.69
  canonicalize                 0.2      1%        32      5.70
  (instrumented sections account for 50% of gen wall; 665.5 µs/species, 133.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 72.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 17.6     24%       896     19.67
  speciesDedup                 8.7     12%       897      9.67
  applyTransformation          7.2     10%       896      8.01
  matchComponents              5.2      7%       960      5.44
  canonicalize                 1.3      2%       128     10.06
  (instrumented sections account for 55% of gen wall; 565.4 µs/species, 80.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1133.7  88%
   gen           112.8  9%
   parse          42.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                26.6  24% of gen
   speciesDedup               10.7  10% of gen
   applyTransformation        10.3  9% of gen
   matchComponents             7.5  7% of gen
   canonicalize                1.6  1% of gen

 >>> Biggest phase overall: ssa (1133.7 ms).
 >>> Biggest generation sink: findAllMaps (24% of generation).
==============================================================================
