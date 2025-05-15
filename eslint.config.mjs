import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

   js.configs.recommended, // ESLint recommended rules
  {
    ignores: [
      '.vscode',
      '**/vendor/*.js',
      'build',
      'coverage',
      'dist',
      'node_modules',
      'package',
      'reports',
      'githubhelper',
    ],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',

        // Browser globals
        sessionStorage: 'readonly',
        HTMLSelectElement: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier: prettier,
      import: importPlugin,
    },
    rules: {
      ...ts.configs.recommended.rules, // TypeScript recommended rules
      ...prettier.configs.recommended.rules, // Prettier recommended rules
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-console': 'error',
      'no-debugger': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-undef': 'error',
      semi: ['error', 'always'],
      'import/order': [
        'error',
        {
          groups: ['index', 'sibling', 'parent', 'internal', 'external', 'builtin'],
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-var-requires': 'error',
    },
    settings: {
      'import/extensions': ['.js', '.ts'],
    },
  },
]);
