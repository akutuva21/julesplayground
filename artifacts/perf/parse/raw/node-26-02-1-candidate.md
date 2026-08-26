
==============================================================================
 PIPELINE PROFILE   (median of 1 run, warm-up discarded)
 runtime: v26.7.0   platform: linux/x64
 cvode.wasm present: yes   sim methods: ode, ssa
 SSA cases: t_end=1, t_end=100
 dense-vs-sparse ODE comparison: ON (see the DENSE vs SPARSE section below)
==============================================================================

model                                     species    rxns    parse       gen      ode    ssa@100   heapMB
---------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4      4.3       3.2      4.6        1.6      0.5
binding_AB (bimolecular)                        3       2      3.5       1.8      3.8       31.8      0.2
multisite_5 (2^5 species, combinatorial)       32     160      5.9      28.5      8.8      318.3    -13.2
multisite_7 (2^7 species, combinatorial)      128     896      4.0      57.3     26.9      596.3    -11.8

(all times in ms)

==============================================================================
 SIMULATION SAMPLE SPREAD
==============================================================================
 Raw samples are retained in execution order; hashing occurs outside the timer.

 chain_5 (baseline, unimolecular) | ode:t_end=10 | median=4.592 min=4.592 max=4.592
   samples_ms=[4.592] trajectory_hash=ab99f4cd77c76067f364a93b5c1c7e21d0b35d529803e4624531f645ec4382a8
 chain_5 (baseline, unimolecular) | ssa:t_end=1 | median=1.303 min=1.303 max=1.303
   samples_ms=[1.303] trajectory_hash=6715bcce6aeb4b368ef084ce462963403bb1c6264952cdd105a79ca88f8689e8
 chain_5 (baseline, unimolecular) | ssa:t_end=100 | median=1.564 min=1.564 max=1.564
   samples_ms=[1.564] trajectory_hash=4026ab0a37dc90785284cb13b3d7cf7768e1dd2015ed9c964cc475dd6a249264
 binding_AB (bimolecular) | ode:t_end=10 | median=3.802 min=3.802 max=3.802
   samples_ms=[3.802] trajectory_hash=9694b1d7be826498f9509398054c237c6000336de1695905211381cb6a104af3
 binding_AB (bimolecular) | ssa:t_end=1 | median=1.494 min=1.494 max=1.494
   samples_ms=[1.494] trajectory_hash=49372cd10fa64a99128ea74677bda6d972ed8b65f62f6cb984fdf00c75e4293d
 binding_AB (bimolecular) | ssa:t_end=100 | median=31.782 min=31.782 max=31.782
   samples_ms=[31.782] trajectory_hash=444cba5582cc5b2d367774208cbe8e0fdf4dcbedf07558d571ddbeb91a09d89c
 multisite_5 (2^5 species, combinatorial) | ode:t_end=10 | median=8.774 min=8.774 max=8.774
   samples_ms=[8.774] trajectory_hash=b496ceb3cdddb01b64436cd059d33d5abd578abccdf0cb471bd4e66c65b372b1
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=1 | median=15.570 min=15.570 max=15.570
   samples_ms=[15.570] trajectory_hash=ea7b702ac44ac0a40058a898afa7ad4992124f473b8fb15985278cccbb118b4e
 multisite_5 (2^5 species, combinatorial) | ssa:t_end=100 | median=318.253 min=318.253 max=318.253
   samples_ms=[318.253] trajectory_hash=a58cfb6893b892a5c203fd9224cb25a14168e8a33115af83f362907a69fa7983
 multisite_7 (2^7 species, combinatorial) | ode:t_end=10 | median=26.867 min=26.867 max=26.867
   samples_ms=[26.867] trajectory_hash=4a8fbefc57c9df370072671aa8745967e5340c85779785f6870b0c5ac584a52d
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=1 | median=17.258 min=17.258 max=17.258
   samples_ms=[17.258] trajectory_hash=e62810abe1a6a68e61913d923a5d31266e291b0399757637118c1aebcc602569
 multisite_7 (2^7 species, combinatorial) | ssa:t_end=100 | median=596.257 min=596.257 max=596.257
   samples_ms=[596.257] trajectory_hash=20745e7f170cc4ed147de150b7f8ae1b89bf1473dd8df6d9d9afdc0a98ce3515
