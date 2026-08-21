
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     10.7      22.7        -        5.0     -9.8
binding_AB (bimolecular)                        3       2     10.1       3.6        -       34.5      0.2
multisite_4 (2^4 species, combinatorial)       16      64     11.6      10.8        -      133.8      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.4      23.4        -      273.3     -7.0
multisite_7 (2^7 species, combinatorial)      128     896      9.6      80.1        -      577.8     -1.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=4.420 min=4.420 max=4.420
   samples_ms=[4.420] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=5.021 min=5.021 max=5.021
   samples_ms=[5.021] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.632 min=3.632 max=3.632
   samples_ms=[3.632] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=34.466 min=34.466 max=34.466
   samples_ms=[34.466] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=11.310 min=11.310 max=11.310
   samples_ms=[11.310] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=133.766 min=133.766 max=133.766
   samples_ms=[133.766] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.674 min=14.674 max=14.674
   samples_ms=[14.674] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=273.265 min=273.265 max=273.265
   samples_ms=[273.265] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=19.216 min=19.216 max=19.216
   samples_ms=[19.216] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=577.801 min=577.801 max=577.801
   samples_ms=[577.801] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 22.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  1.3      6%         4    318.23
  applyTransformation          0.8      4%         4    204.79
  speciesDedup                 0.6      3%         9     65.29
  canonicalize                 0.0      0%         5      8.62
  matchComponents              0.0      0%         5      1.55
  (instrumented sections account for 12% of gen wall; 4544.6 µs/species, 5680.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.4     12%         2    208.90
  findAllMaps                  0.3      8%         5     56.60
  speciesDedup                 0.0      1%         6      4.70
  matchComponents              0.0      0%         6      1.47
  canonicalize                 0.0      0%         3      2.14
  (instrumented sections account for 21% of gen wall; 1186.6 µs/species, 1779.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 10.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.5     23%        64     39.36
  applyTransformation          0.7      7%        64     11.42
  matchComponents              0.7      6%        72      9.69
  speciesDedup                 0.6      5%        65      8.52
  canonicalize                 0.2      1%        16      9.47
  (instrumented sections account for 43% of gen wall; 673.8 µs/species, 168.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 23.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.6     24%       160     35.20
  applyTransformation          1.6      7%       160     10.29
  matchComponents              1.4      6%       176      8.09
  speciesDedup                 1.3      5%       161      7.78
  canonicalize                 0.2      1%        32      5.78
  (instrumented sections account for 43% of gen wall; 730.5 µs/species, 146.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 80.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 25.2     31%       896     28.10
  applyTransformation         10.9     14%       896     12.16
  matchComponents              5.2      7%       960      5.47
  speciesDedup                 5.2      6%       897      5.75
  canonicalize                 1.1      1%       128      8.67
  (instrumented sections account for 59% of gen wall; 625.8 µs/species, 89.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1024.3  84%
   gen           140.5  12%
   parse          51.4  4%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                34.9  25% of gen
   applyTransformation        14.5  10% of gen
   speciesDedup                7.6  5% of gen
   matchComponents             7.4  5% of gen
   canonicalize                1.5  1% of gen

 >>> Biggest phase overall: ssa (1024.3 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
