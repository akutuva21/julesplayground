
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 runtime: v22.22.1   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.2       2.4        -        1.7      0.3
binding_AB (bimolecular)                        3       2      2.5       1.6        -        9.7      0.2
multisite_4 (2^4 species, combinatorial)       16      64      4.1       9.9        -      261.8      3.2
multisite_5 (2^5 species, combinatorial)       32     160      3.7      19.3        -      391.5     -7.8
multisite_7 (2^7 species, combinatorial)      128     896      5.7      62.0        -      563.1     10.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.528 min=1.343 max=4.759
   samples_ms=[4.759, 1.528, 1.343] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.748 min=1.558 max=1.792
   samples_ms=[1.792, 1.748, 1.558] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.231 min=1.131 max=1.268
   samples_ms=[1.268, 1.131, 1.231] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=9.706 min=9.362 max=14.785
   samples_ms=[14.785, 9.362, 9.706] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=7.494 min=7.064 max=7.698
   samples_ms=[7.698, 7.064, 7.494] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=261.752 min=261.075 max=263.875
   samples_ms=[263.875, 261.075, 261.752] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.006 min=13.806 max=15.643
   samples_ms=[15.643, 13.806, 14.006] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=391.453 min=268.718 max=423.633
   samples_ms=[391.453, 423.633, 268.718] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=17.731 min=17.432 max=22.057
   samples_ms=[22.057, 17.731, 17.432] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=563.072 min=561.960 max=568.895
   samples_ms=[561.960, 563.072, 568.895] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 2.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2      8%         4     45.97
  applyTransformation          0.2      7%         4     42.02
  speciesDedup                 0.0      1%         9      3.27
  matchComponents              0.0      0%         5      1.13
  canonicalize                 0.0      0%         5      0.77
  (instrumented sections account for 16% of gen wall; 485.2 µs/species, 606.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     56.25
  findAllMaps                  0.1      5%         5     15.88
  speciesDedup                 0.0      1%         6      3.42
  canonicalize                 0.0      0%         3      0.90
  matchComponents              0.0      0%         6      0.41
  (instrumented sections account for 14% of gen wall; 518.3 µs/species, 777.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 9.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.3     23%        64     36.16
  matchComponents              0.7      7%        72      9.52
  applyTransformation          0.7      7%        64     10.62
  speciesDedup                 0.5      5%        65      7.78
  canonicalize                 0.1      1%        16      4.92
  (instrumented sections account for 43% of gen wall; 616.4 µs/species, 154.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 19.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.5     18%       160     22.15
  applyTransformation          1.5      8%       160      9.47
  speciesDedup                 1.0      5%       161      6.20
  matchComponents              0.6      3%       176      3.24
  canonicalize                 0.2      1%        32      5.77
  (instrumented sections account for 35% of gen wall; 604.2 µs/species, 120.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 62.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.5     25%       896     17.25
  applyTransformation          6.1     10%       896      6.76
  matchComponents              5.3      9%       960      5.54
  speciesDedup                 4.5      7%       897      4.97
  canonicalize                 0.8      1%       128      6.46
  (instrumented sections account for 52% of gen wall; 484.6 µs/species, 69.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1227.7  91%
   gen            95.2  7%
   parse          20.2  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                21.6  23% of gen
   applyTransformation         8.5  9% of gen
   matchComponents             6.6  7% of gen
   speciesDedup                6.0  6% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1227.7 ms).
 >>> Biggest generation sink: findAllMaps (23% of generation).
==============================================================================
