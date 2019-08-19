export const externals = [
  '@wix/draft-js',
  'assert',
  'clsx',
  'draft-js',
  'lodash',
  'prop-types',
  'react',
  'react-dom',
  'wix-rich-content-common',
  'react-i18next',
];

export const excludedExternals = [
  /draft-js-plugins-editor/,
  /draft-js-.*?-plugin/,
  /react-click-outside/,
  '@wix/draft-js/lib/DraftOffsetKey',
  '@wix/draft-js/lib/isSoftNewlineEvent',
  /wix-rich-content-common\/.*?\.scss/,
];

export const excludedGlobals = [
  'draft-js-plugins-editor',
  /draft-js-.*?-plugin/,
  'react-click-outside',
  '@wix/draft-js/lib/DraftOffsetKey',
  '@wix/draft-js/lib/isSoftNewlineEvent',
];
