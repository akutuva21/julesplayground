
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.7       4.7        -        4.3      0.5
binding_AB (bimolecular)                        3       2     11.3       2.1        -        1.5      0.2
multisite_5 (2^5 species, combinatorial)       32     160      8.0      26.4        -       16.0      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=4.330 min=4.330 max=4.330
   samples_ms=[4.330] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.488 min=1.488 max=1.488
   samples_ms=[1.488] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.008 min=16.008 max=16.008
   samples_ms=[16.008] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     15%         4    176.13
  applyTransformation          0.6     14%         4    159.07
  speciesDedup                 0.2      5%         9     24.95
  canonicalize                 0.0      0%         5      1.47
  matchComponents              0.0      0%         5      1.38
  (instrumented sections account for 34% of gen wall; 933.0 µs/species, 1166.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 2.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     72.42
  findAllMaps                  0.1      6%         5     25.92
  speciesDedup                 0.1      4%         6     14.51
  canonicalize                 0.1      3%         3     21.71
  matchComponents              0.0      0%         6      1.19
  (instrumented sections account for 21% of gen wall; 702.9 µs/species, 1054.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 26.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  7.3     28%       160     45.67
  matchComponents              2.3      9%       176     13.15
  speciesDedup                 2.3      9%       161     14.33
  applyTransformation          1.9      7%       160     11.81
  canonicalize                 1.0      4%        32     30.42
  (instrumented sections account for 56% of gen wall; 824.1 µs/species, 164.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            33.1  42%
   parse          24.0  30%
   ssa            21.8  28%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 8.1  25% of gen
   applyTransformation         2.7  8% of gen
   speciesDedup                2.6  8% of gen
   matchComponents             2.3  7% of gen
   canonicalize                1.0  3% of gen

 >>> Biggest phase overall: gen (33.1 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
