module.exports = {
  root: true,
  parser: `@typescript-eslint/parser`,
  plugins: [
    `@typescript-eslint`,
  ],
  extends: [
    `react-app`,
    `react-app/jest`,
    `eslint:recommended`,
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
  ],
  rules: {
    '@typescript-eslint/brace-style': `warn`,
    '@typescript-eslint/consistent-type-assertions': [`warn`, { assertionStyle: `as`, objectLiteralTypeAssertions: `allow` }],
    '@typescript-eslint/explicit-module-boundary-types': `off`,
    '@typescript-eslint/indent': [`warn`, 2],
    '@typescript-eslint/interface-name-prefix': `off`,
    '@typescript-eslint/keyword-spacing': `warn`,
    '@typescript-eslint/member-delimiter-style': [`warn`, { multiline: { delimiter: `none` } }],
    '@typescript-eslint/method-signature-style': `off`,
    '@typescript-eslint/no-non-null-assertion': `off`,
    '@typescript-eslint/no-unused-vars': `off`,
    '@typescript-eslint/no-useless-constructor': `warn`,
    '@typescript-eslint/prefer-ts-expect-error': `off`,
    '@typescript-eslint/promise-function-async': `off`,
    '@typescript-eslint/quotes': [`warn`, `single`, { allowTemplateLiterals: true }],
    '@typescript-eslint/restrict-template-expressions': `off`,
    '@typescript-eslint/semi': [`error`, `never`],
    '@typescript-eslint/space-before-function-paren': `warn`,
    '@typescript-eslint/strict-boolean-expressions': `off`,
    'array-bracket-spacing': [`error`, `never`],
    'block-spacing': `warn`,
    'comma-dangle': [`warn`, `always-multiline`],
    'comma-spacing': [`error`, { before: false, after: true }],
    'eol-last': `warn`,
    'import/order': `warn`,
    'import/prefer-default-export': `off`,
    'jsx-a11y/label-has-associated-control': [`error`, { assert: `either` }],
    'max-classes-per-file': `off`,
    'max-len': `off`,
    'multiline-ternary': `off`,
    'no-console': [`warn`, { allow: [`error`] }],
    'no-extra-parens': `warn`,
    'no-multi-spaces': `warn`,
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 1, maxBOF: 0 }],
    'no-plusplus': `off`,
    'no-trailing-spaces': `warn`,
    'object-curly-spacing': [`warn`, `always`],
    'padded-blocks': [`warn`, `never`],
    'prefer-const': `warn`,
    'prefer-destructuring': `off`,
    'quote-props': [`error`, `as-needed`],
    'react/destructuring-assignment': `off`,
    'react/jsx-props-no-spreading': `off`,
    'react/no-array-index-key': `off`,
    'react/react-in-jsx-scope': `off`,
    'space-in-parens': `warn`,
    'space-infix-ops': `warn`,
    'spaced-comment': `warn`,
    indent: `off`,
    quotes: [`error`, `backtick`],
  },
}
