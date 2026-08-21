
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.7       4.0        -        1.8      0.5
binding_AB (bimolecular)                        3       2      6.3       1.7        -       16.7      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.2      14.2        -      280.6      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.8      33.9        -      270.0     -3.9
multisite_7 (2^7 species, combinatorial)      128     896      9.4     164.8        -      559.4      5.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.072 min=2.072 max=2.072
   samples_ms=[2.072] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.840 min=1.840 max=1.840
   samples_ms=[1.840] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.604 min=1.604 max=1.604
   samples_ms=[1.604] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=16.745 min=16.745 max=16.745
   samples_ms=[16.745] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=12.211 min=12.211 max=12.211
   samples_ms=[12.211] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=280.558 min=280.558 max=280.558
   samples_ms=[280.558] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=17.711 min=17.711 max=17.711
   samples_ms=[17.711] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=270.003 min=270.003 max=270.003
   samples_ms=[270.003] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=37.041 min=37.041 max=37.041
   samples_ms=[37.041] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=559.367 min=559.367 max=559.367
   samples_ms=[559.367] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     19%         4    189.85
  applyTransformation          0.4     10%         4     95.99
  speciesDedup                 0.2      4%         9     17.40
  canonicalize                 0.1      2%         5     13.58
  matchComponents              0.0      0%         5      1.30
  (instrumented sections account for 35% of gen wall; 795.0 µs/species, 993.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     10%         2     88.52
  findAllMaps                  0.1      6%         5     20.95
  speciesDedup                 0.0      2%         6      6.32
  canonicalize                 0.0      1%         3      5.47
  matchComponents              0.0      0%         6      1.04
  (instrumented sections account for 20% of gen wall; 567.2 µs/species, 850.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.5     25%        64     54.34
  findAllMaps                  2.6     18%        64     40.44
  matchComponents              0.6      5%        72      8.89
  speciesDedup                 0.6      4%        65      9.52
  canonicalize                 0.1      1%        16      6.67
  (instrumented sections account for 52% of gen wall; 886.0 µs/species, 221.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 33.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         10.7     31%       160     66.64
  findAllMaps                  6.4     19%       160     40.12
  matchComponents              1.7      5%       176      9.54
  speciesDedup                 1.4      4%       161      8.68
  canonicalize                 0.2      1%        32      6.35
  (instrumented sections account for 60% of gen wall; 1059.9 µs/species, 212.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 164.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         57.5     35%       896     64.15
  findAllMaps                 30.5     19%       896     34.08
  speciesDedup                 9.8      6%       897     10.88
  matchComponents              9.2      6%       960      9.53
  canonicalize                 1.1      1%       128      8.92
  (instrumented sections account for 66% of gen wall; 1287.2 µs/species, 183.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1128.5  81%
   gen           218.5  16%
   parse          43.3  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        72.2  33% of gen
   findAllMaps                40.4  18% of gen
   speciesDedup               12.0  5% of gen
   matchComponents            11.5  5% of gen
   canonicalize                1.5  1% of gen

 >>> Biggest phase overall: ssa (1128.5 ms).
 >>> Biggest generation sink: applyTransformation (33% of generation).
==============================================================================
