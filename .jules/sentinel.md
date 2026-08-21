## 2024-05-18 - Arbitrary Code Execution Risk via new Function()
**Vulnerability:** Found `new Function()` being called directly in `JITCompiler.ts` to dynamically compile JIT RHS functions. This bypasses the security wrappers provided in the codebase (`safeFunctionCompiler.ts`).
**Learning:** In this monorepo, to prevent arbitrary code execution vulnerabilities and satisfy CodeQL static analysis, when dynamically compiling code (e.g., JIT compilation) in `packages/engine`, always use the `createCompiledFunction` wrapper from `packages/engine/src/utils/safeFunctionCompiler.ts` instead of invoking `new Function()` directly.
**Prevention:** Do not use `new Function()` directly in any engine service. Always verify that dynamic compilation points use the provided safe compiler wrapper.
