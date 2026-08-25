
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4     10.3       8.3        -        5.2      0.5
binding_AB (bimolecular)                        3       2      6.4       3.1        -        2.8      0.2
multisite_5 (2^5 species, combinatorial)       32     160     12.3      60.4        -       50.4      8.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=5.204 min=5.204 max=5.204
   samples_ms=[5.204] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=2.772 min=2.772 max=2.772
   samples_ms=[2.772] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=50.353 min=50.353 max=50.353
   samples_ms=[50.353] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 8.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          1.3     16%         4    330.51
  findAllMaps                  1.3     15%         4    321.38
  speciesDedup                 0.3      3%         9     28.42
  canonicalize                 0.0      0%         5      4.77
  matchComponents              0.0      0%         5      2.22
  (instrumented sections account for 35% of gen wall; 1667.6 µs/species, 2084.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 3.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.3     10%         5     61.71
  applyTransformation          0.2      7%         2    103.43
  speciesDedup                 0.0      1%         6      7.63
  matchComponents              0.0      1%         6      3.05
  canonicalize                 0.0      0%         3      1.88
  (instrumented sections account for 19% of gen wall; 1047.9 µs/species, 1571.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 60.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.1     25%       160     94.10
  applyTransformation          5.9     10%       160     36.92
  speciesDedup                 3.6      6%       161     22.14
  matchComponents              2.8      5%       176     15.99
  canonicalize                 0.9      2%        32     29.20
  (instrumented sections account for 47% of gen wall; 1886.7 µs/species, 377.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            71.9  45%
   ssa            58.3  37%
   parse          29.0  18%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                16.7  23% of gen
   applyTransformation         7.4  10% of gen
   speciesDedup                3.9  5% of gen
   matchComponents             2.8  4% of gen
   canonicalize                1.0  1% of gen

 >>> Biggest phase overall: gen (71.9 ms).
 >>> Biggest generation sink: findAllMaps (23% of generation).
==============================================================================
