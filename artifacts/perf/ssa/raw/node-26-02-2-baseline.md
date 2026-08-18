
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.3       3.4        -        1.7      0.5
binding_AB (bimolecular)                        3       2      4.9       1.6        -       15.6      0.3
multisite_4 (2^4 species, combinatorial)       16      64      9.0      19.4        -      167.6      4.7
multisite_5 (2^5 species, combinatorial)       32     160      6.1      19.3        -      329.4     11.3
multisite_7 (2^7 species, combinatorial)      128     896      7.0      88.3        -      630.8     10.0

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.120 min=2.120 max=2.120
   samples_ms=[2.120] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.731 min=1.731 max=1.731
   samples_ms=[1.731] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.649 min=1.649 max=1.649
   samples_ms=[1.649] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.572 min=15.572 max=15.572
   samples_ms=[15.572] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.270 min=4.270 max=4.270
   samples_ms=[4.270] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=167.581 min=167.581 max=167.581
   samples_ms=[167.581] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.434 min=15.434 max=15.434
   samples_ms=[15.434] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=329.430 min=329.430 max=329.430
   samples_ms=[329.430] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.620 min=15.620 max=15.620
   samples_ms=[15.620] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=630.791 min=630.791 max=630.791
   samples_ms=[630.791] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     14%         4    121.92
  findAllMaps                  0.4     13%         4    112.45
  speciesDedup                 0.1      3%         9     13.33
  canonicalize                 0.0      1%         5      5.46
  matchComponents              0.0      0%         5      1.36
  (instrumented sections account for 32% of gen wall; 688.1 µs/species, 860.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      9%         2     66.98
  findAllMaps                  0.1      6%         5     19.41
  speciesDedup                 0.0      2%         6      6.26
  canonicalize                 0.0      1%         3      5.43
  matchComponents              0.0      0%         6      0.97
  (instrumented sections account for 19% of gen wall; 521.8 µs/species, 782.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 19.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.3     27%        64     82.96
  findAllMaps                  3.4     18%        64     53.76
  speciesDedup                 1.0      5%        65     14.92
  matchComponents              0.9      4%        72     11.85
  canonicalize                 0.3      2%        16     18.64
  (instrumented sections account for 56% of gen wall; 1212.7 µs/species, 303.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 19.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  4.4     23%       160     27.50
  applyTransformation          4.0     21%       160     24.80
  speciesDedup                 1.0      5%       161      6.23
  matchComponents              0.9      5%       176      5.18
  canonicalize                 0.2      1%        32      6.94
  (instrumented sections account for 54% of gen wall; 603.3 µs/species, 120.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 88.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         25.5     29%       896     28.49
  findAllMaps                 20.2     23%       896     22.57
  matchComponents              8.1      9%       960      8.45
  speciesDedup                 5.4      6%       897      6.06
  canonicalize                 0.9      1%       128      7.23
  (instrumented sections account for 68% of gen wall; 689.8 µs/species, 98.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1145.1  87%
   gen           132.0  10%
   parse          35.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        35.4  27% of gen
   findAllMaps                28.6  22% of gen
   matchComponents             9.9  7% of gen
   speciesDedup                7.6  6% of gen
   canonicalize                1.5  1% of gen

 >>> Biggest phase overall: ssa (1145.1 ms).
 >>> Biggest generation sink: applyTransformation (27% of generation).
==============================================================================
