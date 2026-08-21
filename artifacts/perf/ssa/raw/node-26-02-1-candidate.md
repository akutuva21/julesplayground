
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      9.2       3.5        -        1.5      0.5
binding_AB (bimolecular)                        3       2      5.2       1.9        -       16.2      0.2
multisite_4 (2^4 species, combinatorial)       16      64      9.5      14.7        -      174.8      3.7
multisite_5 (2^5 species, combinatorial)       32     160      6.5      14.7        -      290.7      8.8
multisite_7 (2^7 species, combinatorial)      128     896      7.3      65.4        -      617.6     19.3

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.933 min=1.933 max=1.933
   samples_ms=[1.933] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.506 min=1.506 max=1.506
   samples_ms=[1.506] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.372 min=1.372 max=1.372
   samples_ms=[1.372] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=16.205 min=16.205 max=16.205
   samples_ms=[16.205] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.172 min=4.172 max=4.172
   samples_ms=[4.172] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=174.783 min=174.783 max=174.783
   samples_ms=[174.783] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.038 min=16.038 max=16.038
   samples_ms=[16.038] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=290.654 min=290.654 max=290.654
   samples_ms=[290.654] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=17.560 min=17.560 max=17.560
   samples_ms=[17.560] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=617.649 min=617.649 max=617.649
   samples_ms=[617.649] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     18%         4    157.21
  findAllMaps                  0.5     14%         4    118.22
  speciesDedup                 0.1      4%         9     15.40
  canonicalize                 0.0      0%         5      1.37
  matchComponents              0.0      0%         5      1.35
  (instrumented sections account for 36% of gen wall; 693.3 µs/species, 866.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2      8%         5     30.84
  applyTransformation          0.1      8%         2     71.33
  speciesDedup                 0.0      1%         6      3.76
  matchComponents              0.0      1%         6      1.81
  canonicalize                 0.0      0%         3      1.29
  (instrumented sections account for 18% of gen wall; 617.0 µs/species, 925.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.4     23%        64     53.18
  applyTransformation          1.3      9%        64     19.90
  matchComponents              0.9      6%        72     12.05
  speciesDedup                 0.8      6%        65     12.87
  canonicalize                 0.2      2%        16     15.20
  (instrumented sections account for 45% of gen wall; 921.2 µs/species, 230.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 14.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.7     25%       160     23.38
  applyTransformation          1.5     10%       160      9.20
  speciesDedup                 1.1      8%       161      6.88
  matchComponents              0.7      5%       176      4.09
  canonicalize                 0.2      1%        32      5.82
  (instrumented sections account for 49% of gen wall; 458.5 µs/species, 91.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 65.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 21.4     33%       896     23.89
  matchComponents              9.5     15%       960      9.90
  speciesDedup                 5.6      9%       897      6.25
  applyTransformation          4.4      7%       896      4.90
  canonicalize                 1.0      2%       128      7.86
  (instrumented sections account for 64% of gen wall; 510.6 µs/species, 72.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1100.8  89%
   gen           100.1  8%
   parse          37.8  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                29.2  29% of gen
   matchComponents            11.1  11% of gen
   applyTransformation         7.9  8% of gen
   speciesDedup                7.7  8% of gen
   canonicalize                1.4  1% of gen

 >>> Biggest phase overall: ssa (1100.8 ms).
 >>> Biggest generation sink: findAllMaps (29% of generation).
==============================================================================
