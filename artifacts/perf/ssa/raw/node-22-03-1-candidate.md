
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.8       3.9        -        2.0      0.5
binding_AB (bimolecular)                        3       2      6.4       1.8        -       12.8      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.2      14.3        -      125.6      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.1      32.7        -      411.0     -3.9
multisite_7 (2^7 species, combinatorial)      128     896      9.2     153.9        -      557.4      5.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.808 min=1.808 max=1.808
   samples_ms=[1.808] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.039 min=2.039 max=2.039
   samples_ms=[2.039] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.727 min=3.727 max=3.727
   samples_ms=[3.727] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=12.770 min=12.770 max=12.770
   samples_ms=[12.770] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=11.897 min=11.897 max=11.897
   samples_ms=[11.897] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=125.605 min=125.605 max=125.605
   samples_ms=[125.605] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.879 min=16.879 max=16.879
   samples_ms=[16.879] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=411.017 min=411.017 max=411.017
   samples_ms=[411.017] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=19.208 min=19.208 max=19.208
   samples_ms=[19.208] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=557.361 min=557.361 max=557.361
   samples_ms=[557.361] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     17%         4    170.09
  applyTransformation          0.4      9%         4     89.30
  speciesDedup                 0.1      2%         9     10.71
  canonicalize                 0.0      0%         5      3.58
  matchComponents              0.0      0%         5      1.27
  (instrumented sections account for 29% of gen wall; 788.2 µs/species, 985.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     63.20
  findAllMaps                  0.1      6%         5     21.32
  speciesDedup                 0.0      2%         6      6.21
  canonicalize                 0.0      1%         3      3.76
  matchComponents              0.0      0%         6      1.16
  (instrumented sections account for 16% of gen wall; 613.4 µs/species, 920.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.4     24%        64     52.76
  findAllMaps                  2.5     17%        64     38.92
  matchComponents              0.7      5%        72      9.18
  speciesDedup                 0.6      4%        65      8.67
  canonicalize                 0.1      1%        16      6.78
  (instrumented sections account for 51% of gen wall; 891.1 µs/species, 222.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 32.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.1     28%       160     56.98
  findAllMaps                  7.6     23%       160     47.76
  matchComponents              1.7      5%       176      9.58
  speciesDedup                 1.4      4%       161      8.82
  canonicalize                 0.2      1%        32      6.17
  (instrumented sections account for 61% of gen wall; 1023.3 µs/species, 204.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 153.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         55.7     36%       896     62.12
  findAllMaps                 28.8     19%       896     32.14
  matchComponents              8.9      6%       960      9.24
  speciesDedup                 6.4      4%       897      7.18
  canonicalize                 1.4      1%       128     10.56
  (instrumented sections account for 66% of gen wall; 1202.4 µs/species, 171.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1108.8  82%
   gen           206.7  15%
   parse          42.8  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        68.6  33% of gen
   findAllMaps                39.7  19% of gen
   matchComponents            11.2  5% of gen
   speciesDedup                8.6  4% of gen
   canonicalize                1.7  1% of gen

 >>> Biggest phase overall: ssa (1108.8 ms).
 >>> Biggest generation sink: applyTransformation (33% of generation).
==============================================================================
