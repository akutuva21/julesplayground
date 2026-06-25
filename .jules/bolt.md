2026-06-19
Replaced ANTLR parser AST generation with simple charCodeAt manual string scanning for isFunctionalRateExpr to avoid array and string allocations. This results in ~180x speedup for parsing dependencies of expressions in SimulationLoop and NetworkExpansion.
