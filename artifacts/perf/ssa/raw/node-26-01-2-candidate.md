
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.9       3.1        -        1.5      0.5
binding_AB (bimolecular)                        3       2      4.6       1.5        -       14.9      0.2
multisite_4 (2^4 species, combinatorial)       16      64      8.7      13.7        -      169.3      3.5
multisite_5 (2^5 species, combinatorial)       32     160      6.4      14.5        -      289.5      8.9
multisite_7 (2^7 species, combinatorial)      128     896      7.5      57.6        -      834.4     19.3

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.882 min=1.882 max=1.882
   samples_ms=[1.882] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.490 min=1.490 max=1.490
   samples_ms=[1.490] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.364 min=1.364 max=1.364
   samples_ms=[1.364] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=14.888 min=14.888 max=14.888
   samples_ms=[14.888] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.365 min=4.365 max=4.365
   samples_ms=[4.365] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=169.326 min=169.326 max=169.326
   samples_ms=[169.326] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.479 min=15.479 max=15.479
   samples_ms=[15.479] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=289.522 min=289.522 max=289.522
   samples_ms=[289.522] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=30.023 min=30.023 max=30.023
   samples_ms=[30.023] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=834.366 min=834.366 max=834.366
   samples_ms=[834.366] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     15%         4    120.46
  findAllMaps                  0.4     14%         4    107.85
  speciesDedup                 0.1      4%         9     14.52
  matchComponents              0.0      0%         5      2.20
  canonicalize                 0.0      0%         5      1.41
  (instrumented sections account for 34% of gen wall; 622.0 µs/species, 777.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     57.90
  findAllMaps                  0.1      7%         5     20.19
  speciesDedup                 0.0      1%         6      3.38
  matchComponents              0.0      0%         6      1.06
  canonicalize                 0.0      0%         3      1.11
  (instrumented sections account for 17% of gen wall; 491.0 µs/species, 736.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 13.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.3     24%        64     52.24
  applyTransformation          1.0      7%        64     15.54
  matchComponents              0.8      6%        72     10.49
  speciesDedup                 0.8      5%        65     11.55
  canonicalize                 0.2      1%        16     12.05
  (instrumented sections account for 44% of gen wall; 855.1 µs/species, 213.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 14.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.7     26%       160     23.24
  applyTransformation          1.4     10%       160      8.81
  speciesDedup                 1.1      7%       161      6.53
  matchComponents              0.8      5%       176      4.47
  canonicalize                 0.3      2%        32      9.73
  (instrumented sections account for 50% of gen wall; 454.5 µs/species, 90.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 57.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.7     27%       896     17.51
  speciesDedup                 7.0     12%       897      7.78
  matchComponents              5.2      9%       960      5.46
  applyTransformation          4.4      8%       896      4.87
  canonicalize                 0.6      1%       128      4.91
  (instrumented sections account for 57% of gen wall; 449.9 µs/species, 64.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1309.6  91%
   gen            90.4  6%
   parse          35.1  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                23.3  26% of gen
   speciesDedup                8.9  10% of gen
   applyTransformation         7.4  8% of gen
   matchComponents             6.8  8% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1309.6 ms).
 >>> Biggest generation sink: findAllMaps (26% of generation).
==============================================================================
