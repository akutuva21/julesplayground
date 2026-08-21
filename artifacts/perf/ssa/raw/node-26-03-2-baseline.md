
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.8       3.2        -        1.5      0.5
binding_AB (bimolecular)                        3       2      4.6       1.5        -       23.9     -0.1
multisite_4 (2^4 species, combinatorial)       16      64      9.7      15.8        -      157.5      3.8
multisite_5 (2^5 species, combinatorial)       32     160      6.4      14.7        -      332.9      9.0
multisite_7 (2^7 species, combinatorial)      128     896      7.0      57.5        -      623.6     19.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.904 min=1.904 max=1.904
   samples_ms=[1.904] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.529 min=1.529 max=1.529
   samples_ms=[1.529] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.438 min=1.438 max=1.438
   samples_ms=[1.438] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=23.917 min=23.917 max=23.917
   samples_ms=[23.917] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.120 min=4.120 max=4.120
   samples_ms=[4.120] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=157.518 min=157.518 max=157.518
   samples_ms=[157.518] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.927 min=15.927 max=15.927
   samples_ms=[15.927] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=332.868 min=332.868 max=332.868
   samples_ms=[332.868] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=14.896 min=14.896 max=14.896
   samples_ms=[14.896] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=623.558 min=623.558 max=623.558
   samples_ms=[623.558] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     15%         4    121.73
  findAllMaps                  0.5     15%         4    115.46
  speciesDedup                 0.1      4%         9     14.73
  canonicalize                 0.0      0%         5      1.36
  matchComponents              0.0      0%         5      1.33
  (instrumented sections account for 35% of gen wall; 631.8 µs/species, 789.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1     10%         5     28.99
  applyTransformation          0.1     10%         2     70.22
  speciesDedup                 0.0      1%         6      3.18
  matchComponents              0.0      0%         6      1.04
  canonicalize                 0.0      0%         3      0.97
  (instrumented sections account for 21% of gen wall; 486.6 µs/species, 729.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 15.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.7     23%        64     57.06
  applyTransformation          1.3      8%        64     20.64
  matchComponents              0.8      5%        72     11.67
  speciesDedup                 0.7      5%        65     11.23
  canonicalize                 0.2      1%        16     12.49
  (instrumented sections account for 43% of gen wall; 985.7 µs/species, 246.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 14.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.8     26%       160     23.89
  applyTransformation          1.3      9%       160      8.20
  speciesDedup                 1.1      8%       161      6.95
  matchComponents              0.8      5%       176      4.33
  canonicalize                 0.2      1%        32      5.37
  (instrumented sections account for 49% of gen wall; 459.4 µs/species, 91.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 57.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.6     27%       896     17.45
  applyTransformation          6.8     12%       896      7.58
  matchComponents              5.0      9%       960      5.22
  speciesDedup                 4.7      8%       897      5.26
  canonicalize                 0.8      1%       128      6.47
  (instrumented sections account for 57% of gen wall; 449.4 µs/species, 64.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1139.4  90%
   gen            92.6  7%
   parse          35.5  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                23.7  26% of gen
   applyTransformation        10.1  11% of gen
   speciesDedup                6.7  7% of gen
   matchComponents             6.6  7% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (1139.4 ms).
 >>> Biggest generation sink: findAllMaps (26% of generation).
==============================================================================
