## 2026-05-11 - Fix dynamic import vulnerability

**Vulnerability:** Found arbitrary dynamic import code injection via `new Function('specifier', 'return import(specifier)')`.
**Learning:** This existed as a compatibility bridge attempting to hide optional dependencies from bundlers without statically resolving them.
**Prevention:** Always use explicit whitelisting (like a `switch` statement) mapping allowed specifier strings to static `import('...')` strings when dynamically loading optional runtime modules.
