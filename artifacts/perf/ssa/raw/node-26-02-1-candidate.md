
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.4       3.6        -        1.9      0.1
binding_AB (bimolecular)                        3       2      5.0       1.6        -       25.1      0.3
multisite_4 (2^4 species, combinatorial)       16      64      9.7      22.9        -      173.2      4.7
multisite_5 (2^5 species, combinatorial)       32     160      6.2      20.0        -      279.3    -19.7
multisite_7 (2^7 species, combinatorial)      128     896      7.2      84.4        -      828.9     10.3

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.123 min=2.123 max=2.123
   samples_ms=[2.123] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.889 min=1.889 max=1.889
   samples_ms=[1.889] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.591 min=1.591 max=1.591
   samples_ms=[1.591] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=25.101 min=25.101 max=25.101
   samples_ms=[25.101] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.428 min=4.428 max=4.428
   samples_ms=[4.428] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=173.245 min=173.245 max=173.245
   samples_ms=[173.245] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.708 min=16.708 max=16.708
   samples_ms=[16.708] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=279.330 min=279.330 max=279.330
   samples_ms=[279.330] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=36.301 min=36.301 max=36.301
   samples_ms=[36.301] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=828.875 min=828.875 max=828.875
   samples_ms=[828.875] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     16%         4    141.72
  findAllMaps                  0.5     13%         4    119.19
  speciesDedup                 0.1      3%         9     12.93
  canonicalize                 0.0      1%         5      4.50
  matchComponents              0.0      0%         5      1.36
  (instrumented sections account for 33% of gen wall; 721.5 µs/species, 901.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     59.41
  findAllMaps                  0.1      7%         5     21.31
  speciesDedup                 0.0      2%         6      6.60
  canonicalize                 0.0      1%         3      5.57
  matchComponents              0.0      0%         6      1.02
  (instrumented sections account for 18% of gen wall; 541.7 µs/species, 812.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 22.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          6.6     29%        64    102.93
  findAllMaps                  4.2     18%        64     65.82
  speciesDedup                 1.1      5%        65     16.67
  matchComponents              1.0      4%        72     14.08
  canonicalize                 0.2      1%        16     13.00
  (instrumented sections account for 57% of gen wall; 1429.9 µs/species, 357.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 20.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.3     26%       160     33.13
  findAllMaps                  3.9     20%       160     24.61
  speciesDedup                 1.0      5%       161      6.32
  matchComponents              0.8      4%       176      4.48
  canonicalize                 0.3      1%        32      8.05
  (instrumented sections account for 56% of gen wall; 625.2 µs/species, 125.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 84.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         24.1     29%       896     26.93
  findAllMaps                 16.8     20%       896     18.73
  matchComponents              5.5      7%       960      5.77
  speciesDedup                 4.8      6%       897      5.40
  canonicalize                 0.7      1%       128      5.48
  (instrumented sections account for 62% of gen wall; 659.5 µs/species, 94.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1308.4  89%
   gen           132.5  9%
   parse          36.4  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        36.7  28% of gen
   findAllMaps                25.5  19% of gen
   matchComponents             7.4  6% of gen
   speciesDedup                7.1  5% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (1308.4 ms).
 >>> Biggest generation sink: applyTransformation (28% of generation).
==============================================================================
