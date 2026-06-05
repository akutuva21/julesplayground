1. Add `computeDoseResponseBySimulation` to `packages/engine/src/services/analysis/DoseResponse.ts` or directly within `computeDoseResponse`, and change `computeDoseResponse` to be `async` and return a `Promise`. It will handle both `rootfind` and `simulate` methods, including the fallback if `rootfind` fails to find any curves.
2. In `packages/engine/src/services/analysis/DoseResponse.ts`:
   - Import `simulate` from `../simulation/SimulationLoop`.
   - Implement `updateMassActionRates(model)` (and `cloneExpandedModel`) inline or export them as utilities. Actually, `simulate` can take care of parsing parameters but `updateMassActionRates` ensures `reaction.rateConstant` is properly re-evaluated if parameters change. Let's move `updateMassActionRates` logic into `DoseResponse.ts` or somewhere in `packages/engine/src/services/evaluator`.
   - Modify `computeDoseResponse` to return `Promise<DoseResponseResult & { fallbackUsed?: string, warning?: string, methodUsed?: string, summary?: any }>`.
   - Update `packages/engine/tests/analysis/doseResponse.test.ts` to `await computeDoseResponse`.
3. In `packages/mcp-server/src/handlers/doseResponse.ts`:
   - Delete `computeDoseResponseBySimulation` and remove `cloneExpandedModel`, `updateMassActionRates` from `packages/mcp-server/src/services/engine.ts`.
   - Call `await computeDoseResponse` once and just wrap its result into `createToolResult`.
4. Check `npm run test:full` and `npm run type-check`.
