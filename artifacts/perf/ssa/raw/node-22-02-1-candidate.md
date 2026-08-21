
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.0       7.3        -        1.7     -9.8
binding_AB (bimolecular)                        3       2      6.0       1.6        -       14.5      0.2
multisite_4 (2^4 species, combinatorial)       16      64      9.8      10.1        -      276.5      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.2      22.8        -      278.7     -7.0
multisite_7 (2^7 species, combinatorial)      128     896      9.6      74.7        -      583.9     -1.9

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.652 min=1.652 max=1.652
   samples_ms=[1.652] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.691 min=1.691 max=1.691
   samples_ms=[1.691] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.443 min=1.443 max=1.443
   samples_ms=[1.443] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=14.545 min=14.545 max=14.545
   samples_ms=[14.545] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=10.204 min=10.204 max=10.204
   samples_ms=[10.204] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=276.458 min=276.458 max=276.458
   samples_ms=[276.458] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.401 min=14.401 max=14.401
   samples_ms=[14.401] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=278.719 min=278.719 max=278.719
   samples_ms=[278.719] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=18.722 min=18.722 max=18.722
   samples_ms=[18.722] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=583.911 min=583.911 max=583.911
   samples_ms=[583.911] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 7.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     10%         4    182.16
  applyTransformation          0.4      6%         4    111.42
  speciesDedup                 0.3      4%         9     33.76
  canonicalize                 0.0      0%         5      2.19
  matchComponents              0.0      0%         5      1.38
  (instrumented sections account for 20% of gen wall; 1460.2 µs/species, 1825.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     61.74
  findAllMaps                  0.1      6%         5     20.77
  speciesDedup                 0.0      2%         6      4.25
  matchComponents              0.0      1%         6      1.62
  canonicalize                 0.0      0%         3      1.04
  (instrumented sections account for 16% of gen wall; 544.3 µs/species, 816.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.3     23%        64     35.50
  applyTransformation          0.7      7%        64     10.76
  matchComponents              0.6      6%        72      8.69
  speciesDedup                 0.6      6%        65      9.01
  canonicalize                 0.1      1%        16      9.13
  (instrumented sections account for 43% of gen wall; 629.3 µs/species, 157.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 22.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.7     25%       160     35.86
  applyTransformation          1.7      8%       160     10.82
  matchComponents              1.5      6%       176      8.28
  speciesDedup                 1.2      5%       161      7.45
  canonicalize                 0.2      1%        32      5.65
  (instrumented sections account for 45% of gen wall; 711.9 µs/species, 142.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 74.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 23.4     31%       896     26.12
  applyTransformation          7.0      9%       896      7.77
  speciesDedup                 5.5      7%       897      6.11
  matchComponents              4.8      6%       960      5.04
  canonicalize                 1.2      2%       128      9.08
  (instrumented sections account for 56% of gen wall; 583.9 µs/species, 83.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1155.3  88%
   gen           116.5  9%
   parse          42.5  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                32.2  28% of gen
   applyTransformation        10.0  9% of gen
   speciesDedup                7.6  7% of gen
   matchComponents             6.9  6% of gen
   canonicalize                1.5  1% of gen

 >>> Biggest phase overall: ssa (1155.3 ms).
 >>> Biggest generation sink: findAllMaps (28% of generation).
==============================================================================
