// eslint-disable-next-line prettier/prettier
export const fixtures = [
  'headers',
  'images',
  'inline-styles',
  'lists',
  'quote',
  'facebook-video',
  'gif',
  'giphy',
  'gallery-layouts',
];

export const fixturesToTestOnSsr = ['images'];

export const DEFAULT_DESKTOP_BROWSERS = [
  { width: 1440, height: 900, name: 'chrome' },
  { width: 1440, height: 900, name: 'firefox' },
];

export const DEFAULT_MOBILE_BROWSERS = [
  { deviceName: 'iPhone X' },
  { deviceName: 'iPad' },
  { deviceName: 'Pixel 2' },
];
