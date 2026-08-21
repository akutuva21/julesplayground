
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.7       3.0        -        1.5      0.5
binding_AB (bimolecular)                        3       2      4.7       1.7        -       15.7     -0.1
multisite_4 (2^4 species, combinatorial)       16      64      9.0      13.8        -      169.1      3.7
multisite_5 (2^5 species, combinatorial)       32     160      6.0      16.1        -      335.7    -22.5
multisite_7 (2^7 species, combinatorial)      128     896      7.0      58.9        -      599.0     19.6

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.853 min=1.853 max=1.853
   samples_ms=[1.853] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.477 min=1.477 max=1.477
   samples_ms=[1.477] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.340 min=1.340 max=1.340
   samples_ms=[1.340] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.736 min=15.736 max=15.736
   samples_ms=[15.736] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.082 min=4.082 max=4.082
   samples_ms=[4.082] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=169.065 min=169.065 max=169.065
   samples_ms=[169.065] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.726 min=15.726 max=15.726
   samples_ms=[15.726] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=335.679 min=335.679 max=335.679
   samples_ms=[335.679] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.504 min=15.504 max=15.504
   samples_ms=[15.504] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=598.988 min=598.988 max=598.988
   samples_ms=[598.988] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     16%         4    124.25
  findAllMaps                  0.4     13%         4     95.16
  speciesDedup                 0.1      4%         9     13.11
  canonicalize                 0.0      0%         5      1.37
  matchComponents              0.0      0%         5      1.34
  (instrumented sections account for 33% of gen wall; 608.4 µs/species, 760.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     71.15
  findAllMaps                  0.1      6%         5     21.16
  speciesDedup                 0.0      1%         6      4.10
  matchComponents              0.0      1%         6      2.59
  canonicalize                 0.0      0%         3      1.06
  (instrumented sections account for 17% of gen wall; 563.7 µs/species, 845.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 13.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.3     24%        64     51.96
  applyTransformation          1.0      7%        64     15.26
  speciesDedup                 0.8      6%        65     12.23
  matchComponents              0.8      6%        72     10.55
  canonicalize                 0.2      1%        16     12.30
  (instrumented sections account for 44% of gen wall; 860.1 µs/species, 215.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 16.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.8     24%       160     23.78
  applyTransformation          1.5      9%       160      9.40
  speciesDedup                 1.0      6%       161      5.97
  matchComponents              0.8      5%       176      4.55
  canonicalize                 0.1      1%        32      4.44
  (instrumented sections account for 45% of gen wall; 503.1 µs/species, 100.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 58.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 18.8     32%       896     20.93
  matchComponents              8.1     14%       960      8.43
  speciesDedup                 4.4      8%       897      4.93
  applyTransformation          4.3      7%       896      4.80
  canonicalize                 0.7      1%       128      5.16
  (instrumented sections account for 62% of gen wall; 459.8 µs/species, 65.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1120.9  90%
   gen            93.4  7%
   parse          34.4  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                26.4  28% of gen
   matchComponents             9.7  10% of gen
   applyTransformation         7.4  8% of gen
   speciesDedup                6.3  7% of gen
   canonicalize                1.0  1% of gen

 >>> Biggest phase overall: ssa (1120.9 ms).
 >>> Biggest generation sink: findAllMaps (28% of generation).
==============================================================================
