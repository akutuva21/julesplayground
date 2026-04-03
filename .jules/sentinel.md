## 2025-04-03 - HTML Escaping in Tooltips
**Vulnerability:** XSS vulnerability in `public/umap.html` where dynamic model attributes (tags, observables, names) were directly injected into `tooltip.innerHTML` without escaping.
**Learning:** Raw HTML strings in visualization utilities or pre-built assets outside the React context (e.g. D3, Plotly, or standard DOM scripts) must be manually sanitized. React's built-in XSS protection does not extend to `innerHTML` or external files like `public/umap.html`.
**Prevention:** Always use a dedicated `escapeHtml` utility function when concatenating strings for `innerHTML` in non-React contexts.

## 2025-04-03 - Safe JIT Compilation with CSP
**Vulnerability:** A perceived vulnerability existed with `eval()` and `new Function()` in `JITCompiler.ts`. However, this is by design for mathematical JIT performance.
**Learning:** The application explicitly uses a relaxed CSP (`unsafe-eval`) to allow the `JITCompiler` and `SparseJacobian` services to dynamically compile high-performance simulations. Attempting to blindly "fix" these by throwing errors or providing zero-stubs mathematically breaks the ODE solvers and application core.
**Prevention:** Do not remove or stub `eval()` or `new Function()` within performance-critical JIT generation pathways unless a robust Abstract Syntax Tree (AST) interpreter or WebAssembly fallback is completely replacing the JIT functionality. The `unsafe-eval` CSP policy is a hard requirement for this feature.
