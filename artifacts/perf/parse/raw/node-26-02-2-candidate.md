
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.6       3.1        -        1.8      0.5
binding_AB (bimolecular)                        3       2      2.7       1.4        -        1.3     -0.1
multisite_5 (2^5 species, combinatorial)       32     160      6.0      30.3        -       41.8    -15.7

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.791 min=1.791 max=1.791
   samples_ms=[1.791] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.303 min=1.303 max=1.303
   samples_ms=[1.303] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=41.774 min=41.774 max=41.774
   samples_ms=[41.774] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     17%         4    128.66
  findAllMaps                  0.4     13%         4     97.91
  speciesDedup                 0.1      4%         9     14.61
  canonicalize                 0.0      0%         5      1.39
  matchComponents              0.0      0%         5      1.30
  (instrumented sections account for 34% of gen wall; 613.6 µs/species, 766.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     56.14
  findAllMaps                  0.1      7%         5     20.11
  speciesDedup                 0.0      1%         6      3.12
  matchComponents              0.0      1%         6      1.62
  canonicalize                 0.0      0%         3      0.95
  (instrumented sections account for 17% of gen wall; 467.9 µs/species, 701.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 30.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.4     21%       160     39.99
  applyTransformation          2.4      8%       160     15.04
  speciesDedup                 1.5      5%       161      9.11
  matchComponents              1.4      5%       176      7.83
  canonicalize                 0.4      1%        32     12.45
  (instrumented sections account for 40% of gen wall; 948.0 µs/species, 189.6 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa            44.9  48%
   gen            34.8  37%
   parse          13.4  14%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 6.9  20% of gen
   applyTransformation         3.0  9% of gen
   speciesDedup                1.6  5% of gen
   matchComponents             1.4  4% of gen
   canonicalize                0.4  1% of gen

 >>> Biggest phase overall: ssa (44.9 ms).
 >>> Biggest generation sink: findAllMaps (20% of generation).
==============================================================================
