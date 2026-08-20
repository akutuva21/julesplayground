
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 runtime: v22.22.1   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     13.3       5.6        -        3.9      0.3
binding_AB (bimolecular)                        3       2      8.2       3.6        -       11.0      0.2
multisite_4 (2^4 species, combinatorial)       16      64      8.5      10.0        -      297.5      3.2
multisite_5 (2^5 species, combinatorial)       32     160      8.1      19.2        -      435.9      7.3
multisite_7 (2^7 species, combinatorial)      128     896      6.2      72.6        -      588.4     -4.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=3.269 min=2.837 max=4.220
   samples_ms=[4.220, 3.269, 2.837] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=3.886 min=1.409 max=4.618
   samples_ms=[1.409, 3.886, 4.618] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.209 min=2.826 max=3.273
   samples_ms=[3.273, 3.209, 2.826] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.039 min=10.668 max=12.720
   samples_ms=[11.039, 10.668, 12.720] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.517 min=8.231 max=10.336
   samples_ms=[8.231, 8.517, 10.336] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=297.496 min=292.882 max=320.571
   samples_ms=[320.571, 292.882, 297.496] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=17.468 min=16.278 max=18.110
   samples_ms=[17.468, 16.278, 18.110] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=435.947 min=273.775 max=469.647
   samples_ms=[469.647, 435.947, 273.775] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=17.964 min=17.839 max=25.047
   samples_ms=[25.047, 17.839, 17.964] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=588.398 min=574.798 max=594.706
   samples_ms=[574.798, 594.706, 588.398] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 5.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     10%         4    139.37
  findAllMaps                  0.3      6%         4     77.22
  speciesDedup                 0.1      1%         9      7.18
  matchComponents              0.0      0%         5      1.46
  canonicalize                 0.0      0%         5      1.00
  (instrumented sections account for 17% of gen wall; 1120.5 µs/species, 1400.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.4     10%         2    189.66
  findAllMaps                  0.2      6%         5     40.06
  speciesDedup                 0.1      2%         6     13.09
  matchComponents              0.0      1%         6      5.31
  canonicalize                 0.0      0%         3      1.36
  (instrumented sections account for 19% of gen wall; 1206.7 µs/species, 1810.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.5     25%        64     39.46
  matchComponents              0.7      7%        72     10.21
  applyTransformation          0.7      7%        64     10.32
  speciesDedup                 0.5      5%        65      8.25
  canonicalize                 0.1      1%        16      8.44
  (instrumented sections account for 46% of gen wall; 626.9 µs/species, 156.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 19.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.8     20%       160     23.54
  applyTransformation          1.7      9%       160     10.86
  speciesDedup                 1.2      6%       161      7.64
  matchComponents              0.6      3%       176      3.64
  canonicalize                 0.2      1%        32      6.32
  (instrumented sections account for 39% of gen wall; 600.4 µs/species, 120.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 72.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 21.8     30%       896     24.31
  applyTransformation          7.1     10%       896      7.91
  matchComponents              6.4      9%       960      6.68
  speciesDedup                 4.7      7%       897      5.27
  canonicalize                 0.8      1%       128      6.27
  (instrumented sections account for 56% of gen wall; 567.5 µs/species, 81.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1336.8  90%
   gen           111.1  7%
   parse          44.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                28.6  26% of gen
   applyTransformation        10.4  9% of gen
   matchComponents             7.8  7% of gen
   speciesDedup                6.6  6% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1336.8 ms).
 >>> Biggest generation sink: findAllMaps (26% of generation).
==============================================================================
