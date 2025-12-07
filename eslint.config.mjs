import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  // Ensure Next.js and React rules are resolved correctly
  resolvePluginsRelativeTo: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{css,scss}"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,mts}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "jsx-a11y": jsxA11y,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "react/jsx-sort-props": [
        "error",
        {
          ignoreCase: true, // Sort case-insensitively
          callbacksLast: true, // Put onClick, onChange, etc. at the end
          shorthandFirst: true, // Put boolean props like {isActive} after others
          reservedFirst: true, // Put key and ref before other props
        },
      ],

      // Accessibilit
      ...jsxA11y.configs.recommended.rules,

      // Import Sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Unused Imports Rules
      // Disable the base ESLint rule that conflicts with unused-imports
      "no-unused-vars": "off",
      // Enable the unused-imports rule for autofixable cleanup
      "@typescript-eslint/no-unused-vars": "off", // Disable the TS one too
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
      "prettier/prettier": "warn",
    },
  },
  ...compat.extends("plugin:prettier/recommended"),
];

export default eslintConfig;