==============================================================================

--- generation breakdown: chain_5 (baseline, unimolecular)  (gen wall 3.2 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.6     19%         4    154.05
  findAllMaps                  0.4     14%         4    108.72
  speciesDedup                 0.1      4%         9     13.94
  canonicalize                 0.0      0%         5      1.37
  matchComponents              0.0      0%         5      1.33
  (instrumented sections account for 38% of gen wall; 632.1 µs/species, 790.1 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: binding_AB (bimolecular)  (gen wall 1.8 ms) ---
  section                       ms   % gen     calls   µs/call
  applyTransformation          0.1      7%         2     64.49
  findAllMaps                  0.1      6%         5     23.87
  speciesDedup                 0.1      4%         6     12.22
  matchComponents              0.0      0%         6      1.22
  canonicalize                 0.0      0%         3      1.28
  (instrumented sections account for 18% of gen wall; 612.2 µs/species, 918.3 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_5 (2^5 species, combinatorial)  (gen wall 28.5 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 11.3     40%       160     70.40
  applyTransformation          2.2      8%       160     13.80
  speciesDedup                 1.5      5%       161      9.15
  matchComponents              1.1      4%       176      6.35
  canonicalize                 0.5      2%        32     15.94
  (instrumented sections account for 58% of gen wall; 890.2 µs/species, 178.0 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

--- generation breakdown: multisite_7 (2^7 species, combinatorial)  (gen wall 57.3 ms) ---
  section                       ms   % gen     calls   µs/call
  findAllMaps                 15.0     26%       896     16.76
  matchComponents              5.0      9%       960      5.19
  speciesDedup                 4.6      8%       897      5.18
  applyTransformation          4.3      7%       896      4.77
  canonicalize                 0.7      1%       128      5.79
  (instrumented sections account for 52% of gen wall; 447.5 µs/species, 63.9 µs/reaction; remainder = queue/bookkeeping/uninstrumented)

==============================================================================
 DENSE vs SPARSE ODE   (go/no-go on routing large models to cvode_sparse)
==============================================================================
 dense = engine default (cvode_jac, dense LU) ; sparse = explicit cvode_sparse

model                                     species     dense    sparse   speedup      maxAbs      maxRel  status
---------------------------------------------------------------------------------------------------------------
chain_5 (baseline, unimolecular)                5       4.6       3.4      1.3x      1.8e-7      1.2e-6  OK
binding_AB (bimolecular)                        3       3.8       4.4      0.9x      3.1e-7      3.4e-9  OK
multisite_5 (2^5 species, combinatorial)       32       8.8       7.4      1.2x      1.7e-6      2.5e-9  OK
multisite_7 (2^7 species, combinatorial)      128      26.9      20.7      1.3x      0.0e+0      0.0e+0  OK

 >>> cvode_sparse ran on all models. Worst relative trajectory diff: 1.2e-6 (agrees with dense).
     Best dense/sparse speedup observed: 1.3x.
     => Sparse matches dense but is not clearly faster at these sizes; scale up
        (larger PROFILE_MULTISITE) before deciding.
==============================================================================

==============================================================================
 WHERE THE TIME GOES (totals across all models)
==============================================================================

 phase totals (ms), biggest first:
   ssa           947.9  86%
   gen            90.8  8%
   ode            44.0  4%
   parse          17.6  2%

 within generation, biggest sinks (ms), biggest first:
   findAllMaps                26.8  30% of gen
   applyTransformation         7.2  8% of gen
   speciesDedup                6.3  7% of gen
   matchComponents             6.1  7% of gen
   canonicalize                1.3  1% of gen

 >>> Biggest phase overall: ssa (947.9 ms).
 >>> Biggest generation sink: findAllMaps (30% of generation).
==============================================================================
