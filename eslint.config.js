import tseslint from "typescript-eslint";
import sonarjs from "eslint-plugin-sonarjs";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "reports/**",
      ".stryker-tmp/**",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}", "vite.config.ts", "vitest.config.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      sonarjs,
    },
    rules: {
      complexity: ["error", 10],
      "max-lines": ["error", { max: 499, skipBlankLines: true, skipComments: true }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-restricted-types": [
        "error",
        {
          types: {
            unknown: {
              message: "unknown is banned. Use a specific type or Json.",
            },
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "sonarjs/cognitive-complexity": ["error", 21],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-duplicated-branches": "error",
      "sonarjs/no-all-duplicated-branches": "error",
      "sonarjs/no-identical-conditions": "error",
      "sonarjs/no-redundant-boolean": "error",
      "sonarjs/no-redundant-jump": "error",
      "sonarjs/no-redundant-assignments": "error",
      "sonarjs/no-unused-collection": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-gratuitous-expressions": "error",
      "sonarjs/no-inverted-boolean-check": "error",
      "sonarjs/no-dead-store": "error",
    },
  },
];
