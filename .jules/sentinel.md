## 2026-07-24 - Prevent Arbitrary Code Execution in JIT Compiler
**Vulnerability:** Arbitrary code execution via unsafe `new Function(...)` usage when dynamically compiling ODE RHS functions.
**Learning:** The `createFn` wrapper in `JITCompiler.ts` relied on regex and manual argument validation before passing the body directly to `new Function`. This bypassed centralized static analysis and sanitization safeguards built elsewhere (e.g. `safeFunctionCompiler.ts`).
**Prevention:** Centralize dynamic function evaluation by replacing isolated `new Function(...)` calls with the established `createCompiledFunction` wrapper, ensuring uniform static analysis verification and mitigating code injection risks.
