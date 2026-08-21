
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.4       3.6        -        1.9      0.5
binding_AB (bimolecular)                        3       2      4.8       2.0        -       22.3      0.3
multisite_4 (2^4 species, combinatorial)       16      64      8.7      19.7        -      174.7      4.8
multisite_5 (2^5 species, combinatorial)       32     160      5.9      18.9        -      327.7    -20.2
multisite_7 (2^7 species, combinatorial)      128     896      7.1      84.3        -      758.0     10.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.207 min=2.207 max=2.207
   samples_ms=[2.207] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.922 min=1.922 max=1.922
   samples_ms=[1.922] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.894 min=1.894 max=1.894
   samples_ms=[1.894] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=22.250 min=22.250 max=22.250
   samples_ms=[22.250] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.333 min=4.333 max=4.333
   samples_ms=[4.333] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=174.748 min=174.748 max=174.748
   samples_ms=[174.748] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=17.207 min=17.207 max=17.207
   samples_ms=[17.207] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=327.716 min=327.716 max=327.716
   samples_ms=[327.716] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=17.910 min=17.910 max=17.910
   samples_ms=[17.910] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=758.003 min=758.003 max=758.003
   samples_ms=[758.003] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.5     14%         4    126.42
  applyTransformation          0.5     13%         4    113.20
  speciesDedup                 0.1      3%         9     12.68
  canonicalize                 0.0      1%         5      5.38
  matchComponents              0.0      0%         5      2.08
  (instrumented sections account for 31% of gen wall; 723.9 µs/species, 904.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 2.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1      8%         5     29.64
  applyTransformation          0.1      7%         2     64.49
  speciesDedup                 0.0      2%         6      6.73
  canonicalize                 0.0      0%         3      3.06
  matchComponents              0.0      0%         6      1.31
  (instrumented sections account for 17% of gen wall; 655.5 µs/species, 983.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 19.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.4     27%        64     84.14
  findAllMaps                  3.4     17%        64     53.12
  speciesDedup                 1.0      5%        65     15.34
  matchComponents              0.7      4%        72     10.17
  canonicalize                 0.3      1%        16     17.82
  (instrumented sections account for 55% of gen wall; 1231.2 µs/species, 307.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 18.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.3     28%       160     33.03
  applyTransformation          3.8     20%       160     23.45
  speciesDedup                 1.1      6%       161      6.74
  matchComponents              0.8      4%       176      4.40
  canonicalize                 0.2      1%        32      7.05
  (instrumented sections account for 59% of gen wall; 590.4 µs/species, 118.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 84.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 21.9     26%       896     24.41
  applyTransformation         21.8     26%       896     24.31
  matchComponents              5.4      6%       960      5.65
  speciesDedup                 5.0      6%       897      5.62
  canonicalize                 0.7      1%       128      5.85
  (instrumented sections account for 65% of gen wall; 658.3 µs/species, 94.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1284.6  89%
   gen           128.4  9%
   parse          35.0  2%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        31.5  25% of gen
   findAllMaps                31.2  24% of gen
   speciesDedup                7.3  6% of gen
   matchComponents             6.9  5% of gen
   canonicalize                1.3  1% of gen

 >>> Biggest phase overall: ssa (1284.6 ms).
 >>> Biggest generation sink: applyTransformation (25% of generation).
==============================================================================
