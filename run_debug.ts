import { BNGLParser } from './packages/engine/src/services/graph/core/BNGLParser';

const orig = console.error;
console.error = function() {
  console.log("ERR WAS CALLED WITH", arguments);
  orig.apply(this, arguments as any);
}

try {
  console.log("PARSER RESULT:", BNGLParser.evaluateExpression("0.01", new Map()));
} catch(e) {
  console.log("CAUGHT EXCEPTION:", e);
}
