
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1, t_end=100
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      8.2       8.4        -        2.1    -10.0
binding_AB (bimolecular)                        3       2      7.5       2.0        -       16.6      0.2
multisite_4 (2^4 species, combinatorial)       16      64     11.5      11.6        -      131.8      3.2
multisite_5 (2^5 species, combinatorial)       32     160      9.4      23.5        -      275.3     -7.1
multisite_7 (2^7 species, combinatorial)      128     896      9.6      76.2        -      567.4     -2.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.935 min=1.935 max=1.935
   samples_ms=[1.935] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=2.085 min=2.085 max=2.085
   samples_ms=[2.085] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.517 min=1.517 max=1.517
   samples_ms=[1.517] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=16.631 min=16.631 max=16.631
   samples_ms=[16.631] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=1 | median=11.265 min=11.265 max=11.265
   samples_ms=[11.265] trajectory_hash=1145dd03d533725d3386b6248a96117b7f95452fc7bd87a1dc19d1673d827189
 multisite_4 (2^4 species, combinatorial) | ssa:t_end=100 | median=131.825 min=131.825 max=131.825
   samples_ms=[131.825] trajectory_hash=c86359bac268421260d6af308d501867d86fa513a17434489281cc11c682d600
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.407 min=14.407 max=14.407
   samples_ms=[14.407] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=275.279 min=275.279 max=275.279
   samples_ms=[275.279] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=21.764 min=21.764 max=21.764
   samples_ms=[21.764] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=567.370 min=567.370 max=567.370
   samples_ms=[567.370] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 8.4 ms) ---
  section                       ms   % gen     calls   µs/call
  speciesDedup                 4.2     50%         9    467.87
  findAllMaps                  0.7      9%         4    187.10
  applyTransformation          0.4      5%         4    106.60
  canonicalize                 0.0      0%         5      1.93
  matchComponents              0.0      0%         5      1.52
  (instrumented sections account for 65% of gen wall; 1673.6 µs/species, 2092.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 2.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     11%         2    109.97
  findAllMaps                  0.1      7%         5     27.01
  speciesDedup                 0.1      4%         6     12.62
  matchComponents              0.0      0%         6      1.29
  canonicalize                 0.0      0%         3      1.70
  (instrumented sections account for 22% of gen wall; 666.1 µs/species, 999.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_4 (2^4 species, combinatorial)  (gen wall 11.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  2.6     22%        64     40.02
  applyTransformation          0.8      7%        64     13.06
  matchComponents              0.7      6%        72     10.28
  speciesDedup                 0.7      6%        65     11.25
  canonicalize                 0.2      2%        16     12.46
  (instrumented sections account for 44% of gen wall; 725.2 µs/species, 181.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 23.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.8     24%       160     35.95
  applyTransformation          3.4     14%       160     21.08
  matchComponents              1.5      6%       176      8.54
  speciesDedup                 1.3      5%       161      7.85
  canonicalize                 0.2      1%        32      5.88
  (instrumented sections account for 51% of gen wall; 734.7 µs/species, 146.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 76.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 20.3     27%       896     22.64
  applyTransformation         10.1     13%       896     11.28
  matchComponents              5.4      7%       960      5.63
  speciesDedup                 5.4      7%       897      5.98
  canonicalize                 1.0      1%       128      8.16
  (instrumented sections account for 55% of gen wall; 595.1 µs/species, 85.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           993.2  86%
   gen           121.6  10%
   parse          46.2  4%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                29.5  24% of gen
   applyTransformation        15.0  12% of gen
   speciesDedup               11.6  10% of gen
   matchComponents             7.7  6% of gen
   canonicalize                1.4  1% of gen

 >>> Biggest phase overall: ssa (993.2 ms).
 >>> Biggest generation sink: findAllMaps (24% of generation).
==============================================================================
