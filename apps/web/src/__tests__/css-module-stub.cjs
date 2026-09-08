// Node/tsx does not transform CSS modules. Regression tests exercise data and
// routing exports only, so expose stable class-name strings during test loads.
const { registerHooks } = require("node:module");

registerHooks({
  load(url, context, nextLoad) {
    if (url.endsWith(".module.css")) {
      return {
        format: "commonjs",
        shortCircuit: true,
        source: `module.exports = new Proxy(Object.create(null), {
          get(_target, property) {
            if (property === "__esModule") return false;
            return typeof property === "string" ? property : undefined;
          }
        });`,
      };
    }
    return nextLoad(url, context);
  },
});
