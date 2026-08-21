
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      7.8       3.5        -        1.9      0.5
binding_AB (bimolecular)                        3       2      5.1       1.6        -       16.0      0.3
multisite_4 (2^4 species, combinatorial)       16      64      9.6      20.1        -      167.9      5.0
multisite_5 (2^5 species, combinatorial)       32     160      6.2      18.0        -      331.9     11.8
multisite_7 (2^7 species, combinatorial)      128     896      7.6      85.0        -      646.9     10.0

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.207 min=2.207 max=2.207
   samples_ms=[2.207] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.926 min=1.926 max=1.926
   samples_ms=[1.926] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.572 min=1.572 max=1.572
   samples_ms=[1.572] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.963 min=15.963 max=15.963
   samples_ms=[15.963] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.318 min=4.318 max=4.318
   samples_ms=[4.318] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=167.902 min=167.902 max=167.902
   samples_ms=[167.902] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.402 min=14.402 max=14.402
   samples_ms=[14.402] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=331.859 min=331.859 max=331.859
   samples_ms=[331.859] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=15.774 min=15.774 max=15.774
   samples_ms=[15.774] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=646.866 min=646.866 max=646.866
   samples_ms=[646.866] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     16%         4    143.06
  findAllMaps                  0.4     13%         4    109.24
  speciesDedup                 0.1      3%         9     13.52
  canonicalize                 0.0      1%         5      3.82
  matchComponents              0.0      0%         5      1.29
  (instrumented sections account for 33% of gen wall; 697.2 µs/species, 871.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1      9%         5     28.42
  applyTransformation          0.1      8%         2     63.83
  speciesDedup                 0.0      2%         6      6.36
  canonicalize                 0.0      1%         3      4.22
  matchComponents              0.0      0%         6      1.10
  (instrumented sections account for 20% of gen wall; 536.4 µs/species, 804.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 20.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.8     29%        64     91.32
  findAllMaps                  3.6     18%        64     55.75
  matchComponents              0.8      4%        72     11.63
  speciesDedup                 0.8      4%        65     12.40
  canonicalize                 0.2      1%        16      9.66
  (instrumented sections account for 56% of gen wall; 1255.1 µs/species, 313.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 18.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.8     21%       160     23.82
  findAllMaps                  3.7     21%       160     23.10
  speciesDedup                 1.0      6%       161      6.22
  matchComponents              0.8      4%       176      4.40
  canonicalize                 0.2      1%        32      6.70
  (instrumented sections account for 53% of gen wall; 562.7 µs/species, 112.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 85.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         27.0     32%       896     30.10
  findAllMaps                 17.3     20%       896     19.36
  matchComponents              5.8      7%       960      6.00
  speciesDedup                 4.9      6%       897      5.47
  canonicalize                 0.8      1%       128      5.93
  (instrumented sections account for 66% of gen wall; 663.9 µs/species, 94.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1164.5  88%
   gen           128.2  10%
   parse          36.2  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        37.3  29% of gen
   findAllMaps                25.2  20% of gen
   matchComponents             7.4  6% of gen
   speciesDedup                6.9  5% of gen
   canonicalize                1.2  1% of gen

 >>> Biggest phase overall: ssa (1164.5 ms).
 >>> Biggest generation sink: applyTransformation (29% of generation).
==============================================================================
