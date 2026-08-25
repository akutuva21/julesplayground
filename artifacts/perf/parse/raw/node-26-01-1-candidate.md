
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      5.9       4.3        -        2.2      0.5
binding_AB (bimolecular)                        3       2      3.5       1.9        -        1.6      0.2
multisite_5 (2^5 species, combinatorial)       32     160      7.1      32.2        -       29.9      8.4

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.156 min=2.156 max=2.156
   samples_ms=[2.156] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.583 min=1.583 max=1.583
   samples_ms=[1.583] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=29.895 min=29.895 max=29.895
   samples_ms=[29.895] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.3 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.7     17%         4    180.30
  findAllMaps                  0.5     12%         4    132.00
  speciesDedup                 0.2      4%         9     19.02
  canonicalize                 0.0      0%         5      1.92
  matchComponents              0.0      0%         5      1.51
  (instrumented sections account for 33% of gen wall; 865.2 µs/species, 1081.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     72.80
  findAllMaps                  0.1      7%         5     26.58
  speciesDedup                 0.0      2%         6      5.28
  matchComponents              0.0      0%         6      1.12
  canonicalize                 0.0      0%         3      1.36
  (instrumented sections account for 17% of gen wall; 644.3 µs/species, 966.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 32.2 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  7.2     22%       160     45.26
  applyTransformation          3.1     10%       160     19.42
  speciesDedup                 2.1      7%       161     13.33
  matchComponents              1.4      4%       176      8.19
  canonicalize                 0.5      2%        32     16.49
  (instrumented sections account for 45% of gen wall; 1006.8 µs/species, 201.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            38.5  43%
   ssa            33.6  38%
   parse          16.4  19%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.9  21% of gen
   applyTransformation         4.0  10% of gen
   speciesDedup                2.3  6% of gen
   matchComponents             1.5  4% of gen
   canonicalize                0.5  1% of gen

 >>> Biggest phase overall: gen (38.5 ms).
 >>> Biggest generation sink: findAllMaps (21% of generation).
==============================================================================
