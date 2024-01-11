// @ts-check

/** @type {import("stylelint").Config} */
const config = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
    'stylelint-config-html',
    'stylelint-config-recommended-vue',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  overrides: [
    {
      files: ['*.css', '**/*.css'],
    },
    {
      files: ['*.scss', '**/*.scss'],
    },
    {
      files: ['*.sass', '**/*.sass'],
    },
    {
      files: ['*.less', '**/*.less'],
    },
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin'],
      },
    ],
  },
}

module.exports = config
