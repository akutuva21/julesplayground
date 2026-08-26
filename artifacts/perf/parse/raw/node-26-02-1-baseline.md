
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.3       3.0        -        1.9      0.5
binding_AB (bimolecular)                        3       2      2.6       1.5        -        1.3     -0.2
multisite_5 (2^5 species, combinatorial)       32     160      5.6      25.8        -       35.1      8.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.853 min=1.853 max=1.853
   samples_ms=[1.853] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.309 min=1.309 max=1.309
   samples_ms=[1.309] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=35.123 min=35.123 max=35.123
   samples_ms=[35.123] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     18%         4    136.40
  findAllMaps                  0.4     14%         4    103.03
  speciesDedup                 0.2      5%         9     17.76
  canonicalize                 0.0      0%         5      1.42
  matchComponents              0.0      0%         5      1.39
  (instrumented sections account for 38% of gen wall; 594.2 µs/species, 742.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.5 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2     12%         2     94.48
  findAllMaps                  0.1      6%         5     19.47
  speciesDedup                 0.0      2%         6      4.10
  canonicalize                 0.0      0%         3      2.38
  matchComponents              0.0      0%         6      1.09
  (instrumented sections account for 21% of gen wall; 505.5 µs/species, 758.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 25.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.1     24%       160     38.20
  applyTransformation          2.3      9%       160     14.67
  speciesDedup                 1.8      7%       161     11.12
  matchComponents              1.1      4%       176      6.44
  canonicalize                 0.4      2%        32     13.24
  (instrumented sections account for 46% of gen wall; 807.2 µs/species, 161.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa            38.3  47%
   gen            30.3  37%
   parse          12.5  15%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 6.6  22% of gen
   applyTransformation         3.1  10% of gen
   speciesDedup                2.0  7% of gen
   matchComponents             1.1  4% of gen
   canonicalize                0.4  1% of gen

 >>> Biggest phase overall: ssa (38.3 ms).
 >>> Biggest generation sink: findAllMaps (22% of generation).
==============================================================================
