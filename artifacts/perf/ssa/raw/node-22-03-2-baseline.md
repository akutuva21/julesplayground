
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     12.1       4.7        -        1.9      0.5
binding_AB (bimolecular)                        3       2      6.9       1.9        -       14.8      0.2
multisite_4 (2^4 species, combinatorial)       16      64     10.7      10.3        -      261.5      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.5      22.0        -      279.1      8.0
multisite_7 (2^7 species, combinatorial)      128     896      9.6      77.9        -      575.2     -2.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.729 min=1.729 max=1.729
   samples_ms=[1.729] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.874 min=1.874 max=1.874
   samples_ms=[1.874] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.574 min=1.574 max=1.574
   samples_ms=[1.574] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=14.774 min=14.774 max=14.774
   samples_ms=[14.774] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.337 min=8.337 max=8.337
   samples_ms=[8.337] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=261.512 min=261.512 max=261.512
   samples_ms=[261.512] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.060 min=15.060 max=15.060
   samples_ms=[15.060] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=279.146 min=279.146 max=279.146
   samples_ms=[279.146] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=35.873 min=35.873 max=35.873
   samples_ms=[35.873] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=575.191 min=575.191 max=575.191
   samples_ms=[575.191] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     17%         4    198.88
  applyTransformation          0.4      9%         4    102.15
  speciesDedup                 0.2      5%         9     24.90
  canonicalize                 0.0      0%         5      1.58
  matchComponents              0.0      0%         5      1.38
  (instrumented sections account for 31% of gen wall; 938.1 µs/species, 1172.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     72.87
  findAllMaps                  0.1      7%         5     26.05
  speciesDedup                 0.0      1%         6      4.18
  matchComponents              0.0      0%         6      1.09
  canonicalize                 0.0      0%         3      1.40
  (instrumented sections account for 17% of gen wall; 628.4 µs/species, 942.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.2     22%        64     34.71
  applyTransformation          0.7      6%        64     10.19
  speciesDedup                 0.6      6%        65      9.74
  matchComponents              0.6      6%        72      8.51
  canonicalize                 0.2      2%        16     14.63
  (instrumented sections account for 42% of gen wall; 645.4 µs/species, 161.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 22.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.8     27%       160     36.44
  applyTransformation          1.9      8%       160     11.66
  matchComponents              1.4      7%       176      8.21
  speciesDedup                 1.4      6%       161      8.62
  canonicalize                 0.3      1%        32      9.98
  (instrumented sections account for 49% of gen wall; 687.3 µs/species, 137.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 77.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 18.0     23%       896     20.13
  applyTransformation         10.1     13%       896     11.29
  matchComponents              5.4      7%       960      5.62
  speciesDedup                 5.3      7%       897      5.86
  canonicalize                 1.1      1%       128      8.86
  (instrumented sections account for 51% of gen wall; 608.2 µs/species, 86.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1132.5  87%
   gen           116.7  9%
   parse          48.8  4%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                27.0  23% of gen
   applyTransformation        13.2  11% of gen
   speciesDedup                7.5  6% of gen
   matchComponents             7.5  6% of gen
   canonicalize                1.7  1% of gen

 >>> Biggest phase overall: ssa (1132.5 ms).
 >>> Biggest generation sink: findAllMaps (23% of generation).
==============================================================================
