
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.2       3.4        -        1.5      0.5
binding_AB (bimolecular)                        3       2      5.2       1.6        -       24.9     -0.0
multisite_4 (2^4 species, combinatorial)       16      64      9.0      14.7        -      159.1      3.7
multisite_5 (2^5 species, combinatorial)       32     160      7.0      15.1        -      340.4      8.9
multisite_7 (2^7 species, combinatorial)      128     896      7.5      57.4        -      633.2     19.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.134 min=2.134 max=2.134
   samples_ms=[2.134] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.467 min=1.467 max=1.467
   samples_ms=[1.467] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.296 min=1.296 max=1.296
   samples_ms=[1.296] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=24.908 min=24.908 max=24.908
   samples_ms=[24.908] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.106 min=4.106 max=4.106
   samples_ms=[4.106] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=159.108 min=159.108 max=159.108
   samples_ms=[159.108] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.766 min=15.766 max=15.766
   samples_ms=[15.766] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=340.411 min=340.411 max=340.411
   samples_ms=[340.411] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.195 min=15.195 max=15.195
   samples_ms=[15.195] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=633.240 min=633.240 max=633.240
   samples_ms=[633.240] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.6     18%         4    147.55
  applyTransformation          0.5     15%         4    128.47
  speciesDedup                 0.1      4%         9     15.37
  matchComponents              0.0      0%         5      1.40
  canonicalize                 0.0      0%         5      1.38
  (instrumented sections account for 37% of gen wall; 671.0 µs/species, 838.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1      9%         5     29.29
  applyTransformation          0.1      8%         2     65.45
  speciesDedup                 0.0      2%         6      5.05
  matchComponents              0.0      0%         6      1.16
  canonicalize                 0.0      0%         3      0.91
  (instrumented sections account for 20% of gen wall; 523.9 µs/species, 785.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.4     23%        64     53.05
  applyTransformation          1.1      8%        64     17.66
  matchComponents              0.8      6%        72     11.51
  speciesDedup                 0.8      5%        65     11.89
  canonicalize                 0.3      2%        16     16.82
  (instrumented sections account for 44% of gen wall; 916.3 µs/species, 229.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 15.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.9     26%       160     24.16
  applyTransformation          1.3      9%       160      8.17
  speciesDedup                 0.9      6%       161      5.37
  matchComponents              0.7      5%       176      4.24
  canonicalize                 0.2      1%        32      4.76
  (instrumented sections account for 46% of gen wall; 472.1 µs/species, 94.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 57.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 18.0     31%       896     20.12
  matchComponents              5.1      9%       960      5.32
  speciesDedup                 4.5      8%       897      4.99
  applyTransformation          4.2      7%       896      4.72
  canonicalize                 0.7      1%       128      5.47
  (instrumented sections account for 57% of gen wall; 448.6 µs/species, 64.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1159.1  90%
   gen            92.1  7%
   parse          36.9  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                26.0  28% of gen
   applyTransformation         7.3  8% of gen
   matchComponents             6.7  7% of gen
   speciesDedup                6.3  7% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1159.1 ms).
 >>> Biggest generation sink: findAllMaps (28% of generation).
==============================================================================
