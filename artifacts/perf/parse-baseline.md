
==============================================================================
 PIPELINE PROFILE   (median of 3 runs, warm-up discarded)
 runtime: v22.22.1   platform: linux/x64
 cvode.wasm present: yes   sim methods: ssa
 SSA cases: t_end=1
==============================================================================

model                                     species    rxns    parse       gen      ode      ssa@1   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      6.8       7.4        -        3.8      0.3
binding_AB (bimolecular)                        3       2      5.2       4.1        -        3.7      0.2
multisite_5 (2^5 species, combinatorial)       32     160      6.8      27.0        -       16.7      7.7

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=3.774 min=3.110 max=10.264
   samples_ms=[3.110, 10.264, 3.774] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 binding_AB (bimolecular) | ssa:t_end=1 | median=3.689 min=3.583 max=3.744
   samples_ms=[3.744, 3.689, 3.583] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=16.687 min=15.648 max=16.836
   samples_ms=[16.836, 15.648, 16.687] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 7.4 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6      8%         4    149.39
  findAllMaps                  0.4      5%         4     89.25
  speciesDedup                 0.1      1%         9      8.45
  matchComponents              0.0      0%         5      1.58
  canonicalize                 0.0      0%         5      1.37
  (instrumented sections account for 14% of gen wall; 1478.3 µs/species, 1847.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 4.1 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.4     10%         2    196.02
  findAllMaps                  0.2      5%         5     41.73
  speciesDedup                 0.1      2%         6     10.69
  canonicalize                 0.0      0%         3      2.32
  matchComponents              0.0      0%         6      0.71
  (instrumented sections account for 17% of gen wall; 1362.8 µs/species, 2044.2 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 27.0 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                  6.6     24%       160     41.19
  applyTransformation          2.1      8%       160     13.03
  matchComponents              1.9      7%       176     10.70
  speciesDedup                 1.4      5%       161      8.39
  canonicalize                 0.3      1%        32      8.08
  (instrumented sections account for 45% of gen wall; 842.6 µs/species, 168.5 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   gen            38.4  47%
   ssa            24.1  30%
   parse          18.9  23%
   ode             0.0  0%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                 7.2  19% of gen
   applyTransformation         3.1  8% of gen
   matchComponents             1.9  5% of gen
   speciesDedup                1.5  4% of gen
   canonicalize                0.3  1% of gen

 >>> Biggest phase overall: gen (38.4 ms).
 >>> Biggest generation sink: findAllMaps (19% of generation).
==============================================================================
