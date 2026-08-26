
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      6.0       6.8        -        3.8      0.5
binding_AB (bimolecular)                        3       2      3.4      16.1        -        3.2    -10.0
multisite_5 (2^5 species, combinatorial)       32     160     27.0      24.4        -       18.0      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=3.811 min=3.811 max=3.811
   samples_ms=[3.811] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.198 min=3.198 max=3.198
   samples_ms=[3.198] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=18.006 min=18.006 max=18.006
   samples_ms=[18.006] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 6.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  1.1     16%         4    266.95
  applyTransformation          0.7     10%         4    173.85
  speciesDedup                 0.3      4%         9     33.80
  canonicalize                 0.0      0%         5      6.42
  matchComponents              0.0      0%         5      1.48
  (instrumented sections account for 31% of gen wall; 1355.2 µs/species, 1694.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 16.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.3      2%         2    146.48
  findAllMaps                  0.2      1%         5     34.16
  speciesDedup                 0.0      0%         6      3.46
  matchComponents              0.0      0%         6      1.33
  canonicalize                 0.0      0%         3      0.96
  (instrumented sections account for 3% of gen wall; 5367.9 µs/species, 8051.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 24.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.4     26%       160     39.98
  applyTransformation          1.8      7%       160     11.37
  speciesDedup                 1.8      7%       161     11.05
  matchComponents              1.6      7%       176      9.29
  canonicalize                 0.7      3%        32     20.63
  (instrumented sections account for 50% of gen wall; 763.7 µs/species, 152.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            47.3  44%
   parse          36.4  33%
   ssa            25.0  23%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.6  16% of gen
   applyTransformation         2.8  6% of gen
   speciesDedup                2.1  4% of gen
   matchComponents             1.6  3% of gen
   canonicalize                0.7  1% of gen

 >>> Biggest phase overall: gen (47.3 ms).
 >>> Biggest generation sink: findAllMaps (16% of generation).
==============================================================================
