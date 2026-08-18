
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.5       3.5        -        2.0      0.5
binding_AB (bimolecular)                        3       2      5.9       1.9        -       17.8      0.3
multisite_4 (2^4 species, combinatorial)       16      64      9.4      22.6        -      167.6      4.7
multisite_5 (2^5 species, combinatorial)       32     160      5.7      18.1        -      330.3     11.3
multisite_7 (2^7 species, combinatorial)      128     896      7.4      87.1        -      636.6     10.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.148 min=2.148 max=2.148
   samples_ms=[2.148] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.963 min=1.963 max=1.963
   samples_ms=[1.963] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.797 min=1.797 max=1.797
   samples_ms=[1.797] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=17.850 min=17.850 max=17.850
   samples_ms=[17.850] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=5.421 min=5.421 max=5.421
   samples_ms=[5.421] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=167.621 min=167.621 max=167.621
   samples_ms=[167.621] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.832 min=14.832 max=14.832
   samples_ms=[14.832] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=330.309 min=330.309 max=330.309
   samples_ms=[330.309] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.760 min=15.760 max=15.760
   samples_ms=[15.760] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=636.631 min=636.631 max=636.631
   samples_ms=[636.631] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     14%         4    123.20
  findAllMaps                  0.4     13%         4    110.40
  speciesDedup                 0.2      7%         9     27.63
  canonicalize                 0.0      1%         5      4.75
  matchComponents              0.0      0%         5      1.26
  (instrumented sections account for 35% of gen wall; 692.3 µs/species, 865.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     64.55
  findAllMaps                  0.1      6%         5     23.34
  speciesDedup                 0.0      2%         6      7.68
  canonicalize                 0.0      1%         3      6.24
  matchComponents              0.0      0%         6      1.13
  (instrumented sections account for 17% of gen wall; 636.3 µs/species, 954.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 22.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.9     26%        64     91.46
  findAllMaps                  4.2     19%        64     65.62
  speciesDedup                 1.2      5%        65     17.96
  matchComponents              1.1      5%        72     15.48
  canonicalize                 0.2      1%        16     12.77
  (instrumented sections account for 56% of gen wall; 1409.7 µs/species, 352.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 18.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.9     21%       160     24.28
  findAllMaps                  3.7     20%       160     22.98
  speciesDedup                 1.0      6%       161      6.47
  matchComponents              0.7      4%       176      4.02
  canonicalize                 0.2      1%        32      6.05
  (instrumented sections account for 52% of gen wall; 567.0 µs/species, 113.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 87.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         25.5     29%       896     28.47
  findAllMaps                 17.4     20%       896     19.46
  matchComponents              5.9      7%       960      6.16
  speciesDedup                 5.2      6%       897      5.78
  canonicalize                 0.7      1%       128      5.45
  (instrumented sections account for 63% of gen wall; 680.4 µs/species, 97.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1154.4  87%
   gen           133.2  10%
   parse          37.1  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        35.9  27% of gen
   findAllMaps                25.9  19% of gen
   matchComponents             7.8  6% of gen
   speciesDedup                7.7  6% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1154.4 ms).
 >>> Biggest generation sink: applyTransformation (27% of generation).
==============================================================================
