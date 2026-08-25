
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.6       4.6        -        1.8      0.5
binding_AB (bimolecular)                        3       2      5.1       6.1        -        1.8     -9.8
multisite_5 (2^5 species, combinatorial)       32     160      9.1      28.5        -       17.9      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.839 min=1.839 max=1.839
   samples_ms=[1.839] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.795 min=1.795 max=1.795
   samples_ms=[1.795] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=17.875 min=17.875 max=17.875
   samples_ms=[17.875] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.9     19%         4    216.17
  applyTransformation          0.5     11%         4    119.89
  speciesDedup                 0.2      5%         9     25.53
  matchComponents              0.0      1%         5      8.74
  canonicalize                 0.0      0%         5      1.57
  (instrumented sections account for 36% of gen wall; 912.7 µs/species, 1140.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 6.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1      2%         5     25.78
  applyTransformation          0.1      2%         2     57.51
  speciesDedup                 0.0      0%         6      4.00
  matchComponents              0.0      0%         6      1.40
  canonicalize                 0.0      0%         3      0.98
  (instrumented sections account for 5% of gen wall; 2047.5 µs/species, 3071.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 28.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  8.0     28%       160     49.87
  matchComponents              2.2      8%       176     12.50
  speciesDedup                 2.1      7%       161     12.96
  applyTransformation          2.0      7%       160     12.61
  canonicalize                 0.9      3%        32     28.21
  (instrumented sections account for 53% of gen wall; 891.5 µs/species, 178.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            39.2  49%
   ssa            21.5  27%
   parse          18.8  24%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 9.0  23% of gen
   applyTransformation         2.6  7% of gen
   speciesDedup                2.3  6% of gen
   matchComponents             2.3  6% of gen
   canonicalize                0.9  2% of gen

 >>> Biggest phase overall: gen (39.2 ms).
 >>> Biggest generation sink: findAllMaps (23% of generation).
==============================================================================
