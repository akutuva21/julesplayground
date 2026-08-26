
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.3       4.3        -        2.0      0.5
binding_AB (bimolecular)                        3       2      3.6       6.4        -        1.5    -10.1
multisite_5 (2^5 species, combinatorial)       32     160     11.9      24.7        -       16.4      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.962 min=1.962 max=1.962
   samples_ms=[1.962] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.503 min=1.503 max=1.503
   samples_ms=[1.503] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.374 min=16.374 max=16.374
   samples_ms=[16.374] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     17%         4    179.73
  applyTransformation          0.5     12%         4    132.64
  speciesDedup                 0.2      5%         9     24.71
  matchComponents              0.0      0%         5      1.47
  canonicalize                 0.0      0%         5      1.44
  (instrumented sections account for 35% of gen wall; 861.6 µs/species, 1077.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 6.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      2%         2     59.18
  findAllMaps                  0.1      2%         5     21.47
  speciesDedup                 0.0      0%         6      3.68
  matchComponents              0.0      0%         6      1.54
  canonicalize                 0.0      0%         3      1.08
  (instrumented sections account for 4% of gen wall; 2117.0 µs/species, 3175.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 24.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.6     27%       160     41.11
  applyTransformation          1.9      8%       160     12.16
  speciesDedup                 1.8      7%       161     11.49
  matchComponents              1.7      7%       176      9.94
  canonicalize                 0.7      3%        32     21.22
  (instrumented sections account for 52% of gen wall; 770.9 µs/species, 154.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            35.3  47%
   ssa            19.8  26%
   parse          19.8  26%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.4  21% of gen
   applyTransformation         2.6  7% of gen
   speciesDedup                2.1  6% of gen
   matchComponents             1.8  5% of gen
   canonicalize                0.7  2% of gen

 >>> Biggest phase overall: gen (35.3 ms).
 >>> Biggest generation sink: findAllMaps (21% of generation).
==============================================================================
