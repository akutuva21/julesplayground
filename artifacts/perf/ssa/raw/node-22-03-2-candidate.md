
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.8       4.1        -        2.2      0.5
binding_AB (bimolecular)                        3       2      6.4       1.8        -       14.3      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.6      14.4        -      281.3      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.9      34.3        -      268.5     -4.0
multisite_7 (2^7 species, combinatorial)      128     896     10.1     161.6        -      560.6     -9.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.780 min=1.780 max=1.780
   samples_ms=[1.780] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.199 min=2.199 max=2.199
   samples_ms=[2.199] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.698 min=3.698 max=3.698
   samples_ms=[3.698] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=14.342 min=14.342 max=14.342
   samples_ms=[14.342] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=13.252 min=13.252 max=13.252
   samples_ms=[13.252] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=281.322 min=281.322 max=281.322
   samples_ms=[281.322] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.370 min=15.370 max=15.370
   samples_ms=[15.370] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=268.514 min=268.514 max=268.514
   samples_ms=[268.514] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=38.245 min=38.245 max=38.245
   samples_ms=[38.245] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=560.603 min=560.603 max=560.603
   samples_ms=[560.603] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     18%         4    184.87
  applyTransformation          0.4      9%         4     89.42
  speciesDedup                 0.1      3%         9     11.80
  canonicalize                 0.0      0%         5      4.06
  matchComponents              0.0      0%         5      1.33
  (instrumented sections account for 30% of gen wall; 829.3 µs/species, 1036.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     10%         5     37.09
  applyTransformation          0.1      7%         2     66.64
  speciesDedup                 0.0      2%         6      5.97
  canonicalize                 0.0      1%         3      3.59
  matchComponents              0.0      0%         6      1.17
  (instrumented sections account for 20% of gen wall; 615.6 µs/species, 923.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.5     24%        64     54.90
  findAllMaps                  2.7     18%        64     41.49
  matchComponents              0.7      5%        72     10.07
  speciesDedup                 0.7      5%        65     10.86
  canonicalize                 0.1      1%        16      6.75
  (instrumented sections account for 54% of gen wall; 899.5 µs/species, 224.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 34.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.3     27%       160     57.84
  findAllMaps                  6.4     19%       160     40.27
  speciesDedup                 2.0      6%       161     12.28
  matchComponents              1.6      5%       176      9.24
  canonicalize                 0.3      1%        32      8.12
  (instrumented sections account for 57% of gen wall; 1070.7 µs/species, 214.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 161.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         57.9     36%       896     64.67
  findAllMaps                 29.9     19%       896     33.39
  matchComponents             10.5      6%       960     10.91
  speciesDedup                 9.2      6%       897     10.21
  canonicalize                 1.4      1%       128     10.96
  (instrumented sections account for 67% of gen wall; 1262.2 µs/species, 180.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1127.0  81%
   gen           216.2  16%
   parse          44.8  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        71.2  33% of gen
   findAllMaps                39.9  18% of gen
   matchComponents            12.8  6% of gen
   speciesDedup               12.0  6% of gen
   canonicalize                1.8  1% of gen

 >>> Biggest phase overall: ssa (1127.0 ms).
 >>> Biggest generation sink: applyTransformation (33% of generation).
==============================================================================
