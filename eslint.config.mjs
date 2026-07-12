import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    ignores: [
      "node_modules",
      ".next",
      "dist",
      "build"
    ],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  }
];