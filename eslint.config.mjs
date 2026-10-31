// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  { ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // React rules (only apply to .jsx / .tsx files)
  {
    files: ['**/*.{jsx,tsx}'],
    ...react.configs.flat.recommended,
    languageOptions: { globals: globals.browser },
    settings: { react: { version: 'detect' } },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    ...react.configs.flat['jsx-runtime'],
  },
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactHooks.configs.flat.recommended,
  },
]);