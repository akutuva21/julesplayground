
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      5.3       3.7        -        1.9      0.5
binding_AB (bimolecular)                        3       2      3.5       1.8        -        1.4      0.2
multisite_5 (2^5 species, combinatorial)       32     160      6.7      41.4        -       28.2    -17.2

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.948 min=1.948 max=1.948
   samples_ms=[1.948] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.440 min=1.440 max=1.440
   samples_ms=[1.440] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=28.151 min=28.151 max=28.151
   samples_ms=[28.151] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.7 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     17%         4    152.32
  findAllMaps                  0.5     13%         4    119.68
  speciesDedup                 0.1      4%         9     15.72
  canonicalize                 0.0      0%         5      2.58
  matchComponents              0.0      0%         5      1.43
  (instrumented sections account for 34% of gen wall; 733.1 µs/species, 916.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     73.22
  findAllMaps                  0.1      7%         5     23.06
  speciesDedup                 0.0      2%         6      4.46
  matchComponents              0.0      1%         6      1.69
  canonicalize                 0.0      0%         3      1.20
  (instrumented sections account for 17% of gen wall; 584.7 µs/species, 877.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 41.4 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  8.8     21%       160     55.03
  applyTransformation          3.7      9%       160     22.97
  speciesDedup                 1.9      5%       161     11.96
  matchComponents              1.9      5%       176     10.86
  canonicalize                 0.6      1%        32     18.34
  (instrumented sections account for 41% of gen wall; 1294.8 µs/species, 259.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            46.9  50%
   ssa            31.5  34%
   parse          15.5  17%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 9.4  20% of gen
   applyTransformation         4.4  9% of gen
   speciesDedup                2.1  4% of gen
   matchComponents             1.9  4% of gen
   canonicalize                0.6  1% of gen

 >>> Biggest phase overall: gen (46.9 ms).
 >>> Biggest generation sink: findAllMaps (20% of generation).
==============================================================================
