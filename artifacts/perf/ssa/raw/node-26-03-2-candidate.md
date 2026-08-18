
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.3       3.4        -        2.1      0.5
binding_AB (bimolecular)                        3       2      4.9       1.6        -       14.4      0.3
multisite_4 (2^4 species, combinatorial)       16      64      8.7      19.2        -      165.8      5.0
multisite_5 (2^5 species, combinatorial)       32     160      5.8      19.8        -      312.5     12.1
multisite_7 (2^7 species, combinatorial)      128     896      7.3      88.2        -      894.6     10.6

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.099 min=2.099 max=2.099
   samples_ms=[2.099] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.063 min=2.063 max=2.063
   samples_ms=[2.063] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.671 min=1.671 max=1.671
   samples_ms=[1.671] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=14.434 min=14.434 max=14.434
   samples_ms=[14.434] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=3.971 min=3.971 max=3.971
   samples_ms=[3.971] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=165.776 min=165.776 max=165.776
   samples_ms=[165.776] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=18.144 min=18.144 max=18.144
   samples_ms=[18.144] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=312.478 min=312.478 max=312.478
   samples_ms=[312.478] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=18.619 min=18.619 max=18.619
   samples_ms=[18.619] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=894.564 min=894.564 max=894.564
   samples_ms=[894.564] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     16%         4    132.95
  findAllMaps                  0.4     13%         4    110.63
  speciesDedup                 0.1      4%         9     13.14
  canonicalize                 0.0      1%         5      3.95
  matchComponents              0.0      0%         5      1.38
  (instrumented sections account for 33% of gen wall; 673.0 µs/species, 841.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     61.70
  findAllMaps                  0.1      7%         5     21.59
  speciesDedup                 0.0      2%         6      6.09
  canonicalize                 0.0      1%         3      3.15
  matchComponents              0.0      0%         6      1.09
  (instrumented sections account for 18% of gen wall; 531.0 µs/species, 796.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 19.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.3     28%        64     83.22
  findAllMaps                  3.3     17%        64     50.91
  speciesDedup                 0.8      4%        65     12.39
  matchComponents              0.8      4%        72     10.54
  canonicalize                 0.2      1%        16      9.47
  (instrumented sections account for 54% of gen wall; 1197.2 µs/species, 299.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 19.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.1     26%       160     31.76
  findAllMaps                  4.1     21%       160     25.68
  matchComponents              1.2      6%       176      6.54
  speciesDedup                 1.1      5%       161      6.57
  canonicalize                 0.2      1%        32      7.35
  (instrumented sections account for 59% of gen wall; 619.1 µs/species, 123.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 88.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 23.2     26%       896     25.89
  applyTransformation         22.9     26%       896     25.58
  matchComponents              8.7     10%       960      9.10
  speciesDedup                 5.1      6%       897      5.64
  canonicalize                 0.9      1%       128      6.67
  (instrumented sections account for 69% of gen wall; 689.2 µs/species, 98.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1389.3  89%
   gen           132.1  8%
   parse          35.1  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        34.0  26% of gen
   findAllMaps                31.1  24% of gen
   matchComponents            10.7  8% of gen
   speciesDedup                7.1  5% of gen
   canonicalize                1.3  1% of gen

 >>> Biggest phase overall: ssa (1389.3 ms).
 >>> Biggest generation sink: applyTransformation (26% of generation).
==============================================================================
