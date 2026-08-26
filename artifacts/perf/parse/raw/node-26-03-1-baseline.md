
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.7       3.1        -        1.8      0.5
binding_AB (bimolecular)                        3       2      2.9       1.6        -        1.4      0.1
multisite_5 (2^5 species, combinatorial)       32     160      5.8      47.2        -       20.8    -17.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.795 min=1.795 max=1.795
   samples_ms=[1.795] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.409 min=1.409 max=1.409
   samples_ms=[1.409] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=20.785 min=20.785 max=20.785
   samples_ms=[20.785] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     18%         4    140.07
  findAllMaps                  0.5     15%         4    118.67
  speciesDedup                 0.1      4%         9     14.28
  matchComponents              0.0      0%         5      3.00
  canonicalize                 0.0      0%         5      2.18
  (instrumented sections account for 38% of gen wall; 626.0 µs/species, 782.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     57.06
  findAllMaps                  0.1      7%         5     20.88
  speciesDedup                 0.0      1%         6      3.62
  matchComponents              0.0      0%         6      1.12
  canonicalize                 0.0      0%         3      0.99
  (instrumented sections account for 16% of gen wall; 523.6 µs/species, 785.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 47.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 19.6     42%       160    122.40
  applyTransformation          3.7      8%       160     23.06
  speciesDedup                 2.0      4%       161     12.62
  matchComponents              2.0      4%       176     11.55
  canonicalize                 0.5      1%        32     16.26
  (instrumented sections account for 59% of gen wall; 1473.6 µs/species, 294.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            51.9  58%
   ssa            24.0  27%
   parse          13.3  15%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                20.2  39% of gen
   applyTransformation         4.4  8% of gen
   speciesDedup                2.2  4% of gen
   matchComponents             2.1  4% of gen
   canonicalize                0.5  1% of gen

 >>> Biggest phase overall: gen (51.9 ms).
 >>> Biggest generation sink: findAllMaps (39% of generation).
==============================================================================
