
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.7       4.7        -        2.1      0.5
binding_AB (bimolecular)                        3       2      4.3       7.4        -        1.4     -9.6
multisite_5 (2^5 species, combinatorial)       32     160      8.2      26.0        -       16.3      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=2.108 min=2.108 max=2.108
   samples_ms=[2.108] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.432 min=1.432 max=1.432
   samples_ms=[1.432] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.291 min=16.291 max=16.291
   samples_ms=[16.291] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 4.7 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     15%         4    182.68
  applyTransformation          0.5     11%         4    133.48
  speciesDedup                 0.2      5%         9     25.03
  canonicalize                 0.0      0%         5      1.41
  matchComponents              0.0      0%         5      1.40
  (instrumented sections account for 32% of gen wall; 943.7 µs/species, 1179.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 7.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.2      2%         2     81.73
  findAllMaps                  0.1      2%         5     23.03
  speciesDedup                 0.0      0%         6      5.06
  matchComponents              0.0      0%         6      1.28
  canonicalize                 0.0      0%         3      1.38
  (instrumented sections account for 4% of gen wall; 2467.6 µs/species, 3701.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 26.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.9     27%       160     43.40
  speciesDedup                 2.3      9%       161     14.05
  matchComponents              2.0      8%       176     11.55
  applyTransformation          1.7      7%       160     10.83
  canonicalize                 0.9      4%        32     29.54
  (instrumented sections account for 53% of gen wall; 813.6 µs/species, 162.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            38.2  51%
   ssa            19.8  26%
   parse          17.3  23%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.8  20% of gen
   speciesDedup                2.5  7% of gen
   applyTransformation         2.4  6% of gen
   matchComponents             2.0  5% of gen
   canonicalize                1.0  3% of gen

 >>> Biggest phase overall: gen (38.2 ms).
 >>> Biggest generation sink: findAllMaps (20% of generation).
==============================================================================
