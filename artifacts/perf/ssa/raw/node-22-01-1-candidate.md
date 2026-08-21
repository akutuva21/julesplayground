
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     14.9       8.9        -        6.1      0.5
binding_AB (bimolecular)                        3       2     10.8       4.4        -       12.0      0.3
multisite_4 (2^4 species, combinatorial)       16      64     11.6      22.3        -      381.2    -10.8
multisite_5 (2^5 species, combinatorial)       32     160     10.2      35.3        -      274.3     -3.8
multisite_7 (2^7 species, combinatorial)      128     896     11.5     167.4        -      577.9     -8.9

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=3.971 min=3.971 max=3.971
   samples_ms=[3.971] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=6.149 min=6.149 max=6.149
   samples_ms=[6.149] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=8.267 min=8.267 max=8.267
   samples_ms=[8.267] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.999 min=11.999 max=11.999
   samples_ms=[11.999] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=11.761 min=11.761 max=11.761
   samples_ms=[11.761] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=381.162 min=381.162 max=381.162
   samples_ms=[381.162] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=18.852 min=18.852 max=18.852
   samples_ms=[18.852] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=274.257 min=274.257 max=274.257
   samples_ms=[274.257] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=39.171 min=39.171 max=39.171
   samples_ms=[39.171] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=577.886 min=577.886 max=577.886
   samples_ms=[577.886] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 8.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  1.3     14%         4    321.40
  applyTransformation          0.9     10%         4    212.99
  speciesDedup                 0.2      2%         9     24.07
  canonicalize                 0.1      1%         5     13.90
  matchComponents              0.0      0%         5      1.65
  (instrumented sections account for 27% of gen wall; 1786.2 µs/species, 2232.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 4.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     10%         2    225.77
  findAllMaps                  0.3      6%         5     56.21
  speciesDedup                 0.1      3%         6     21.80
  canonicalize                 0.1      2%         3     33.16
  matchComponents              0.0      0%         6      1.35
  (instrumented sections account for 22% of gen wall; 1454.4 µs/species, 2181.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 22.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          6.4     29%        64    100.65
  findAllMaps                  3.8     17%        64     60.13
  speciesDedup                 0.8      4%        65     12.29
  matchComponents              0.8      4%        72     10.96
  canonicalize                 0.2      1%        16     11.00
  (instrumented sections account for 54% of gen wall; 1394.7 µs/species, 348.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 35.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.9     28%       160     61.59
  findAllMaps                  6.4     18%       160     40.23
  matchComponents              1.7      5%       176      9.64
  speciesDedup                 1.4      4%       161      8.92
  canonicalize                 0.2      1%        32      7.63
  (instrumented sections account for 56% of gen wall; 1102.4 µs/species, 220.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 167.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         62.0     37%       896     69.16
  findAllMaps                 36.8     22%       896     41.04
  matchComponents              9.1      5%       960      9.50
  speciesDedup                 7.0      4%       897      7.81
  canonicalize                 1.5      1%       128     11.99
  (instrumented sections account for 70% of gen wall; 1307.9 µs/species, 186.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1251.5  81%
   gen           238.3  15%
   parse          59.0  4%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        79.6  33% of gen
   findAllMaps                48.6  20% of gen
   matchComponents            11.6  5% of gen
   speciesDedup                9.6  4% of gen
   canonicalize                2.1  1% of gen

 >>> Biggest phase overall: ssa (1251.5 ms).
 >>> Biggest generation sink: applyTransformation (33% of generation).
==============================================================================
