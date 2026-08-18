
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.8       4.0        -        1.8      0.5
binding_AB (bimolecular)                        3       2      6.5       1.7        -       10.6      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.3      14.3        -      273.1      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.7      35.4        -      282.1     -3.7
multisite_7 (2^7 species, combinatorial)      128     896     14.4     135.7        -      680.5      1.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.781 min=1.781 max=1.781
   samples_ms=[1.781] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.787 min=1.787 max=1.787
   samples_ms=[1.787] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.580 min=1.580 max=1.580
   samples_ms=[1.580] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=10.632 min=10.632 max=10.632
   samples_ms=[10.632] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.087 min=8.087 max=8.087
   samples_ms=[8.087] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=273.102 min=273.102 max=273.102
   samples_ms=[273.102] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=13.483 min=13.483 max=13.483
   samples_ms=[13.483] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=282.110 min=282.110 max=282.110
   samples_ms=[282.110] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=36.895 min=36.895 max=36.895
   samples_ms=[36.895] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=680.479 min=680.479 max=680.479
   samples_ms=[680.479] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     17%         4    170.46
  applyTransformation          0.3      9%         4     85.30
  speciesDedup                 0.1      3%         9     11.36
  canonicalize                 0.0      0%         5      3.66
  matchComponents              0.0      0%         5      1.30
  (instrumented sections account for 29% of gen wall; 792.7 µs/species, 990.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     65.37
  findAllMaps                  0.1      6%         5     21.47
  speciesDedup                 0.0      3%         6      7.80
  canonicalize                 0.0      1%         3      4.33
  matchComponents              0.0      0%         6      1.09
  (instrumented sections account for 18% of gen wall; 568.5 µs/species, 852.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.3     23%        64     51.88
  findAllMaps                  2.7     19%        64     41.89
  matchComponents              0.7      5%        72      9.69
  speciesDedup                 0.6      4%        65      9.39
  canonicalize                 0.1      1%        16      7.05
  (instrumented sections account for 52% of gen wall; 891.6 µs/species, 222.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 35.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.6     27%       160     59.93
  findAllMaps                  8.6     24%       160     53.98
  matchComponents              3.8     11%       176     21.64
  speciesDedup                 1.4      4%       161      8.99
  canonicalize                 0.2      1%        32      6.79
  (instrumented sections account for 67% of gen wall; 1105.6 µs/species, 221.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 135.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         53.4     39%       896     59.65
  findAllMaps                 26.9     20%       896     30.04
  matchComponents             10.5      8%       960     10.93
  speciesDedup                 6.7      5%       897      7.50
  canonicalize                 1.3      1%       128     10.21
  (instrumented sections account for 73% of gen wall; 1060.1 µs/species, 151.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1248.1  84%
   gen           191.0  13%
   parse          48.8  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        66.8  35% of gen
   findAllMaps                39.0  20% of gen
   matchComponents            15.0  8% of gen
   speciesDedup                8.9  5% of gen
   canonicalize                1.7  1% of gen

 >>> Biggest phase overall: ssa (1248.1 ms).
 >>> Biggest generation sink: applyTransformation (35% of generation).
==============================================================================
