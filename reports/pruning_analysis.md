# Dead-Code / Dependency Pruning Analysis Report

## Status
As requested, changes from `#920` (removal of `EnhancedRuleCartoon`) were avoided to prevent duplication, and unrelated test mocking in `validation.test.ts` was discarded.

## Considered Targets Matrix

| Target | File / Module | Reason Skipped |
| :--- | :--- | :--- |
| `EnhancedRuleCartoon` | `components/RuleCartoon.tsx` | Already removed in PR #920 |
| `isSemanticSearchReady` | `services/semanticSearch.ts` | Tested in `tests/services/SemanticSearch.spec.ts` |
| `resetSemanticSearchState` | `services/semanticSearch.ts` | Tested in `tests/services/SemanticSearch.spec.ts` |
| `preloadModel` | `services/modelLoader.ts` | Tested in `tests/services/modelLoader.spec.ts` |
| `isModelCached` | `services/modelLoader.ts` | Tested in `tests/services/modelLoader.spec.ts` |
| `formatLintResults` | `services/bnglLinter.ts` | Used in `scripts/research/lint_demo.ts` |
| `hasNFsim` | `tools/bng2-paths.ts` | Used across parity tests (`tests/parity-*.spec.ts`) |

## Conclusion
No un-isolated dead code targets remained to prune in this run without duplicating existing PRs or removing test-harness exports.
