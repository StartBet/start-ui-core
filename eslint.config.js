import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
  {
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**']
  },

  js.configs.recommended,

  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.{js,cjs,mjs,ts,cts,mts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules
    }
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    }
  },

  {
    files: [
      '**/*.{test,spec}.{js,ts,tsx}',
      '**/__tests__/**/*.{js,ts,tsx}',
      'app/components/**/*.test.ts'
    ],
    languageOptions: {
      globals: {
        ...globals.vitest
      }
    }
  }
];
