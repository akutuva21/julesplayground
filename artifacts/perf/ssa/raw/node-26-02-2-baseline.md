
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.2       3.5        -        1.8      0.5
binding_AB (bimolecular)                        3       2      5.3       1.6        -       15.9     -0.0
multisite_4 (2^4 species, combinatorial)       16      64      9.2      19.9        -      169.7      4.7
multisite_5 (2^5 species, combinatorial)       32     160      5.6      18.7        -      329.9     11.8
multisite_7 (2^7 species, combinatorial)      128     896      8.4      90.8        -      641.6     11.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.203 min=2.203 max=2.203
   samples_ms=[2.203] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.830 min=1.830 max=1.830
   samples_ms=[1.830] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.711 min=1.711 max=1.711
   samples_ms=[1.711] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.914 min=15.914 max=15.914
   samples_ms=[15.914] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.332 min=4.332 max=4.332
   samples_ms=[4.332] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=169.679 min=169.679 max=169.679
   samples_ms=[169.679] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.514 min=14.514 max=14.514
   samples_ms=[14.514] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=329.898 min=329.898 max=329.898
   samples_ms=[329.898] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=16.077 min=16.077 max=16.077
   samples_ms=[16.077] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=641.556 min=641.556 max=641.556
   samples_ms=[641.556] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     17%         4    146.82
  findAllMaps                  0.5     13%         4    115.22
  speciesDedup                 0.2      4%         9     16.74
  canonicalize                 0.0      1%         5      4.17
  matchComponents              0.0      0%         5      1.30
  (instrumented sections account for 35% of gen wall; 695.6 µs/species, 869.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     62.41
  findAllMaps                  0.1      7%         5     23.67
  speciesDedup                 0.0      2%         6      6.06
  canonicalize                 0.0      1%         3      4.28
  matchComponents              0.0      0%         6      1.00
  (instrumented sections account for 19% of gen wall; 532.0 µs/species, 797.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 19.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.2     26%        64     81.70
  findAllMaps                  3.8     19%        64     58.88
  matchComponents              1.0      5%        72     13.79
  speciesDedup                 0.8      4%        65     12.66
  canonicalize                 0.2      1%        16     13.51
  (instrumented sections account for 55% of gen wall; 1242.6 µs/species, 310.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 18.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.9     21%       160     24.32
  findAllMaps                  3.9     21%       160     24.12
  speciesDedup                 1.1      6%       161      7.12
  matchComponents              0.9      5%       176      4.87
  canonicalize                 0.2      1%        32      5.87
  (instrumented sections account for 53% of gen wall; 582.9 µs/species, 116.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 90.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         27.2     30%       896     30.33
  findAllMaps                 18.4     20%       896     20.57
  speciesDedup                 7.9      9%       897      8.79
  matchComponents              5.9      7%       960      6.17
  canonicalize                 0.7      1%       128      5.83
  (instrumented sections account for 66% of gen wall; 709.5 µs/species, 101.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1158.9  87%
   gen           134.4  10%
   parse          36.8  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        37.0  28% of gen
   findAllMaps                26.6  20% of gen
   speciesDedup               10.0  7% of gen
   matchComponents             7.8  6% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (1158.9 ms).
 >>> Biggest generation sink: applyTransformation (28% of generation).
==============================================================================
