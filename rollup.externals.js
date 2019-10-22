export const externals = [
  'draft-js',
  'assert',
  'classnames',
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
  'draft-js/lib/DraftOffsetKey',
  /wix-rich-content-common\/.*?\.scss/,
];

export const globals = {
  'draft-js': 'Draft',
  classnames: 'classNames',
  'draft-js': 'Draft',
  'draft-js-code': 'CodeUtils',
  lodash: '_',
  'prop-types': 'PropTypes',
  react: 'React',
  'react-custom-scrollbars': 'ReactCustomScrollbars',
  'react-dom': 'ReactDOM',
  'react-i18next': 'reactI18next',
  'react-infinite-scroller': 'InfiniteScroll',
  'react-md-spinner': 'MDSpinner',
  'react-measure': 'Measure',
  'react-player': 'ReactPlayer',
  'react-sortable-hoc': 'reactSortableHoc',
  'react-tooltip': 'ReactTooltip',
  'wix-rich-content-common': 'WixRichContentCommon',
};

export const excludedGlobals = [
  'draft-js-plugins-editor',
  /draft-js-.*?-plugin/,
  'react-click-outside',
  'draft-js/lib/DraftOffsetKey',
];

export const isExternal = id =>
  !id.startsWith('\0') &&
  !id.startsWith('.') &&
  !id.startsWith('/') &&
  !excludedExternals.find(regex => (typeof regex === 'string' ? regex === id : regex.test(id))) &&
  !!externals.find(externalName => new RegExp(externalName).test(id));
