
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.5       3.0        -        1.8      0.5
binding_AB (bimolecular)                        3       2      2.8       1.5        -        1.4     -0.3
multisite_5 (2^5 species, combinatorial)       32     160      5.7      30.1        -       20.7    -15.9

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.805 min=1.805 max=1.805
   samples_ms=[1.805] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.391 min=1.391 max=1.391
   samples_ms=[1.391] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=20.729 min=20.729 max=20.729
   samples_ms=[20.729] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.0 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.5     17%         4    128.88
  findAllMaps                  0.4     14%         4    108.66
  speciesDedup                 0.1      4%         9     14.71
  matchComponents              0.0      0%         5      1.39
  canonicalize                 0.0      0%         5      1.36
  (instrumented sections account for 36% of gen wall; 607.5 µs/species, 759.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.2     14%         5     44.84
  applyTransformation          0.1      7%         2     56.12
  speciesDedup                 0.0      1%         6      3.45
  matchComponents              0.0      1%         6      1.69
  canonicalize                 0.0      0%         3      0.96
  (instrumented sections account for 24% of gen wall; 516.1 µs/species, 774.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 30.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 10.5     35%       160     65.65
  applyTransformation          2.5      8%       160     15.65
  speciesDedup                 1.5      5%       161      9.19
  matchComponents              1.4      5%       176      7.75
  canonicalize                 0.4      1%        32     11.99
  (instrumented sections account for 54% of gen wall; 941.7 µs/species, 188.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            34.7  48%
   ssa            23.9  33%
   parse          13.0  18%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                11.2  32% of gen
   applyTransformation         3.1  9% of gen
   speciesDedup                1.6  5% of gen
   matchComponents             1.4  4% of gen
   canonicalize                0.4  1% of gen

 >>> Biggest phase overall: gen (34.7 ms).
 >>> Biggest generation sink: findAllMaps (32% of generation).
==============================================================================
