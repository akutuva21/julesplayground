
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.4       3.6        -        1.5     -0.0
binding_AB (bimolecular)                        3       2      5.3       1.7        -       22.3      0.2
multisite_4 (2^4 species, combinatorial)       16      64      9.3      14.3        -      173.8      3.7
multisite_5 (2^5 species, combinatorial)       32     160      6.9      15.2        -      285.0      9.0
multisite_7 (2^7 species, combinatorial)      128     896      7.2      58.9        -      615.2    -12.5

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.903 min=1.903 max=1.903
   samples_ms=[1.903] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.514 min=1.514 max=1.514
   samples_ms=[1.514] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.495 min=1.495 max=1.495
   samples_ms=[1.495] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=22.306 min=22.306 max=22.306
   samples_ms=[22.306] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.128 min=4.128 max=4.128
   samples_ms=[4.128] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=173.835 min=173.835 max=173.835
   samples_ms=[173.835] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=17.522 min=17.522 max=17.522
   samples_ms=[17.522] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=285.014 min=285.014 max=285.014
   samples_ms=[285.014] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=14.441 min=14.441 max=14.441
   samples_ms=[14.441] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=615.192 min=615.192 max=615.192
   samples_ms=[615.192] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     17%         4    147.41
  findAllMaps                  0.5     13%         4    115.90
  speciesDedup                 0.1      4%         9     15.31
  canonicalize                 0.0      0%         5      2.13
  matchComponents              0.0      0%         5      1.27
  (instrumented sections account for 34% of gen wall; 710.3 µs/species, 887.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     63.63
  findAllMaps                  0.1      7%         5     23.10
  speciesDedup                 0.0      2%         6      5.49
  matchComponents              0.0      0%         6      1.06
  canonicalize                 0.0      0%         3      1.03
  (instrumented sections account for 17% of gen wall; 568.1 µs/species, 852.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.3     23%        64     51.74
  applyTransformation          1.2      8%        64     18.20
  matchComponents              0.8      6%        72     11.66
  speciesDedup                 0.7      5%        65     10.97
  canonicalize                 0.2      1%        16     13.32
  (instrumented sections account for 44% of gen wall; 892.4 µs/species, 223.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 15.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  4.1     27%       160     25.57
  applyTransformation          1.3      9%       160      8.20
  matchComponents              0.9      6%       176      5.09
  speciesDedup                 0.9      6%       161      5.46
  canonicalize                 0.1      1%        32      4.62
  (instrumented sections account for 48% of gen wall; 475.3 µs/species, 95.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 58.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 16.0     27%       896     17.86
  speciesDedup                 6.1     10%       897      6.76
  matchComponents              5.5      9%       960      5.74
  applyTransformation          4.6      8%       896      5.19
  canonicalize                 0.6      1%       128      4.89
  (instrumented sections account for 56% of gen wall; 459.8 µs/species, 65.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1097.9  89%
   gen            93.6  8%
   parse          37.1  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                24.0  26% of gen
   applyTransformation         7.8  8% of gen
   speciesDedup                7.8  8% of gen
   matchComponents             7.3  8% of gen
   canonicalize                1.0  1% of gen

 >>> Biggest phase overall: ssa (1097.9 ms).
 >>> Biggest generation sink: findAllMaps (26% of generation).
==============================================================================
