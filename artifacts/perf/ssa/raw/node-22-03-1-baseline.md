
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.1       4.1        -        2.1      0.5
binding_AB (bimolecular)                        3       2      6.6       1.8        -       11.7      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.7      14.1        -      271.6      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.8      32.2        -      286.8     11.3
multisite_7 (2^7 species, combinatorial)      128     896      9.2     156.1        -      593.3      5.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.849 min=1.849 max=1.849
   samples_ms=[1.849] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.148 min=2.148 max=2.148
   samples_ms=[2.148] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.867 min=3.867 max=3.867
   samples_ms=[3.867] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.714 min=11.714 max=11.714
   samples_ms=[11.714] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.309 min=8.309 max=8.309
   samples_ms=[8.309] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=271.624 min=271.624 max=271.624
   samples_ms=[271.624] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=13.363 min=13.363 max=13.363
   samples_ms=[13.363] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=286.765 min=286.765 max=286.765
   samples_ms=[286.765] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=30.944 min=30.944 max=30.944
   samples_ms=[30.944] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=593.261 min=593.261 max=593.261
   samples_ms=[593.261] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     18%         4    181.64
  applyTransformation          0.3      8%         4     84.70
  speciesDedup                 0.1      3%         9     12.61
  canonicalize                 0.0      1%         5      5.93
  matchComponents              0.0      0%         5      1.38
  (instrumented sections account for 30% of gen wall; 811.4 µs/species, 1014.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     62.89
  findAllMaps                  0.1      6%         5     22.90
  speciesDedup                 0.0      2%         6      6.06
  canonicalize                 0.0      1%         3      3.42
  matchComponents              0.0      0%         6      1.11
  (instrumented sections account for 16% of gen wall; 601.5 µs/species, 902.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.4     24%        64     52.84
  findAllMaps                  2.7     19%        64     41.75
  matchComponents              0.7      5%        72      9.38
  speciesDedup                 0.6      4%        65      8.51
  canonicalize                 0.1      1%        16      6.90
  (instrumented sections account for 52% of gen wall; 882.0 µs/species, 220.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 32.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.1     28%       160     56.98
  findAllMaps                  6.7     21%       160     42.07
  matchComponents              1.7      5%       176      9.66
  speciesDedup                 1.3      4%       161      8.06
  canonicalize                 0.2      1%        32      6.10
  (instrumented sections account for 59% of gen wall; 1007.0 µs/species, 201.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 156.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         53.9     34%       896     60.11
  findAllMaps                 31.2     20%       896     34.84
  matchComponents              8.9      6%       960      9.30
  speciesDedup                 6.6      4%       897      7.33
  canonicalize                 1.4      1%       128     10.61
  (instrumented sections account for 65% of gen wall; 1219.7 µs/species, 174.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1165.5  82%
   gen           208.3  15%
   parse          44.4  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        66.8  32% of gen
   findAllMaps                41.5  20% of gen
   matchComponents            11.3  5% of gen
   speciesDedup                8.6  4% of gen
   canonicalize                1.7  1% of gen

 >>> Biggest phase overall: ssa (1165.5 ms).
 >>> Biggest generation sink: applyTransformation (32% of generation).
==============================================================================
