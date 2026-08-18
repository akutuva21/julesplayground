
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.1       4.1        -        2.2      0.5
binding_AB (bimolecular)                        3       2      6.7       1.9        -       12.1      0.3
multisite_4 (2^4 species, combinatorial)       16      64     10.4      14.3        -      276.7      4.4
multisite_5 (2^5 species, combinatorial)       32     160      9.6      34.5        -      280.4     -3.7
multisite_7 (2^7 species, combinatorial)      128     896      9.3     157.7        -      593.7      5.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.981 min=1.981 max=1.981
   samples_ms=[1.981] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.201 min=2.201 max=2.201
   samples_ms=[2.201] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.440 min=1.440 max=1.440
   samples_ms=[1.440] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=12.136 min=12.136 max=12.136
   samples_ms=[12.136] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=8.045 min=8.045 max=8.045
   samples_ms=[8.045] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=276.708 min=276.708 max=276.708
   samples_ms=[276.708] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=13.370 min=13.370 max=13.370
   samples_ms=[13.370] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=280.396 min=280.396 max=280.396
   samples_ms=[280.396] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=34.677 min=34.677 max=34.677
   samples_ms=[34.677] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=593.726 min=593.726 max=593.726
   samples_ms=[593.726] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     19%         4    189.65
  applyTransformation          0.4      9%         4     91.54
  speciesDedup                 0.1      3%         9     11.35
  canonicalize                 0.0      0%         5      3.89
  matchComponents              0.0      0%         5      1.56
  (instrumented sections account for 31% of gen wall; 810.7 µs/species, 1013.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     65.15
  findAllMaps                  0.1      6%         5     22.16
  speciesDedup                 0.0      2%         6      6.69
  canonicalize                 0.0      1%         3      5.20
  matchComponents              0.0      0%         6      1.08
  (instrumented sections account for 16% of gen wall; 624.5 µs/species, 936.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 14.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          3.4     24%        64     53.60
  findAllMaps                  2.7     19%        64     42.66
  matchComponents              0.8      5%        72     10.56
  speciesDedup                 0.6      4%        65      8.62
  canonicalize                 0.1      1%        16      6.82
  (instrumented sections account for 53% of gen wall; 891.9 µs/species, 223.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 34.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          9.3     27%       160     58.29
  findAllMaps                  6.5     19%       160     40.38
  matchComponents              1.7      5%       176      9.55
  speciesDedup                 1.4      4%       161      8.43
  canonicalize                 0.2      1%        32      7.54
  (instrumented sections account for 55% of gen wall; 1078.3 µs/species, 215.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 157.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation         49.8     32%       896     55.62
  findAllMaps                 40.2     26%       896     44.89
  matchComponents             11.0      7%       960     11.48
  speciesDedup                 6.6      4%       897      7.31
  canonicalize                 1.4      1%       128     10.61
  (instrumented sections account for 69% of gen wall; 1231.9 µs/species, 176.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa          1165.2  82%
   gen           212.4  15%
   parse          44.1  3%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   applyTransformation        63.1  30% of gen
   findAllMaps                50.3  24% of gen
   matchComponents            13.5  6% of gen
   speciesDedup                8.6  4% of gen
   canonicalize                1.7  1% of gen

 >>> Biggest phase overall: ssa (1165.2 ms).
 >>> Biggest generation sink: applyTransformation (30% of generation).
==============================================================================
