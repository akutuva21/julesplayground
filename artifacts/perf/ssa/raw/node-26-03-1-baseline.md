
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.2       3.2        -        1.8      0.5
binding_AB (bimolecular)                        3       2      4.9       1.8        -       15.5     -0.2
multisite_4 (2^4 species, combinatorial)       16      64      9.0      19.1        -      167.3      5.0
multisite_5 (2^5 species, combinatorial)       32     160      6.0      18.1        -      296.6     11.0
multisite_7 (2^7 species, combinatorial)      128     896      7.6      86.5        -      614.8      9.9

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.266 min=2.266 max=2.266
   samples_ms=[2.266] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.794 min=1.794 max=1.794
   samples_ms=[1.794] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.743 min=1.743 max=1.743
   samples_ms=[1.743] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=15.537 min=15.537 max=15.537
   samples_ms=[15.537] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=4.553 min=4.553 max=4.553
   samples_ms=[4.553] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=167.280 min=167.280 max=167.280
   samples_ms=[167.280] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.226 min=14.226 max=14.226
   samples_ms=[14.226] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=296.598 min=296.598 max=296.598
   samples_ms=[296.598] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=31.026 min=31.026 max=31.026
   samples_ms=[31.026] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=614.769 min=614.769 max=614.769
   samples_ms=[614.769] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.4     14%         4    108.81
  findAllMaps                  0.4     13%         4    107.73
  speciesDedup                 0.1      4%         9     14.52
  canonicalize                 0.0      1%         5      3.94
  matchComponents              0.0      0%         5      1.32
  (instrumented sections account for 32% of gen wall; 640.2 µs/species, 800.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.3     18%         2    157.83
  findAllMaps                  0.1      6%         5     20.07
  speciesDedup                 0.0      2%         6      7.00
  canonicalize                 0.0      1%         3      6.11
  matchComponents              0.0      0%         6      1.05
  (instrumented sections account for 27% of gen wall; 599.0 µs/species, 898.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 19.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          5.1     27%        64     79.83
  findAllMaps                  3.4     18%        64     53.31
  matchComponents              0.9      5%        72     12.04
  speciesDedup                 0.9      4%        65     13.10
  canonicalize                 0.2      1%        16      9.43
  (instrumented sections account for 54% of gen wall; 1191.7 µs/species, 297.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 18.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  3.8     21%       160     24.00
  applyTransformation          3.8     21%       160     23.63
  speciesDedup                 0.9      5%       161      5.67
  matchComponents              0.9      5%       176      4.90
  canonicalize                 0.2      1%        32      5.30
  (instrumented sections account for 53% of gen wall; 566.8 µs/species, 113.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 86.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         24.9     29%       896     27.75
  findAllMaps                 17.6     20%       896     19.66
  matchComponents              5.6      6%       960      5.81
  speciesDedup                 5.1      6%       897      5.69
  canonicalize                 0.7      1%       128      5.64
  (instrumented sections account for 62% of gen wall; 676.0 µs/species, 96.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1096.0  87%
   gen           128.7  10%
   parse          35.6  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        34.5  27% of gen
   findAllMaps                25.4  20% of gen
   matchComponents             7.3  6% of gen
   speciesDedup                7.0  5% of gen
   canonicalize                1.1  1% of gen

 >>> Biggest phase overall: ssa (1096.0 ms).
 >>> Biggest generation sink: applyTransformation (27% of generation).
==============================================================================
