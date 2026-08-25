
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 runtime: v22.22.1   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      5.2       3.6        -        3.9      0.3
binding_AB (bimolecular)                        3       2      3.1       1.9        -        1.5      0.2
multisite_5 (2^5 species, combinatorial)       32     160      5.6      27.3        -       17.7      7.7

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=3.886 min=1.671 max=6.055
   samples_ms=[6.055, 3.886, 1.671] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.472 min=1.225 max=1.479
   samples_ms=[1.472, 1.479, 1.225] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=17.744 min=14.909 max=18.614
   samples_ms=[17.744, 18.614, 14.909] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.3      9%         4     82.83
  applyTransformation          0.2      6%         4     50.28
  speciesDedup                 0.0      1%         9      3.99
  matchComponents              0.0      0%         5      1.28
  canonicalize                 0.0      0%         5      0.86
  (instrumented sections account for 16% of gen wall; 719.8 µs/species, 899.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.1      8%         5     28.54
  applyTransformation          0.1      7%         2     66.24
  speciesDedup                 0.0      1%         6      3.62
  canonicalize                 0.0      0%         3      1.09
  matchComponents              0.0      0%         6      0.53
  (instrumented sections account for 16% of gen wall; 631.9 µs/species, 947.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 27.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  5.7     21%       160     35.49
  applyTransformation          1.8      7%       160     11.49
  matchComponents              1.7      6%       176      9.79
  speciesDedup                 1.1      4%       161      6.92
  canonicalize                 0.2      1%        32      6.69
  (instrumented sections account for 39% of gen wall; 853.4 µs/species, 170.7 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            32.8  47%
   ssa            23.1  33%
   parse          14.0  20%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 6.2  19% of gen
   applyTransformation         2.2  7% of gen
   matchComponents             1.7  5% of gen
   speciesDedup                1.2  4% of gen
   canonicalize                0.2  1% of gen

 >>> Biggest phase overall: gen (32.8 ms).
 >>> Biggest generation sink: findAllMaps (19% of generation).
==============================================================================
