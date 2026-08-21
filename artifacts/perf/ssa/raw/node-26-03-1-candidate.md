
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.4       3.3        -        1.5      0.5
binding_AB (bimolecular)                        3       2      4.7       1.5        -       15.4      0.2
multisite_4 (2^4 species, combinatorial)       16      64      9.5      15.6        -      172.6      3.5
multisite_5 (2^5 species, combinatorial)       32     160      6.7      15.1        -      288.1      9.0
multisite_7 (2^7 species, combinatorial)      128     896      7.2      58.3        -      612.0     19.3

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.006 min=2.006 max=2.006
   samples_ms=[2.006] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.542 min=1.542 max=1.542
   samples_ms=[1.542] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.485 min=1.485 max=1.485
   samples_ms=[1.485] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.392 min=15.392 max=15.392
   samples_ms=[15.392] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.393 min=4.393 max=4.393
   samples_ms=[4.393] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=172.576 min=172.576 max=172.576
   samples_ms=[172.576] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.738 min=15.738 max=15.738
   samples_ms=[15.738] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=288.103 min=288.103 max=288.103
   samples_ms=[288.103] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=17.111 min=17.111 max=17.111
   samples_ms=[17.111] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=612.050 min=612.050 max=612.050
   samples_ms=[612.050] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.5     15%         4    125.57
  applyTransformation          0.5     14%         4    118.48
  speciesDedup                 0.1      4%         9     14.88
  matchComponents              0.0      0%         5      1.45
  canonicalize                 0.0      0%         5      1.38
  (instrumented sections account for 34% of gen wall; 660.9 µs/species, 826.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     10%         5     30.55
  applyTransformation          0.1      8%         2     59.60
  speciesDedup                 0.0      1%         6      3.30
  matchComponents              0.0      1%         6      1.63
  canonicalize                 0.0      0%         3      0.95
  (instrumented sections account for 20% of gen wall; 509.0 µs/species, 763.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 15.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.7     24%        64     57.49
  applyTransformation          1.1      7%        64     17.66
  speciesDedup                 0.8      5%        65     12.33
  matchComponents              0.8      5%        72     10.54
  canonicalize                 0.2      1%        16     13.38
  (instrumented sections account for 42% of gen wall; 975.3 µs/species, 243.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 15.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.9     26%       160     24.55
  applyTransformation          1.6     10%       160      9.81
  speciesDedup                 1.1      8%       161      7.14
  matchComponents              0.9      6%       176      4.91
  canonicalize                 0.2      1%        32      6.82
  (instrumented sections account for 51% of gen wall; 471.6 µs/species, 94.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 58.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.7     27%       896     17.50
  matchComponents              5.4      9%       960      5.62
  speciesDedup                 4.7      8%       897      5.28
  applyTransformation          4.6      8%       896      5.10
  canonicalize                 0.7      1%       128      5.10
  (instrumented sections account for 53% of gen wall; 455.2 µs/species, 65.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1089.7  89%
   gen            93.8  8%
   parse          36.5  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                23.9  26% of gen
   applyTransformation         7.9  8% of gen
   matchComponents             7.0  8% of gen
   speciesDedup                6.8  7% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1089.7 ms).
 >>> Biggest generation sink: findAllMaps (26% of generation).
==============================================================================
