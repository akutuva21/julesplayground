
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      5.5       5.0        -        1.8      0.5
binding_AB (bimolecular)                        3       2      4.1       6.9        -        1.5    -10.2
multisite_5 (2^5 species, combinatorial)       32     160     17.5      28.7        -       21.4      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.771 min=1.771 max=1.771
   samples_ms=[1.771] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.473 min=1.473 max=1.473
   samples_ms=[1.473] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=21.440 min=21.440 max=21.440
   samples_ms=[21.440] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 5.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.8     16%         4    204.46
  applyTransformation          0.5      9%         4    116.45
  speciesDedup                 0.3      5%         9     27.79
  canonicalize                 0.0      0%         5      1.64
  matchComponents              0.0      0%         5      1.59
  (instrumented sections account for 31% of gen wall; 1000.0 µs/species, 1250.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 6.9 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      2%         2     72.69
  findAllMaps                  0.1      2%         5     21.84
  speciesDedup                 0.0      0%         6      5.39
  matchComponents              0.0      0%         6      1.20
  canonicalize                 0.0      0%         3      1.46
  (instrumented sections account for 4% of gen wall; 2295.3 µs/species, 3443.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 28.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  7.1     25%       160     44.25
  speciesDedup                 4.3     15%       161     26.88
  canonicalize                 3.2     11%        32    100.44
  matchComponents              2.3      8%       176     12.98
  applyTransformation          1.8      6%       160     11.46
  (instrumented sections account for 65% of gen wall; 896.1 µs/species, 179.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            40.6  44%
   parse          27.0  29%
   ssa            24.7  27%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 8.0  20% of gen
   speciesDedup                4.6  11% of gen
   canonicalize                3.2  8% of gen
   applyTransformation         2.4  6% of gen
   matchComponents             2.3  6% of gen

 >>> Biggest phase overall: gen (40.6 ms).
 >>> Biggest generation sink: findAllMaps (20% of generation).
==============================================================================
