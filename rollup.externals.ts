import { IsExternal } from 'rollup';

const externals = [
  'assert',
  'axios',
  'classnames',
  'lodash',
  'prop-types',
  'react',
  'react-dom',
  'wix-rich-content-editor-common',
  'wix-rich-content-common',
  'wix-rich-content-plugin-commons',
  'react-i18next',
  'react-flip-move',
  'i18next',
  'image-client-api',
  /^punycode$/,
  /^@wix\/draft-js$/,
  /^jss$/, //issue with ESM in CJS
  /^jss-plugin-camel-case$/, //issue with ESM in CJS
  /^jss-plugin-nested$/, //issue with ESM in CJS
  /^jss-plugin-props-sort$/, //issue with ESM in CJS
  /^wix-rich-content-editor$/,
  /^wix-rich-content-viewer$/,
  /^ricos-content$/,
  /^react-player$/,
];

const excludedExternalsRegexArr = [
  /react-click-outside/,
  /wix-rich-content-editor-common\/.*?\.scss/,
  /wix-rich-content-common\/.*?\.scss/,
];

const localPrefixes = ['\0', '.', '/'];
const testRegex = (regex: RegExp, source: string) =>
  typeof regex === 'string' ? regex === source : regex.test(source);

export const isExternal: IsExternal = source => {
  return (
    !localPrefixes.some(prefix => source.startsWith(prefix)) &&
    !excludedExternalsRegexArr.some(regex => testRegex(regex, source)) &&
    externals.some(externalName => new RegExp(externalName).test(source))
  );
};
