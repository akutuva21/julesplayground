
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.0       3.9        -        1.6      0.5
binding_AB (bimolecular)                        3       2      7.2       1.5        -        1.4      0.2
multisite_5 (2^5 species, combinatorial)       32     160      7.0      23.1        -       15.1      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.599 min=1.599 max=1.599
   samples_ms=[1.599] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.362 min=1.362 max=1.362
   samples_ms=[1.362] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.121 min=15.121 max=15.121
   samples_ms=[15.121] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     19%         4    185.79
  applyTransformation          0.4      9%         4     91.52
  speciesDedup                 0.2      6%         9     24.05
  matchComponents              0.0      0%         5      1.37
  canonicalize                 0.0      0%         5      1.34
  (instrumented sections account for 34% of gen wall; 778.3 µs/species, 972.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1     10%         5     29.07
  applyTransformation          0.1      8%         2     57.93
  speciesDedup                 0.0      1%         6      3.40
  matchComponents              0.0      0%         6      1.16
  canonicalize                 0.0      0%         3      1.00
  (instrumented sections account for 19% of gen wall; 506.8 µs/species, 760.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 23.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.3     27%       160     39.21
  applyTransformation          1.8      8%       160     11.10
  matchComponents              1.6      7%       176      9.26
  speciesDedup                 1.6      7%       161     10.03
  canonicalize                 0.5      2%        32     16.96
  (instrumented sections account for 51% of gen wall; 721.3 µs/species, 144.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            28.5  44%
   parse          18.2  28%
   ssa            18.1  28%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.2  25% of gen
   applyTransformation         2.3  8% of gen
   speciesDedup                1.9  6% of gen
   matchComponents             1.6  6% of gen
   canonicalize                0.6  2% of gen

 >>> Biggest phase overall: gen (28.5 ms).
 >>> Biggest generation sink: findAllMaps (25% of generation).
==============================================================================
