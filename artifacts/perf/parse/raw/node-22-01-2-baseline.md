
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.7       4.3        -        1.8      0.5
binding_AB (bimolecular)                        3       2      4.1       9.2        -        1.4     -9.8
multisite_5 (2^5 species, combinatorial)       32     160      8.7      26.0        -       15.8      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.825 min=1.825 max=1.825
   samples_ms=[1.825] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.369 min=1.369 max=1.369
   samples_ms=[1.369] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.832 min=15.832 max=15.832
   samples_ms=[15.832] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     18%         4    197.20
  applyTransformation          0.5     11%         4    113.16
  speciesDedup                 0.2      5%         9     25.31
  canonicalize                 0.0      0%         5      1.48
  matchComponents              0.0      0%         5      1.41
  (instrumented sections account for 35% of gen wall; 854.0 µs/species, 1067.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 9.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2      2%         5     35.72
  applyTransformation          0.2      2%         2     82.97
  speciesDedup                 0.0      0%         6      5.89
  matchComponents              0.0      0%         6      1.12
  canonicalize                 0.0      0%         3      2.09
  (instrumented sections account for 4% of gen wall; 3054.3 µs/species, 4581.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 26.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.8     26%       160     42.36
  speciesDedup                 2.2      9%       161     13.74
  matchComponents              1.9      7%       176     10.87
  applyTransformation          1.7      7%       160     10.90
  canonicalize                 1.1      4%        32     35.80
  (instrumented sections account for 53% of gen wall; 812.7 µs/species, 162.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            39.4  52%
   ssa            19.0  25%
   parse          17.6  23%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.7  20% of gen
   speciesDedup                2.5  6% of gen
   applyTransformation         2.4  6% of gen
   matchComponents             1.9  5% of gen
   canonicalize                1.2  3% of gen

 >>> Biggest phase overall: gen (39.4 ms).
 >>> Biggest generation sink: findAllMaps (20% of generation).
==============================================================================
