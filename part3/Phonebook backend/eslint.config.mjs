import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    ignores: [
      "eslint.config.mjs",
      "node_modules/**",
      "dist/**",
      "build/**"
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    rules: {
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0
    }
  }
];