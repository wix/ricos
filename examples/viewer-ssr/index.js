const bootstrap = require('wix-bootstrap-ng');
const { wixCssModulesRequireHook } = require('yoshi-runtime');

const rootDir = './dist/src';
const getPath = path =>
  process.env.NODE_ENV === 'test' || process.env.DEBUGGER === 'true'
    ? `./src/${path}`
    : `${rootDir}/${path}`;

wixCssModulesRequireHook();

bootstrap()
  .express(getPath('server'))
  .start({ disableCluster: process.env.NODE_ENV === 'development' });
