
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      3.9       3.8        -        1.6      0.5
binding_AB (bimolecular)                        3       2      6.9       1.8        -        1.5      0.2
multisite_5 (2^5 species, combinatorial)       32     160      6.8      22.6        -       14.6      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.639 min=1.639 max=1.639
   samples_ms=[1.639] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.534 min=1.534 max=1.534
   samples_ms=[1.534] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=14.641 min=14.641 max=14.641
   samples_ms=[14.641] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.8 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     17%         4    166.05
  applyTransformation          0.4      9%         4     89.92
  speciesDedup                 0.2      6%         9     23.40
  matchComponents              0.0      0%         5      1.35
  canonicalize                 0.0      0%         5      1.30
  (instrumented sections account for 33% of gen wall; 763.3 µs/species, 954.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      8%         2     66.87
  findAllMaps                  0.1      6%         5     21.99
  speciesDedup                 0.1      4%         6     10.97
  matchComponents              0.0      0%         6      1.22
  canonicalize                 0.0      0%         3      1.01
  (instrumented sections account for 18% of gen wall; 588.2 µs/species, 882.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 22.6 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.1     27%       160     37.86
  applyTransformation          1.7      8%       160     10.91
  speciesDedup                 1.7      8%       161     10.62
  matchComponents              1.6      7%       176      8.92
  canonicalize                 0.7      3%        32     20.65
  (instrumented sections account for 52% of gen wall; 707.1 µs/species, 141.4 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            28.2  44%
   ssa            17.8  28%
   parse          17.6  28%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 6.8  24% of gen
   applyTransformation         2.2  8% of gen
   speciesDedup                2.0  7% of gen
   matchComponents             1.6  6% of gen
   canonicalize                0.7  2% of gen

 >>> Biggest phase overall: gen (28.2 ms).
 >>> Biggest generation sink: findAllMaps (24% of generation).
==============================================================================
