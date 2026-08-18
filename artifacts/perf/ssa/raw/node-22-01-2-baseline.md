
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.9       3.9        -        2.2      0.5
binding_AB (bimolecular)                        3       2      6.7       1.8        -       11.4      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.2      14.6        -      267.4      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.7      32.6        -      283.9     11.3
multisite_7 (2^7 species, combinatorial)      128     896     10.5     136.3        -      597.0      1.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.947 min=1.947 max=1.947
   samples_ms=[1.947] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.190 min=2.190 max=2.190
   samples_ms=[2.190] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.777 min=3.777 max=3.777
   samples_ms=[3.777] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.440 min=11.440 max=11.440
   samples_ms=[11.440] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.194 min=8.194 max=8.194
   samples_ms=[8.194] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=267.450 min=267.450 max=267.450
   samples_ms=[267.450] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=13.574 min=13.574 max=13.574
   samples_ms=[13.574] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=283.873 min=283.873 max=283.873
   samples_ms=[283.873] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=31.035 min=31.035 max=31.035
   samples_ms=[31.035] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=596.984 min=596.984 max=596.984
   samples_ms=[596.984] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     21%         4    205.20
  applyTransformation          0.4      9%         4     91.09
  speciesDedup                 0.1      3%         9     11.12
  canonicalize                 0.0      0%         5      3.62
  matchComponents              0.0      0%         5      1.34
  (instrumented sections account for 33% of gen wall; 788.0 µs/species, 984.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     62.97
  findAllMaps                  0.1      6%         5     21.82
  speciesDedup                 0.0      3%         6      8.14
  canonicalize                 0.0      1%         3      7.41
  matchComponents              0.0      1%         6      1.57
  (instrumented sections account for 17% of gen wall; 609.5 µs/species, 914.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.5     24%        64     54.72
  findAllMaps                  2.6     18%        64     41.34
  speciesDedup                 0.7      5%        65     11.50
  matchComponents              0.7      5%        72      9.76
  canonicalize                 0.2      1%        16     11.02
  (instrumented sections account for 53% of gen wall; 914.9 µs/species, 228.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 32.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.4     29%       160     59.06
  findAllMaps                  6.4     20%       160     39.94
  speciesDedup                 1.7      5%       161     10.57
  matchComponents              1.7      5%       176      9.41
  canonicalize                 0.3      1%        32      8.41
  (instrumented sections account for 60% of gen wall; 1020.1 µs/species, 204.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 136.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         52.4     38%       896     58.44
  findAllMaps                 22.1     16%       896     24.65
  speciesDedup                 8.7      6%       897      9.73
  matchComponents              6.1      4%       960      6.38
  canonicalize                 1.2      1%       128      9.65
  (instrumented sections account for 66% of gen wall; 1064.9 µs/species, 152.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1161.9  83%
   gen           189.4  14%
   parse          45.0  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        65.8  35% of gen
   findAllMaps                32.1  17% of gen
   speciesDedup               11.3  6% of gen
   matchComponents             8.5  4% of gen
   canonicalize                1.7  1% of gen

 >>> Biggest phase overall: ssa (1161.9 ms).
 >>> Biggest generation sink: applyTransformation (35% of generation).
==============================================================================
