
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.3       8.1        -        1.8     -9.8
binding_AB (bimolecular)                        3       2      6.6       1.8        -       16.1      0.2
multisite_4 (2^4 species, combinatorial)       16      64     10.6      10.1        -      266.5      3.2
multisite_5 (2^5 species, combinatorial)       32     160     11.0      21.6        -      278.3      8.0
multisite_7 (2^7 species, combinatorial)      128     896     10.0      74.0        -      579.3     11.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.812 min=1.812 max=1.812
   samples_ms=[1.812] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.821 min=1.821 max=1.821
   samples_ms=[1.821] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.354 min=1.354 max=1.354
   samples_ms=[1.354] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=16.068 min=16.068 max=16.068
   samples_ms=[16.068] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.260 min=8.260 max=8.260
   samples_ms=[8.260] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=266.543 min=266.543 max=266.543
   samples_ms=[266.543] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.530 min=14.530 max=14.530
   samples_ms=[14.530] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=278.270 min=278.270 max=278.270
   samples_ms=[278.270] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=36.127 min=36.127 max=36.127
   samples_ms=[36.127] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=579.278 min=579.278 max=579.278
   samples_ms=[579.278] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 8.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     10%         4    195.05
  applyTransformation          0.5      6%         4    129.58
  speciesDedup                 0.4      5%         9     46.53
  canonicalize                 0.0      0%         5      2.32
  matchComponents              0.0      0%         5      1.37
  (instrumented sections account for 21% of gen wall; 1619.8 µs/species, 2024.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     67.78
  findAllMaps                  0.1      6%         5     22.30
  speciesDedup                 0.0      2%         6      4.71
  matchComponents              0.0      0%         6      1.09
  canonicalize                 0.0      0%         3      1.07
  (instrumented sections account for 16% of gen wall; 588.1 µs/species, 882.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.5     25%        64     39.07
  matchComponents              0.8      8%        72     11.06
  applyTransformation          0.7      7%        64     11.32
  speciesDedup                 0.6      6%        65      9.11
  canonicalize                 0.1      1%        16      9.26
  (instrumented sections account for 47% of gen wall; 630.9 µs/species, 157.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 21.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.6     26%       160     35.13
  applyTransformation          1.8      8%       160     11.07
  matchComponents              1.5      7%       176      8.45
  speciesDedup                 1.2      5%       161      7.34
  canonicalize                 0.2      1%        32      5.55
  (instrumented sections account for 48% of gen wall; 673.5 µs/species, 134.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 74.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 18.1     25%       896     20.23
  applyTransformation          7.1     10%       896      7.93
  speciesDedup                 5.5      7%       897      6.17
  matchComponents              5.2      7%       960      5.44
  canonicalize                 1.3      2%       128      9.91
  (instrumented sections account for 50% of gen wall; 578.0 µs/species, 82.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1142.0  88%
   gen           115.5  9%
   parse          46.6  4%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                27.1  23% of gen
   applyTransformation        10.3  9% of gen
   speciesDedup                7.8  7% of gen
   matchComponents             7.5  7% of gen
   canonicalize                1.6  1% of gen

 >>> Biggest phase overall: ssa (1142.0 ms).
 >>> Biggest generation sink: findAllMaps (23% of generation).
==============================================================================
