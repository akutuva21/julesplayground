
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.7       5.0        -        1.8      0.5
binding_AB (bimolecular)                        3       2      4.1       1.7        -        4.8      0.0
multisite_5 (2^5 species, combinatorial)       32     160     37.1      26.4        -       21.6      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.777 min=1.777 max=1.777
   samples_ms=[1.777] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=4.770 min=4.770 max=4.770
   samples_ms=[4.770] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=21.629 min=21.629 max=21.629
   samples_ms=[21.629] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 5.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     16%         4    203.59
  applyTransformation          0.4      9%         4    111.74
  speciesDedup                 0.2      5%         9     26.57
  canonicalize                 0.0      0%         5      1.79
  matchComponents              0.0      0%         5      1.50
  (instrumented sections account for 31% of gen wall; 992.6 µs/species, 1240.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1      9%         5     29.38
  applyTransformation          0.1      7%         2     57.23
  speciesDedup                 0.0      1%         6      3.63
  matchComponents              0.0      0%         6      1.11
  canonicalize                 0.0      0%         3      1.08
  (instrumented sections account for 17% of gen wall; 570.0 µs/species, 855.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 26.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.5     25%       160     40.82
  speciesDedup                 2.4      9%       161     14.87
  applyTransformation          1.8      7%       160     11.56
  matchComponents              1.8      7%       176     10.16
  canonicalize                 1.2      4%        32     37.05
  (instrumented sections account for 52% of gen wall; 824.0 µs/species, 164.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   parse          45.9  43%
   gen            33.0  31%
   ssa            28.2  26%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.5  23% of gen
   speciesDedup                2.7  8% of gen
   applyTransformation         2.4  7% of gen
   matchComponents             1.8  5% of gen
   canonicalize                1.2  4% of gen

 >>> Biggest phase overall: parse (45.9 ms).
 >>> Biggest generation sink: findAllMaps (23% of generation).
==============================================================================
