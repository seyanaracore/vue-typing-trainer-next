/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,

  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],

  plugins: ['import'],

  parserOptions: {
    ecmaVersion: 'latest',
  },

  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'internal',
          'object',
          'unknown',
          'type',
        ],
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: 'block-like',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'never',
        prev: ['singleline-const', 'singleline-let'],
        next: ['singleline-const', 'singleline-let'],
      },
      {
        blankLine: 'always',
        prev: ['multiline-const', 'multiline-let'],
        next: ['multiline-const', 'multiline-let'],
      },
      {
        blankLine: 'always',
        prev: ['cjs-import'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['cjs-import'],
        next: ['cjs-import'],
      },
    ],
  },

  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.js', '.jsx', '.json', '.ts'],
        map: [['@', './src']],
      },
    },
  },
}
