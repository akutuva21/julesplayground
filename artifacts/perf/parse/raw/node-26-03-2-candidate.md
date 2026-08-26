
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.6       3.3        -        1.9      0.5
binding_AB (bimolecular)                        3       2      3.0       1.4        -        1.4      0.1
multisite_5 (2^5 species, combinatorial)       32     160      5.7      31.2        -       21.3    -15.6

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.858 min=1.858 max=1.858
   samples_ms=[1.858] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.375 min=1.375 max=1.375
   samples_ms=[1.375] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=21.252 min=21.252 max=21.252
   samples_ms=[21.252] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     18%         4    148.92
  findAllMaps                  0.5     16%         4    126.96
  speciesDedup                 0.2      5%         9     18.33
  matchComponents              0.0      0%         5      1.37
  canonicalize                 0.0      0%         5      1.26
  (instrumented sections account for 39% of gen wall; 651.2 µs/species, 814.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     58.27
  findAllMaps                  0.1      7%         5     20.52
  speciesDedup                 0.0      2%         6      3.79
  matchComponents              0.0      1%         6      1.60
  canonicalize                 0.0      0%         3      0.90
  (instrumented sections account for 18% of gen wall; 477.3 µs/species, 715.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 31.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.7     21%       160     41.69
  applyTransformation          2.5      8%       160     15.94
  speciesDedup                 1.4      5%       161      8.96
  matchComponents              1.3      4%       176      7.48
  canonicalize                 0.5      1%        32     14.25
  (instrumented sections account for 40% of gen wall; 975.5 µs/species, 195.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            35.9  49%
   ssa            24.5  33%
   parse          13.3  18%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.3  20% of gen
   applyTransformation         3.3  9% of gen
   speciesDedup                1.6  5% of gen
   matchComponents             1.3  4% of gen
   canonicalize                0.5  1% of gen

 >>> Biggest phase overall: gen (35.9 ms).
 >>> Biggest generation sink: findAllMaps (20% of generation).
==============================================================================
