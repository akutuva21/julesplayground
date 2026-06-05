const fs = require('fs');
let content = fs.readFileSync('packages/engine/src/services/analysis/DoseResponse.ts', 'utf-8');
content = content.replace(
  "export interface DoseResponseResult {\n  inputParameter: string;\n  curves: DoseResponseCurve[];\n  failedDoses: number[];\n}",
  "export interface DoseResponseResult {\n  inputParameter: string;\n  curves: DoseResponseCurve[];\n  failedDoses: number[];\n  fallbackUsed?: string;\n  warning?: string;\n  methodUsed?: string;\n  summary?: any;\n}"
);
fs.writeFileSync('packages/engine/src/services/analysis/DoseResponse.ts', content);
