
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 runtime: v22.22.1   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.3       2.8        -        1.7      0.3
binding_AB (bimolecular)                        3       2      4.2       1.4        -       10.1      0.2
multisite_4 (2^4 species, combinatorial)       16      64      8.9      14.5        -      272.8    -11.0
multisite_5 (2^5 species, combinatorial)       32     160      7.3      31.7        -      419.0     -4.9
multisite_7 (2^7 species, combinatorial)      128     896      6.2     102.6        -      595.7     -2.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.949 min=1.814 max=2.175
   samples_ms=[2.175, 1.814, 1.949] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.745 min=1.468 max=1.755
   samples_ms=[1.755, 1.745, 1.468] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.149 min=1.110 max=1.308
   samples_ms=[1.308, 1.110, 1.149] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=10.133 min=9.813 max=16.063
   samples_ms=[16.063, 9.813, 10.133] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=7.788 min=7.640 max=7.932
   samples_ms=[7.932, 7.640, 7.788] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=272.813 min=271.303 max=273.197
   samples_ms=[271.303, 273.197, 272.813] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.446 min=14.732 max=16.506
   samples_ms=[16.506, 14.732, 15.446] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=419.026 min=288.382 max=424.532
   samples_ms=[419.026, 424.532, 288.382] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=20.499 min=18.375 max=21.823
   samples_ms=[21.823, 18.375, 20.499] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=595.748 min=593.741 max=596.214
   samples_ms=[596.214, 595.748, 593.741] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 2.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2      8%         4     53.80
  findAllMaps                  0.2      5%         4     37.60
  speciesDedup                 0.1      2%         9      6.18
  canonicalize                 0.0      1%         5      4.65
  matchComponents              0.0      0%         5      1.22
  (instrumented sections account for 16% of gen wall; 557.0 µs/species, 696.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      6%         2     46.22
  findAllMaps                  0.1      5%         5     14.74
  speciesDedup                 0.0      2%         6      5.55
  canonicalize                 0.0      1%         3      3.75
  matchComponents              0.0      0%         6      0.48
  (instrumented sections account for 15% of gen wall; 474.4 µs/species, 711.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.9     27%        64     60.55
  findAllMaps                  3.0     20%        64     46.22
  matchComponents              1.0      7%        72     13.84
  speciesDedup                 0.6      4%        65      8.85
  canonicalize                 0.1      1%        16      6.36
  (instrumented sections account for 59% of gen wall; 908.2 µs/species, 227.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 31.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          8.5     27%       160     53.24
  findAllMaps                  4.6     14%       160     28.54
  speciesDedup                 3.3     10%       161     20.26
  matchComponents              0.9      3%       176      5.03
  canonicalize                 0.2      1%        32      7.34
  (instrumented sections account for 55% of gen wall; 991.3 µs/species, 198.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 102.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         21.9     21%       896     24.41
  findAllMaps                 19.9     19%       896     22.21
  matchComponents              7.9      8%       960      8.26
  speciesDedup                 5.2      5%       897      5.77
  canonicalize                 0.9      1%       128      7.02
  (instrumented sections account for 54% of gen wall; 801.3 µs/species, 114.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1299.5  87%
   gen           153.0  10%
   parse          34.9  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        34.6  23% of gen
   findAllMaps                27.7  18% of gen
   matchComponents             9.8  6% of gen
   speciesDedup                9.1  6% of gen
   canonicalize                1.3  1% of gen

 >>> Biggest phase overall: ssa (1299.5 ms).
 >>> Biggest generation sink: applyTransformation (23% of generation).
==============================================================================
