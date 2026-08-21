
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.5       3.6        -        1.9      0.5
binding_AB (bimolecular)                        3       2      5.9       2.1        -       19.2      0.3
multisite_4 (2^4 species, combinatorial)       16      64     11.0      21.9        -      168.3      4.7
multisite_5 (2^5 species, combinatorial)       32     160      5.8      17.9        -      299.4     11.3
multisite_7 (2^7 species, combinatorial)      128     896     10.9      86.1        -      610.7      9.9

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.341 min=2.341 max=2.341
   samples_ms=[2.341] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.854 min=1.854 max=1.854
   samples_ms=[1.854] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.988 min=1.988 max=1.988
   samples_ms=[1.988] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=19.158 min=19.158 max=19.158
   samples_ms=[19.158] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.332 min=4.332 max=4.332
   samples_ms=[4.332] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=168.280 min=168.280 max=168.280
   samples_ms=[168.280] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.329 min=15.329 max=15.329
   samples_ms=[15.329] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=299.394 min=299.394 max=299.394
   samples_ms=[299.394] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=27.979 min=27.979 max=27.979
   samples_ms=[27.979] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=610.667 min=610.667 max=610.667
   samples_ms=[610.667] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     18%         4    166.05
  applyTransformation          0.5     15%         4    132.15
  speciesDedup                 0.1      3%         9     13.04
  canonicalize                 0.0      1%         5      4.18
  matchComponents              0.0      0%         5      1.37
  (instrumented sections account for 37% of gen wall; 719.3 µs/species, 899.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 2.1 ms) ---
  section                       ms   % gen     calls   µs/call
  speciesDedup                 0.2      9%         6     31.03
  applyTransformation          0.1      7%         2     67.06
  findAllMaps                  0.1      6%         5     22.91
  canonicalize                 0.0      1%         3      5.72
  matchComponents              0.0      0%         6      1.22
  (instrumented sections account for 22% of gen wall; 686.8 µs/species, 1030.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 21.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          6.3     29%        64     98.90
  findAllMaps                  3.8     17%        64     59.19
  matchComponents              0.8      4%        72     11.68
  speciesDedup                 0.8      4%        65     12.80
  canonicalize                 0.2      1%        16     10.75
  (instrumented sections account for 55% of gen wall; 1370.1 µs/species, 342.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 17.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.9     22%       160     24.43
  findAllMaps                  3.8     21%       160     23.54
  speciesDedup                 0.9      5%       161      5.84
  matchComponents              0.9      5%       176      4.95
  canonicalize                 0.2      1%        32      5.93
  (instrumented sections account for 54% of gen wall; 560.4 µs/species, 112.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 86.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         24.6     29%       896     27.40
  findAllMaps                 20.8     24%       896     23.20
  matchComponents              5.9      7%       960      6.11
  speciesDedup                 5.2      6%       897      5.78
  canonicalize                 0.7      1%       128      5.57
  (instrumented sections account for 66% of gen wall; 673.0 µs/species, 96.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1099.4  86%
   gen           131.7  10%
   parse          42.1  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        35.5  27% of gen
   findAllMaps                29.1  22% of gen
   matchComponents             7.6  6% of gen
   speciesDedup                7.3  6% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1099.4 ms).
 >>> Biggest generation sink: applyTransformation (27% of generation).
==============================================================================
