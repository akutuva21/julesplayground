
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      3.9       3.7        -        1.6      0.5
binding_AB (bimolecular)                        3       2      7.1       1.6        -        1.4      0.2
multisite_5 (2^5 species, combinatorial)       32     160      6.7      22.6        -       16.8      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.596 min=1.596 max=1.596
   samples_ms=[1.596] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.362 min=1.362 max=1.362
   samples_ms=[1.362] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.840 min=16.840 max=16.840
   samples_ms=[16.840] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     18%         4    167.24
  applyTransformation          0.4     10%         4     90.46
  speciesDedup                 0.3      8%         9     31.17
  canonicalize                 0.0      0%         5      1.58
  matchComponents              0.0      0%         5      1.33
  (instrumented sections account for 35% of gen wall; 747.1 µs/species, 933.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     66.25
  findAllMaps                  0.1      8%         5     24.28
  speciesDedup                 0.0      2%         6      4.51
  matchComponents              0.0      0%         6      1.29
  canonicalize                 0.0      0%         3      1.02
  (instrumented sections account for 18% of gen wall; 537.8 µs/species, 806.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 22.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.2     27%       160     38.69
  speciesDedup                 1.7      8%       161     10.63
  applyTransformation          1.6      7%       160     10.18
  matchComponents              1.6      7%       176      9.21
  canonicalize                 0.7      3%        32     20.77
  (instrumented sections account for 52% of gen wall; 707.1 µs/species, 141.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            28.0  43%
   ssa            19.8  30%
   parse          17.7  27%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.0  25% of gen
   applyTransformation         2.1  8% of gen
   speciesDedup                2.0  7% of gen
   matchComponents             1.6  6% of gen
   canonicalize                0.7  2% of gen

 >>> Biggest phase overall: gen (28.0 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
