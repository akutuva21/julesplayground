## 2025-02-15 - [Critical] Command Injection via `new Function` in BNGLParser
**Vulnerability:** A command injection vulnerability existed in `packages/engine/src/services/graph/core/BNGLParser.ts` where `new Function` was used to evaluate arbitrary BNGL math expressions from user input.
**Learning:** The use of `new Function` directly on parsed user expressions is unsafe and allows arbitrary code execution.
**Prevention:** Use the provided `SafeExpressionEvaluator.compile` or `SafeExpressionEvaluator.evaluateConstant` which sandboxes math functions and disables arbitrary execution.
