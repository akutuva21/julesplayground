
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.1       4.1        -        2.2      0.5
binding_AB (bimolecular)                        3       2      6.8       2.0        -       11.3      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.4      15.2        -      271.5      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.7      34.1        -      281.7     -3.7
multisite_7 (2^7 species, combinatorial)      128     896      9.6     136.6        -      592.9      2.0

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.027 min=2.027 max=2.027
   samples_ms=[2.027] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.189 min=2.189 max=2.189
   samples_ms=[2.189] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.857 min=3.857 max=3.857
   samples_ms=[3.857] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=11.333 min=11.333 max=11.333
   samples_ms=[11.333] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.215 min=8.215 max=8.215
   samples_ms=[8.215] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=271.467 min=271.467 max=271.467
   samples_ms=[271.467] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=13.591 min=13.591 max=13.591
   samples_ms=[13.591] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=281.682 min=281.682 max=281.682
   samples_ms=[281.682] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=34.663 min=34.663 max=34.663
   samples_ms=[34.663] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=592.922 min=592.922 max=592.922
   samples_ms=[592.922] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     17%         4    177.38
  applyTransformation          0.4      9%         4     92.29
  speciesDedup                 0.1      3%         9     12.47
  canonicalize                 0.0      0%         5      3.70
  matchComponents              0.0      0%         5      1.35
  (instrumented sections account for 30% of gen wall; 819.4 µs/species, 1024.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 2.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     67.82
  findAllMaps                  0.1      6%         5     22.54
  speciesDedup                 0.0      3%         6      8.32
  canonicalize                 0.0      1%         3      5.10
  matchComponents              0.0      0%         6      1.06
  (instrumented sections account for 16% of gen wall; 658.7 µs/species, 988.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 15.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.5     23%        64     55.15
  findAllMaps                  2.9     19%        64     44.86
  speciesDedup                 0.7      5%        65     10.75
  matchComponents              0.7      4%        72      9.30
  canonicalize                 0.1      1%        16      7.28
  (instrumented sections account for 52% of gen wall; 951.9 µs/species, 238.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 34.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.4     28%       160     58.87
  findAllMaps                  6.6     19%       160     41.00
  matchComponents              1.6      5%       176      9.12
  speciesDedup                 1.4      4%       161      8.89
  canonicalize                 0.2      1%        32      6.38
  (instrumented sections account for 56% of gen wall; 1067.0 µs/species, 213.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 136.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         46.8     34%       896     52.21
  findAllMaps                 30.6     22%       896     34.13
  speciesDedup                 6.4      5%       897      7.12
  matchComponents              6.4      5%       960      6.64
  canonicalize                 1.3      1%       128      9.79
  (instrumented sections account for 67% of gen wall; 1067.5 µs/species, 152.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1159.6  83%
   gen           192.1  14%
   parse          44.6  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        60.2  31% of gen
   findAllMaps                40.8  21% of gen
   speciesDedup                8.7  5% of gen
   matchComponents             8.7  5% of gen
   canonicalize                1.6  1% of gen

 >>> Biggest phase overall: ssa (1159.6 ms).
 >>> Biggest generation sink: applyTransformation (31% of generation).
==============================================================================
