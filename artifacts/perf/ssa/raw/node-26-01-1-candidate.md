
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.6       3.5        -        1.9      0.5
binding_AB (bimolecular)                        3       2      4.8       1.6        -       23.6      0.3
multisite_4 (2^4 species, combinatorial)       16      64      9.2      20.1        -      174.8      4.9
multisite_5 (2^5 species, combinatorial)       32     160      6.0      20.2        -      320.2    -20.1
multisite_7 (2^7 species, combinatorial)      128     896      7.2      97.0        -      590.6    -19.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.240 min=2.240 max=2.240
   samples_ms=[2.240] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.878 min=1.878 max=1.878
   samples_ms=[1.878] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.650 min=1.650 max=1.650
   samples_ms=[1.650] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=23.568 min=23.568 max=23.568
   samples_ms=[23.568] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.558 min=4.558 max=4.558
   samples_ms=[4.558] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=174.832 min=174.832 max=174.832
   samples_ms=[174.832] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=18.563 min=18.563 max=18.563
   samples_ms=[18.563] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=320.187 min=320.187 max=320.187
   samples_ms=[320.187] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=18.993 min=18.993 max=18.993
   samples_ms=[18.993] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=590.591 min=590.591 max=590.591
   samples_ms=[590.591] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.5     15%         4    131.33
  applyTransformation          0.5     14%         4    123.75
  speciesDedup                 0.1      3%         9     13.37
  canonicalize                 0.0      1%         5      5.53
  matchComponents              0.0      0%         5      1.43
  (instrumented sections account for 34% of gen wall; 696.1 µs/species, 870.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     10%         2     83.76
  findAllMaps                  0.1      6%         5     20.70
  speciesDedup                 0.0      2%         6      6.53
  canonicalize                 0.0      1%         3      4.47
  matchComponents              0.0      0%         6      1.07
  (instrumented sections account for 20% of gen wall; 548.3 µs/species, 822.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 20.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.5     27%        64     85.77
  findAllMaps                  3.4     17%        64     53.34
  matchComponents              0.9      4%        72     12.33
  speciesDedup                 0.9      4%        65     13.20
  canonicalize                 0.2      1%        16     12.31
  (instrumented sections account for 54% of gen wall; 1256.6 µs/species, 314.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 20.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          6.3     31%       160     39.14
  findAllMaps                  3.8     19%       160     23.84
  speciesDedup                 1.0      5%       161      6.36
  matchComponents              0.8      4%       176      4.37
  canonicalize                 0.2      1%        32      5.66
  (instrumented sections account for 60% of gen wall; 629.8 µs/species, 126.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 97.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         23.2     24%       896     25.91
  findAllMaps                 17.5     18%       896     19.49
  matchComponents              5.8      6%       960      6.09
  speciesDedup                 5.7      6%       897      6.30
  canonicalize                 0.7      1%       128      5.67
  (instrumented sections account for 55% of gen wall; 757.6 µs/species, 108.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1111.1  86%
   gen           142.4  11%
   parse          35.9  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        35.6  25% of gen
   findAllMaps                25.3  18% of gen
   speciesDedup                7.7  5% of gen
   matchComponents             7.5  5% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1111.1 ms).
 >>> Biggest generation sink: applyTransformation (25% of generation).
==============================================================================
