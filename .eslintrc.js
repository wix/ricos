module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // // Allows the parsing of jsx
    },
  },
  plugins: ['lodash', 'fp', 'jsx-a11y', 'prettier', '@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.ts, *.tsx'],
    },
  ],
  extends: [
    'wix/react',
    'plugin:jsx-a11y/strict',
    'eslint:recommended',

    // recommended rules from @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',

    // Enables eslint-plugin-prettier and eslint-config-prettier.
    // This will display prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: '16.6.3',
    },
  },
  rules: {
    semi: 'error',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'quote-props': 'off',
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react/jsx-space-before-closing': 'off',
    'react/jsx-tag-spacing': 'warn',
    'react/style-prop-object': 'off',
    'react/jsx-handler-names': 'off',
    camelcase: 'off',
    'max-params': 'off',
    'no-console': 'error',
    'no-use-before-define': 'off',
    'no-mixed-operators': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
      },
    ],
    'react/jsx-no-bind': 0,
    'fp/no-loops': 'warn',
    'fp/no-delete': 'error',
    'fp/no-get-set': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-skipped-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'no-misleading-character-class': 'off',
    'no-param-reassign': 'warn',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/aria-proptypes': 'off',
    'prettier/prettier': 'error',
    'lodash/import-scope': [2, 'member'],
    'operator-linebreak': 'off',
    indent: 'off',
    curly: 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    'react/prop-types': 'off',
  },
};
