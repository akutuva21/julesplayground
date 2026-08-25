
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      5.2       3.5        -        2.2     -0.0
binding_AB (bimolecular)                        3       2      3.4       1.8        -        1.4     -0.2
multisite_5 (2^5 species, combinatorial)       32     160      6.4      37.2        -       22.8    -17.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.229 min=2.229 max=2.229
   samples_ms=[2.229] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.433 min=1.433 max=1.433
   samples_ms=[1.433] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=22.788 min=22.788 max=22.788
   samples_ms=[22.788] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     17%         4    148.87
  findAllMaps                  0.5     14%         4    125.47
  speciesDedup                 0.2      6%         9     24.43
  canonicalize                 0.1      2%         5     10.61
  matchComponents              0.0      0%         5      1.39
  (instrumented sections account for 39% of gen wall; 705.4 µs/species, 881.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     10%         5     38.23
  applyTransformation          0.1      8%         2     72.60
  speciesDedup                 0.0      1%         6      3.86
  matchComponents              0.0      0%         6      1.20
  canonicalize                 0.0      0%         3      1.08
  (instrumented sections account for 20% of gen wall; 611.8 µs/species, 917.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 37.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 13.5     36%       160     84.08
  applyTransformation          3.3      9%       160     20.47
  speciesDedup                 2.4      6%       161     14.60
  matchComponents              1.5      4%       176      8.78
  canonicalize                 0.8      2%        32     24.27
  (instrumented sections account for 58% of gen wall; 1161.2 µs/species, 232.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            42.5  51%
   ssa            26.4  32%
   parse          14.9  18%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                14.1  33% of gen
   applyTransformation         4.0  9% of gen
   speciesDedup                2.6  6% of gen
   matchComponents             1.6  4% of gen
   canonicalize                0.8  2% of gen

 >>> Biggest phase overall: gen (42.5 ms).
 >>> Biggest generation sink: findAllMaps (33% of generation).
==============================================================================
