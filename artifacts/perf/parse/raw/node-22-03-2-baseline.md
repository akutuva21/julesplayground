
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v22.23.2   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.0       3.9        -        1.5      0.5
binding_AB (bimolecular)                        3       2      3.2       1.6        -        1.3      0.2
multisite_5 (2^5 species, combinatorial)       32     160      7.3      23.1        -       16.7      8.1

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.546 min=1.546 max=1.546
   samples_ms=[1.546] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.280 min=1.280 max=1.280
   samples_ms=[1.280] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.689 min=16.689 max=16.689
   samples_ms=[16.689] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.9 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  0.7     17%         4    166.67
  applyTransformation          0.4     10%         4     93.57
  speciesDedup                 0.2      5%         9     22.81
  canonicalize                 0.0      0%         5      1.43
  matchComponents              0.0      0%         5      1.42
  (instrumented sections account for 33% of gen wall; 771.9 µs/species, 964.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.6 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     58.30
  findAllMaps                  0.1      6%         5     19.98
  speciesDedup                 0.0      1%         6      3.35
  matchComponents              0.0      0%         6      1.14
  canonicalize                 0.0      0%         3      1.05
  (instrumented sections account for 15% of gen wall; 544.5 µs/species, 816.8 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 23.1 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.1     26%       160     37.85
  speciesDedup                 2.0      9%       161     12.41
  applyTransformation          1.6      7%       160     10.09
  matchComponents              1.5      7%       176      8.55
  canonicalize                 0.9      4%        32     27.70
  (instrumented sections account for 52% of gen wall; 722.6 µs/species, 144.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            28.6  46%
   ssa            19.5  31%
   parse          14.5  23%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 6.8  24% of gen
   speciesDedup                2.2  8% of gen
   applyTransformation         2.1  7% of gen
   matchComponents             1.5  5% of gen
   canonicalize                0.9  3% of gen

 >>> Biggest phase overall: gen (28.6 ms).
 >>> Biggest generation sink: findAllMaps (24% of generation).
==============================================================================
