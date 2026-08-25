
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      6.3       3.6        -        2.1      0.5
binding_AB (bimolecular)                        3       2      3.5       1.8        -        1.5      0.2
multisite_5 (2^5 species, combinatorial)       32     160      6.9      35.8        -       23.6    -17.3

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.091 min=2.091 max=2.091
   samples_ms=[2.091] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.489 min=1.489 max=1.489
   samples_ms=[1.489] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=23.637 min=23.637 max=23.637
   samples_ms=[23.637] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.7     19%         4    166.19
  findAllMaps                  0.5     13%         4    115.59
  speciesDedup                 0.1      4%         9     16.10
  canonicalize                 0.0      0%         5      1.66
  matchComponents              0.0      0%         5      1.41
  (instrumented sections account for 36% of gen wall; 715.6 µs/species, 894.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     68.81
  findAllMaps                  0.1      6%         5     23.47
  speciesDedup                 0.0      2%         6      5.19
  matchComponents              0.0      0%         6      1.13
  canonicalize                 0.0      0%         3      1.13
  (instrumented sections account for 16% of gen wall; 605.9 µs/species, 908.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 35.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 13.3     37%       160     83.27
  applyTransformation          3.0      9%       160     19.06
  speciesDedup                 2.0      6%       161     12.26
  matchComponents              1.4      4%       176      7.93
  canonicalize                 0.6      2%        32     18.59
  (instrumented sections account for 57% of gen wall; 1120.2 µs/species, 224.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            41.2  48%
   ssa            27.2  32%
   parse          16.7  20%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                13.9  34% of gen
   applyTransformation         3.9  9% of gen
   speciesDedup                2.1  5% of gen
   matchComponents             1.4  3% of gen
   canonicalize                0.6  1% of gen

 >>> Biggest phase overall: gen (41.2 ms).
 >>> Biggest generation sink: findAllMaps (34% of generation).
==============================================================================
